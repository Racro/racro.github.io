// Cloudflare Worker for anonymous comments
// Deploy this to Cloudflare Workers with a KV namespace bound as COMMENTS_KV

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // GET: Fetch comments or reactions for a page
  if (request.method === 'GET') {
    const page = url.searchParams.get('page')
    const type = url.searchParams.get('type') // 'comments' or 'reactions'
    
    if (!page) {
      return new Response(JSON.stringify({ error: 'Missing page parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    try {
      if (type === 'reactions') {
        // Fetch reactions
        const reactionsKey = `reactions:${page}`
        const reactionsJson = await COMMENTS_KV.get(reactionsKey, 'json')
        const reactions = reactionsJson || { likes: 0, loved: 0, total: 0 }
        return new Response(JSON.stringify(reactions), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } else {
        // Fetch comments
        const commentsJson = await COMMENTS_KV.get(page, 'json')
        const comments = commentsJson || []
        return new Response(JSON.stringify(comments), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  }

  // POST: Add a new comment or reaction
  if (request.method === 'POST') {
    let body
    try {
      body = await request.json()
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    const { type } = body
    
    // Handle reactions
    if (type === 'reaction') {
      try {
        const { page, reaction } = body // reaction: 'like' or 'loved'
        
        if (!page || !reaction) {
          return new Response(JSON.stringify({ error: 'Page and reaction type required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        if (!['like', 'loved'].includes(reaction)) {
          return new Response(JSON.stringify({ error: 'Invalid reaction type' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        // Check if user already reacted (using IP + fingerprint)
        const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
        const userFingerprint = body.fingerprint || clientIp.substring(0, 10)
        const userReactionKey = `user_reaction:${page}:${userFingerprint}`
        const existingReaction = await COMMENTS_KV.get(userReactionKey)
        
        // Prevent duplicate reactions from same user
        if (existingReaction && existingReaction === reaction) {
          return new Response(JSON.stringify({ error: 'You already reacted with this', alreadyReacted: true }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        // Get current reactions
        const reactionsKey = `reactions:${page}`
        const reactions = await COMMENTS_KV.get(reactionsKey, 'json') || { likes: 0, loved: 0, total: 0 }
        
        // If user had a different reaction, remove it
        if (existingReaction && existingReaction !== reaction) {
          if (existingReaction === 'like') reactions.likes = Math.max(0, reactions.likes - 1)
          if (existingReaction === 'loved') reactions.loved = Math.max(0, reactions.loved - 1)
          reactions.total = Math.max(0, reactions.total - 1)
        }
        
        // Add new reaction
        if (reaction === 'like') reactions.likes++
        if (reaction === 'loved') reactions.loved++
        reactions.total = reactions.likes + reactions.loved
        
        // Save reactions
        await COMMENTS_KV.put(reactionsKey, JSON.stringify(reactions))
        
        // Save user's reaction (for 1 year)
        await COMMENTS_KV.put(userReactionKey, reaction, { expirationTtl: 31536000 })
        
        return new Response(JSON.stringify({ success: true, reactions }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to save reaction' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }
    
    // Handle comments
    try {
      const { page, name, email, comment } = body

      // Basic validation
      if (!page || !comment || comment.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Page and comment are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Simple spam check: minimum length
      if (comment.trim().length < 3) {
        return new Response(JSON.stringify({ error: 'Comment too short' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Rate limiting: Check IP (simple approach)
      const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
      const rateLimitKey = `rate_limit:${clientIp}:${page}`
      const lastComment = await COMMENTS_KV.get(rateLimitKey)
      
      if (lastComment) {
        const lastTime = parseInt(lastComment)
        const now = Date.now()
        // Limit to 1 comment per 10 seconds per IP per page (prevents spam while allowing conversation)
        if (now - lastTime < 10000) {
          return new Response(JSON.stringify({ error: 'Please wait 10 seconds before commenting again' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
      }

      // Create comment object
      const newComment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        page: page,
        name: name || 'Anonymous',
        email: email || '',
        comment: comment.trim(),
        timestamp: new Date().toISOString(),
        ip: clientIp.substring(0, 7) + '...', // Partial IP for logging
      }

      // Get existing comments
      const existingComments = await COMMENTS_KV.get(page, 'json') || []
      
      // Add new comment
      const updatedComments = [...existingComments, newComment]

      // Save comments
      try {
        await COMMENTS_KV.put(page, JSON.stringify(updatedComments))
      } catch (kvError) {
        console.error('KV put error:', kvError)
        throw new Error(`Failed to save comment to KV: ${kvError.message}`)
      }
      
      // Update rate limit (expires after 10 seconds) - don't fail if this errors
      try {
        await COMMENTS_KV.put(rateLimitKey, Date.now().toString(), { expirationTtl: 10 })
      } catch (rateLimitError) {
        console.warn('Rate limit update failed (non-critical):', rateLimitError)
        // Continue anyway - comment is saved
      }

      return new Response(JSON.stringify({ success: true, comment: newComment }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Comment save error:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to save comment', 
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders })
}


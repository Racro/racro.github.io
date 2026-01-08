// Anonymous Comments Widget for Cloudflare Workers
// Replace YOUR_WORKER_URL with your actual Cloudflare Worker URL

(function() {
  'use strict';
  
  // Get Worker URL from config (set by Jekyll)
  const WORKER_URL = window.COMMENTS_CONFIG?.workerUrl || '';
  
  if (!WORKER_URL) {
    console.error('Cloudflare Worker URL not configured. Please set cloudflare_worker_url in _config.yml');
    const container = document.getElementById('comments-container');
    if (container) {
      container.innerHTML = '<p class="comments-error">Comments system not configured. Please set cloudflare_worker_url in _config.yml</p>';
    }
    return;
  }
  
  const currentPage = window.location.pathname;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function renderComments(comments) {
    const container = document.getElementById('comments-container');
    if (!container) return;

    if (comments.length === 0) {
      container.innerHTML = '<p class="comments-empty">No comments yet. Be the first to share your thoughts!</p>';
      return;
    }

    const html = comments.map(comment => `
      <div class="comment-item">
        <div class="comment-header">
          <strong class="comment-author">${escapeHtml(comment.name)}</strong>
          <span class="comment-date">${formatDate(comment.timestamp)}</span>
        </div>
        <div class="comment-body">${escapeHtml(comment.comment).replace(/\n/g, '<br>')}</div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function loadComments() {
    try {
      const response = await fetch(`${WORKER_URL}?page=${encodeURIComponent(currentPage)}`);
      if (!response.ok) throw new Error('Failed to load comments');
      const comments = await response.json();
      renderComments(comments);
    } catch (error) {
      console.error('Error loading comments:', error);
      const container = document.getElementById('comments-container');
      if (container) {
        container.innerHTML = '<p class="comments-error">Unable to load comments. Please try again later.</p>';
      }
    }
  }

  async function submitComment(formData) {
    const submitBtn = document.getElementById('comment-submit');
    const originalText = submitBtn ? submitBtn.textContent : 'Submit';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: currentPage,
          name: formData.get('name') || 'Anonymous',
          email: formData.get('email') || '',
          comment: formData.get('comment'),
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse response:', jsonError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit comment');
      }

      // Check if comment was actually saved
      if (result.success) {
        // Clear form
        const form = document.getElementById('comment-form');
        if (form) form.reset();

        // Reload comments
        await loadComments();

        // Show success message
        const messageEl = document.getElementById('comment-message');
        if (messageEl) {
          messageEl.textContent = 'Comment submitted successfully!';
          messageEl.className = 'comment-message success';
          setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'comment-message';
          }, 3000);
        }
      } else {
        throw new Error(result.error || 'Comment may not have been saved');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      const messageEl = document.getElementById('comment-message');
      if (messageEl) {
        messageEl.textContent = error.message || 'Failed to submit comment. Please try again.';
        messageEl.className = 'comment-message error';
      }
      
      // Still try to reload comments in case it was saved despite the error
      setTimeout(() => {
        loadComments();
      }, 1000);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Load existing comments
    loadComments();

    // Handle form submission
    const form = document.getElementById('comment-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const comment = formData.get('comment');
        
        if (!comment || comment.trim().length < 3) {
          const messageEl = document.getElementById('comment-message');
          if (messageEl) {
            messageEl.textContent = 'Please enter a comment (at least 3 characters).';
            messageEl.className = 'comment-message error';
          }
          return;
        }

        await submitComment(formData);
      });
    }
  }
})();


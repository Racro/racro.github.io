// Reactions Widget for Cloudflare Workers
// Handles like/loved reactions

(function() {
  'use strict';
  
  const WORKER_URL = window.COMMENTS_CONFIG?.workerUrl || '';
  
  if (!WORKER_URL) {
    return; // Silently fail if not configured
  }
  
  const currentPage = window.location.pathname;
  
  // Generate a simple fingerprint for user identification
  function generateFingerprint() {
    const stored = localStorage.getItem('reaction_fingerprint');
    if (stored) return stored;
    
    const fingerprint = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('reaction_fingerprint', fingerprint);
    return fingerprint;
  }
  
  async function loadReactions() {
    try {
      const response = await fetch(`${WORKER_URL}?page=${encodeURIComponent(currentPage)}&type=reactions`);
      if (!response.ok) throw new Error('Failed to load reactions');
      const reactions = await response.json();
      updateReactionDisplay(reactions);
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  }
  
  function updateReactionDisplay(reactions) {
    const likeBtn = document.getElementById('reaction-like');
    const lovedBtn = document.getElementById('reaction-loved');
    const likeCount = document.getElementById('reaction-like-count');
    const lovedCount = document.getElementById('reaction-loved-count');
    
    if (likeCount) likeCount.textContent = reactions.likes || 0;
    if (lovedCount) lovedCount.textContent = reactions.loved || 0;
  }
  
  async function submitReaction(reactionType) {
    const likeBtn = document.getElementById('reaction-like');
    const lovedBtn = document.getElementById('reaction-loved');
    
    // Disable buttons during submission
    if (likeBtn) likeBtn.disabled = true;
    if (lovedBtn) lovedBtn.disabled = true;
    
    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reaction',
          page: currentPage,
          reaction: reactionType,
          fingerprint: generateFingerprint(),
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        if (error.alreadyReacted) {
          // User already reacted - that's fine, just reload
          await loadReactions();
        } else {
          throw new Error(error.error || 'Failed to submit reaction');
        }
      } else {
        const result = await response.json();
        updateReactionDisplay(result.reactions);
        
        // Visual feedback
        const clickedBtn = reactionType === 'like' ? likeBtn : lovedBtn;
        if (clickedBtn) {
          clickedBtn.classList.add('reaction-active');
          setTimeout(() => {
            clickedBtn.classList.remove('reaction-active');
          }, 300);
        }
      }
    } catch (error) {
      console.error('Error submitting reaction:', error);
    } finally {
      if (likeBtn) likeBtn.disabled = false;
      if (lovedBtn) lovedBtn.disabled = false;
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Load existing reactions
    loadReactions();
    
    // Attach event listeners
    const likeBtn = document.getElementById('reaction-like');
    const lovedBtn = document.getElementById('reaction-loved');
    
    if (likeBtn) {
      likeBtn.addEventListener('click', () => submitReaction('like'));
    }
    
    if (lovedBtn) {
      lovedBtn.addEventListener('click', () => submitReaction('loved'));
    }
  }
})();


// Poems - Enhanced interactions for classical poetry archive
// Subtle, accessibility-focused enhancements

(function() {
  'use strict';
  
  // Smooth scroll behavior for navigation
  document.addEventListener('DOMContentLoaded', function() {
    
    // Add keyboard navigation for poem cards
    const poemCards = document.querySelectorAll('.poem-card');
    
    if (poemCards.length > 0) {
      poemCards.forEach(function(card, index) {
        
        // Enhance focus visibility
        card.addEventListener('focus', function() {
          // Smooth scroll to focused card if it's out of view
          const rect = card.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            card.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        });
        
        // Arrow key navigation for grid
        card.addEventListener('keydown', function(e) {
          let targetIndex;
          const gridColumns = window.innerWidth > 1280 ? 4 : 
                             window.innerWidth > 900 ? 3 : 
                             window.innerWidth > 600 ? 2 : 1;
          
          switch(e.key) {
            case 'ArrowRight':
              e.preventDefault();
              targetIndex = Math.min(index + 1, poemCards.length - 1);
              poemCards[targetIndex].focus();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              targetIndex = Math.max(index - 1, 0);
              poemCards[targetIndex].focus();
              break;
            case 'ArrowDown':
              e.preventDefault();
              targetIndex = Math.min(index + gridColumns, poemCards.length - 1);
              poemCards[targetIndex].focus();
              break;
            case 'ArrowUp':
              e.preventDefault();
              targetIndex = Math.max(index - gridColumns, 0);
              poemCards[targetIndex].focus();
              break;
          }
        });
      });
    }
    
    // Smooth back-to-top behavior for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
      backLink.addEventListener('click', function(e) {
        // Let default navigation work, just ensure it's smooth
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Reading progress indicator for individual poems
    const poemBody = document.querySelector('.poem-body');
    if (poemBody) {
      let ticking = false;
      
      function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const trackLength = documentHeight - windowHeight;
        const percentScrolled = Math.min(100, (scrollTop / trackLength) * 100);
        
        // Could be used for a subtle progress indicator
        // For now, just track it for analytics or future use
        document.body.style.setProperty('--reading-progress', percentScrolled + '%');
        
        ticking = false;
      }
      
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(updateReadingProgress);
          ticking = true;
        }
      });
      
      updateReadingProgress();
    }
    
    // Accessibility: announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    document.body.appendChild(announcer);
    
    // Announce when page loads
    if (document.querySelector('.poem-reading')) {
      const poemTitle = document.querySelector('.poem-title');
      if (poemTitle) {
        setTimeout(function() {
          announcer.textContent = 'कविता लोड हो गई: ' + poemTitle.textContent;
        }, 1000);
      }
    }
    
  });
  
  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Disable smooth scrolling for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
  }
  
})();


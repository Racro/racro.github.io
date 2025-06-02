// Jupyter notebook new tab functionality

document.addEventListener('DOMContentLoaded', function() {
    // Find all Jupyter notebook links
    const notebookLinks = document.querySelectorAll('a[href$=".ipynb"]');
    
    // Add click event listener to each link
    notebookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();
            
            // Get the notebook URL
            const notebookUrl = this.href;
            
            // Open the notebook in a new tab
            window.open(notebookUrl, '_blank');
        });
    });
    
    // Add target="_blank" to all notebook links
    notebookLinks.forEach(link => {
        link.setAttribute('target', '_blank');
    });
}); 
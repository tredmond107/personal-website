// Main JavaScript file for personal website

// Generate GitHub-style contribution graph
function generateContributionGraph() {
    const graph = document.getElementById('contributionGraph');
    if (!graph) return;
    
    const days = 371; // Approximately 53 weeks * 7 days
    
    // Clear existing content
    graph.innerHTML = '';
    
    for (let i = 0; i < days; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // Randomly assign contribution levels for demo
        // In a real implementation, this would come from GitHub API
        const level = Math.floor(Math.random() * 5);
        if (level > 0) {
            day.classList.add(`level-${level}`);
        }
        
        // Add tooltip on hover (optional)
        day.addEventListener('mouseenter', function() {
            // You can add tooltip functionality here
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.2s';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        graph.appendChild(day);
    }
}

// Navigation active state handler
function handleNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal website loaded successfully!');
    
    // Initialize all components
    generateContributionGraph();
    handleNavigation();
    initSmoothScrolling();
    initImageLoading();
    
    // Add any additional initialization here
});

// Handle window resize for responsive elements
window.addEventListener('resize', function() {
    // Regenerate contribution graph on resize for mobile
    if (window.innerWidth <= 768) {
        generateContributionGraph();
    }
});

// Export functions for potential use in other files
window.PersonalWebsite = {
    generateContributionGraph,
    handleNavigation,
    initSmoothScrolling,
    initImageLoading
};
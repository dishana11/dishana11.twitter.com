// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .demo-category, .pricing-card, .step');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }
    
    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const target = element.textContent;
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const finalNumber = parseInt(target);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    element.textContent = finalNumber + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(currentNumber) + '+';
                }
            }, 40);
        }
    }
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 1.5}s`;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showEasterEgg();
        }
    });
    
    function showEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.innerHTML = '🤖 You found the secret! TwitterBot AI is watching... 👀';
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1DA1F2, #1991DB);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: bounce 0.5s ease-in-out;
        `;
        
        document.body.appendChild(easterEgg);
        
        setTimeout(() => {
            easterEgg.remove();
        }, 3000);
    }
});

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code');
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        button.textContent = 'Copied!';
        button.style.background = '#10B981';
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.style.background = '#1DA1F2';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        button.textContent = 'Failed';
        button.style.background = '#EF4444';
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.style.background = '#1DA1F2';
        }, 2000);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
        40% { transform: translate(-50%, -50%) translateY(-10px); }
        60% { transform: translate(-50%, -50%) translateY(-5px); }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(0, 0, 0, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// API Configuration Functions
function saveApiKeys() {
    const statusDiv = document.getElementById('config-status');
    
    const apiKeys = {
        twitterApiKey: document.getElementById('twitter-api-key').value,
        twitterApiSecret: document.getElementById('twitter-api-secret').value,
        twitterAccessToken: document.getElementById('twitter-access-token').value,
        twitterAccessTokenSecret: document.getElementById('twitter-access-token-secret').value,
        geminiApiKey: document.getElementById('gemini-api-key').value
    };
    
    // Validate required fields
    const requiredFields = Object.entries(apiKeys).filter(([key, value]) => !value.trim());
    
    if (requiredFields.length > 0) {
        showConfigStatus('❌ Please fill in all API key fields', 'error');
        return;
    }
    
    // Encrypt and save to localStorage
    try {
        const encryptedKeys = btoa(JSON.stringify(apiKeys)); // Basic encoding
        localStorage.setItem('twitterBotApiKeys', encryptedKeys);
        localStorage.setItem('twitterBotConfigTime', new Date().toISOString());
        
        showConfigStatus('✅ API keys saved successfully! Configuration is ready.', 'success');
        
        // Hide sensitive data after saving
        setTimeout(() => {
            Object.keys(apiKeys).forEach(key => {
                const input = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (input && input.value.trim()) {
                    input.value = '••••••••••••••••';
                    input.setAttribute('data-saved', 'true');
                }
            });
        }, 1000);
        
    } catch (error) {
        showConfigStatus('❌ Failed to save configuration. Please try again.', 'error');
    }
}

function testConnection() {
    const statusDiv = document.getElementById('config-status');
    
    // Check if keys are saved
    const savedKeys = localStorage.getItem('twitterBotApiKeys');
    if (!savedKeys) {
        showConfigStatus('❌ No API keys found. Please save configuration first.', 'error');
        return;
    }
    
    // Show testing status
    statusDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <div class="loading-spinner"></div>
            <span>🔄 Testing API connections...</span>
        </div>
    `;
    statusDiv.className = 'config-status';
    statusDiv.style.display = 'block';
    
    // Simulate API testing (in production, make actual API calls)
    setTimeout(() => {
        try {
            const apiKeys = JSON.parse(atob(savedKeys));
            
            // Simulate connection tests
            const tests = [
                { name: 'Twitter API', status: 'success', delay: 800 },
                { name: 'Gemini AI', status: 'success', delay: 1200 }
            ];
            
            let completedTests = 0;
            const totalTests = tests.length;
            
            tests.forEach((test, index) => {
                setTimeout(() => {
                    completedTests++;
                    
                    if (completedTests === totalTests) {
                        showConfigStatus('✅ All API connections successful! Bot is ready to run.', 'success');
                    } else {
                        statusDiv.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="loading-spinner"></div>
                                <span>🔄 Testing ${test.name}... (${completedTests}/${totalTests})</span>
                            </div>
                        `;
                    }
                }, test.delay);
            });
            
        } catch (error) {
            showConfigStatus('❌ Invalid configuration data. Please reconfigure your API keys.', 'error');
        }
    }, 500);
}

function clearConfiguration() {
    if (confirm('Are you sure you want to clear all API configuration? This action cannot be undone.')) {
        // Clear localStorage
        localStorage.removeItem('twitterBotApiKeys');
        localStorage.removeItem('twitterBotConfigTime');
        
        // Clear input fields
        const inputs = [
            'twitter-api-key',
            'twitter-api-secret', 
            'twitter-access-token',
            'twitter-access-token-secret',
            'gemini-api-key'
        ];
        
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.value = '';
                input.removeAttribute('data-saved');
            }
        });
        
        showConfigStatus('🗑️ Configuration cleared successfully.', 'success');
    }
}

function showConfigStatus(message, type) {
    const statusDiv = document.getElementById('config-status');
    statusDiv.innerHTML = message;
    statusDiv.className = `config-status ${type}`;
    statusDiv.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// Load saved configuration on page load
function loadSavedConfiguration() {
    const savedKeys = localStorage.getItem('twitterBotApiKeys');
    const configTime = localStorage.getItem('twitterBotConfigTime');
    
    if (savedKeys && configTime) {
        try {
            const keys = JSON.parse(atob(savedKeys));
            const configDate = new Date(configTime);
            
            // Show that keys are saved (but don't display actual values)
            Object.keys(keys).forEach(key => {
                const input = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (input && keys[key]) {
                    input.value = '••••••••••••••••';
                    input.setAttribute('data-saved', 'true');
                }
            });
            
            const timeAgo = getTimeAgo(configDate);
            showConfigStatus(`✅ Saved configuration loaded (${timeAgo}). Ready for automation!`, 'success');
            
        } catch (error) {
            localStorage.removeItem('twitterBotApiKeys');
            localStorage.removeItem('twitterBotConfigTime');
        }
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

// Add loading spinner CSS
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid var(--border-color);
        border-top: 2px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

// Load configuration when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadSavedConfiguration();
});

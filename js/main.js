/* ==========================================
   SHATAKSHI FREIGHT SOLUTIONS 
   ========================================== */

console.log('🚀 main.js script loaded successfully!');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

function initializeWebsite() {
    console.log('✅ DOM is ready, initializing...');
    
    // Load config immediately
    loadConfigAndUpdate();
    
    // Setup other features
    setupFormHandling();
    setupSmoothScroll();
    setupAnimations();
}

// ==========================================
// LOAD AND UPDATE WITH CONFIG
// ==========================================

function loadConfigAndUpdate() {
    console.log('📂 Attempting to load config.json...');
    
    fetch('config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Config file not found');
            }
            return response.json();
        })
        .then(config => {
            console.log('✅ config.json loaded successfully!');
            console.log('📋 Config data:', config);
            
            // Update everything from config
            updatePageWithConfig(config);
        })
        .catch(error => {
            console.warn('⚠️ Could not load config.json:', error);
            console.log('💡 Make sure config.json is in the same folder as your HTML');
            
            // Use defaults
            updatePageWithDefaults();
        });
}

function updatePageWithConfig(config) {
    // Update company info
    if (config.company) {
        if (config.company.phone) {
            const phoneElements = document.querySelectorAll('#phoneText');
            phoneElements.forEach(el => {
                el.textContent = config.company.phone;
                console.log('📱 Phone updated to:', config.company.phone);
            });
        }
        
        if (config.company.email) {
            const emailElements = document.querySelectorAll('#emailText');
            emailElements.forEach(el => {
                el.textContent = config.company.email;
                console.log('📧 Email updated to:', config.company.email);
            });
        }
        
        if (config.company.location) {
            const locationElements = document.querySelectorAll('#locationText');
            locationElements.forEach(el => {
                el.textContent = config.company.location;
                console.log('📍 Location updated to:', config.company.location);
            });
        }
    }
    
    // Update stats
    if (config.stats) {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers[0] && config.stats.shipments) {
            statNumbers[0].textContent = config.stats.shipments + '+';
            console.log('📊 Shipments updated to:', config.stats.shipments);
        }
        if (statNumbers[1] && config.stats.yearsExperience) {
            statNumbers[1].textContent = config.stats.yearsExperience + '+';
            console.log('📊 Experience updated to:', config.stats.yearsExperience);
        }
        if (statNumbers[2] && config.stats.happyClients) {
            statNumbers[2].textContent = config.stats.happyClients + '+';
            console.log('📊 Clients updated to:', config.stats.happyClients);
        }
    }
    
    // Update services
    if (config.services && config.services.length > 0) {
        const serviceCards = document.querySelectorAll('.service-card');
        config.services.forEach((service, index) => {
            if (serviceCards[index]) {
                const card = serviceCards[index];
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                const icon = card.querySelector('.service-icon');
                
                if (h3) h3.textContent = service.name;
                if (p) p.textContent = service.description;
                if (icon) icon.innerHTML = `<i class="${service.icon}"></i>`;
                
                console.log('🏷️ Service updated:', service.name);
            }
        });
    }
    
    // Update features
    if (config.features && config.features.length > 0) {
        const featureBoxes = document.querySelectorAll('.feature-box');
        config.features.forEach((feature, index) => {
            if (featureBoxes[index]) {
                const box = featureBoxes[index];
                const icon = box.querySelector('.feature-icon');
                const h4 = box.querySelector('h4');
                const p = box.querySelector('p');
                
                if (icon) icon.innerHTML = `<i class="${feature.icon}"></i>`;
                if (h4) h4.textContent = feature.title;
                if (p) p.textContent = feature.description;
                
                console.log('⭐ Feature updated:', feature.title);
            }
        });
    }
    
    console.log('✅ All updates completed!');
}

function updatePageWithDefaults() {
    console.log('Using default values...');
    
    const phoneElements = document.querySelectorAll('#phoneText');
    phoneElements.forEach(el => el.textContent = '+91 XXXXX XXXXX');
    
    const emailElements = document.querySelectorAll('#emailText');
    emailElements.forEach(el => el.textContent = 'info@shatakshi.com');
    
    const locationElements = document.querySelectorAll('#locationText');
    locationElements.forEach(el => el.textContent = 'India');
}

// ==========================================
// FORM HANDLING  (updated for FormSubmit)
// ==========================================

function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const quoteBtn = document.getElementById('quoteBtn');
    
    // Let the browser actually submit the form to FormSubmit
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            console.log('📤 Form submitted, letting FormSubmit send the email.');
            // IMPORTANT: do NOT call e.preventDefault() here
            // FormSubmit will handle redirect and email delivery.
        });
    }
    
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==========================================
// ANIMATIONS
// ==========================================

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .feature-box, .info-box, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    console.log('✨ Animations setup complete');
}

console.log('%c🚚 Website Ready!', 'color: #2c3e50; font-size: 16px; font-weight: bold;');

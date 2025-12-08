// ===== FONCTIONNALITÉS PRINCIPALES =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Digit-School Process - Initialisation...');
    
    // ===== MENU MOBILE - CORRECTION =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.getElementById('navList');
    
    console.log('Éléments trouvés:', { mobileMenuBtn, mainNav, navList });
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêche la propagation du clic
            
            console.log('Menu mobile cliqué');
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animation de l'icône
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
                console.log('Menu ouvert');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
                console.log('Menu fermé');
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                    console.log('Menu fermé via lien');
                }
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur (version améliorée)
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
                console.log('Menu fermé via clic extérieur');
            }
        });
        
        // Empêcher la fermeture quand on clique dans le menu
        mainNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    } else {
        console.warn('Éléments du menu mobile non trouvés');
    }
    
    // ===== SCROLL HEADER =====
    const header = document.querySelector('.main-header');
    
    if (header) {
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Appel initial
    }
    
    // ===== ANIMATIONS AU SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appel initial
    
    // ===== ANIMATION DES COMPTEURS =====
    const counters = document.querySelectorAll('.stat-value');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    // ===== SYSTÈME D'ONGLETS =====
    const tabHeaders = document.querySelectorAll('.schedule-tab-header, .solution-tab-header');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabType = this.classList.contains('schedule-tab-header') ? 'schedule' : 'solution';
            const tabId = this.getAttribute('data-' + tabType + '-tab');
            
            // Supprimer la classe active de tous les headers et contenus
            document.querySelectorAll('.' + tabType + '-tab-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.' + tabType + '-tab-content').forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active au header et au contenu correspondant
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ===== ANIMATION DES CARTES =====
    const cards = document.querySelectorAll('.concept-card, .law-card, .advantage-item, .risk-item, .price-card, .solution-card, .quick-nav-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===== CHANGEMENT DE THÈME =====
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animation de l'icône
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        });
        
        // Récupérer le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            const icon = themeToggle.querySelector('i');
            if (savedTheme === 'dark') {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
    
    // ===== GESTION DES FORMULAIRES =====
    const contactForm = document.getElementById('contactForm');
    const registrationForm = document.getElementById('registrationForm');
    
    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulation d'envoi
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                    submitBtn.classList.add('success');
                    
                    // Réinitialiser le formulaire après 3 secondes
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                        
                        // Afficher un message de confirmation
                        showNotification('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');
                    }, 3000);
                }, 2000);
            } else {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            }
        });
    }
    
    // Gestion du formulaire d'inscription
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!this.querySelector('#terms').checked) {
                isValid = false;
                showNotification('Veuillez accepter les conditions générales.', 'error');
            }
            
            if (isValid) {
                // Simulation d'envoi
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Inscription validée !';
                    submitBtn.classList.add('success');
                    
                    // Réinitialiser après 3 secondes
                    setTimeout(() => {
                        registrationForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                        
                        // Afficher message de confirmation
                        showNotification('Votre inscription a été enregistrée avec succès ! Nous vous enverrons un email de confirmation avec les détails de paiement.', 'success');
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    // ===== ANIMATION DES ÉLÉMENTS AU HOVER =====
    const interactiveElements = document.querySelectorAll('.concept-card, .law-card, .price-card, .solution-card, .quick-nav-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-hard)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // ===== AFFICHAGE DE L'ANNÉE EN COURS =====
    const currentYearElements = document.querySelectorAll('.current-year');
    
    if (currentYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        currentYearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // ===== LECTEUR AUDIO/VISUEL =====
    const mediaPlayers = document.querySelectorAll('.media-player');
    
    mediaPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const media = player.querySelector('audio, video');
        
        if (playBtn && media) {
            playBtn.addEventListener('click', function() {
                if (media.paused) {
                    media.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    media.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            media.addEventListener('ended', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
    });
    
    // ===== TOOLTIPS =====
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
    
    // ===== MODAL =====
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer la modal en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== MISE À JOUR DU TEMPS RESTANT =====
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        const targetDate = new Date('December 15, 2025 08:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                countdownElement.innerHTML = '<span class="countdown-ended">La conférence est terminée !</span>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">Jours</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">Heures</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">Secondes</span>
                </div>
            `;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    console.log('Digit-School Process - Initialisation terminée');
});

// ===== FONCTIONS UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Fermeture automatique
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== EXPORT POUR UTILISATION GLOBALE =====
window.DigitSchool = {
    init: function() {
        console.log('Digit-School Process initialisé avec succès !');
    },
    toggleMenu: function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) mobileMenuBtn.click();
    },
    scrollToTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    showNotification: function(message, type = 'info') {
        showNotification(message, type);
    }
};

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    window.DigitSchool.init();
});
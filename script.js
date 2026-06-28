document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. STICKY HEADER
    // ==========================================================================
    const header = document.getElementById('header-main');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    // ==========================================================================
    // 2. MOBILE MENU SIDEBAR
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    const openSidebar = () => {
        mobileSidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Disable page scroll
    };

    const closeSidebar = () => {
        mobileSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Enable page scroll
    };

    mobileMenuBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // ==========================================================================
    // 3. SWIPER HERO SLIDER
    // ==========================================================================
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // ==========================================================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const activateMenuOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset header height
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateMenuOnScroll);

    // ==========================================================================
    // 5. PREMIUM CONTACT FORM VALIDATION & SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set sending status
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
            formStatus.className = 'form-status';
            formStatus.innerHTML = '';

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const phone = document.getElementById('form-phone').value;
            const message = document.getElementById('form-message').value;

            // Form data log simulation
            console.log('Orçamento Solicitado:', { name, email, phone, message });

            // Simulate server request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Solicitar Orçamento <i class="fas fa-paper-plane"></i>';
                
                // Show success status
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Solicitação enviada com sucesso! Entraremos em contato em breve.';
                
                // Reset fields
                contactForm.reset();
            }, 1800);
        });
    }

    // ==========================================================================
    // 6. COOKIES CONSENT BANNER
    // ==========================================================================
    const cookiesBanner = document.getElementById('cookies-banner');
    const acceptCookiesBtn = document.getElementById('cookies-accept');
    const rejectCookiesBtn = document.getElementById('cookies-reject');

    const checkCookiesConsent = () => {
        const consent = localStorage.getItem('cookies-consent');
        if (!consent) {
            setTimeout(() => {
                cookiesBanner.classList.add('show');
            }, 2000);
        }
    };

    if (cookiesBanner) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookies-consent', 'accepted');
            cookiesBanner.classList.remove('show');
        });

        rejectCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookies-consent', 'rejected');
            cookiesBanner.classList.remove('show');
        });

        checkCookiesConsent();
    }
    
});

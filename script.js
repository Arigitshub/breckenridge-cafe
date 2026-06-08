document.addEventListener('DOMContentLoaded', () => {
    // 0. PRELOADER FADE OUT
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
    });
    // Fallback: fade out if load takes longer than 2s
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 2000);

    // 1. HEADER SCROLL EFFECT & BACK TO TOP BUTTON
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 2. MOBILE NAVIGATION TOGGLE
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // 3. MENU TAB SYSTEM
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const tabContents = document.querySelectorAll('.menu-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active states
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Set active states
            btn.classList.add('active');
            const tabId = `tab-${btn.dataset.tab}`;
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // 4. INTERACTIVE INFUSION LAB
    const drinkButtons = document.querySelectorAll('.drink-btn');
    const infusionCards = document.querySelectorAll('.infusion-card');
    
    const liquidColor = document.getElementById('liquid-color');
    const bubblesContainer = document.getElementById('bubbles-container');
    const blendName = document.getElementById('blend-name');
    const effectStrength = document.getElementById('effect-strength');
    
    const metricRelax = document.getElementById('metric-relax');
    const metricFocus = document.getElementById('metric-focus');
    const metricEnergy = document.getElementById('metric-energy');

    let selectedDrink = 'Espresso';
    let selectedDrinkColor = '#3d2314';
    let selectedInfusionText = '15mg CBD';
    let bubbleCount = 15;
    let bubbleSpeed = '3s';
    let bubbleColor = '#00e676';

    function updateInfusionLiquid() {
        liquidColor.style.backgroundColor = selectedDrinkColor;
        liquidColor.style.color = selectedDrinkColor;
        
        // Update readout text
        blendName.textContent = `${selectedDrink} + ${selectedInfusionText}`;
        
        // Clear old bubbles
        bubblesContainer.innerHTML = '';
        
        // Create new bubbles
        if (bubbleCount > 0) {
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                // Random position & delay
                const size = Math.random() * 8 + 4;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 90 + 5}%`;
                bubble.style.animationDelay = `${Math.random() * 2}s`;
                bubble.style.animationDuration = bubbleSpeed;
                
                if (bubbleColor) {
                    bubble.style.background = `radial-gradient(circle, ${bubbleColor} 0%, transparent 70%)`;
                }
                
                bubblesContainer.appendChild(bubble);
            }
        }
    }

    // Drink selector event listeners
    drinkButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            drinkButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedDrink = btn.querySelector('span').textContent;
            selectedDrinkColor = btn.dataset.color;
            updateInfusionLiquid();
        });
    });

    // Infusion selector event listeners
    infusionCards.forEach(card => {
        card.addEventListener('click', () => {
            infusionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            selectedInfusionText = card.dataset.mg;
            bubbleCount = parseInt(card.dataset.bubbleCount);
            bubbleSpeed = card.dataset.bubbleSpeed;
            
            // Set stats/metrics
            effectStrength.style.width = card.dataset.strength;
            metricRelax.textContent = card.dataset.relax;
            metricFocus.textContent = card.dataset.focus;
            metricEnergy.textContent = card.dataset.energy;

            // Change bubble color based on type
            const level = card.dataset.level;
            if (level === 'cbg-10') {
                bubbleColor = '#d4af37'; // gold
            } else if (level === 'none') {
                bubbleColor = null;
            } else {
                bubbleColor = '#00e676'; // neon green
            }
            
            updateInfusionLiquid();
        });
    });

    // Initial infusion liquid draw
    updateInfusionLiquid();

    // 5. CONTACT FORM MOCK SUBMISSION
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submittal effect
            contactForm.style.opacity = '0.5';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.style.opacity = '0';
                formSuccess.style.transform = 'translateY(10px)';
                
                // Trigger quick visual fade-in
                requestAnimationFrame(() => {
                    formSuccess.style.transition = 'all 0.5s ease';
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transform = 'translateY(0)';
                });
            }, 800);
        });
    }

    // 6. LEAFLET MAP INITIALIZATION
    try {
        const coordinate = [40.7174, -73.9634]; // 319 Wythe Ave, Brooklyn, NY 11249
        const map = L.map('map', {
            center: coordinate,
            zoom: 15,
            scrollWheelZoom: false,
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile,
            zoomControl: true
        });

        // Use dark tiles from CartoDB to match the aesthetic perfectly
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Customize marker icon
        const customIcon = L.divIcon({
            html: '<div style="background-color: #00e676; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 12px #00e676; animation: pulseGlow 1.5s infinite;"></div>',
            className: 'custom-map-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const marker = L.marker(coordinate, { icon: customIcon }).addTo(map);
        marker.bindPopup("<strong>Breckenridge Green Café</strong><br>319 Wythe Ave, Brooklyn, NY<br><span style='color: #00e676;'>Open Daily until 10:00 PM</span>").openPopup();

    } catch (err) {
        console.error("Leaflet map initialization failed: ", err);
    }

    // 7. NEON AUTH & DATABASE INTEGRATION
    const authNavBtn = document.getElementById('auth-nav-btn');
    const authModal = document.getElementById('auth-modal');
    const authModalClose = document.getElementById('auth-modal-close');
    const signinFormContainer = document.getElementById('signin-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToSignin = document.getElementById('switch-to-signin');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const authErrorMsg = document.getElementById('auth-error-msg');
    
    const saveBlendBtn = document.getElementById('save-blend-btn');
    const saveBlendStatus = document.getElementById('save-blend-status');
    const savedBlendsCard = document.getElementById('saved-blends-card');
    const savedBlendsList = document.getElementById('saved-blends-list');

    const authBaseUrl = 'https://ep-rapid-haze-aqjqgb95.neonauth.us-east-1.aws.neon.tech/neondb/auth';

    // State Variables
    let currentUser = JSON.parse(localStorage.getItem('neon_auth_user')) || null;
    let currentSessionToken = localStorage.getItem('neon_auth_token') || null;

    // Helper to open/close modal
    function toggleModal(show = true) {
        if (show) {
            authModal.style.display = 'flex';
            setTimeout(() => authModal.classList.add('active'), 10);
            authErrorMsg.style.display = 'none';
        } else {
            authModal.classList.remove('active');
            setTimeout(() => authModal.style.display = 'none', 400);
        }
    }

    if (authNavBtn) {
        authNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser) {
                // Sign Out Action
                signOut();
            } else {
                toggleModal(true);
            }
        });
    }

    if (authModalClose) {
        authModalClose.addEventListener('click', () => toggleModal(false));
    }

    // Modal click-outside close
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            toggleModal(false);
        }
    });

    // Form Switchers
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signinFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
            authErrorMsg.style.display = 'none';
        });
    }

    if (switchToSignin) {
        switchToSignin.addEventListener('click', (e) => {
            e.preventDefault();
            signupFormContainer.style.display = 'none';
            signinFormContainer.style.display = 'block';
            authErrorMsg.style.display = 'none';
        });
    }

    // Update UI based on auth state
    function updateAuthUI() {
        if (currentUser) {
            if (authNavBtn) {
                authNavBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Sign Out (${currentUser.name || currentUser.email})`;
                authNavBtn.style.color = '#ef5350';
                authNavBtn.style.borderColor = '#ef5350';
            }
            if (savedBlendsCard) {
                savedBlendsCard.style.display = 'block';
                fetchSavedBlends();
            }
            if (saveBlendBtn) {
                saveBlendBtn.textContent = 'Save Blend to Database';
            }
        } else {
            if (authNavBtn) {
                authNavBtn.innerHTML = '<i class="fa-solid fa-user"></i> Sign In';
                authNavBtn.style.color = 'var(--accent-secondary)';
                authNavBtn.style.borderColor = 'var(--accent-secondary)';
            }
            if (savedBlendsCard) {
                savedBlendsCard.style.display = 'none';
            }
            if (saveBlendBtn) {
                saveBlendBtn.textContent = 'Sign In to Save Blend';
            }
        }
    }

    // Handle Sign Up
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            authErrorMsg.style.display = 'none';
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';

            try {
                const res = await fetch(`${authBaseUrl}/sign-up/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Signup failed');
                }

                // If signup logs us in automatically
                if (data.session && data.user) {
                    currentUser = data.user;
                    currentSessionToken = data.session.token;
                    localStorage.setItem('neon_auth_user', JSON.stringify(currentUser));
                    localStorage.setItem('neon_auth_token', currentSessionToken);
                    toggleModal(false);
                    updateAuthUI();
                } else {
                    // Switch to sign in form
                    signupFormContainer.style.display = 'none';
                    signinFormContainer.style.display = 'block';
                    authErrorMsg.style.display = 'block';
                    authErrorMsg.className = 'auth-error-message';
                    authErrorMsg.style.backgroundColor = 'rgba(0, 230, 118, 0.08)';
                    authErrorMsg.style.borderColor = 'var(--accent-primary)';
                    authErrorMsg.style.color = 'var(--accent-primary)';
                    authErrorMsg.textContent = 'Account created successfully! Please sign in.';
                }
            } catch (err) {
                authErrorMsg.style.display = 'block';
                authErrorMsg.className = 'auth-error-message';
                authErrorMsg.textContent = err.message;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign Up';
            }
        });
    }

    // Handle Sign In
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;

            authErrorMsg.style.display = 'none';
            const submitBtn = signinForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Signing In...';

            try {
                const res = await fetch(`${authBaseUrl}/sign-in/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Invalid email or password');
                }

                if (data.session && data.user) {
                    currentUser = data.user;
                    currentSessionToken = data.session.token;
                    localStorage.setItem('neon_auth_user', JSON.stringify(currentUser));
                    localStorage.setItem('neon_auth_token', currentSessionToken);
                    toggleModal(false);
                    updateAuthUI();
                } else {
                    throw new Error('Invalid response structure from authentication server.');
                }
            } catch (err) {
                authErrorMsg.style.display = 'block';
                authErrorMsg.className = 'auth-error-message';
                authErrorMsg.textContent = err.message;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        });
    }

    // Handle Sign Out
    async function signOut() {
        if (!currentUser) return;
        
        try {
            await fetch(`${authBaseUrl}/sign-out`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentSessionToken}`
                }
            });
        } catch (err) {
            console.error('Sign out API error:', err);
        } finally {
            currentUser = null;
            currentSessionToken = null;
            localStorage.removeItem('neon_auth_user');
            localStorage.removeItem('neon_auth_token');
            updateAuthUI();
        }
    }

    // Save Custom Blend to Postgres Database
    if (saveBlendBtn) {
        saveBlendBtn.addEventListener('click', async () => {
            if (!currentUser) {
                // Not logged in -> trigger login
                toggleModal(true);
                return;
            }

            saveBlendStatus.style.display = 'block';
            saveBlendStatus.style.color = '#fff';
            saveBlendStatus.textContent = 'Saving custom blend to database...';
            saveBlendBtn.disabled = true;

            const drink = selectedDrink;
            const infusion = selectedInfusionText;
            const email = currentUser.email;

            try {
                const res = await fetch('/api/save-blend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, drink, infusion })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to save blend.');
                }

                saveBlendStatus.style.color = 'var(--accent-primary)';
                saveBlendStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Saved successfully!';
                
                // Refresh list
                fetchSavedBlends();

                setTimeout(() => {
                    saveBlendStatus.style.display = 'none';
                }, 3000);
            } catch (err) {
                saveBlendStatus.style.color = '#ef5350';
                saveBlendStatus.textContent = `Error: ${err.message}`;
            } finally {
                saveBlendBtn.disabled = false;
            }
        });
    }

    // Fetch Saved Blends for User from Postgres
    async function fetchSavedBlends() {
        if (!currentUser) return;

        try {
            const res = await fetch(`/api/get-blends?email=${encodeURIComponent(currentUser.email)}`);
            if (!res.ok) {
                throw new Error('Failed to retrieve blends.');
            }

            const blends = await res.json();
            
            savedBlendsList.innerHTML = '';
            if (blends.length === 0) {
                savedBlendsList.innerHTML = '<p style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 1rem;">No blends saved yet. Mix and save your first creation above!</p>';
                return;
            }

            blends.forEach(blend => {
                const card = document.createElement('div');
                card.className = 'saved-blend-card';
                
                // Format date
                const date = new Date(blend.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                card.innerHTML = `
                    <h4>${blend.drink}</h4>
                    <p>Infusion: <strong style="color: var(--accent-secondary);">${blend.infusion}</strong></p>
                    <div class="saved-blend-date">${date}</div>
                `;
                savedBlendsList.appendChild(card);
            });
        } catch (err) {
            savedBlendsList.innerHTML = `<p style="grid-column: span 3; text-align: center; color: #ef5350; padding: 1rem;">Database error: ${err.message}</p>`;
        }
    }

    // Initialize Auth UI state
    updateAuthUI();
});

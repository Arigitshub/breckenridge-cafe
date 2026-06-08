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
                applyMenuFilter();
            }
        });
    });

    // 3b. MENU SEARCH & FILTER SYSTEM
    const menuSearch = document.getElementById('menu-search');
    const filterTagButtons = document.querySelectorAll('.filter-tag-btn');

    function applyMenuFilter() {
        const searchText = menuSearch ? menuSearch.value.toLowerCase().trim() : '';
        const activeFilterBtn = document.querySelector('.filter-tag-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
        
        // Find all items within the active menu tab
        const activeTab = document.querySelector('.menu-content.active');
        if (!activeTab) return;
        
        const items = activeTab.querySelectorAll('.menu-item, .menu-featured-card, .shop-card');
        
        items.forEach(item => {
            let title = '';
            let desc = '';
            
            if (item.classList.contains('menu-item')) {
                const titleEl = item.querySelector('.menu-item-title');
                const descEl = item.querySelector('.menu-item-desc');
                title = titleEl ? titleEl.textContent.toLowerCase() : '';
                desc = descEl ? descEl.textContent.toLowerCase() : '';
            } else if (item.classList.contains('menu-featured-card')) {
                const titleEl = item.querySelector('.featured-meta h3');
                const descEl = item.querySelector('.featured-meta p');
                title = titleEl ? titleEl.textContent.toLowerCase() : '';
                desc = descEl ? descEl.textContent.toLowerCase() : '';
            } else if (item.classList.contains('shop-card')) {
                const titleEl = item.querySelector('h3');
                const descEl = item.querySelector('.shop-card-desc');
                title = titleEl ? titleEl.textContent.toLowerCase() : '';
                desc = descEl ? descEl.textContent.toLowerCase() : '';
            }
            
            // Check tag match
            let matchesTag = false;
            if (activeFilter === 'all') {
                matchesTag = true;
            } else {
                const tagsAttr = item.getAttribute('data-tags');
                if (tagsAttr) {
                    const tags = tagsAttr.split(' ');
                    matchesTag = tags.includes(activeFilter);
                } else {
                    // Fallback for elements without explicit data-tags (like shop items): check if name or description contains the tag keyword
                    const searchKeywords = {
                        'organic': ['organic'],
                        'vegan': ['vegan'],
                        'gf': ['gluten-free', 'gf', 'gluten free']
                    };
                    const keywords = searchKeywords[activeFilter] || [activeFilter];
                    matchesTag = keywords.some(kw => title.includes(kw) || desc.includes(kw));
                }
            }
            
            // Check text match
            const matchesSearch = title.includes(searchText) || desc.includes(searchText);
            
            // Apply display
            if (matchesTag && matchesSearch) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (menuSearch) {
        menuSearch.addEventListener('input', applyMenuFilter);
    }

    filterTagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterTagButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyMenuFilter();
        });
    });

    // 3c. SHOP NAVIGATION LINK AUTO-SWITCH
    const shopLinks = document.querySelectorAll('a[href="#shop"]');
    shopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
            const shopTabBtn = document.querySelector('.menu-tab-btn[data-tab="shop"]');
            if (shopTabBtn) {
                shopTabBtn.click();
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
            if (btn.classList.contains('active')) return;

            drinkButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedDrink = btn.querySelector('span').textContent;
            selectedDrinkColor = btn.dataset.color;
            
            // Pouring/Draining transition effect
            const cup = document.querySelector('.cup');
            const stream = document.getElementById('pouring-stream');
            
            if (stream) {
                stream.style.setProperty('--stream-color', selectedDrinkColor);
                stream.classList.remove('active');
                void stream.offsetWidth; // force layout reflow
                stream.classList.add('active');
            }
            
            cup.classList.add('pouring');

            // Button micro-reaction feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = '', 100);

            setTimeout(() => {
                updateInfusionLiquid();
                cup.classList.remove('pouring');
                
                // Toggle Steam vs Droplets based on beverage temperature
                const steam = document.getElementById('steam-container');
                const droplets = document.getElementById('droplets-container');
                
                if (selectedDrink === 'Cold Brew') {
                    if (steam) steam.classList.remove('active');
                    if (droplets) droplets.classList.add('active');
                } else {
                    if (steam) steam.classList.add('active');
                    if (droplets) droplets.classList.remove('active');
                }
            }, 300);
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

    // URL Query Loader - restore custom shared blends on DOM load
    function loadBlendFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const drinkParam = urlParams.get('drink');
        const infusionParam = urlParams.get('infusion');

        if (drinkParam) {
            const drinkBtn = document.querySelector(`.drink-btn[data-drink="${drinkParam}"]`);
            if (drinkBtn) {
                drinkBtn.click();
            }
        }
        if (infusionParam) {
            const infusionCard = document.querySelector(`.infusion-card[data-level="${infusionParam}"]`);
            if (infusionCard) {
                infusionCard.click();
            }
        }
    }
    loadBlendFromURL();

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
                showToast('Inquiry sent successfully!', 'success');
            }, 800);
        });
    }

    // 5b. NEWSLETTER FORM SUBMISSION
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput ? emailInput.value : '';
            
            showToast(`Thank you! Subscribed ${email} to our newsletter.`, 'success');
            if (emailInput) {
                emailInput.value = '';
            }
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

    // Set dynamic api base url depending on host (Vercel vs static hosts like Surge/localhost)
    const isVercel = window.location.hostname.includes('vercel.app');
    const authBaseUrl = isVercel ? '/api' : 'https://breckenridge-cafe.vercel.app/api';

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
            signinFormContainer.classList.add('inactive');
            signinFormContainer.classList.remove('active');
            signupFormContainer.classList.add('active');
            signupFormContainer.classList.remove('inactive');
            authErrorMsg.style.display = 'none';
        });
    }

    if (switchToSignin) {
        switchToSignin.addEventListener('click', (e) => {
            e.preventDefault();
            signupFormContainer.classList.add('inactive');
            signupFormContainer.classList.remove('active');
            signinFormContainer.classList.add('active');
            signinFormContainer.classList.remove('inactive');
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
                const res = await fetch(`${authBaseUrl}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || data.message || 'Signup failed');
                }

                // If signup logs us in automatically
                if (data.session && data.user) {
                    currentUser = data.user;
                    currentSessionToken = data.session.token;
                    localStorage.setItem('neon_auth_user', JSON.stringify(currentUser));
                    localStorage.setItem('neon_auth_token', currentSessionToken);
                    toggleModal(false);
                    updateAuthUI();
                    showToast(`Welcome, ${currentUser.name || currentUser.email}! Account created.`, 'success');
                } else {
                    // Switch to sign in form
                    signupFormContainer.classList.add('inactive');
                    signupFormContainer.classList.remove('active');
                    signinFormContainer.classList.add('active');
                    signinFormContainer.classList.remove('inactive');
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
                const res = await fetch(`${authBaseUrl}/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || data.message || 'Invalid email or password');
                }

                if (data.session && data.user) {
                    currentUser = data.user;
                    currentSessionToken = data.session.token;
                    localStorage.setItem('neon_auth_user', JSON.stringify(currentUser));
                    localStorage.setItem('neon_auth_token', currentSessionToken);
                    toggleModal(false);
                    updateAuthUI();
                    showToast(`Welcome back, ${currentUser.name}!`, 'success');
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
            await fetch(`${authBaseUrl}/signout`, {
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
            showToast('Signed out successfully', 'info');
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
                const res = await fetch(`${authBaseUrl}/save-blend`, {
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
                showToast('Infusion blend saved to database!', 'success');

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

    // Share Custom Blend via clipboard URL
    const shareBlendBtn = document.getElementById('share-blend-btn');
    if (shareBlendBtn) {
        shareBlendBtn.addEventListener('click', () => {
            const activeDrinkBtn = document.querySelector('.drink-btn.active');
            const activeInfusionCard = document.querySelector('.infusion-card.active');
            
            const drinkVal = activeDrinkBtn ? activeDrinkBtn.dataset.drink : '';
            const infusionVal = activeInfusionCard ? activeInfusionCard.dataset.level : '';
            
            const shareUrl = `${window.location.origin}${window.location.pathname}?drink=${encodeURIComponent(drinkVal)}&infusion=${encodeURIComponent(infusionVal)}`;
            
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('Share link copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy share link: ', err);
                showToast('Failed to copy link. Please copy from URL bar.', 'error');
            });
        });
    }

    // Fetch Saved Blends for User from Postgres
    async function fetchSavedBlends() {
        if (!currentUser) return;

        try {
            const res = await fetch(`${authBaseUrl}/get-blends?email=${encodeURIComponent(currentUser.email)}`);
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

    // --- TOAST NOTIFICATION SYSTEM ---
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fa-circle-check';
        if (type === 'error') iconClass = 'fa-circle-xmark';
        if (type === 'info') iconClass = 'fa-circle-info';

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Animate entrance
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    }

    // --- TESTIMONIAL SLIDER ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.test-dot');
    const prevBtn = document.querySelector('.test-control-btn.prev');
    const nextBtn = document.querySelector('.test-control-btn.next');
    let activeTestimonialIndex = 0;

    function showTestimonial(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        activeTestimonialIndex = (index + slides.length) % slides.length;
        
        slides[activeTestimonialIndex].style.display = 'block';
        slides[activeTestimonialIndex].offsetHeight; // Trigger reflow for animation
        slides[activeTestimonialIndex].classList.add('active');
        dots[activeTestimonialIndex].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showTestimonial(activeTestimonialIndex - 1));
        nextBtn.addEventListener('click', () => showTestimonial(activeTestimonialIndex + 1));
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showTestimonial(parseInt(dot.dataset.index));
            });
        });
        
        // Autoplay testimonials every 7 seconds
        setInterval(() => {
            showTestimonial(activeTestimonialIndex + 1);
        }, 7000);
    }

    // --- SHOPPING CART SYSTEM ---
    let cart = JSON.parse(localStorage.getItem('bg_cafe_cart')) || [];
    
    const cartNavBtn = document.getElementById('cart-nav-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalVal = document.getElementById('cart-subtotal-val');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    function toggleCart(open = true) {
        if (!cartDrawer) return;
        if (open) {
            cartDrawer.classList.add('active');
            if (cartOverlay) cartOverlay.classList.add('active');
        } else {
            cartDrawer.classList.remove('active');
            if (cartOverlay) cartOverlay.classList.remove('active');
        }
    }

    if (cartNavBtn) {
        cartNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart(true);
        });
    }

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => toggleCart(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

    function saveCart() {
        localStorage.setItem('bg_cafe_cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        
        let totalCount = 0;
        let subtotal = 0.0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-msg"><i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; display: block; margin-bottom: 1rem; color: var(--text-muted);"></i>Your cart is currently empty.</p>';
        } else {
            cart.forEach((item, index) => {
                totalCount += item.qty;
                subtotal += item.price * item.qty;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                
                let imgHtml = '';
                if (item.imageSrc) {
                    imgHtml = `<img src="${item.imageSrc}" alt="${item.name}" class="cart-item-img">`;
                } else {
                    const isCbg = item.name.toLowerCase().includes('cbg');
                    const isBalm = item.name.toLowerCase().includes('balm');
                    const colorClass = isCbg ? 'liquid-cbg' : (isBalm ? 'liquid-balm' : 'liquid-cbd');
                    const labelText = isCbg ? 'CBG' : (isBalm ? 'BALM' : 'CBD');
                    imgHtml = `
                        <div class="bottle-mockup" style="transform: scale(0.45); margin: 0 auto; height: 75px; width: 45px;">
                            <div class="bottle-body" style="height: 50px; width: 45px;">
                                <div class="bottle-label" style="font-size: 0.5rem; padding: 1px 4px;">${labelText}</div>
                                <div class="bottle-liquid ${colorClass}"></div>
                            </div>
                        </div>
                    `;
                }

                itemDiv.innerHTML = `
                    <div class="cart-item-img-container">
                        ${imgHtml}
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="cart-qty-selector">
                                <button class="cart-qty-btn minus" data-index="${index}">&minus;</button>
                                <span class="cart-qty-val">${item.qty}</span>
                                <button class="cart-qty-btn plus" data-index="${index}">&plus;</button>
                            </div>
                            <button class="cart-remove-btn" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        if (cartCount) {
            cartCount.textContent = totalCount;
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => cartCount.style.transform = '', 200);
        }
        
        if (cartSubtotalVal) {
            cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
        }

        const plusBtns = cartItemsContainer.querySelectorAll('.cart-qty-btn.plus');
        const minusBtns = cartItemsContainer.querySelectorAll('.cart-qty-btn.minus');
        const removeBtns = cartItemsContainer.querySelectorAll('.cart-remove-btn');

        plusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                cart[index].qty += 1;
                saveCart();
            });
        });

        minusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                if (cart[index].qty > 1) {
                    cart[index].qty -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
            });
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                const name = cart[index].name;
                cart.splice(index, 1);
                saveCart();
                showToast(`Removed ${name} from cart`, 'info');
            });
        });
    }

    const shopCards = document.querySelectorAll('.shop-card');
    shopCards.forEach(card => {
        const addBtn = card.querySelector('.btn-shop-add');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const name = card.querySelector('h3').textContent;
                const priceText = card.querySelector('.shop-price').textContent;
                const price = parseFloat(priceText.replace('$', ''));
                
                const imgEl = card.querySelector('.shop-product-img');
                const imageSrc = imgEl ? imgEl.getAttribute('src') : null;

                const existingIdx = cart.findIndex(item => item.name === name);
                if (existingIdx > -1) {
                    cart[existingIdx].qty += 1;
                } else {
                    cart.push({
                        name,
                        price,
                        imageSrc,
                        qty: 1
                    });
                }

                saveCart();
                toggleCart(true);
                showToast(`Added ${name} to cart!`, 'success');
            });
        }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty!', 'error');
                return;
            }
            showToast('Thank you! Simulated checkout completed.', 'success');
            cart = [];
            saveCart();
            toggleCart(false);
        });
    }

    // Initialize cart render
    renderCart();
});

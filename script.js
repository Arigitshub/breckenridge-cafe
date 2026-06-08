document.addEventListener('DOMContentLoaded', () => {
    // 1. HEADER SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
});

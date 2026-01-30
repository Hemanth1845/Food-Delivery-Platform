document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (authButtons) {
                authButtons.classList.toggle('active');
            }
        });
    }

    // Add to cart functionality
    // Cart Logic
    const CartManager = {
        getCartKey: function () {
            const user = localStorage.getItem('username');
            return user ? `cart_${user}` : 'cart_guest';
        },
        getCart: function () {
            const key = this.getCartKey();
            return JSON.parse(localStorage.getItem(key) || '[]');
        },
        saveCart: function (cart) {
            const key = this.getCartKey();
            localStorage.setItem(key, JSON.stringify(cart));
            this.updateCartCount();
        },
        addItem: function (product) {
            let cart = this.getCart();
            let existingItem = cart.find(item => item.name === product.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            this.saveCart(cart);
            this.updateCartCount();
            return true; // Success
        },
        removeItem: function (index) {
            let cart = this.getCart();
            cart.splice(index, 1);
            this.saveCart(cart);
        },
        updateQuantity: function (index, delta) {
            let cart = this.getCart();
            if (cart[index]) {
                cart[index].quantity += delta;
                if (cart[index].quantity < 1) cart[index].quantity = 1;
                this.saveCart(cart);
            }
        },
        updateCartCount: function () {
            const cart = this.getCart();
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountElements = document.querySelectorAll('.cart-count');
            cartCountElements.forEach(el => el.textContent = totalCount);
        },
        init: function () {
            this.updateCartCount();
        }
    };

    // Expose CartManager to global scope
    window.CartManager = CartManager;

    // Initialize Cart
    CartManager.init();

    // Convert Global Add to Cart Buttons (static ones if any) to use manager
    // Note: Dynamic buttons in menu.html/products.html will need to call CartManager directly or re-bind.
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        // Prevent double binding if we handle this in specific page scripts
        // But for static pages (index.html recommendations), we need this.
        button.addEventListener('click', () => {
            // Get product info
            const dishCard = button.closest('.dish-card');
            if (dishCard) {
                const dishName = dishCard.querySelector('h3').textContent;
                const priceText = dishCard.querySelector('.price').textContent.replace('$', '');
                const price = parseFloat(priceText);
                const image = dishCard.querySelector('img').src;

                CartManager.addItem({
                    name: dishName,
                    price: price,
                    image: image
                });

                showNotification(`${dishName} added to cart!`);
            }
        });
    });

    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;

        document.body.appendChild(notification);

        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = 'var(--border-radius)';
        notification.style.boxShadow = 'var(--box-shadow)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '10px';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';

            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .dish-card, .stat-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .dish-card, .stat-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
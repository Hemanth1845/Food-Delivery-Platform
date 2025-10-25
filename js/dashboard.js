document.addEventListener('DOMContentLoaded', function() {
    // Set user name
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        // In a real application, this would come from a database or session
        const userName = 'John Doe';
        userNameElement.textContent = userName;
    }
    
    // Reorder functionality
    const reorderButtons = document.querySelectorAll('.btn-small');
    
    reorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderRow = this.closest('tr');
            const orderId = orderRow.querySelector('td:first-child').textContent;
            const orderItems = orderRow.querySelector('td:nth-child(3)').textContent;
            
            // Show notification
            showNotification(`Reordering ${orderItems} (${orderId})`);
        });
    });
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <p>${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
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
    
    // Update cart count
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        // In a real application, this would come from a database or session
        const cartCount = 3;
        cartCountElement.textContent = cartCount;
    }
});
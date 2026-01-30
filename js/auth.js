document.addEventListener('DOMContentLoaded', function () {
    // Tab switching for login page
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;

                // Remove active class from all tabs and forms
                tabBtns.forEach(b => b.classList.remove('active'));
                authForms.forEach(form => form.classList.remove('active'));

                // Add active class to clicked tab and corresponding form
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordField = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');

            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form validation for registration
    const registerForm = document.querySelector('#user-register form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match!');
            }
        });
    }
    // Login logic to save username to localStorage
    const userLoginForm = document.querySelector('#user-login form');
    const adminLoginForm = document.querySelector('#admin-login form');

    if (userLoginForm) {
        userLoginForm.addEventListener('submit', function (e) {
            // Prevent default just to grab values, then allow submit or handle redirect manually
            // But since we have action="user-dashboard.html", we need to be careful.
            // LocalStorage works synchronously, so we can save and let it proceed.
            const username = document.getElementById('user-username').value;
            if (username) {
                localStorage.setItem('currentUser', username);
                localStorage.setItem('userRole', 'user');
            }
        });
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function (e) {
            const username = document.getElementById('admin-username').value;
            if (username) {
                localStorage.setItem('currentUser', username);
                localStorage.setItem('userRole', 'admin');
            }
        });
    }
});
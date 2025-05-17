document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra trạng thái đăng nhập
    checkLoginStatus();

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Handle form submission
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.querySelector('#username').value.trim();
            const password = document.querySelector('#password').value.trim();
            const rememberMe = document.querySelector('input[name="remember"]').checked;

            // Validate inputs
            if (!username || !password) {
                showError('Vui lòng điền đầy đủ thông tin');
                return;
            }

            // Get users from localStorage
            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
            let storedUser = users[username];

            if (storedUser && storedUser.password === password) {
                // Store current user in localStorage
                const currentUser = {
                    username: username,
                    email: storedUser.email,
                    remember: rememberMe,
                    lastLogin: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Update user's last login time
                users[username].lastLogin = new Date().toISOString();
                localStorage.setItem('users', JSON.stringify(users));

                // Show success message
                showSuccess('Đăng nhập thành công! Đang chuyển hướng...');
                
                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showError('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        });
    }
});

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
    }
}

// Helper functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorDiv, form.firstChild);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    form.insertBefore(successDiv, form.firstChild);
}

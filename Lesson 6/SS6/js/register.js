document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility
    const togglePasswords = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    togglePasswords.forEach((toggle, index) => {
        toggle.addEventListener('click', () => {
            const type = passwordInputs[index].getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInputs[index].setAttribute('type', type);
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
    });

    // Handle form submission
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.querySelector('#username').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const confirmPassword = document.querySelector('#confirm-password').value.trim();

            // Validate inputs
            if (!username || !email || !password || !confirmPassword) {
                showError('Vui lòng điền đầy đủ thông tin');
                return;
            }

            // Username validation
            if (username.length < 6) {
                showError('Tên đăng nhập phải có ít nhất 6 ký tự');
                return;
            }

            if (password !== confirmPassword) {
                showError('Mật khẩu xác nhận không khớp');
                return;
            }

            // Password validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                showError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Email không hợp lệ');
                return;
            }

            // Check if username already exists
            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
            if (users[username]) {
                showError('Tên đăng nhập đã tồn tại');
                return;
            }

            // Check if email already exists
            for (let user in users) {
                if (users[user].email === email) {
                    showError('Email đã được sử dụng');
                    return;
                }
            }

            // Create new user
            const newUser = {
                username: username,
                email: email,
                password: password,
                createdAt: new Date().toISOString(),
                lastLogin: null
            };

            // Save user to localStorage
            users[username] = newUser;
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            showSuccess('Đăng ký thành công! Đang chuyển hướng...');
            
            // Redirect to login page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});

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

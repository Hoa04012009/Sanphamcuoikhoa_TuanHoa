import config from './config.js';
import { isLoggedIn } from './auth.js';

// Validate input
function validateInput(username, email, password, confirmPassword) {
  const errors = [];

  // Validate username
  if (!username) {
    errors.push('Vui lòng nhập tên đăng nhập');
  } else if (!config.validation.username.pattern.test(username)) {
    errors.push(config.validation.username.message);
  }

  // Validate email
  if (!email) {
    errors.push('Vui lòng nhập email');
  } else if (!config.validation.email.pattern.test(email)) {
    errors.push(config.validation.email.message);
  }

  // Validate password
  if (!password) {
    errors.push('Vui lòng nhập mật khẩu');
  } else {
    if (!config.validation.password.pattern.test(password)) {
      errors.push(config.validation.password.message);
    }
    if (password.length < config.validation.password.minLength) {
      errors.push(`Mật khẩu phải có ít nhất ${config.validation.password.minLength} ký tự`);
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất một ký tự thường');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất một ký tự hoa');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất một chữ số');
    }
  }

  // Validate confirm password
  if (!confirmPassword) {
    errors.push('Vui lòng xác nhận mật khẩu');
  } else if (password !== confirmPassword) {
    errors.push('Mật khẩu xác nhận không khớp');
  }

  return errors;
}

// Handle register
const register = (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();

  // Validate input
  const errors = validateInput(username, email, password, confirmPassword);
  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(config.storage.users)) || {};

    // Check if username already exists
    if (users[username]) {
      alert(config.messages.errors.usernameExists);
      return;
    }

    // Check if email already exists
    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) {
      alert(config.messages.errors.emailExists);
      return;
    }

    // Create new user
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    // Save user
    users[username] = newUser;
    localStorage.setItem(config.storage.users, JSON.stringify(users));

    // Show success message
    alert(config.messages.success.register);

    // Redirect to login page
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Register error:', error);
    if (error.name === 'NetworkError') {
      alert(config.messages.errors.networkError);
    } else {
      alert(config.messages.errors.general);
    }
  }
};

// Add event listener to register form
document.querySelector('#signup').addEventListener('click', register);

// Add event listener for Enter key
document.querySelector('#confirm-password').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    register(event);
  }
});

// Check if user is already logged in
window.addEventListener('load', () => {
  if (isLoggedIn()) {
    window.location.href = 'index.html';
  }
});
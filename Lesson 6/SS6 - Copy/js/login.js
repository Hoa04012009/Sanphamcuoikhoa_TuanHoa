import config from './config.js';
import { isLoggedIn } from './auth.js';

// Validate input
function validateInput(username, password) {
  const errors = [];

  if (!username) {
    errors.push('Vui lòng nhập tên đăng nhập');
  } else if (!config.validation.username.pattern.test(username)) {
    errors.push(config.validation.username.message);
  }

  if (!password) {
    errors.push('Vui lòng nhập mật khẩu');
  } else if (!config.validation.password.pattern.test(password)) {
    errors.push(config.validation.password.message);
  }

  return errors;
}

// Handle login
const login = (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Validate input
  const errors = validateInput(username, password);
  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(config.storage.users)) || {};
    const storedUser = users[username];

    if (!storedUser) {
      alert(config.messages.errors.invalidCredentials);
      return;
    }

    if (storedUser.password !== password) {
      alert(config.messages.errors.invalidCredentials);
      return;
    }

    // Create session
    const session = {
      username: username,
      loginTime: new Date().toISOString(),
      token: Math.random().toString(36).substring(2) // Simple token generation
    };

    // Save session
    localStorage.setItem(config.storage.session, JSON.stringify(session));

    // Show success message
    alert(config.messages.success.login);

    // Redirect to home page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Login error:', error);
    alert(config.messages.errors.general);
  }
};

// Add event listener to login form
document.querySelector('#signin').addEventListener('click', login);

// Add event listener for Enter key
document.querySelector('#password').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    login(event);
  }
});

// Check if user is already logged in
window.addEventListener('load', () => {
  if (isLoggedIn()) {
    window.location.href = 'index.html';
  }
});
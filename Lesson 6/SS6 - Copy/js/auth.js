import config from './config.js';

// Check if user is logged in
export function isLoggedIn() {
  const session = JSON.parse(localStorage.getItem(config.storage.session));
  return !!session;
}

// Get current user info
export function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem(config.storage.session));
  if (!session) return null;

  const users = JSON.parse(localStorage.getItem(config.storage.users)) || {};
  return users[session.username];
}

// Update auth buttons based on login status
export function updateAuthButtons() {
  const authButtons = document.querySelector('.auth-buttons');
  if (!authButtons) return;

  if (isLoggedIn()) {
    const user = getCurrentUser();
    authButtons.innerHTML = `
      <div class="user-info">
        <span>Xin chào, ${user.username}</span>
      </div>
      <button class="logout-btn" id="logoutBtn">
        <i class="fa-solid fa-sign-out-alt"></i>
        Đăng xuất
      </button>
    `;

    // Add logout event listener
    document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
    authButtons.innerHTML = `
      <a href="./login.html" class="login-btn">Đăng nhập</a>
      <a href="./register.html" class="register-btn">Đăng ký</a>
    `;
  }
}

// Handle logout
export function logout() {
  localStorage.removeItem(config.storage.session);
  window.location.href = 'index.html';
}

// Initialize auth state
export function initAuth() {
  updateAuthButtons();
} 
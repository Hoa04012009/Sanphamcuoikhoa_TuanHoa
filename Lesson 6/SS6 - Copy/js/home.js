import products from './data.js';
import config from './config.js';

// Loading Animation
window.addEventListener('load', () => {
  const backdrop = document.querySelector('.backdrop');
  backdrop.style.opacity = '0';
  setTimeout(() => {
    backdrop.style.display = 'none';
  }, 500);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Render Products
function renderProducts(category = 'all') {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = '';

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.category = product.category;

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <div class="product-actions">
          <button class="quick-view" data-product="${product.id}">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="add-to-wishlist">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-options">
          <div class="size-options">
            ${product.sizes.map(size => `
              <button class="size-btn ${size === 'M' ? 'active' : ''}" data-size="${size}">${size}</button>
            `).join('')}
          </div>
          <div class="ice-options">
            ${product.iceOptions.map(ice => `
              <button class="ice-btn ${ice === 50 ? 'active' : ''}" data-ice="${ice}">${ice}%</button>
            `).join('')}
          </div>
        </div>
        <div class="product-bottom">
          <div class="price-container">
            <span class="price">${product.price.toLocaleString()}đ</span>
            ${product.originalPrice ? `
              <span class="original-price">${product.originalPrice.toLocaleString()}đ</span>
            ` : ''}
          </div>
          <button class="add-to-cart" data-product="${product.id}">
            <i class="fa-solid fa-cart-plus"></i>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;

    productGrid.appendChild(productCard);
  });

  // Reattach event listeners
  attachProductEventListeners();
}

// Category Tabs
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

// Product Options
function attachProductEventListeners() {
  const sizeBtns = document.querySelectorAll('.size-btn');
  const iceBtns = document.querySelectorAll('.ice-btn');
  const quickViewBtns = document.querySelectorAll('.quick-view');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.size-options');
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  iceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.ice-options');
      parent.querySelectorAll('.ice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.product;
      const product = products.find(p => p.id === productId);
      const productCard = btn.closest('.product-card');

      const modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="quick-view-content">
          <div class="quick-view-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="quick-view-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="quick-view-options">
              <div class="size-options">
                <h4>Size</h4>
                <div class="options">
                  ${product.sizes.map(size => `
                    <button class="size-btn ${size === 'M' ? 'active' : ''}" data-size="${size}">${size}</button>
                  `).join('')}
                </div>
              </div>
              <div class="ice-options">
                <h4>Đá</h4>
                <div class="options">
                  ${product.iceOptions.map(ice => `
                    <button class="ice-btn ${ice === 50 ? 'active' : ''}" data-ice="${ice}">${ice}%</button>
                  `).join('')}
                </div>
              </div>
            </div>
            <div class="quick-view-price">
              <span class="price">${product.price.toLocaleString()}đ</span>
              ${product.originalPrice ? `
                <span class="original-price">${product.originalPrice.toLocaleString()}đ</span>
              ` : ''}
            </div>
            <button class="add-to-cart" data-product="${product.id}">
              <i class="fa-solid fa-cart-plus"></i>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      `;

      document.getElementById('quickViewModal').classList.add('active');
    });
  });

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.product;
      const product = products.find(p => p.id === productId);
      const productCard = btn.closest('.product-card');
      const size = productCard.querySelector('.size-btn.active').dataset.size;
      const ice = productCard.querySelector('.ice-btn.active').dataset.ice;

      addToCart(productId, product.name, product.price, size, ice);
    });
  });
}

// Quick View Modal
const quickViewModal = document.getElementById('quickViewModal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
  quickViewModal.classList.remove('active');
});

quickViewModal.addEventListener('click', (e) => {
  if (e.target === quickViewModal) {
    quickViewModal.classList.remove('active');
  }
});

// Cart Functionality
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

let cart = JSON.parse(localStorage.getItem(config.storage.cart)) || [];

// Open/Close Cart
cartIcon.addEventListener('click', () => {
  cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
});

// Add to Cart
function addToCart(productId, name, price, size, ice) {
  const existingItem = cart.find(item => 
    item.id === productId && 
    item.size === size && 
    item.ice === ice
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name,
      price,
      size,
      ice,
      quantity: 1
    });
  }

  updateCart();
  cartSidebar.classList.add('active');
}

// Update Cart
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>Size: ${item.size} | Đá: ${item.ice}%</p>
          <span class="item-price">${item.price.toLocaleString()}đ</span>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-index="${index}">+</button>
        </div>
        <button class="remove-item" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartCount.textContent = count;
  totalAmount.textContent = `${total.toLocaleString()}đ`;

  // Save cart to localStorage
  localStorage.setItem(config.storage.cart, JSON.stringify(cart));

  // Add event listeners to quantity buttons
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      if (btn.classList.contains('plus')) {
        cart[index].quantity += 1;
      } else {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        }
      }
      updateCart();
    });
  });

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Checkout
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert(config.messages.errors.cartEmpty);
    return;
  }
  alert(config.messages.success.orderPlaced);
  cart = [];
  updateCart();
  cartSidebar.classList.remove('active');
});

// Initial render
renderProducts(); 
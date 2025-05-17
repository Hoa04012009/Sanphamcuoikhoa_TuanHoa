// Configuration
const config = {
  // API endpoints
  api: {
    baseUrl: 'https://api.pocopoco.com',
    endpoints: {
      products: '/products',
      categories: '/categories',
      orders: '/orders',
      users: '/users'
    }
  },

  // Product categories
  categories: {
    trasua: 'Trà sữa',
    tratraicay: 'Trà trái cây',
    doanvat: 'Đồ ăn vặt',
    topping: 'Topping'
  },

  // Product sizes
  sizes: {
    M: {
      name: 'Medium',
      priceMultiplier: 1
    },
    L: {
      name: 'Large',
      priceMultiplier: 1.3
    }
  },

  // Ice options
  iceOptions: {
    50: '50%',
    70: '70%',
    100: '100%'
  },

  // Cart settings
  cart: {
    maxItems: 20,
    storageKey: 'pocopoco_cart'
  },

  // Local storage keys
  storage: {
    cart: 'pocopoco_cart',
    user: 'pocopoco_user',
    token: 'pocopoco_token'
  },

  // Validation rules
  validation: {
    username: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    password: {
      minLength: 6,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      pattern: /^[0-9]{10}$/
    }
  },

  // Error messages
  messages: {
    errors: {
      general: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
      invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không chính xác',
      usernameExists: 'Tên đăng nhập đã tồn tại',
      emailExists: 'Email đã được sử dụng',
      invalidUsername: 'Tên đăng nhập không hợp lệ',
      invalidEmail: 'Email không hợp lệ',
      invalidPassword: 'Mật khẩu không hợp lệ',
      passwordMismatch: 'Mật khẩu xác nhận không khớp',
      requiredFields: 'Vui lòng điền đầy đủ thông tin',
      sessionExpired: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại',
      unauthorized: 'Vui lòng đăng nhập để tiếp tục',
      networkError: 'Lỗi kết nối. Vui lòng kiểm tra lại mạng',
      serverError: 'Lỗi máy chủ. Vui lòng thử lại sau'
    },
    success: {
      login: 'Đăng nhập thành công',
      register: 'Đăng ký thành công',
      logout: 'Đăng xuất thành công',
      update: 'Cập nhật thành công',
      delete: 'Xóa thành công'
    }
  },

  // Animation durations
  animations: {
    fadeIn: 300,
    fadeOut: 300,
    slideIn: 400,
    slideOut: 400
  },

  // Breakpoints for responsive design
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1280
  }
};

export default config; 
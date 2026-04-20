Page({
  data: {
    activeCategory: 0,
    isSwitching: false,
    cartPulse: false,
    categories: [
      { id: 0, name: "精选推荐", desc: "本周热销与高颜值之选" },
      { id: 1, name: "数码潮品", desc: "性能与设计兼具" },
      { id: 2, name: "家居香氛", desc: "提升生活氛围感" },
      { id: 3, name: "轻食饮品", desc: "低负担也有好口感" }
    ],
    products: [
      {
        id: 101,
        categoryId: 0,
        name: "Aurora 头戴耳机",
        desc: "沉浸式降噪体验，细腻声场更耐听",
        price: 699,
        tag: "人气爆款",
        rating: 4.9,
        color: "#6C7BFF",
        bg: "linear-gradient(135deg, #EEF1FF 0%, #F7F8FF 100%)",
        cartCount: 0
      },
      {
        id: 102,
        categoryId: 0,
        name: "Luna 智能香薰机",
        desc: "静音扩香，营造柔和松弛感空间",
        price: 299,
        tag: "氛围感",
        rating: 4.8,
        color: "#FF8E72",
        bg: "linear-gradient(135deg, #FFF1EB 0%, #FFF8F5 100%)",
        cartCount: 0
      },
      {
        id: 201,
        categoryId: 1,
        name: "Nebula 蓝牙音箱",
        desc: "环绕立体声，小巧便携随处开播",
        price: 459,
        tag: "新品",
        rating: 4.7,
        color: "#3DBDA7",
        bg: "linear-gradient(135deg, #E9FFFB 0%, #F5FFFD 100%)",
        cartCount: 0
      },
      {
        id: 202,
        categoryId: 1,
        name: "Pulse 磁吸充电宝",
        desc: "轻薄机身，外出续航不焦虑",
        price: 239,
        tag: "高复购",
        rating: 4.8,
        color: "#4B7BFF",
        bg: "linear-gradient(135deg, #EDF3FF 0%, #F8FAFF 100%)",
        cartCount: 0
      },
      {
        id: 301,
        categoryId: 2,
        name: "Cloud 云朵抱枕",
        desc: "柔软支撑，客厅卧室都很出片",
        price: 169,
        tag: "治愈系",
        rating: 4.9,
        color: "#FFB347",
        bg: "linear-gradient(135deg, #FFF5E7 0%, #FFFBF4 100%)",
        cartCount: 0
      },
      {
        id: 302,
        categoryId: 2,
        name: "Mori 木质托盘",
        desc: "简约纹理，为餐桌增加自然质感",
        price: 129,
        tag: "生活美学",
        rating: 4.6,
        color: "#8D6E63",
        bg: "linear-gradient(135deg, #F6EFEA 0%, #FBF8F5 100%)",
        cartCount: 0
      },
      {
        id: 401,
        categoryId: 3,
        name: "轻萃冷泡茶",
        desc: "清爽果香，低糖配方更轻盈",
        price: 59,
        tag: "夏日推荐",
        rating: 4.8,
        color: "#3AAE7A",
        bg: "linear-gradient(135deg, #EEFFF5 0%, #F8FFFB 100%)",
        cartCount: 0
      },
      {
        id: 402,
        categoryId: 3,
        name: "燕麦坚果杯",
        desc: "即食便捷，早餐下午茶都合适",
        price: 39,
        tag: "热卖",
        rating: 4.7,
        color: "#D58C52",
        bg: "linear-gradient(135deg, #FFF3EA 0%, #FFF9F4 100%)",
        cartCount: 0
      }
    ],
    bagCount: 0,
    bagTotalPrice: "0.00",
    showAddedToast: false,
    addedProductName: "",
    featuredCount: 8
  },

  onLoad() {
    this.updateSummary();
  },

  switchCategory(e) {
    const categoryId = Number(e.currentTarget.dataset.id);
    if (categoryId === this.data.activeCategory) {
      return;
    }

    this.setData({
      activeCategory: categoryId,
      isSwitching: false
    });
  },

  addToCart(e) {
    const productId = Number(e.currentTarget.dataset.id);
    const products = this.data.products.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          cartCount: item.cartCount + 1
        };
      }
      return item;
    });
    const currentProduct = products.find((item) => item.id === productId);

    this.setData(
      {
        products,
        showAddedToast: true,
        addedProductName: currentProduct ? currentProduct.name : "",
        cartPulse: true
      },
      () => {
        this.updateSummary();
      }
    );

    clearTimeout(this.toastTimer);
    clearTimeout(this.cartPulseTimer);

    this.toastTimer = setTimeout(() => {
      this.setData({
        showAddedToast: false
      });
    }, 1400);

    this.cartPulseTimer = setTimeout(() => {
      this.setData({
        cartPulse: false
      });
    }, 420);
  },

  decreaseCount(e) {
    const productId = Number(e.currentTarget.dataset.id);
    const products = this.data.products.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          cartCount: Math.max(0, item.cartCount - 1)
        };
      }
      return item;
    });

    this.setData(
      {
        products
      },
      () => {
        this.updateSummary();
      }
    );
  },

  increaseCount(e) {
    this.addToCart(e);
  },

  goRegister() {
    wx.navigateTo({
      url: "/pages/register/index"
    });
  },

  goLogin() {
    wx.navigateTo({
      url: "/pages/login/index"
    });
  },

  goProfile() {
    wx.navigateTo({
      url: "/pages/profile/index"
    });
  },

  updateSummary() {
    const bagCount = this.data.products.reduce((sum, item) => sum + item.cartCount, 0);
    const totalPrice = this.data.products.reduce((sum, item) => sum + item.cartCount * item.price, 0);

    this.setData({
      bagCount,
      bagTotalPrice: totalPrice.toFixed(2)
    });
  },

  onUnload() {
    clearTimeout(this.toastTimer);
    clearTimeout(this.cartPulseTimer);
  }
});

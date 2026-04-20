Page({
  data: {
    brand: "CareerCompass",
    currentField: "",
    showPassword: false,
    rememberLogin: true,
    isSubmitting: false,
    account: "",
    password: "",
    eyeState: "open",
    mascotMood: "idle"
  },

  onLoad() {
    this.startBlink();
  },

  onUnload() {
    clearInterval(this.blinkTimer);
  },

  startBlink() {
    this.blinkTimer = setInterval(() => {
      this.setData({
        eyeState: "closed"
      });

      setTimeout(() => {
        this.setData({
          eyeState: this.data.currentField === "password" && !this.data.showPassword ? "cover" : "open"
        });
      }, 180);
    }, 3200);
  },

  onFocusField(e) {
    const field = e.currentTarget.dataset.field;
    let eyeState = "open";
    let mascotMood = "focus";

    if (field === "password" && !this.data.showPassword) {
      eyeState = "cover";
      mascotMood = "shy";
    }

    this.setData({
      currentField: field,
      eyeState,
      mascotMood
    });
  },

  onBlurField() {
    this.setData({
      currentField: "",
      eyeState: "open",
      mascotMood: "idle"
    });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  togglePassword() {
    const nextShow = !this.data.showPassword;
    this.setData({
      showPassword: nextShow,
      eyeState: nextShow ? "open" : this.data.currentField === "password" ? "cover" : "open",
      mascotMood: nextShow ? "happy" : this.data.currentField === "password" ? "shy" : "idle"
    });
  },

  toggleRemember() {
    this.setData({
      rememberLogin: !this.data.rememberLogin
    });
  },

  submitLogin() {
    if (this.data.isSubmitting) return;

    const { account, password } = this.data;

    if (!account.trim()) {
      wx.showToast({
        title: "请输入邮箱或手机号",
        icon: "none"
      });
      return;
    }

    if (!password.trim()) {
      wx.showToast({
        title: "请输入密码",
        icon: "none"
      });
      return;
    }

    this.setData({
      isSubmitting: true,
      mascotMood: "happy"
    });

    setTimeout(() => {
      this.setData({
        isSubmitting: false
      });
      wx.showToast({
        title: "登录成功",
        icon: "success"
      });
    }, 1000);
  },

  goRegister() {
    wx.navigateTo({
      url: "/pages/register/index"
    });
  },

  forgotPassword() {
    wx.showToast({
      title: "演示版暂未接入找回密码",
      icon: "none"
    });
  }
});

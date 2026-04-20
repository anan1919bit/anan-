Page({
  data: {
    brand: "CareerCompass",
    currentField: "",
    showPassword: false,
    agreed: false,
    isSubmitting: false,
    nickname: "",
    email: "",
    phone: "",
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

  toggleAgree() {
    this.setData({
      agreed: !this.data.agreed
    });
  },

  submitRegister() {
    if (this.data.isSubmitting) return;

    const { nickname, email, phone, password, agreed } = this.data;
    const hasEmail = email.trim();
    const hasPhone = phone.trim();

    if (!nickname.trim()) {
      wx.showToast({ title: "请输入昵称", icon: "none" });
      return;
    }

    if (!hasEmail && !hasPhone) {
      wx.showToast({ title: "请输入邮箱或手机号", icon: "none" });
      return;
    }

    if (!password.trim()) {
      wx.showToast({ title: "请输入密码", icon: "none" });
      return;
    }

    if (!agreed) {
      wx.showToast({ title: "请先同意条款", icon: "none" });
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
        title: "注册成功",
        icon: "success"
      });
    }, 1100);
  }
});

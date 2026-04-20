Page({
  data: {
    userInfo: {
      nickname: "星选会员",
      level: "品牌优享卡",
      avatarText: "星"
    },
    stats: [
      { label: "积分", value: "2680" },
      { label: "优惠券", value: "6" },
      { label: "收藏", value: "18" }
    ],
    orderTabs: [
      { key: "pendingPay", label: "待付款", count: 2, icon: "付" },
      { key: "pendingSend", label: "待发货", count: 1, icon: "发" },
      { key: "pendingReceive", label: "待收货", count: 3, icon: "收" },
      { key: "afterSale", label: "售后/退款", count: 0, icon: "售" }
    ],
    services: [
      { key: "address", title: "收货地址", desc: "管理常用地址信息" },
      { key: "points", title: "积分中心", desc: "查看积分明细与兑换权益" },
      { key: "coupon", title: "优惠券", desc: "查看可用优惠券和福利" },
      { key: "customer", title: "联系客服", desc: "订单问题与售后支持" }
    ]
  },

  goLogin() {
    wx.navigateTo({
      url: "/pages/login/index"
    });
  },

  handleOrderTap(e) {
    const label = e.currentTarget.dataset.label;
    wx.showToast({
      title: `${label}功能演示中`,
      icon: "none"
    });
  },

  handleServiceTap(e) {
    const title = e.currentTarget.dataset.title;
    wx.showToast({
      title: `${title}功能演示中`,
      icon: "none"
    });
  }
});

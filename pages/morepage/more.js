var appInst = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    powerlist: ["user"],
    navHeight: appInst.globalData.navHeight,
    userInfo: null,
    list: [
      {
        title: "店长管理",
        icon: "shield-o",
        to: "../../pages/scanpage/scanpage",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "marginTop",
        is_power: "admin",
        isLink:false,
        isbutton:false
      },
      {
        title: "客流统计",
        icon: "shield-o",
        to: "../../pages/shopCount/shopCount",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "admin",
        isLink:false,
        isbutton:false
      },
      {
        title: "优惠券兑换",
        icon: "coupon-o",
        to: "../../pages/exchangpage/exchangpage",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "marginTop",
        is_power: "user",
        isLink:false,
        isbutton:false

      },
      {
        title: "兑换会员",
        icon: "vip-card-o",
        to: "../../pages/vipchagepage/vipchagepage",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "user",
        isLink:false,
        isbutton:false

      },
      {
        title: "充值记录",
        icon: "orders-o",
        to: "../../pages/businesslist/businesslist",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "user",
        isLink:false,
        isbutton:false
      },
      {
        title: "会员协议",
        icon: "records",
        to: "../../pages/setting/setting",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "marginTop",
        is_power: "user",
        isLink:false,
        isbutton:false
      },
      {
        title: "设置",
        icon: "setting-o",
        to: "../../pages/userInfo/userInfo",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "marginTop",
        isLink:false,
        isbutton:false
      },
    ],
  },
  goVip() {
    wx.navigateTo({
      url: "/pages/vipdetail/vipdetail",
    });
  },
  onuserInfo() {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
    })
  },
  oncarClick() {
    wx.navigateTo({
      url: '/pages/cardList/cardList',
    })
  },
  oncardClick() {
    wx.navigateTo({
      url: '/pages/couponpage/couponpage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 4);
    let {
      powerlist
    } = this.data;
    let {
      is_admin
    } = appInst.globalData.userInfo;
    if (is_admin == 1) {
      powerlist.push("admin");
      this.setData({
        powerlist,
      });
    }
    // console.log('windowHeight', appInst.globalData.userInfo)
    console.log("userInfo",appInst.globalData.userInfo)
    this.setData({
      userInfo: appInst.globalData.userInfo,
      navHeight: appInst.globalData.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
var appInst = getApp();
import storage from "../../utils/cache";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    powerlist: ["user"],
    navHeight: appInst.globalData.navHeight,
    userInfo: {},
    list: [
      {
        title: "我的动态",
        icon: "xiaohongshushoucang",
        to: "../../pages/dynamicpage/dynamicpage",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        marginTop: "",
        is_power: "admin",
        isLink: false,
        isbutton: false,
        isshare: false,
      },
      {
        title: "投票活动",
        icon: "security",
        to: "../../pages/vote/vote",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        marginTop: "",
        is_power: "admin",
        isshare: false,
        isLink: false,
        isbutton: false,
      },
      {
        title: "证书注册",
        icon: "RFQ-logo",
        to: "../../pages/certificate/certificate",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        // marginTop: "marginTop",
        is_power: "user",
        isshare: false,
        isLink: false,
        isbutton: false,
      },
      {
        title: "赛事订单",
        icon: "dingdanjihe",
        to: "../../pages/MatchOrder/MatchOrder",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        marginTop: "",
        is_power: "user",
        isshare: false,
        isLink: false,
        isbutton: false,
      },
      {
        title: "分享推荐",
        icon: "share",
        to: "",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        marginTop: "",
        is_power: "user",
        isshare: true,
        isLink: false,
        isbutton: false,
      },
      {
        title: "意见建议",
        icon: "editor",
        to: "../../pages/fankui/fankui",
        linktype: "navigateTo",
        value: "",
        isborder: true,
        marginTop: "",
        is_power: "user",
        isshare: false,
        isLink: false,
        isbutton: false,
      },
    ],
  },
  goList(e) {
    console.log(e);
    let { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/likepage/likepage?id=${id}`,
    });
  },

  gocathouse() {
    let { user_id } = storage.getUserInfo();
    wx.showLoading({
      title: "加载中..",
    });
    wx.navigateTo({
      url: "/pages/cathouse/cathouse?user_id=" + user_id,
    });
  },
  goVip() {
    wx.showLoading({
      title: "加载中..",
    });
    wx.navigateTo({
      url: "/pages/vipdetail/vipdetail",
    });
  },
  onuserInfo() {
    wx.showLoading({
      title: "加载中..",
    });
    wx.navigateTo({
      url: "/pages/userInfo/userInfo",
    });
  },
  oncarClick() {
    wx.showLoading({
      title: "加载中..",
    });
    wx.navigateTo({
      url: "/pages/cardList/cardList",
    });
  },
  oncardClick() {
    wx.showLoading({
      title: "加载中..",
    });
    wx.navigateTo({
      url: "/pages/couponpage/couponpage",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 4);
    appInst.getUserinfoFn(() => {});
    let { powerlist } = this.data;
    let { is_admin } = appInst.globalData.userInfo;
    if (is_admin == 1) {
      powerlist.push("admin");
      this.setData({
        powerlist,
      });
    }
    // console.log('windowHeight', appInst.globalData.userInfo)
    console.log("userInfo", appInst.globalData.userInfo);
    this.setData({
      userInfo: appInst.globalData.userInfo,
      navHeight: appInst.globalData.navHeight,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading({
      success: (res) => {},
    });
  },

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
  onShareAppMessage: function () {
    var shareObj = {
      title: "WCCF协会", // 默认是小程序的名称(可以写slogan等)
      path: "pages/home/home", // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: "",
    };
    return shareObj;
  },
});

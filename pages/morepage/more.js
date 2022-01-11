var appInst = getApp();
import storage from '../../utils/cache'

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
        icon: "shield-o",
        to: "../../pages/dynamicpage/dynamicpage",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "marginTop",
        is_power: "admin",
        isLink:false,
        isbutton:false
      },
      {
        title: "投票活动",
        icon: "shield-o",
        to: "../../pages/vote/vote",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "admin",
        isLink:false,
        isbutton:false
      },
      {
        title: "证书注册",
        icon: "coupon-o",
        to: "../../pages/certificate/certificate",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        // marginTop: "marginTop",
        is_power: "user",
        isLink:false,
        isbutton:false
      },
      {
        title: "分享推荐",
        icon: "vip-card-o",
        to: "",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "user",
        isLink:false,
        isbutton:false
      },
      {
        title: "意见建议",
        icon: "orders-o",
        to: "../../pages/fankui/fankui",
        linktype: "navigateTo",
        value: "",
        isborder: false,
        marginTop: "",
        is_power: "user",
        isLink:false,
        isbutton:false
      }
    ],
  },
  goList(e){
    console.log(e)
    let {id}=e.currentTarget.dataset
    wx.navigateTo({
      url:`/pages/likepage/likepage?id=${id}`,
    });
  },
  
  gocathouse() {
    let {user_id}=storage.getUserInfo()
    wx.navigateTo({
      url: "/pages/cathouse/cathouse?user_id="+user_id ,
    });
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
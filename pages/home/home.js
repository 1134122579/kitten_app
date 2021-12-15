// pages/home/home.jsimport
import Api from "../../api/index";
import storage from "../../utils/cache";
var appInst = getApp();
const filter = require("../../utils/filterRour");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navHeight:appInst.globalData.navHeight,

    // erruserimgurl:require('../../images/Group.png'),
    statusBarHeight:appInst.globalData.statusBarHeight,
    endtimepshow: false,
    timepshow: false,
    popupshow: false,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    bannerList: [],
    RoomList: [],
    is_rent: 0,
    ActivityList: [],
    roomitem: {}, //预约
    startstringTime: "",
  },
  // p判断是否剖登录
  is_load(callback) {
    if (storage.getToken()) {
      // 判断是否认证
      // if(storage.getUserInfo?.is_auth!=0){
      //   return
      // }
      callback();
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },
  goVip() {
    this.is_load(() => {
      wx.navigateTo({
        url: "/pages/vipdetail/vipdetail",
      });
    });
  },
  getLocalTime(nS) {
    return new Date(parseInt(nS))
      .toLocaleString()
      .replace(/年|月/g, "-")
      .replace(/日/g, " ");
  },
  onendtimeClose() {
    this.setData({
      endtimepshow: false,
    });
  },
  onendconfirm(event) {
    let time = event.detail;
    let stringTime = this.getLocalTime(time);
    this.setData({
      endtimepshow: false,
      endstringTime: stringTime,
    });
  },
  onconfirm(event) {
    let time = event.detail;
    // util.formatTime(time)
    let stringTime = this.getLocalTime(time);
    this.setData({
      timepshow: false,
      startstringTime: stringTime,
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  ontimeClose() {
    this.setData({
      timepshow: false,
    });
  },
  onstarttime() {
    this.setData({
      timepshow: true,
    });
  },
  onendtime() {
    this.setData({
      timepshow: true,
    });
  },
  //关闭弹窗
  onClose() {
    this.setData({
      popupshow: false,
      startstringTime: "",
      endstringTime: "",
    });
  },
  // 预约弹窗
  yuyueRoom(event) {
    let { item } = event.currentTarget.dataset;
    this.is_load(() => {
      wx.navigateTo({
        url: "/pages/roomdetail/roomdetail?id=" + item.id,
      });
    });
  },
  // 获取轮播
  getbanner() {
    let that = this;
    Api.getBanner().then((res) => {
      that.setData({
        bannerList: res,
      });
    });
  },
  getRoom() {
    let that = this;
    Api.getNews().then((res) => {
      that.setData({
        RoomList: res,
      });
    });
  },
  getActivity() {
    let that = this;
    Api.getActivity().then((res) => {
      that.setData({
        ActivityList: res,
      });
    });
  },
  ActivityDetail(event) {
    let { id } = event.currentTarget.dataset;

    this.is_load(() => {
      wx.navigateTo({
        url: "/pages/activitydetail/activitydetail?id=" + id,
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (storage.getToken()) {
      appInst.globalData.userInfo = storage.getUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
    navHeight:appInst.globalData.navHeight,
    })
  },
  onTabItemTap(item) {
    // this.is_load(()=>{
    //   wx.switchTab({
    //     url: item.pagePath,
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 0);
    let is_rent = getApp()?.globalData?.userInfo?.is_rent || 0;
    this.setData({
      is_rent,
      userInfo:appInst.globalData?.userInfo,
      statusBarHeight: getApp().globalData.statusBarHeight,
    });
    this.getbanner();
    this.getRoom();
    this.getActivity();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // if()
    // if (!storage.getToken()) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
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
  onShareAppMessage: function () {},
});

// pages/activitydetail/activitydetail.js
import Api from "../../api/index";
import storage from "../../utils/cache";
let appInst = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    navHeight:appInst.globalData.navHeight,
    detail: null,
    statusBarHeights: appInst.globalData.statusBarHeight,
  },

  setmobile(event) {
    console.log(event);
    let { mobile } = event.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: mobile,
    });
  },
  onlocation(event) {
    let { detail } = this.data;
    let latitude = Number(detail.lat);
    let longitude = Number(detail.lng);
    wx.openLocation({
      name: detail.name,
      address: detail.address,
      latitude,
      longitude,
      scale: 18,
    });
  },
  go() {
    let { detail } = this.data;
    if (!storage.getToken()) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
      return;
    }
    Api.getUserInfo().then((res) => {
      appInst.globalData.userInfo = res;
      wx.navigateTo({
        url: "/pages/purchase/purchase?id=" + detail.id,
      });
    });
  },
  getData(){
    let {id}=this.data
    Api.getShopDetails({
      shop_id: id,
    }).then((res) => {
      console.log(res);
      this.setData({
        detail: res,
      });
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
  
    });
  },
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    this.setData({
      id
    })
    this.getData()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight:appInst.globalData.navHeight
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      statusBarHeights: appInst.globalData.statusBarHeight,
    });
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
  onPullDownRefresh: function () {
this.onRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

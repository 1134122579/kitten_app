import storage from "../../utils/cache";
import Api from "../../api/index";

// pages/dynamicpage/dynamicpage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listType: "homeblockmodel",
    catList: [],
    isStatus: 1,
    page: 1,
  },
  onpull(){
    this.data.page++
    this.getDynamic()
  },
  getDynamic() {
    let {  user_id } = storage.getUserInfo();
    let { page } = this.data;
    Api.getDynamic({ user_id, page }).then((res) => {
      this.setData({
        catList: res,
      });
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
    this.getDynamic()
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
  onReachBottom: function () {
    this.onpull()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

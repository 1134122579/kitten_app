// pages/cathouse/cathouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStatus:1,
    typeList:[{
      status:1,
      title:'代售'
    },{
      status:2,
      title:'展示'
    },{
      status:3,
      title:'种公'
    },{
      status:4,
      title:'种母'
    }]

  },
  ontabChange(event) {
    let status = event.detail.name;
    this.setData({
      isStatus: Number(status),
    });
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
      this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/vote/vote.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: App.globalData.navHeight,
    active: 1,
    lookList:[1,2],
    activeLookId:1,
    list: [{
      imageUrl: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
    }, {
      imageUrl: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
    },
    {
      imageUrl: 'https://img.js.design/assets/img/61b610b6c2794a29534a25bf.jpg'
    },
     {
      imageUrl: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
    },
     {
      imageUrl: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
    }
  ],
    tabList: [{
      id: 1,
      title: '最新投票'
    }, {
      id: 2,
      title: '人气排行'
    }, {
      id: 3,
      title: '活动简介'
    }, {
      id: 4,
      title: '评选规则'
    }]
  },
  onClick(event) {
    this.setData({
      activeLookId:event.detail.name
    })
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
    })

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
// pages/searchpage/searchpage.js
import Api from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:false,
    title: '',
    page: 1,
    label: '推荐',
    isNullList: false,
    listType: "homeblockmodel",
    list: []
  },
  getsearch() {
    console.log(12)
    this.setData({
      isEmpty:true,
    })
    if(this.data.title.trim()){
      this.getCatList()
    }else{
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none'
      })
    }
  },
  onpullpage() {
    this.data.page++;
    this.getCatList();
  },
  async getCatList() {
    let {
      title,
      page,
      label,
      list
    } = this.data
    let res = []
    res = await Api.getCatList({
      page,
      title:title.trim(),
      label
    });
    this.setData({
      isNullList: res.lenght > 0 ? false : true,
      list: res,
      isEmpty:false,
    })
    return
    if (page == 1) {
      this.setData({
        list: res
      })
    } else {
      this.setData({
        list: list.concat(res)
      })
    }
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
    this.onpullpage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
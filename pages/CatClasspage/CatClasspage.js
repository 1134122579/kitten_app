// pages/CatClasspage/CatClasspage.js
let App = getApp();
import Api from "../../api/index";
import {
  getDate
} from "../../utils/util";
import storgae from "../../utils/cache";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    highlightColor: 'rgba(255, 106, 110, 1)',
    indexList: [],
    CatClassList: [],
    cat_pz: ""
  },
  onclosebuttonPopup() {
    storgae.setInfo("CARPZ", this.data.cat_pz)
    wx.navigateBack({
      delta: 1,
    })
  },
  // 获取分类
  getCatClass() {
    wx.showLoading({
      title: '加载中..',
    })
    Api.getCatClass().then((res) => {
      res = res.filter((item) => item.list.length > 0);
      let indexList = res.map((item) => item.name);
      this.setData({
        indexList,
        CatClassList: res,
      });
      wx.hideLoading({})
    });
  },
  getcarType(event) {
    const {
      item
    } = event.currentTarget.dataset;
    console.log(item, '猫咪类型')
    this.setData({
      cat_pz: item.name
    })
  },
  onChange(e) {
    console.log(e, )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cat_pz: options.cat_pz
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCatClass()
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
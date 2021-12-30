// pages/matchdetail/matchdetail.js
import Api from '../../api/index'
import {
  formatDate
} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nullheaderImage: 'https://img.js.design/assets/img/61b44a697eee4352133690cc.png',
    getdata: {},
    timeData:{}
  },
  // 倒计时
  oncountChange(e) {
    console.log(e,123456)
    this.setData({
      timeData: e.detail
    })
  },
  goBaobutton(){
    let {
      id
    } = this.data.getdata
    wx.navigateTo({
      url: `/pages/matchenroll/matchenroll?match_id=${id}`,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options
    Api.get_match_details({
      match_id: id
    }).then(res => {
      res['djs_time'] = res['end_time'] * 1000 - (+new Date())
      res['start_time'] = formatDate(res['start_time'])
      res['end_time'] = formatDate(res['end_time'])
      console.log(res)
      this.setData({
        getdata: res
      })
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
    let {
      getdata
    } = this.data
    return {
      title: getdata.title,
      imageUrl: getdata.cover
    }
  }
})
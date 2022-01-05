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
    // 1 长毛组 2  中长毛组  3  短毛组  4  东方体别  5  无毛组别
    levelList: [{
      id: 1,
      text: '长毛组'
    }, {
      id: 2,
      text: '中长毛组'
    }, {
      id: 3,
      text: '短毛组'
    }, {
      id: 4,
      text: '东方体别'
    }, {
      id: 5,
      text: '无毛组别'
    }],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    nullheaderImage: 'https://img.js.design/assets/img/61b44a697eee4352133690cc.png',
    getdata: {},
    timeData:{}
  },
  group_idFunction(data){
    let {levelList}=this.data
    let value=''
    levelList.forEach(item=>{
      if(item.id==data){
        value=item.text
      }
    })
    return value
  },
  // 倒计时
  oncountChange(e) {
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
      user_id,cat_id
    } = options
    Api.getCatdetails({
      user_id,cat_id
    }).then(res => {
      console.log(res,'猫咪详情')
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
// pages/home/home.jslet

let App = getApp()
import Api from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: App.globalData.navHeight,
    hotList: [],
    CatClassList: [],
    list: [],
    isStatus:'',
    listQuery:{
      page:1,
      label:'英国长毛猫(纯色)'
    },
    tabName: '发现',
    listType: 'homeblockmodel',
    ellipsis: false
  },
  // 获取列表
  getCatList() {
    Api.getCatList(this.data.listQuery).then(res => {
      this.setData({
        list: res,
        isNullList: res.length > 0 ? false : true
      })
    })
  },
  typeChange(event) {
    let {
      name: item
    } = event.detail
    console.log(item, '猫咪类型')
    this.setData({
      "listQuery.label":item.name,
      isStatus:item.id
    })
    this.getCatList()
  },
  tabType(e) {
    let name = e.detail
    this.setData({
      tabName: name
    })
    console.log(e)
  },
  // 获取分类
  getCatClass() {
    Api.getCatClass().then(res => {
      this.setData({
        CatClassList: res
      })
    })
  },
  // 上拉翻页
  onpullpage(){
    (this.data.listQuery.page)++
    this.getCatList()
  },
  // 获取标签
  getHotLable() {
    Api.getHotLable().then(res => {
      this.setData({
        hotList: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.tabbershow(this, 0);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHotLable()
    this.getCatClass()
    if(this.data.tabName=="发现"){
      this.getCatList()
    }
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
    if(this.data.tabName=="发现"){
      this.onpullpage()
    }
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
// components/Navheader/Navheader.js
let App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    statusBarHeight: {
      type: Number,
      value: App.globalData.statusBarHeight
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onback(){
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
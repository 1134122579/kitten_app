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
    navHeight: App.globalData.navHeight,
    navTop: App.globalData.navTop,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onback(){
      let pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({//返回
          delta: 1
        });
      }
      if (pages.length == 1) {
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }
  }
})
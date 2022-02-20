// components/navbar/index.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabId: Number,
    pageName: String,
    showNav: {
      type: Boolean,
      value: false
    },
    showHome: {
      type: Boolean,
      value: true
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    textColor: {
      type: String,
      value: '#333'
    },
    bgColor: {
      type: String,
      value: 'rgba(0,0 ,0 ,0)'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: App.globalData.navHeight,
    navTop: App.globalData.navTop,
    active: 1,
    list: [
      {
        id: 3,
        title: '关注'
      },
      {
        id: 1,
        title: '收藏'
      },
      {
        id: 2,
        title: '粉丝'
      },
    ]
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onsearch() {
      wx.navigateBack({
        delta: 1,
      })
      return
      wx.navigateTo({
        url: '/pages/searchpage/searchpage',
      })
    },
    onClick(event) {
      this.triggerEvent("tabType", event.detail.name)
    },
    //回退
    _navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    _toIndex: function () {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
  },
})
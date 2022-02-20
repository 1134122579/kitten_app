// components/navbar/index.js
const App = getApp();
import Api from "../../api/index";
import storage from "../../utils/cache";

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    myuserID:String,
    userInfo: Object,
    pageName: String,
    showNav: {
      type: Boolean,
      value: false,
    },
    showHome: {
      type: Boolean,
      value: true,
    },
    iconColor: {
      type: String,
      value: "#fff",
    },
    textColor: {
      type: String,
      value: "#333",
    },
    bgColor: {
      type: String,
      value: "rgba(0,0 ,0 ,0)",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_gz: false,
    navHeight: App.globalData.navHeight,
    menuButtonObject: App.globalData.menuButtonObject,
    navTop: App.globalData.navTop,
    active: 1,
    list: [
      {
        id: 1,
        title: "发现",
      },
      {
        id: 2,
        title: "御猫馆",
      },
      {
        id: 3,
        title: "关注",
      },
    ],
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight,
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
      // 前往猫舍
  gocathouse() {
    let { userInfo } = this.data;
    wx.showLoading({
      title: "加载中...",
    });
    wx.navigateTo({
      url: `/pages/cathouse/cathouse?user_id=${userInfo.user_id}`,
    });
  },
    onsearch() {
      wx.navigateTo({
        url: "/pages/searchpage/searchpage",
      });
    },
    onClick(event) {
      let { is_gz, userInfo } = this.data;
      if (userInfo?.is_follow != 1) {
        this.addFollow(event.detail);
      } else {
        this.cacheFollow(event.detail);
      }
    },
    // 关注
    addFollow(detail) {
      let { userInfo, is_gz } = this.data;
      wx.showLoading({
        title: "关注中..",
      });
      Api.addFollow({
        follow_user_id: userInfo.user_id,
      }).then((res) => {
        wx.hideLoading();
        this.setData({
          is_gz: !is_gz,
        });
        this.triggerEvent("tabType", detail.name);
        wx.showToast({
          title: "关注成功",
          icon: "none",
        });
      });
    },
    cacheFollow(detail) {
      let { userInfo, is_gz } = this.data;
      wx.showLoading({
        title: "取关中..",
      });
      Api.cacheFollow({
        follow_user_id: userInfo.user_id,
      }).then((res) => {
        wx.hideLoading();
        this.triggerEvent("tabType", detail.name);
        this.setData({
          is_gz: !is_gz,
        });
        wx.showToast({
          title: "取消关注",
          icon: "none",
        });
      });
    },
    //回退
    _navBack: function () {
      wx.navigateBack({
        delta: 1,
      });
    },
    //回主页
    _toIndex: function () {
      wx.switchTab({
        url: "/pages/home/home",
      });
    },
  },
});

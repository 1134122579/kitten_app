// components/Tabbar/tabbar.js
import storage from "../utils/cache";

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    Zindex: 99,
    active: 0,
    color: "#272822",
    selectedColor: "#FECE2D",
    selected: 0,
    list: [
      {
        pagePath: "pages/home/home",
        text: "首页",
        iconPath: "../images/home.png",
        selectedIconPath: "../images/home_s.png",
        isnavigatetominiprogram: false,
      },
      {
        pagePath: "pages/orderpage/order",
        text: "赛事",
        iconPath: "../images/jbicon.png",
        selectedIconPath: "../images/jbicon_s.png",
        isnavigatetominiprogram: false,
      },
      {
        pagePath: "pages/releasepage/releasepage",
        text: "",
        iconPath: "../images/adddicon_s.png",
        selectedIconPath: "../images/adddicon_s.png",
        isnavigatetominiprogram: false,
        is_content: true,
      },
      {
        // pages/spacepage/space
        pagePath: "",
        text: "商城",
        iconPath: "../images/shopicon.png",
        selectedIconPath: "../images/shopicon_s.png",
        isnavigatetominiprogram: true,
      },
      {
        pagePath: "pages/morepage/more",
        text: "我的",
        iconPath: "../images/abouticon.png",
        selectedIconPath: "../images/abouticon_s.png",
        isnavigatetominiprogram: false,
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToMiniProgram() {
      wx.navigateToMiniProgram({
        appId: "wxb894410659e6b29a",
        path: "pages/home/dashboard/index",
        envVersion: "release", // 打开正式版
        success(res) {
          // 打开成功
          console.log(res);
        },
        fail: function (err) {
          console.log(err);
        },
      });
    },
    onChange(e) {
      const data = e.currentTarget.dataset;
      console.log(storage.getToken(), "token");
      const url = data.path;
      if (!storage.getToken()) {
        wx.navigateTo({
          url: "/pages/login/login", //能够带参数，在登陆页面接收
        });
      } else {
        var appInst = getApp();
        appInst.globalData.userInfo = storage.getUserInfo();
        if (data.isnavigatetominiprogram) {
          this.navigateToMiniProgram();
          return;
        }
        this.setData({
          selected: data.index,
        });
        wx.switchTab({
          url: "/" + url,
        });
      }
    },
  },
});

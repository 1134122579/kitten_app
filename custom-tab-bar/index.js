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
    Zindex: 9999,
    active: 0,
    color: "#272822",
    selectedColor: "#D13127",
    selected: 0,
    list: [
      {
        pagePath: "pages/home/home",
        text: "首页",
        iconPath: "../images/home.png",
        selectedIconPath: "../images/home_s.png",
      },
      {
        pagePath: "pages/orderpage/order",
        text: "订单",
        iconPath: "../images/time.png",
        selectedIconPath: "../images/time_s.png",
      },
      {
        pagePath: "pages/vippage/vip",
        text: "",
        iconPath: "../images/tabc.png",
        selectedIconPath: "../images/tabc.png",
        is_content:true
      },
      {
        pagePath: "pages/spacepage/space",
        text: "空间",
        iconPath: "../images/list.png",
        selectedIconPath: "../images/list_s.png",
      },
      {
        pagePath: "pages/morepage/more",
        text: "更多",
        iconPath: "../images/about.png",
        selectedIconPath: "../images/about_s.png",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const data = e.currentTarget.dataset;
      console.log(data);
      const url = data.path;
      if (!storage.getToken()) {
        wx.navigateTo({
          url: "/pages/login/login", //能够带参数，在登陆页面接收
        });
        return;
      } else {
        var appInst = getApp();
        appInst.globalData.userInfo = storage.getUserInfo();
      }
      this.setData({
        selected: data.index,
      });
      wx.switchTab({
        url: "/" + url,
      });
    },
  },
});

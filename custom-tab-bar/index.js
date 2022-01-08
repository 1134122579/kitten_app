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
        iconPath: "../images/homeicon.png",
        selectedIconPath: "../images/home_s.png",
      },
      {
        pagePath: "pages/orderpage/order",
        text: "赛事",
        iconPath: "../images/jbicon.png",
        selectedIconPath: "../images/jbicon.png",
      },
      {
        pagePath: "pages/releasepage/releasepage",
        text: "",
        iconPath: "../images/addicon.png",
        selectedIconPath: "../images/addicon.png",
        is_content:true
      },
      {
        // pages/spacepage/space
        pagePath: "",
        text: "商城",
        iconPath: "../images/shopicon.png",
        selectedIconPath: "../images/shopicon.png",
      },
      {
        pagePath: "pages/morepage/more",
        text: "我的",
        iconPath: "../images/abouticon.png",
        selectedIconPath: "../images/abouticon.png",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const data = e.currentTarget.dataset;
      console.log(storage.getToken(),'token');
      const url = data.path;
      if (!storage.getToken()) {
        wx.navigateTo({
          url: "/pages/login/login", //能够带参数，在登陆页面接收
        });
      } else {
        var appInst = getApp();
        appInst.globalData.userInfo = storage.getUserInfo();
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

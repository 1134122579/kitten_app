// pages/home/home.jslet

let App = getApp();
import Api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    highlightColor: 'rgba(255, 106, 110, 1)',
    indexList: [],
    show: false,
    navHeight: App.globalData.navHeight,
    hotList: [],
    mValue: "",
    loading: false,
    CatClassList: [],
    isEmpty: false,
    is_empty: false,
    list: [],
    gzlist: [],
    isStatus: "",
    listQuery: {
      page: 1,
      label: "",
    },
    tabName: "发现",
    listType: "homeblockmodel",
    ellipsis: false,
  },
  showPopup() {
    let {
      show
    } = this.data;
    this.setData({
      show: !show
    });
  },
  onpoup(e) {
    console.log(e, "阻止冒泡");
  },
  onclosebuttonPopup() {
    this.setData({
      show: false
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  // 获取动态列表
  async getCatList() {
    let {
      tabName,
      mValue
    } = this.data;
    let res = [];
    this.setData({
      loading: true,
    });
    if (tabName == "发现") {
      res = await Api.getCatList(this.data.listQuery);
      this.setData({
        is_empty: this.data.listQuery.page == 1 && res.length <= 0,
        gzlist: [],
        list: res,
        isNullList: res.length > 0 ? false : true,
        loading: false,
      });
    }
    if (tabName == "关注") {
      // 关注
      res = await Api.getFollowDynamic(this.data.listQuery);
      this.setData({
        isStatus: 0,
      });
      this.setData({
        is_empty: this.data.listQuery.page == 1 && res.length <= 0,
        gzlist: res,
        list: [],
        isNullList: res.length > 0 ? false : true,
        loading: false,
      });
    }
    this.setData({
      isEmpty: false
    })
    wx.stopPullDownRefresh()
  },
  // 品种切换
  typeChange(event) {
    let {
      name
    } = event.detail;
    this.setData({
      "listQuery.label": name,
      "listQuery.page": 1,
      isStatus: name,
      isEmpty: true,
      show: false,
    });
    this.getCatList();
  },
  // 顶部切换
  tabType(e) {
    let name = e.detail;
    let {
      mValue
    } = this.data;
    console.log("tabType", name);
    this.setData({
      tabName: name,
      isEmpty: true,
      isStatus: "",
      list: [],
      gzlist: [],
      show: false,
      "listQuery.page": 1,
      "listQuery.label": mValue,
    });
    this.getCatList();
  },
  bindbqclick(e) {
    if (this.data.listQuery.label == e.currentTarget.dataset.item.name) {
      return;
    }
    this.setData({
      "listQuery.label": e.currentTarget.dataset.item.name,
      "listQuery.page": 1,
      isStatus: e.currentTarget.dataset.item.name,
      isEmpty: true,
      show: false,
    });
    // this.getCatList();
  },
  // 获取分类
  getCatClass() {
    Api.getCatClass().then((res) => {
      res = res.filter((item) => item.list.length > 0);
      let indexList = res.map((item) => item.name);
      this.setData({
        indexList,
        CatClassList: res,
      });
    });
  },
  // 上拉翻页l
  onpullpage() {
    this.setData({
      isEmpty: false,
    });
    this.data.listQuery.page++;
    this.getCatList();
  },
  // 获取标签
  getHotLable() {
    Api.getHotClass().then((res) => {
      this.setData({
        hotList: res,
        "listQuery.label": res[0].name,
        mValue: res[0].name,
      });
      this.selectComponent("#tabs").resize();
      this.getCatList();
    });
  },
  // 前往
  goShop(e) {
    console.log(e);
    let {
      item
    } = e.currentTarget.dataset;
    wx.showLoading({
      title: "加载中...",
    });
    wx.navigateTo({
      url: `/pages/catshop/catshop?id=${item.id}`,
    });
  },
  // 设置小程序样式
  setTopStyleValue() {
    try {
      let menuButtonObject = wx.getMenuButtonBoundingClientRect();
      if (menuButtonObject.width==0) {
        menuButtonObject = {
          bottom: 80,
          height: 32,
          left: 281,
          right: 368,
          top: 48,
          width: 87,
        }
      }
      console.log("获取自定义顶部高度相关参数", menuButtonObject);
      let res = wx.getSystemInfoSync();
      let statusBarHeight = res.statusBarHeight,
        navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
        // navHeight =
        //   statusBarHeight +
        //   menuButtonObject.height +
        //   (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        navHeight =
        Number(menuButtonObject.top) + Number(menuButtonObject.height) + 4;
      App.globalData.menuButtonObject = menuButtonObject;
      App.globalData.navHeight = navHeight;
      App.globalData.navTop = navTop;
      App.globalData.windowHeight = res.windowHeight;
      console.log(
        "获取自定义顶部高度相关参数====",
        menuButtonObject,
        navHeight,
        statusBarHeight,
        navTop
      );
    } catch (err) {
      console.error("获取小程序顶部参数", err);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTopStyleValue()
    App.tabbershow(this, 0);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
      tabName: "发现",
    });
    this.getHotLable();
    this.getCatClass();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    App.tabbershow(this, 0);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      "listQuery.page": 1,
      isEmpty: true
    })
    this.getCatList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onpullpage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShareTimeline: function () {
    return {
    //   title: '分享的标题', 
    //   query: {
    //     // key: 'value' //要携带的参数
    //   },
    //   imageUrl: ''  //分享图,默认小程序的logo
    }
  },
});

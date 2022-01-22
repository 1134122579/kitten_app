// pages/home/home.jslet

let App = getApp();
import Api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    let { show } = this.data;
    this.setData({ show: !show });
  },
  onpoup(e) {
    console.log(e, "阻止冒泡");
  },
  onclosebuttonPopup() {
    this.setData({ show: false });
  },

  onClose() {
    this.setData({ show: false });
  },
  // 获取动态列表
  async getCatList() {
    let { tabName, mValue } = this.data;
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
  },
  // 品种切换
  typeChange(event) {
    let { name } = event.detail;
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
    let { mValue } = this.data;
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
      this.setData({
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
    let { item } = e.currentTarget.dataset;
    wx.showLoading({
      title: "加载中...",
    });
    wx.navigateTo({
      url: `/pages/catshop/catshop?id=${item.id}`,
    });
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
      tabName: "发现",
    });
    this.getHotLable();
    this.getCatClass();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onpullpage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

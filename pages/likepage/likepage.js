// pages/likepage/likepage.js
let App = getApp();
import Api from "../../api/index";
import storage from "../../utils/cache";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    tabId: null,
    navHeight: App.globalData.navHeight,
    isnullLsit: false,
    sclist: [],
    list: [],
    isEmy: false,
    UserCollectList: [],
    lisQuery: {
      page: 1,
    },
  },
  // 前往猫舍
  gocathouse(e) {
    let {
      item
    } =e.currentTarget.dataset;
    console.log(item,this.data.tabId)
    wx.showLoading({
      title: "加载中...",
    });
    wx.navigateTo({
      url: `/pages/cathouse/cathouse?user_id=${this.data.tabId==2?item.user_id:item.follow_user_id}`,
    });
  },
  // 顶部tab
  tabType(e) {
    let id = e.detail;
    let {
      tabId
    } = this.data
    if (tabId == id) return
    console.log(id);
    this.setData({
      "lisQuery.page": 1,
      tabId: id,
      list: [],
    });
    this.getFollow();
  },
  // 翻页
  onpullpage() {
    this.data.lisQuery.page++;
    this.getFollow();
  },
  // 数据
  async getFollow() {
    let {
      lisQuery,
      list,
      tabId
    } = this.data;
    let res = [];
    if (tabId == 1) {
      // 收藏
      res = await Api.getUserCollect(lisQuery);
      this.setData({
        sclist: res,
        isEmpty: false,
        isEmy: lisQuery.page == 1 && res.length <= 0 ? true : false,
      });
      return;
    } else if (tabId == 2) {
      // 粉丝
      res = await Api.getMyfans(lisQuery);
    } else {
      // 关注
      res = await Api.getFollow(lisQuery);
    }
    this.setData({
      sclist: [],
      isEmpty: true,
      isnullLsit: res.length > 0 ? false : true,
    });
    if (lisQuery.page == 1) {
      this.setData({
        list: res,
        isEmy: res.length <= 0 ? true : false,
      });
    } else {
      this.setData({
        list: list.concat(res),
      });
    }
  },
  // 取关
  cacheFollow(e) {
    console.log(e);
    let {
      item
    } = e.currentTarget.dataset;
    let {
      user_id
    } = storage.getUserInfo();
    Api.cacheFollow({
      user_id,
      follow_user_id: item.follow_user_id
    }).then((res) => {
      this.getFollow();
      wx.showToast({
        title: "取消关注",
        icon: "none",
      });
    });
  },
  onisfoll(e){
    let {
      item
    } = e.currentTarget.dataset;
    if(item.is_hu==1){
      e.currentTarget.dataset.item['follow_user_id']=item.user_id
      console.log(e)
      this.cacheFollow(e)
    }else{
      this.addFollow(e)
    }
  },
  // 关注
  addFollow(e) {
    console.log(e);
    let {
      user_id
    } = storage.getUserInfo();
    let {
      item
    } = e.currentTarget.dataset;
    Api.addFollow({
      user_id,
      follow_user_id: item.user_id
    }).then((res) => {
      this.getFollow();
      wx.showToast({
        title: "关注成功",
        icon: "none",
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options;
    this.setData({
      tabId: id,
    });
    this.getFollow();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    });
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
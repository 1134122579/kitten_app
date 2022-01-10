// pages/baomingpage/baomingpage.js
import Api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    match_id: null,
    isShowTypeList: true,
    show: false,
    list: [],
    isCatObjlist: [],
    isHuansai: null,
    checkList: [],
    matchGroupobj:{}
  },
  getSelectCatList() {
    Api.getSelectCatList().then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  onClick() {
    this.setData({
      show: true,
    });
  },
  cattypeitem(e) {
    console.log(e, "选择类型");
  },
  myevent(e) {
    console.log(e);
    let { isShow, isCatObjlist } = e.detail;
    this.setData({
      show: isShow,
      isCatObjlist,
    });
  },
  // 获取类型
  matchGroup() {
    let { match_id } = this.data;
    Api.matchGroup({
      match_id,
    }).then((res) => {
      this.setData({
        matchGroupobj:res
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: options.id,
    });
    this.getSelectCatList();
    this.matchGroup()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

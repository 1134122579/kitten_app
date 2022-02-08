// pages/orderpage/order.js
var appInst = getApp();
import Api from "../../api/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_lookShow:false,
    options: "",
    isEmpty: true,
    listType: "homeblockmodel",
    is_Zkbutton: true,
    is_Zk: true,
    catList: [],
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
    isStatus: 1,
    isnullList: false,
    listQuery: {
      page: 1,
      label: 1,
    },
    is_okplayShow: false,
    navHeight: appInst.globalData.navHeight,
    ordertypeList: [
      {
        title: "最新动态",
        status: 1,
        disabled: false,
      },
      {
        title: "相关猫舍",
        status: 2,
        disabled: false,
      },
    ],
    list: [],
    ssList: [
      {
        id: 1,
        text: "第一场赛事",
      },
      {
        id: 1,
        text: "第一场赛事",
      },
      {
        id: 1,
        text: "第一场赛事",
      },
    ],
  },
  lookbutton(){
this.setData({
  is_lookShow:true
})
  },  
  // 前往猫舍
  goHouse(e){
    let {item}=e.currentTarget.dataset
    wx.showLoading({
      title: '进入中...',
    })
    wx.navigateTo({
      url: '/pages/cathouse/cathouse?user_id='+item.user_id,
    })
  },
  onplayClose() {
    this.setData({
      is_lookShow: false,
    });
  },
  // 赛事积分
  bindpzChange(event) {
    let { ssList } = this.data;
    this.setData({
      // sexIndex: event.detail.value,
      saishiValue: ssList[event.detail.value]["text"],
    });
  },
  ontabChange(event) {
    let status = event.detail.name;
    console.log(status);
    this.setData({
      "listQuery.page": 1,
      isStatus: status,
      isEmpty: status == 1,
    });
    this.getOrderList();
  },

  tag(event) {
    console.log(event);
    let { id } = event.currentTarget.dataset;
    this.setData({
      isStatus: Number(id),
    });
    this.getOrderList();
  },
  //   获取列表
  async getOrderList() {
    let { listQuery, list, isStatus } = this.data;
    // 获取详情
    let res = [];
    if (isStatus == 1) {
      // 最新动态
      res = await Api.getAboutDynamic(listQuery);
      console.log(res);
      this.setData({
        catList: res,
        is_empt: listQuery.page == 1 && res.length <= 0 ? true : false,
      });
      return;
    } else {
      // 相关猫舍
      res = await Api.getAboutCatHome(listQuery);
      this.setData({
        catList: [],
        isnullList: res.length > 0 ? false : true,
      });
      if (listQuery.page == 1) {
        this.setData({
          list: res,
        });
      } else {
        this.setData({
          list: list.concat(res),
        });
      }
    }
  },

  ontextLook() {
    this.setData({
      is_Zk: !this.data.is_Zk,
    });
  },
  // 取消
  cancelOrder(event) {
    let { out_trade_no } = event.detail;
    Api.cancelOrder({
      out_trade_no,
    }).then((res) => {
      this.getOrderList();
    });
  },
  //   支付成功
  payCarOrder(event) {
    let { order_no, pay_type } = event.detail;
    wx.showLoading({
      title: "支付中...",
      icon: "none",
      mask: true,
    });
    Api.payCarOrder({
      out_trade_no: order_no,
      pay_type,
    }).then((res) => {
      wx.hideLoading();
      if (res.status == 200) {
        this.setData({
          is_okplayShow: true,
        });
        this.getOrderList();
        // wx.showToast({
        //   title: "支付成功",
        //   duration: 3000,
        //   mask:true
        // });
      } else {
        wx.showToast({
          title: res.message,
          icon: "none",
          duration: 3000,
        });
      }
      //
    });
  },
  // s上拉
  onBottom() {
    this.data.listQuery.page++;
    this.getOrderList();
  },
  // 获取详情
  async getPzDetial() {
    let { options } = this.data;
    let res = await Api.getPzDetial(options);
    res["desc"]=res["desc"].replaceAll('<img ', '<img style="max-width:100%;height:auto;display:block;margin:10rpx 0;"')
    res["desccopy"] = `${res["desc"].slice(0, 50)}...`;
    this.setData({
      detail: res,
      is_Zkbutton: res.desc.length > 50 ? true : false,
      "listQuery.label":res.name
    });
    this.getOrderList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options,
      isStatus: 1,
    });
    this.getPzDetial();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: appInst.globalData.navHeight,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 1);
  },

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
    this.onBottom();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

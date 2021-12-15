// pages/orderpage/order.js
var appInst = getApp();
import Api from "../../api/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 1 进行中 2 待确认 5已完成
    isStatus: 2,
    is_okplayShow:false,
    navHeight:appInst.globalData.navHeight,
    ordertypeList: [
      {
        title: "待确认",
        status: 2,
        disabled:false
      },
      {
        title: "进行中",
        status: 1,
        disabled:false
      },
      {
        title: "已完成",
        status: 5,
        disabled:false
      },{
        title: "",
        status: null,
        disabled:true
      },{
        title: "",
        status: null,
        disabled:true
      }
    ],
    list: [],
  },
  onplayClose() {
    this.setData({
      is_okplayShow: false
    })
  },
  ontabChange(event) {
    let name = event.detail.name;
    console.log(event)
    this.setData({
      isStatus:Number(name) ,
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
  //   获取订单列表
  getOrderList() {
    let { isStatus } = this.data;
    Api.getUserOrder({ status: isStatus }).then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  // 取消
  cancelOrder(event){
    let {out_trade_no} = event.detail;
    Api.cancelOrder({out_trade_no}).then(res=>{
      this.getOrderList()
    })
  },
  //   支付成功

  payCarOrder(event) {
    let {order_no,pay_type} = event.detail;
    wx.showLoading({
      title: '支付中...',
      icon:'none',
      mask:true
    })
    Api.payCarOrder({
      out_trade_no: order_no,
      pay_type,
    }).then((res) => {
      wx.hideLoading()
      if (res.status == 200) {
        this.setData({
          is_okplayShow:true
        })
        this.getOrderList()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
    navHeight:appInst.globalData.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 1);

    this.getOrderList();
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

// pages/orderpage/order.js
var appInst = getApp();
import Api from "../../api/index";
// import QRCode from "../../utils/QRCode/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStatus: 2,
    navHeight: appInst.globalData.navHeight,
    // 1 已使用 2 待使用 3 已失效
    ordertypeList: [{
        title: "未使用",
        status: 2,
      },
      {
        title: "已使用",
        status: 1,
      },
      {
        title: "已失效",
        status: 3,
      }
    ],
    list: [],
  },
  createdQR() {
    // QRCode.newqrcode(`qr${coupon_code}`,{
    //     width: 200,
    //     height: 200,
    //     text:coupon_code,
    //     padding:10,
    //     cb(res){
    //       console.log(res)
    //     }
    //   })
  },
  ontabChange(event) {
    let name = event.detail.name;
    this.setData({
      isStatus: name,
    });
    this.getOrderList();
  },

  tag(event) {
    console.log(event);
    let {
      id
    } = event.currentTarget.dataset;
    this.setData({
      isStatus: id,
    });
    this.getOrderList();
  },
  //   获取订单列表
  getOrderList() {
    let {
      isStatus
    } = this.data;
    Api.getUserCoupon({
      status: isStatus
    }).then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  //   支付成功

  payCarOrder(event) {
    let Order = event.detail.res;
    console.log(Order);
    if (Order.status == 200) {
      wx.showToast({
        title: "支付成功",
        duration: 3000,
      });
    } else {
      wx.showToast({
        title: Order.message,
        icon: "none",
        duration: 3000,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // QRCode.barcode(`qrDL2EFE0I1`, 'DL2EFE0I', 680, 200, ); //条形码
    this.setData({
      navHeight: appInst.globalData.navHeight,
    })
    this.createdQR()
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
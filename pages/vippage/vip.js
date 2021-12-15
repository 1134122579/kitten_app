// pages/vippage/vip.js
import QRCode from "../../utils/QRCode/index.js";
var appInst = getApp();
import storage from "../../utils/cache";
import {
  getDate
} from "../../utils/util";
import Api from "../../api/index";
let App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_okplayShow: false,
    ge_price: null,
    recharge_price: null,
    is_price: null,
    show: false,
    is_barcode: false,
    code: "",
    barcodeImagePath: "",
    userInfo: null,
    qrcodeImagePath: "",
    priceList: [{
        id: 1,
        price: 100,
      },
      {
        id: 2,
        price: 200,
      },
      {
        id: 3,
        price: 500,
      },
      {
        id: 4,
        price: 1000,
      },
    ],
  },
  onplayClose() {
    this.setData({
      is_okplayShow: false
    })
  },
  bindinput(e) {
    this.setData({
      recharge_price: e.detail.value,
      ge_price: e.detail.value,
    });
  },
  gocarlistpage() {

    wx.navigateTo({
      url: '/pages/couponpage/couponpage',
    })
  },
  inputprice(e) {
    this.setData({
      is_price: null,
      recharge_price: null,
    });
  },
  // 下拉刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading()
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getUser();
  },
  getUser() {
    Api.getUserInfo().then((res) => {
      App.globalData.userInfo = res;
      storage.setUserInfo(res);
      res.vip_time_out = Math.round(new Date() / 1000) <= res.vip_time_out ? getDate(res["vip_time_out"] + "000") : '';
      this.setData({
        userInfo: res
      })
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    });
  },
  // 前往卡包
  gocouponpage() {
    wx.navigateTo({
      url: '/pages/couponpage/couponpage',
    })
  },
  pricButton(e) {
    let {
      price
    } = e.currentTarget.dataset;
    this.setData({
      is_price: price,
      recharge_price: price,
      ge_price: null,
    });
  },
  onClose() {
    let {
      show
    } = this.data;
    this.setData({
      show: !show,
    });
  },
  createdQR() {
    let that=this
    let {
      code,
      userInfo
    } = this.data;
    QRCode.barcode("barcode", userInfo.qrcode, 320, 160, '', '', 2, 20); //条形码
    // QRCode.qrcode("qrcode", code, {codeSize:320}); //二维码
    QRCode.newqrcode("qrcode", {
      // usingIn: this,
      text: userInfo.qrcode,
      padding: 12,
      width: 320,
      height: 320,
      cb: (res) => {
        console.log('qrcodeImagePath',res)
        that.setData({
          qrcodeImagePath: res.path,
        });
      }
    }); //二维码

    // drawQrcode({
    //    x:10,
    //   y:10,
    //   width: 200,
    //   height: 200,
    //   canvasId: 'qrcode',
    //   text: userInfo.qrcode
    // })
  },

  drawImage() {
    let that = this;
    setTimeout(function () {
      // wx.canvasToTempFilePath({
      //   canvasId: "qrcode",
      //   success: function (res) {
      //     console.log(res);
      //     var tempFilePath = res.tempFilePath;
      //     that.setData({
      //       qrcodeImagePath: tempFilePath,
      //     });
      //   },
      //   fail: function (res) {
      //     console.log(res);
      //   },
      // });
      wx.canvasToTempFilePath({
        canvasId: "barcode",
        success: function (res) {
          console.log(res);
          var tempFilePath = res.tempFilePath;
          that.setData({
            barcodeImagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        },
      });
    }, 500);
  },
  previewImageQr(e) {
    console.log(e);
    return
    let {
      url
    } = e.currentTarget.dataset;
    console.log(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
    });
  },
  iscode() {
    let {
      is_barcode
    } = this.data;
    // this.drawImage();
    this.setData({
      is_barcode: !is_barcode,
    });
  },

  order(event) {
    let that = this;
    console.log(event);
    let {
      item
    } = event.currentTarget.dataset;
    console.log(item);
    let {
      recharge_price
    } = this.data;
    if (!recharge_price) {
      wx.showToast({
        title: "请选择或输入金额",
        icon: "none",
      });
      return;
    }
    wx.showLoading({
      title: "支付中...",
    });
    Api.rechargeOrder({
      recharge_price,
    }).then((res) => {
      let {
        nonceStr,
        paySign,
        signType,
        timeStamp,
        out_trade_no
      } = res;
      wx.requestPayment({
        nonceStr,
        signType,
        package: res.package,
        paySign,
        timeStamp,
        success(data) {
          wx.hideLoading()
          Api.queryRechargeOrder({
            out_trade_no,
          }).then((res) => {
            wx.showLoading({
              title: '加载中..',
            })
            appInst.getUserinfoFn(() => {
              that.setUserinfo()
              wx.hideLoading()
              that.setData({
                is_okplayShow: true
              })
            })
            that.setData({
              is_okplayShow: true
            })
            wx.showToast({
              title: "充值成功",
            });
          });
        },
      });
    });
  },
  goVip() {
    wx.navigateTo({
      url: '/pages/vipdetail/vipdetail',
    })
  },
  setUserinfo() {
    var userInfo;
    let {
      qrcode
    } = storage.getUserInfo();
    userInfo = storage.getUserInfo();
    userInfo.vip_time_out = Math.round(new Date() / 1000) <= userInfo.vip_time_out ? getDate(userInfo["vip_time_out"] + "000") : '';
    this.setData({
      code: qrcode,
      userInfo,
    });
    this.createdQR();
    this.drawImage();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    appInst.getUserinfoFn(() => {
      this.setUserinfo()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 2);
    this.setData({
      show: false
      //   userInfo: appInst.globalData.userInfo,
    });
    appInst.getUserinfoFn(() => {
      this.setUserinfo()
    })

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
  onPullDownRefresh: function () {
    this.onRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
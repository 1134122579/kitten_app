// pages/scanpage/scanpage.js
import Api from "../../api/index";
import storage from '../../utils/cache'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_quan: false,
    coupon_id: null,
    project_name: null,
    coupon_code: null,
    is_qmcode: true,
    isQcodeshow: true,
    is_sancode: true,
    list: [],
    ClassList: [],
    is_price: null,
    checkboxList: [],
    is_content: false,
    show: false,
    recharge_price: null,
    ge_price: null,
    userId: '',
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
  onQcodeClose() {
    let {
      isQcodeshow
    } = this.data;
    this.setData({
      isQcodeshow: !isQcodeshow,
    });
  },
  inputprice(e) {
    this.setData({
      is_price: null,
      recharge_price: null,
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
      recharge_price,
      userId
    } = this.data;
    if (!recharge_price) {
      wx.showToast({
        title: "请选择或输入金额",
        icon: "none",
      });
      return;
    }
    wx.showModal({
      content: `是否确认充值${recharge_price}元`,
      showCancel: true,
      title: '充值确认',
      success: (result) => {
        if (result.confirm) {

          wx.showLoading({
            title: "支付中...",
          });
          Api.shopRechargeOrder({
            user_id: userId,
            recharge_price,
          }).then((res) => {
            wx.hideLoading()
            wx.showToast({
              title: "购买成功",
            });
            that.setData({
              show: false
            })
          });
        } else if (result.cancel) {
          wx.showToast({
            title: "取消",
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "取消充值",
        });
      },
      complete: (res) => {},
    })

  },
  onHXScanCode() {
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        let {
          result
        } = res;
        let arr = result.split("-")
        let code = arr[1];
        console.log('券码核销',arr)
        if(arr.length<4){
          wx.showToast({
            title: '优惠券错误',
            icon:'none'
          })
          return
        }
        that.setData({
          coupon_code: arr[0],
          project_name: arr[2],
          coupon_id: arr[3],
          is_quan: true
        })
        that.getData(code);
      },
      fail(res) {
        wx.showToast({
          title: "请从新扫码",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
        });
      },
    });
  },
  onHXCode(e) {
    let that=this
    let {
      car_no,
      pay_user_id
    } = e.detail
    let {
      project_name,
      coupon_code,
      coupon_id
    } = this.data
    let {
      shop_id
    } = storage.getUserInfo()
    wx.showModal({
      content: `是否确认核销${project_name}券`,
      showCancel: true,
      title: '核销确认',
      success: (result) => {
        console.log(result)
        if (result.confirm) {
          wx.showLoading({
            title: "核销中...",
          });
          Api.makeOrderUseCoupon({
            coupon_id,
            shop_id,
            car_no,
            coupon_code,
            pay_user_id
          }).then((res) => {
            that.setData({
              is_sancode: true
            })
            wx.hideLoading()
            wx.showToast({
              title: "核销成功",
            });
          });
        } else if (result.cancel) {
          wx.showToast({
            title: "取消核销",
          });
        }
      },
      fail: (res) => {
        // wx.showToast({
        //   title: "取消核销",
        // });
      },
      complete: (res) => {},
    })
  },
  bindinput(e) {
    this.setData({
      recharge_price: e.detail.value,
      ge_price: e.detail.value,
    });
  },
  // 翻页
  gopage(event) {
    let {
      pay_user_id,
      car_no,
      car_type
    } = event.detail;
    
    let {
      is_quan
    } = this.data
    if (is_quan) {
      this.onHXCode(event)
    } else {
      wx.navigateTo({
        url: `/pages/typelistpage/typelistpage?car_no=${car_no}&pay_user_id=${pay_user_id}&car_type=${car_type}`,
      });
    }

  },
  // 券码
  getQmData(user_id) {
    Api.getUserCar({
      user_id
    }).then((res) => {
      this.setData({
        list: res,
        is_qmcode: false,
        is_quan: false,
      });
    });
  },
  //   获取车辆列表
  getData(user_id) {
    Api.getUserCar({
      user_id
    }).then((res) => {
      this.setData({
        list: res,
        is_sancode: false
      });
    });
  },
  onChange(event) {
    this.setData({
      checkboxList: event.detail,
    });
  },

  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},
  onCZCode() {
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        let {
          result
        } = res;
        let code = result.split("-")[1];
        that.setData({
          userId: code,
          show: true
        })
      },
      fail(res) {
        wx.showToast({
          title: "请从新扫码",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
        });
      },
    });
  },

  onScanCode() {

    // 只允许从相机扫码
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        let {
          result
        } = res;
        let code = result.split("-")[1];
        let arr=result.split("-")
        if(arr.length!=2){
          wx.showToast({
            title: '二维码错误',
            icon:'none'
          })
          return
        }
        that.getData(code);
      },
      fail(res) {
        wx.showToast({
          title: "请从新扫码",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
        });
      },
    });
  },
  getClass() {
    Api.getClass().then((res) => {
      this.setData({
        ClassList: res,
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
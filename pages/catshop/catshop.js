// pages/orderpage/order.js
var appInst = getApp();
import Api from "../../api/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
    isStatus: 1,
    isnullList:false,
    listQuery: {
      page: 1
    },
    is_okplayShow: false,
    navHeight: appInst.globalData.navHeight,
    ordertypeList: [{
        title: "最新动态",
        status: 1,
        disabled: false
      },
      {
        title: "相关猫舍",
        status: 2,
        disabled: false
      },
      // {
      //   title: "赛事回顾",
      //   status: 3,
      //   disabled: false
      // }, {
      //   title: "赛事积分",
      //   status: 4,
      //   disabled: false
      // }
    ],
    list: [],
    ssList:[{
      id:1,text:"第一场赛事"
    },{
      id:1,text:"第一场赛事"
    },{
      id:1,text:"第一场赛事"
    }]
  },
  onplayClose() {
    this.setData({
      is_okplayShow: false
    })
  },
  // 赛事积分
  bindpzChange(event) {
    let {
      ssList
    } = this.data
    this.setData({
      // sexIndex: event.detail.value,
      saishiValue: ssList[event.detail.value]['text']
    })
  },
  ontabChange(event) {
    let status = event.detail.name;
    this.setData({
      isStatus: Number(status),
    });
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
      this.getOrderList();
  },

  tag(event) {
    console.log(event);
    let {
      id
    } = event.currentTarget.dataset;
    this.setData({
      isStatus: Number(id),
    });
    this.getOrderList();
  },
  //   获取订单列表
  getOrderList() {
    let {
      listQuery,
      list
    } = this.data;
    Api.get_match(listQuery).then((res) => {
      this.setData({
        isnullList: res.length>0?false:true,
      });
      if( listQuery.page==1){
        this.setData({
          list: res,
        });
      }else{
        this.setData({
          list: list.concat(res),
        });
      }
 
    });
  },
  // 取消
  cancelOrder(event) {
    let {
      out_trade_no
    } = event.detail;
    Api.cancelOrder({
      out_trade_no
    }).then(res => {
      this.getOrderList()
    })
  },
  //   支付成功

  payCarOrder(event) {
    let {
      order_no,
      pay_type
    } = event.detail;
    wx.showLoading({
      title: '支付中...',
      icon: 'none',
      mask: true
    })
    Api.payCarOrder({
      out_trade_no: order_no,
      pay_type,
    }).then((res) => {
      wx.hideLoading()
      if (res.status == 200) {
        this.setData({
          is_okplayShow: true
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

  // 上来
  onBottom(){
      this.data.listQuery.page++
      this.getOrderList()
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
      navHeight: appInst.globalData.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 1);
    this.getOrderList();
    this.setData({
      isStatus:1
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
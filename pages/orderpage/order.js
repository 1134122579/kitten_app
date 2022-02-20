// pages/orderpage/order.js
var appInst = getApp();
import Api from "../../api/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeactive: "",
    searchvalue: '',
    ellipsis: false,
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
    isStatus: 3,
    isnullList: false,
    numlist: [],
    listQuery: {
      page: 1,
      status: 3
    },
    is_okplayShow: false,
    navHeight: appInst.globalData.navHeight,
    ordertypeList: [{
        title: "赛事报名",
        status: 3,
        disabled: false,
      },
      {
        title: "实时赛事",
        status: 1,
        disabled: false,
      },
      {
        title: "赛事回顾",
        status: 2,
        disabled: false,
      },
      {
        title: "赛事积分",
        status: 4,
        disabled: false,
      },
    ],
    list: [],
    ssList: [],
    sjList: [],
    classctive: "幼猫组",
    timeList: [],
    classList: ["幼猫组", "少年组", "少年组2", "少年组3", "少年组4"],
    csiValue: "", //选择城市
    sjiValue: "", //选择时间
    isEmy: false,
  },
  // 搜索
  searchinput(e){
    console.log(e.detail);
    this.setData({
      searchvalue: e.detail.value.trim(),
    });
    if (e.detail.value.trim().length > 3 || !e.detail.value) {
      this.getOrderList();
    }
  },
  // 获取列表
  getSelectMathCity() {
    Api.getSelectMathCity().then((res) => {
      this.setData({
        ssList: res,
        csiValue: ''
      });
    });
    Api.getSelectMathDate().then((res) => {
      this.setData({
        sjList: res,
        sjiValue: '',
      });
    });
    Api.getSelectMathCompetition().then((res) => {
      this.setData({
        timeList: res,
        timeactive: res[0],
      });
    });
    Api.getSelectMathGroup().then((res) => {
      this.setData({
        classList: res,
        classctive: res[0],
      });
    });
  },

  onplayClose() {
    this.setData({
      is_okplayShow: false,
    });
  },
  arrCsClick() {
    if (!this.data.csiValue) return
    this.setData({
      csiValue: "",
      sjiValue: '',
      "listQuery.page": 1
    });
    this.getOrderList();
  },

  arrsjClick() {
    if (!this.data.sjiValue) return
    this.setData({
      sjiValue: "",
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  classChange(event) {
    let {
      name: item
    } = event.detail;
    console.log(item, "赛事组别");
    this.setData({
      classctive: item,
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  bindcsChange(event) {
    let {
      ssList
    } = this.data;
    console.log(event);
    this.setData({
      // sexIndex: event.detail.value,
      csiValue: ssList[event.detail.value],
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  bindsjChange(event) {
    let {
      sjList
    } = this.data;
    console.log(event);
    this.setData({
      // sexIndex: event.detail.value,
      sjiValue: sjList[event.detail.value],
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  // 赛事积分
  bindpzChange(event) {
    let {
      ssList
    } = this.data;
    this.setData({
      // sexIndex: event.detail.value,
      saishiValue: ssList[event.detail.value]["text"],
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  typeChange(event) {
    let {
      name: item
    } = event.detail;
    console.log(item, "赛事日期");
    this.setData({
      timeactive: item,
      "listQuery.page": 1
    });
    this.getOrderList();
  },
  ontabChange(event) {
    let status = event.detail.name;
    this.setData({
      isStatus: status,
      "listQuery.page": 1,
      "listQuery.status": status,
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
      isStatus: id,
    });
    this.getOrderList();
  },
  //   获取订单列表
  async getOrderList() {
    let {
      numlist,
      listQuery,
      list,
      isStatus,
      sjiValue,
      classctive,
      csiValue,
      timeactive,
      searchvalue
    } = this.data;
    let res = [];
    if (isStatus == 4) {
      res = await Api.getMatchScore({
        page: listQuery.page,
        competition: timeactive,
        city: csiValue,
        group: classctive,
        date: sjiValue,
        name: searchvalue,
      });
      this.setData({
        isnullList: res.length > 0 ? false : true,
      });
      if (listQuery.page == 1) {
        this.setData({
          numlist: res,
          isEmy: res.length > 0 ? true : false,
        });
      } else {
        this.setData({
          numlist: numlist.concat(res),
        });
      }
    } else {
      res = await Api.get_match(listQuery);
      res=res.map(item=>{
        item['cover']=item['cover']+'?imageView2/3/w/300'
        return item
      })
      this.setData({
        isnullList: res.length > 0 ? false : true,
      });
      if (listQuery.page == 1) {
        this.setData({
          list: res,
          isEmy: res.length > 0 ? true : false,
        });
      } else {
        this.setData({
          list: list.concat(res),
        });
      }
    }
  },

  // 取消
  cancelOrder(event) {
    let {
      out_trade_no
    } = event.detail;
    Api.cancelOrder({
      out_trade_no,
    }).then((res) => {
      this.getOrderList();
    });
  },
  //   支付成功

  payCarOrder(event) {
    let {
      order_no,
      pay_type
    } = event.detail;
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

  // 上来
  onBottom() {
    this.data.listQuery.page++;
    this.getOrderList();
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
    this.setData({
      navHeight: appInst.globalData.navHeight,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 1);
    this.getSelectMathCity();
    this.setData({
      isStatus: 3,
      "listQuery.status":3
    });
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
  onReachBottom: function () {
    this.onBottom();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
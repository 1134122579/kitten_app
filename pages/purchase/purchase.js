// pages/purchase/purchase.js

import Api from '../../api/index'
import Timefunction from '../../utils/util'
let App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount_price: 0,
    userInfo:{},
    QueueRoomTime_id: "", //
    detail: null,
    date: '',
    WeekDay: [],
    NowM: [],
    getWeeklist: [],
    queryQueueRoomList: [],
    GetDate: '',
    surttime: '', //选中日期
    time_id: '', //选中时间段

  },
  // 时间区间选择
  ontime_(event) {
    console.log(event)
    let {
      timeitem
    } = event.currentTarget.dataset
    // is_queue ==1 可以预约 颜色
    if (timeitem.is_queue == 1) {
      this.setData({
        time_id: timeitem.id
      })
    }
  },
  // 立即预约
  libutton() {
    let {
      detail,
      surttime,
      time_id
    } = this.data
    let that = this
    if (!surttime) {
      wx.showToast({
        title: '请选择日期',
      })
      return
    }
    if (!time_id) {
      wx.showToast({
        title: '请选择时间段',
      })
      return
    }
    wx.showLoading({
      title: '支付中...',
      mask: true,
    })
    Api.payRoomOrder({
      pay_id: detail.id,
      queue_date: surttime,
      time_id
    }).then(res => {
      let {
        nonceStr,
        paySign,
        signType,
        out_trade_no,
        timeStamp
      } = res
      that.queryQueueRoom(this.data.surttime)
      wx.requestPayment({
        nonceStr,
        signType,
        package: res.package,
        paySign,
        timeStamp,
        success(data) {
          Api.queryOrder({
            out_trade_no
          }).then(res => {
            console.log('成功', data)
            wx.showToast({
              title: '预约成功',
              duration: 3000
            })
          })
        },
        complete() {
        
        }
      })
      console.log(res)
    })
  },
  // 选择日期
  onclicktime(event) {
    let {
      day
    } = event.currentTarget.dataset
    console.log(day)
    this.queryQueueRoom(day)
    this.setData({
      surttime: day,
      time_id: ""
    })
  },
  checkMonth(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },

  // 生成年月
  yesar(data) {
    let lastDate = new Date(data);
    let lastYear = lastDate.getFullYear();
    let lastMonth = this.checkMonth(lastDate.getMonth() + 1); // 因日期中的月份表示为0-11，所以要显示正确的月份，需要 + 1
    return lastDate = lastYear + '-' + lastMonth;
  },

  next() {
    let currentDate = new Date(this.data.date)
    let lastDate = currentDate.setMonth(currentDate.getMonth() - 1); // 输出日期格式为毫秒形式
    let oldTime = this.yesar(lastDate)
    let newtime = this.yesar(new Date())
    console.log(oldTime, newtime)
    let newdate = new Date(lastDate).getTime() // 上一个月时间戳
    let olddate = new Date(newtime).getTime() //当前时间戳
    console.log(newdate, olddate)
    if (olddate > newdate) {
      wx.showToast({
        icon: 'error',
        title: '不能小于当前日期',
      })
      return
    }
    this.getime(oldTime)
    this.setData({
      date: oldTime
    })
  },
  add() {
    let currentDate = new Date(this.data.date)
    let nextDate = new Date(currentDate);
    let lastDate = currentDate.setMonth(currentDate.getMonth() + 1); // 输出日期格式为毫秒形式
    let oldTime = this.yesar(lastDate)
    console.log(oldTime)
    this.getime(oldTime)
    this.setData({
      date: oldTime
    })
  },

  getime(newdate) {
    console.log(newdate)
    let date = Timefunction.getDate(new Date())
    console.log(date)
    let WeekDay = Timefunction.getWeekDay()
    let NowM = Timefunction.getNowM(newdate)
    let GetDate = Timefunction.mGetDate()
    let getWeeklist = NowM.map(item => {
      return Timefunction.getWeek(item)
    })

    this.setData({
      getWeeklist,
      GetDate,
      NowM,
      WeekDay
    })
  },
  queryQueueRoom(item) {
    let {
      detail,
      date
    } = this.data
    console.log(detail)
    // let queue_date = date ? date : '2021-10-17'
    Api.queryQueueRoom({
      room_id: detail.id,
      queue_date: item
    }).then(res => {
      console.log(res)
      this.setData({
        queryQueueRoomList: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options
    let that = this
    let date = Timefunction.getDate()
    let newDaty = Timefunction.getDate(new Date().getTime()) //今日日期
    console.log(date)
    Api.getRoomDetails({
      room_id: id
    }).then(res => {
      console.log(res)
      this.setData({
        detail: res,
        surttime: newDaty,
        discount_price: App.globalData.userInfo.discount_price,
        date,
        userInfo:App.globalData.userInfo
      })
      this.queryQueueRoom(newDaty)

      wx.setNavigationBarTitle({
        title: res.name
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getime(this.yesar(new Date()))
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
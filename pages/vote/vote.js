// pages/vote/vote.js
let App = getApp()
import Api from "../../api/index.js";
import {
  formatDate
} from "../../utils/util.js";
import storage from "../../utils/cache.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHeight:0,
    nullImgUrl:"https://img.js.design/assets/img/61b610b6c2794a29534a25bf.jpg",
    navHeight: App.globalData.navHeight,
    active: 1,
    lookList: [1, 2],
    content: '', //活动内容
    activeLookId: "id",
    isNullList: true,
    list: [
      // {
      //   img: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
      // }, {
      //   img: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
      // },
      // {
      //   img: 'https://img.js.design/assets/img/61b610b6c2794a29534a25bf.jpg'
      // },
      // {
      //   img: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
      // },
      // {
      //   img: 'https://img.js.design/assets/img/61b61d30b4e2f6312ab037d8.png'
      // }
    ],
    tabList: [{
      id: "id",
      title: '最新投票'
    }, {
      id: "ticket_num",
      title: '人气排行'
    }, {
      id: 3,
      title: '活动简介'
    }, {
      id: 4,
      title: '评选规则'
    }],
    listQuery: {
      page: 1,
      sort_field: 'id',
      query: '', //编号
    }, //
    sort_fieldList: ["id", "ticket_num"], // 最新，热门
    timeData: {}, //倒计时
  },
  // 获取头部图片大小
  imgLoad(e){
  let {windowWidth,screenHeight}=  wx.getSystemInfoSync()
    let {height,width}=e.detail
   let ratio =width/height
   let imgHeight=windowWidth/ratio
   console.log('获取头部图片大小',imgHeight ,ratio)
this.setData({
  imgHeight
})
  
  },
  // 判断是否登录
  is_load(callback) {
    storage.getToken(res => {
      if (res) {
        callback();
      } else {
        wx.navigateTo({
          url: "/pages/login/login",
        });
      }
    })


  },
  // 投票
  join_vote(e) {
    let {
      id,
      vote_id
    } = e.detail
    this.is_load(res => {
      Api.join_vote({
        id,
        vote_id
      }).then(res => {
        console.log("投票成功", res)
        wx.showToast({
          title: '投票成功',
        })
      })
    })
  },
  onSearch() {
    let {
      sort_fieldList,
      activeLookId,
      listQuery
    } = this.data
    if (!sort_fieldList.includes(activeLookId)) {
      this.setData({
        "listQuery.sort_field": "id"
      })
    }
    if (!listQuery.query) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
      return
    }
    this.getData()
  },
  // 搜索
  bindinput: function (e) {
    this.setData({
      "listQuery.query": e.detail.value.trim(),
      "listQuery.page": 1
    })
  },
  onClick(event) {
    let key = event.detail.name
    let {
      sort_fieldList
    } = this.data
    this.setData({
      activeLookId: key,
      "listQuery.page": 1,
      "listQuery.sort_field": key
    })
    if (sort_fieldList.includes(key)) {
      this.getData()
    } else {
      // console.log(key,"key")
      // switch (key) {
      //   case 3:
      //     this.get_vote_rule()
      //     break;
      //   default:
      //     break;
      // }
    }
  },
  onBottom() {
    this.data.listQuery.page++
    this.getData();
  },
  // 倒计时
  oncountChange(e) {
    this.setData({
      timeData: e.detail
    })
  },
  // 获取信息
  get_vote_rule() {
    Api.get_vote_rule().then(res => {
      console.log('get_vote_rule', res)
      res['djs_time'] = res['end_time'] * 1000 - (+new Date())
      res['end_time'] = formatDate(res['end_time'])
      res['start_time'] = formatDate(res['start_time'])
      this.setData({
        content: res
      })
    })
  },
  // 报名
  goBaobutton() {
    let {
      id
    } = this.data.content
    this.is_load(res => {
      wx.navigateTo({
        url: `/pages/enrollpage/enrollpage?vote_id=${id}`,
      })
    })
  },
  // 获取列表
  getData() {
    let {
      listQuery,
      list
    } = this.data
    Api.catVoteList(listQuery).then(res => {
      this.setData({
        isNullList: res.length <= 0 ? false : true
      })
      if (listQuery.page == 1) {
        console.log('catVoteList', listQuery, res)
        this.setData({
          list: res
        })
      } else {
        this.setData({
          list: list.concat(res)
        })
      }
    })
  },

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
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
    this.getData()
    this.get_vote_rule()
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
    this.onBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
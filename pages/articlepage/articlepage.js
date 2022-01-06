// pages/matchdetail/matchdetail.js
import Api from '../../api/index'
let App = getApp()
import {
  formatDate
} from '../../utils/util'
import {
  formatTime
} from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: App.globalData.navHeight,
    value: '',
    hfItem: {},
    isHf: false,
    is_zplList: [],
    autosize: {
      maxHeight: 250,
      minHeight: 100
    },
    page: 1,
    show: false,
    CommentList: [],
    user_id: '',
    dynamic_id: '',
    // 1 长毛组 2  中长毛组  3  短毛组  4  东方体别  5  无毛组别
    levelList: [{
      id: 1,
      text: '长毛组'
    }, {
      id: 2,
      text: '中长毛组'
    }, {
      id: 3,
      text: '短毛组'
    }, {
      id: 4,
      text: '东方体别'
    }, {
      id: 5,
      text: '无毛组别'
    }],
    is_zanDynamic: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    nullheaderImage: 'https://img.js.design/assets/img/61b44a697eee4352133690cc.png',
    getData: {},
    timeData: {}
  },
  onPl() {
    this.setData({
      show: true,
      isHf: false,
    })
  },
  onhf(e) {
    let {
      item
    } = e.currentTarget.dataset
    this.setData({
      show: true,
      isHf: true,
      hfItem: item
    })
  },
  // 文章点赞
  zanDynamic() {
    let {
      dynamic_id,
      is_zanDynamic,
    } = this.data
    if (is_zanDynamic) {
      wx.showToast({
        title: '已经点赞',
        icon: 'none'
      })
      return
    }

    Api.zanDynamic({
      dynamic_id,
    }).then(res => {
      wx.showToast({
        title: '点赞成功',
        icon: 'none'
      })
      this.setData({
        is_zanDynamic: true
      })
    })
  },
  // 点赞
  zanComment(e) {
    let {
      item: {
        dynamic_id,
        id: comment_id
      }
    } = e.currentTarget.dataset
    let {
      is_zplList
    } = this.data

    if (is_zplList.includes(comment_id)) {
      wx.showToast({
        title: '已点赞',
        icon: 'none'
      })
      return
    }
    Api.zanComment({
      dynamic_id,
      comment_id
    }).then(res => {
      wx.showToast({
        title: '点赞成功',
        icon: 'none'
      })
      this.setData({
        is_zplList: is_zplList.concat([comment_id])
      })
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  group_idFunction(data) {
    let {
      levelList
    } = this.data
    let value = ''
    levelList.forEach(item => {
      if (item.id == data) {
        value = item.text
      }
    })
    return value
  },
  addComment() {
    let {
      value: content,
      dynamic_id,
      isHf,
      hfItem
    } = this.data
    if (!content.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }
    if (!isHf) {
      Api.addComment({
        content,
        dynamic_id
      }).then(res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
        })
        this.setData({
          page: 1,
          show: false
        })
        this.getComment()
        this.getDynamicDetails()
      })
    } else {
      Api.replyComment({
        content,
        dynamic_id,
        comment_id: hfItem.id
      }).then(res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
        })
        this.setData({
          page: 1,
          show: false
        })
        this.getComment()
        this.getDynamicDetails()
      })
    }

  },
  // 倒计时
  oncountChange(e) {
    this.setData({
      timeData: e.detail
    })
  },
  onpullpage() {
    (this.data.page) ++
    this.getComment()
  },
  timeList(res) {
    if (!Array.isArray(res)) {
      return
    }
    if (res.length > 0) {
      res = res.map(item => {
        item['create_time'] = formatTime(new Date(item['create_time']))
        item['replys'] = this.timeList(item['replys'])
        return item
      })
      return res
    } else {
      return []
    }
  },

  // 获取评论
  getComment() {
    let {
      dynamic_id,
      page,
      CommentList
    } = this.data
    Api.getComment({
      dynamic_id,
      page
    }).then(res => {
      res = this.timeList(res)
      console.log(res, 112132123)
      if (page == 1) {
        this.setData({
          CommentList: res
        })
      } else {
        this.setData({
          CommentList: CommentList.concat(res)
        })
      }

    })
  },
  goBaobutton() {
    let {
      id
    } = this.data.getData
    wx.navigateTo({
      url: `/pages/matchenroll/matchenroll?match_id=${id}`,
    })
  },
  // 过去详情
  getDynamicDetails() {
    let {
      user_id,
      dynamic_id
    } = this.data
    Api.getDynamicDetails({
      user_id,
      dynamic_id
    }).then(res => {
      console.log(res, '文章详情')
      this.setData({
        getData: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      user_id,
      dynamic_id
    } = options
    this.setData({
      user_id,
      dynamic_id
    })
    this.getDynamicDetails()
    this.getComment()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.onpullpage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let {
      getData
    } = this.data
    return {
      title: getData.title,
      imageUrl: getData.cover
    }
  }
})
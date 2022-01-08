// pages/videopage/videopage.js
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
    dynamic_id: '',
    value: '',
    hfItem: '',
    is_zplList:[],//点赞
    isHf: false,
    isPlShow: false,
    isPlay: true,
    videoHeight: 0,
    contentBottom: 0,
    CommentList: [], //评论
    showcenterplaybtn: false, //是否显示视频中间的播放按钮
    enableplaygesture: false, //是否开启播放手势，即双击切换播放/暂停
    enableprogressgesture: false, //是否开启控制进度的手势
    showfullscreenbtn: false, //是否显示全屏按钮
    controls: false, //是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
    is_zanDynamic: false,
    playbtnposition: 'center', //	播放按钮的位置
    navHeight: App.globalData.navHeight,
    page: 1,
    is_Zk: false, //展开
    is_Zkbutton: false,
    getData: {}
  },
  // 查看评论
  onlookPl() {
    this.setData({
      isPlShow: true
    })
  },
  onClose() {
    this.setData({
      isPlShow: false,
      isHf:false,
      value:''
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
  // 翻页
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
  // 获取详情
  getDynamicDetails() {
    let {
      user_id,
      dynamic_id
    } = this.data
    Api.getDynamicDetails({
      user_id,
      dynamic_id
    }).then(res => {
      console.log(res, '视频详情')
      let is_length = res.desc.length > 30
      res['desccopy'] = `${res['desc'].slice(0,25)}...`
      // 判断简介长度
      this.setData({
        getData: res,
        is_Zk: is_length ? true : false,
        is_Zkbutton: is_length ? true : false,
      })
    })
  },
  ontextLook() {
    this.setData({
      is_Zk: !this.data.is_Zk
    })
  },
  // 获取底部样式
  getFooterStyle() {
    var query = wx.createSelectorQuery()
    var that = this;
    query.select('.foolter').boundingClientRect(function (rect) {
      console.log(rect);
      that.setData({
        contentBottom: `${rect.height}px`,
        videoHeight: `${rect.top}px`
      })
      // console.log(that.data.objHeight);
    }).exec();
  },
  // 评论
  onPl() {
    this.setData({
      show: true,
      isHf: false,
    })
  },
  // 回复
  onhf(e) {
    let {
      item
    } = e.currentTarget.dataset
    this.setData({
      show: true,
      isHf: true,
      value:'',
      hfItem: item
    })
  },
  bindblur(e) {
    console.log('评论', e)
    this.setData({
      value: e.detail.value
    })
  },
  // 发布评论
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
  // 开始播放
  bindplay() {
    console.log('开始播放')
    this.setData({
      isPlay: false,
    })
  },
  // 暂停
  bindpause() {
    console.log('暂停')
    this.setData({
      isPlay: true,
    })
  },
  // 播放
  bindPlayVideo() {
    console.log('1')
    let {
      isPlay
    } = this.data
    if (this.data.isPlay) {
      this.videoContext.play()

    } else {
      this.videoContext.pause()
    }
    this.setData({
      isPlay: !isPlay,
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
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFooterStyle()
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
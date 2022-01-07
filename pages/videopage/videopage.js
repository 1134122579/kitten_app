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
    enableplaygesture:true,//是否开启播放手势，即双击切换播放/暂停
    enableprogressgesture:false,//是否开启控制进度的手势
    showfullscreenbtn:false,//是否显示全屏按钮
    controls:false,//是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
    is_zanDynamic:false,
    playbtnposition:'center',//	播放按钮的位置
    navHeight: App.globalData.navHeight,
    page: 1,
    getData:{}
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
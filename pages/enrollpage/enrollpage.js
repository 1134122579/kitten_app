// pages/enrollpage/enrollpage.js
let App=getApp()
import Api from "../../api/index";
import {
  getDate
} from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat_name: "", //姓名
    sex: null, //性别
    birthday: "", //生日
    vote_id: '',
    desc:'',
    level: '',
    levelIndex: null,
    sexIndex: null,
    voteIndex: null,
    autoSize: {
      maxHeight: 200,
      minHeight: 100
    },
    endTime: "2022-01-01",
    levelList: [{
      id: 1,
      text: '第一级别'
    }, {
      id: 2,
      text: '第二级别'
    }],
    voteList: [{
      id: 1,
      text: '第一期'
    }, {
      id: 2,
      text: '第二期'
    }],
    sexList: [{
      id: 1,
      text: '公'
    }, {
      id: 2,
      text: '母'
    }],
  },
  // 上传
  afterRead(event) {
    let that = this
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.showLoading({
      title: '上传中..',
      mask: true
    })
    console.log("afterRead", file.url);
    wx.uploadFile({
      url: App.globalData.baseUrl + "upImage", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      success(res) {
        // 上传完成需要更新 fileList
        res = JSON.parse(res.data);
        console.log(res ,"upImage");
        let fileList = [{
          ...file,
          url: res.data.imgLink
        }]
        that.setData({
          fileList
        });
      },
      complete(){
        wx.hideLoading()
      }
    });
  },
  // 删除
  deleteImage() {
    this.setData({
      fileList: [],
    })
  },
  // 性别
  bindsexChange(event) {
    let {
      sexList
    } = this.data
    this.setData({
      sexIndex: event.detail.value,
      sex: sexList[event.detail.value]['id']
    })
  },
  // 投票期数
  bindvoteChange(event) {
    let {
      voteList
    } = this.data
    this.setData({
      voteIndex: event.detail.value,
      vote_id: voteList[event.detail.value]['id']
    })
  },
  // 级别
  bindlevelChange(event) {
    let {
      levelList
    } = this.data
    this.setData({
      levelIndex: event.detail.value,
      level: levelList[event.detail.value]['id']
    })
  },
  // 生日
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  // 提交
  onClick() {
    let {
      cat_name,
      fileList,
      sex,
      level,
      desc,
      vote_id
    } = this.data
    let img = fileList?.[0]?.url
    if (!img) {
      wx.showToast({
        title: "请上传图片",
        icon: "none",
      });
      return;
    }
    if (!cat_name.trim()) {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
      });
      return;
    }
    if (!sex) {
      wx.showToast({
        title: "请选择性别",
        icon: "none",
      });
      return;
    }
    // if (!level) {
    //   wx.showToast({
    //     title: "请选择级别",
    //     icon: "none",
    //   });
    //   return;
    // }
    if (!desc) {
      wx.showToast({
        title: "请输入简介信息 ",
        icon: "none",
      });
      return;
    }
    wx.showLoading({
      title: '报名中..',
      mask: true
    })
    Api.JoinCatVote({
      cat_name,
      img,
      sex,
      desc,
      level,
      vote_id
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '参赛成功，1.5秒自动返回',
        icon: "none",
        mask: true,
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500);
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vote_id: options.vote_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      endTime: getDate(new Date())
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
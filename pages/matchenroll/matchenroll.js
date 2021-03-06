// pages/enrollpage/enrollpage.js
let App = getApp()
import Api from "../../api/index";
import {
  getDate
} from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_id: '',
    cat_pz: '',
    sex: null, //性别
    cat_name: "", //姓名
    color: '', //颜色
    birthday: "", //生日
    eye_color: "", //眼睛颜色
    register_no: "", //编号
    father_name: '', //
    father_pz: '',
    father_color: '',
    father_register_no: '',
    mother_pz: '',
    mother_color: '',
    mother_name: '',
    mother_register_no: '',
    group_id: '', //组别*
    match_id: '', //FUN SHOW
    desc: '',
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
    PzList: [{
      id: 1,
      text: '波斯猫'
    }, {
      id: 2,
      text: '波斯猫2'
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
        console.log(res, "upImage");
        let fileList = [{
          ...file,
          url: res.data.imgLink
        }]
        that.setData({
          fileList
        });
      },
      complete() {
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
  // 品种
  bindpzChange(event) {
    let {
      PzList
    } = this.data
    this.setData({
      // sexIndex: event.detail.value,
      cat_pz: PzList[event.detail.value]['text']
    })
  },
    // mother品种
    bindmotherpzChange(event) {
      let {
        PzList
      } = this.data
      this.setData({
        // sexIndex: event.detail.value,
        mother_pz: PzList[event.detail.value]['text']
      })
    },
        // father品种
        bindfatherpzChange(event) {
          let {
            PzList
          } = this.data
          this.setData({
            // sexIndex: event.detail.value,
            father_pz: PzList[event.detail.value]['text']
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
      match_id: voteList[event.detail.value]['id']
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
      level,
      cat_pz,
      sex,
      cat_name,
      color,
      birthday,
      eye_color,
      register_no,
      father_name,
      father_pz,
      father_color,
      father_register_no,
      mother_pz,
      mother_color,
      mother_name,
      mother_register_no,
      group_id,
      match_id,
    } = this.data
    if (this.checkUpQuery()) {
      wx.showLoading({
        title: '报名中..',
        mask: true
      })
      Api.joinMatch(this.data).then(res => {
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
    }

  },
  // 校验上传数据
  checkUpQuery() {
    let {
      level,
      cat_pz,
      sex,
      cat_name,
      color,
      birthday,
      eye_color,
      register_no,
      father_name,
      father_pz,
      father_color,
      father_register_no,
      mother_pz,
      mother_color,
      mother_name,
      mother_register_no,
      group_id,
      match_id,
    } = this.data
    // let img = fileList?.[0]?.url
    // if (!img) {
    //   wx.showToast({
    //     title: "请上传图片",
    //     icon: "none",
    //   });
    //   return;
    // }
    if (!cat_name.trim()) {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
      });
      return;
    }
    if (!cat_pz.trim()) {
      wx.showToast({
        title: "请输入品种",
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
    if (!color.trim()) {
      wx.showToast({
        title: "请输入颜色",
        icon: "none",
      });
      return;
    }
    if (!eye_color.trim()) {
      wx.showToast({
        title: "请输入耳朵颜色",
        icon: "none",
      });
      return;
    }
    if (!register_no.trim()) {
      wx.showToast({
        title: "请输入证书编号",
        icon: "none",
      });
      return;
    }
    if (!father_name.trim()) {
      wx.showToast({
        title: "请输入父亲名字",
        icon: "none",
      });
      return;
    }
    if (!father_pz.trim()) {
      wx.showToast({
        title: "请输入父亲品种",
        icon: "none",
      });
      return;
    }
    if (!father_color.trim()) {
      wx.showToast({
        title: "请输入父亲颜色",
        icon: "none",
      });
      return;
    }
    if (!father_register_no.trim()) {
      wx.showToast({
        title: "请输入父亲证书编号",
        icon: "none",
      });
      return;
    }
    if (!mother_pz.trim()) {
      wx.showToast({
        title: "请输入母亲证书编号",
        icon: "none",
      });
      return;
    }
    if (!mother_color.trim()) {
      wx.showToast({
        title: "请输入母亲颜色",
        icon: "none",
      });
      return;
    }
    if (!mother_name.trim()) {
      wx.showToast({
        title: "请输入母亲名字",
        icon: "none",
      });
      return;
    }
    if (!mother_register_no.trim()) {
      wx.showToast({
        title: "请输入母亲编号",
        icon: "none",
      });
      return;
    }
    if (!group_id.trim()) {
      wx.showToast({
        title: "请选择参赛组别",
        icon: "none",
      });
      return;
    }
    if (!match_id.trim()) {
      wx.showToast({
        title: "请选择FUN SHOW",
        icon: "none",
      });
      return;
    }
    return true

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: options?.match_id
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
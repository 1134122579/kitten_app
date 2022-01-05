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
    fileList: [],
    is_jueyutext: '',
    is_jueyu: '',
    match_id: '',
    cat_pz: '',
    sex: null, //性别
    cat_name: "", //姓名
    color: '', //颜色
    birthday: "", //生日
    eye_color: "", //眼睛颜色
    register_no: "", //编号
    father_name: '', //
    weight: '',
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
    cat_status: '',
    cat_statustext: '',
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
    statusList: [{
      id: 1,
      text: '展示'
    }, {
      id: 2,
      text: '待售 '
    }, {
      id: 3,
      text: '种公'
    }, {
      id: 4,
      text: '种母'
    }],
    PzList: [],
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
    jueyuList: [{
      id: 1,
      text: '是'
    }, {
      id: 2,
      text: '否'
    }],
    xuexingList: [{
      id: 1,
      text: 'A'
    }, {
      id: 2,
      text: 'B'
    }, {
      id: 3,
      text: 'AB'
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
    const {
      fileList = []
    } = this.data;
    wx.uploadFile({
      url: App.globalData.baseUrl + "upImage", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      success(res) {
        // 上传完成需要更新 fileList
        res = JSON.parse(res.data);
        console.log(res, "upImage");
        fileList.push({
          ...file,
          url: res.data.imgLink
        })
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
  deleteImage(e) {
    let deleItem = e.detail
    let {
      fileList
    } = this.data
    this.setData({
      fileList: fileList.filter(item => item.url != deleItem.file.url)
    })
  }, // 获取标签
  getHotLable() {
    Api.getHotLable().then(res => {
      this.setData({
        PzList: res
      })
    })
  },
  // 品种
  bindpzChange(event) {
    let {
      PzList
    } = this.data
    this.setData({
      cat_pz: PzList[event.detail.value]['name']
    })
  },
  // 绝育
  bindjueyuChange(event) {
    let {
      jueyuList
    } = this.data
    this.setData({
      is_jueyu: jueyuList[event.detail.value]['id'],
      is_jueyutext: jueyuList[event.detail.value]['text'],
    })
  },
  // 血型
  bindxuexingChange(event) {
    let {
      xuexingList
    } = this.data
    this.setData({
      blood_type: xuexingList[event.detail.value]['text'],
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
  bindstatusChange(event) {
    let {
      statusList
    } = this.data
    this.setData({
      cat_status: statusList[event.detail.value]['id'],
      cat_statustext: statusList[event.detail.value]['text']
    })
  },
  // 类别
  bindlevelChange(event) {
    let {
      levelList
    } = this.data
    this.setData({
      group_id: levelList[event.detail.value]['id'],
      group_name: levelList[event.detail.value]['text']
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
      birthday,
      sex,
      cat_pz,
      color,
      fileList,
      group_id,
      desc,
      is_jueyu,
      blood_type,
      weight,
      cat_status,
    } = this.data
    if (this.checkUpQuery()) {
      wx.showLoading({
        title: '添加中..',
        mask: true
      })
      let img = fileList.map(item => item.url)
      Api.add_cat({
        cat_name,
        birthday,
        sex,
        cat_pz,
        color,
        group_id,
        desc,
        is_jueyu,
        blood_type,
        img,
        weight,
        cat_status,
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '添加成功，1.5秒自动返回',
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
      cat_pz,
      sex,
      desc,
      weight,
      fileList,
      cat_name,
      color,
      is_jueyu,
      blood_type,
      cat_status,
      birthday,
      group_id,
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
    if (!weight.trim()) {
      wx.showToast({
        title: "请输入体重",
        icon: "none",
      });
      return;
    }
    if (!birthday.trim()) {
      wx.showToast({
        title: "请选择生日",
        icon: "none",
      });
      return;
    }
    if (!is_jueyu) {
      wx.showToast({
        title: "请选择是否绝育",
        icon: "none",
      });
      return;
    }
    if (!group_id) {
      wx.showToast({
        title: "请选择类别",
        icon: "none",
      });
      return;
    }
    if (!cat_status) {
      wx.showToast({
        title: "请选择组别",
        icon: "none",
      });
      return;
    }

    if (!blood_type.trim()) {
      wx.showToast({
        title: "请选择血型",
        icon: "none",
      });
      return;
    }

    if (!desc.trim()) {
      wx.showToast({
        title: "请输入简介",
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
    this.getHotLable()
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
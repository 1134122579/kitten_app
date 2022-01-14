// pages/userInfo/userInfo.js

import Api from "../../api/index";
import Cache from "../../utils/cache";
import utils from "../../utils/util";
import {
  getDate
} from "../../utils/util";
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    endTime:"2022-01-01",
    fileList: [],
    isshow: false,
    mobile: "",
    name: "",
    desc:'',
    birthday: "", //生日
    signature: "", //签名
    home_name:'',
    currentDate: new Date().getTime(),
    minDate: new Date("1950-01-01").getTime(),
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
  },
  afterRead(event) {
    let that = this
    const {
      file
    } = event.detail;
    console.log("afterRead", event);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.showLoading({
      title: '上传中..',
      mask:true
    })
    wx.uploadFile({
      url:App.globalData.baseUrl+ "upImage", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      success(res) {
        // 上传完成需要更新 fileList
        res = JSON.parse(res.data);
        console.log(res.data.imgLink, "upImage");
        let fileList = [{
          ...file,
          url: res.data.imgLink
        }]
        that.setData({
          fileList
        });
        wx.hideLoading()
      },
    });
  },
  oncancel() {
    this.setData({
      isshow: false,
    });
  },
  clickInput() {
    this.setData({
      isshow: true,
    });
  },
  onconfirm(event) {
    let birthday = utils.getDate(event.detail);
    this.setData({
      birthday: birthday,
      currentDate: event.detail,
      isshow: false,
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  // 获取用户信息
  getUserinfo() {
    let userInfo = Cache.getUserInfo();
    let {
      mobile,
      name,
      birthday,
      signature,
      photo,
      headimgurl,
      address,desc,
      home_name
    } = userInfo;
    this.setData({
      mobile,
      name,
      headimgurl,
      home_name,
      birthday,
      signature,
      photo,
      address,desc,
      fileList: headimgurl ? [{
        url: headimgurl
      }] : []
    });
    return;
  },
  deleteImage() {
    this.setData({
      fileList: [],
    })
  },

  editUser() {
    let {
      mobile,
      name,
      birthday,
      signature,
      photo,
      address,
      fileList,
      desc,
      home_name
    } = this.data;
    photo = fileList?.[0]?.url
    if (!photo) {
      wx.showToast({
        title: "请上传头像！",
        icon: "none",
      });
      return;
    }
    if (!name) {
      wx.showToast({
        title: "请输入用户名",
        icon: "none",
      });
      return;
    }
    if (!mobile) {
      wx.showToast({
        title: "请输入手机号",
        icon: "none",
      });
      return;
    }

    // if (!birthday) {
    //   wx.showToast({
    //     title: "请输入生日",
    //     icon: "none",
    //   });
    //   return;
    // }
    if (!home_name) {
      wx.showToast({
        title: "请输入猫舍名字",
        icon: "none",
      });
      return;
    }
    // if (!signature) {
    //   wx.showToast({
    //     title: '请输入签名',
    //   })
    // }
    wx.showLoading({
      title: "上传中",
      mask: true,
    });
    Api.editUserInfo({
        mobile,
        name,
        birthday,
        signature,
        photo,
        address,
        desc,
        home_name
      })
      .then((res) => {
        Api.getUserInfo().then((res) => {
          App.globalData.userInfo = res;
          Cache.setUserInfo(res);
          wx.hideLoading();
          wx.showToast({
            title: "修改成功！",
            duration: 2000,
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 2500);
        });
      })
      .catch(() => {
        wx.hideLoading();
      });
  },
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "个人信息",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      endTime:getDate(new Date())
    })
    this.getUserinfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
// pages/enrollpage/enrollpage.js
let App = getApp();
import Api from "../../api/index";
import { getDate } from "../../utils/util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    maxcount: 8,
    title: "",
    address: "",
    match_id: "",
    label: "",
    type: 1,
    sex: null, //性别
    cat_name: "", //姓名
    color: "", //颜色
    birthday: "", //生日
    eye_color: "", //眼睛颜色
    register_no: "", //编号
    father_name: "", //
    father_pz: "",
    father_color: "",
    father_register_no: "",
    mother_pz: "",
    mother_color: "",
    mother_name: "",
    mother_register_no: "",
    group_id: "", //组别*
    match_id: "", //FUN SHOW
    desc: "",
    level: "",
    levelIndex: null,
    sexIndex: null,
    voteIndex: null,
    autoSize: {
      maxHeight: 200,
      minHeight: 100,
    },
    endTime: "2022-01-01",
    levelList: [
      {
        id: 1,
        text: "第一级别",
      },
      {
        id: 2,
        text: "第二级别",
      },
    ],
    PzList: [],
    voteList: [
      {
        id: 1,
        text: "第一期",
      },
      {
        id: 2,
        text: "第二期",
      },
    ],
    sexList: [
      {
        id: 1,
        text: "公",
      },
      {
        id: 2,
        text: "母",
      },
    ],
  },
  showPopup() {
    this.setData({ show: true });
  },
  onclosebuttonPopup() {
    this.setData({ show: false });
  },

  onClose() {
    this.setData({ show: false });
  },

  // 获取标签
  getHotLable() {
    Api.getHotLable().then((res) => {
      this.setData({
        PzList: res,
      });
    });
  },
  // 获取个位置
  getlocation() {
    console.log(1);
    let that = this;
    App.isGetlocation((res)=>{
      const latitude = res.latitude;
          const longitude = res.longitude;
          wx.chooseLocation({
            latitude,
            longitude,
            success(res) {
              console.log(res);
              that.setData({
                address: res.address,
              });
            },
          });
          return
      wx.getLocation({
        type: "gcj02", //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          wx.chooseLocation({
            latitude,
            longitude,
            success(res) {
              console.log(res);
              that.setData({
                address: res.address,
              });
            },
          });
        },
      });
    })
 
  },
  // 上传前
  beforeread(event) {
    console.log(event, "event");
    let {
      file: { duration, size, type, url },
      callback,
    } = event.detail;
    let isSize = size / 1024 / 1024;
    let typenum = type == "image" ? 1 : 2;
    this.setData({
      maxcount: type == "image" ? 8 : 1,
      type: typenum,
    });
    callback(true);
    return;
    isSize > 20 && callback(false); //判断大小
    callback(true);
    wx.showLoading({
      title: "上传中..",
    });
  },
  // 上传
  afterRead(event) {
    let that = this;
    const { file } = event.detail;
    const { fileList = [] } = that.data;
    console.log(file, "视频");
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    if (fileList.length > 0 && file.type != "image") {
      wx.showToast({
        title: "已上传图片无法选择视频",
        icon: "none",
      });
      return;
    }
    // 视频裁剪
    if (file.type == "video") {
      wx.openVideoEditor({
        filePath: file.url,
        success(res) {
          // duration	number	剪辑后生成的视频文件的时长，单位毫秒（ms）
          // size	number	剪辑后生成的视频文件大小，单位字节数（byte）
          // tempFilePath	string	编辑后生成的视频文件的临时路径
          // tempThumbPath	string	编辑后生成的缩略图文件的临时路径
          let { duration, size, tempFilePath, tempThumbPath } = res;
          let isSize = size / 1024 / 1024;
          //判断大小
          if (isSize > 20) {
            wx.showToast({
              title: "视频不能超过20m",
            });
            return;
          }
          console.log(res, 12123123);
          that.uploadFile(fileList, { url: tempFilePath, size, duration });
        },
        complete(res) {
          console.log(res, "complete");
        },
      });
      return;
    }
    console.log("afterRead", file);
    that.uploadFile(fileList, file);
  },
  // 文件上传
  uploadFile(fileList, file) {
    let that = this;
    wx.showLoading({
      title: "上传中..",
      mask: true,
    });
    wx.uploadFile({
      url: App.globalData.baseUrl + "upImage", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      success(res) {
        // 上传完成需要更新 fileList
        res = JSON.parse(res.data);
        // console.log(res, "upImage");
        // let fileList = [{
        //   ...file,
        //   url: res.data.imgLink
        // }]
        fileList.push({
          ...file,
          url: res.data.imgLink,
        });
        that.setData({
          fileList,
        });
      },
      complete() {
        wx.hideLoading();
      },
    });
  },
  // 删除
  deleteImage(e) {
    let { fileList } = this.data;
    console.log(e);
    let delitem = e.detail;
    this.setData({
      fileList: fileList.filter((item) => item.url != delitem.file.url),
    });
  },
  // 品种
  bindpzChange(event) {
    let { PzList } = this.data;
    this.setData({
      // sexIndex: event.detail.value,
      label: PzList[event.detail.value]["name"],
    });
  },
  // 性别
  bindsexChange(event) {
    let { sexList } = this.data;
    this.setData({
      sexIndex: event.detail.value,
      sex: sexList[event.detail.value]["id"],
    });
  },
  // 投票期数
  bindvoteChange(event) {
    let { voteList } = this.data;
    this.setData({
      voteIndex: event.detail.value,
      match_id: voteList[event.detail.value]["id"],
    });
  },
  // 级别
  bindlevelChange(event) {
    let { levelList } = this.data;
    this.setData({
      levelIndex: event.detail.value,
      level: levelList[event.detail.value]["id"],
    });
  },
  // 生日
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value,
    });
  },
  // 提交
  onClick() {
    let { label, fileList, desc, title, type } = this.data;
    let link_url = fileList.map((item) => item.url);
    if (this.checkUpQuery()) {
      wx.showLoading({
        title: "发布中..",
        mask: true,
      });
      Api.addDynamic({
        label,
        link_url,
        desc,
        title,
        type,
      }).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: "添加成功，1.5秒自动返回",
          icon: "none",
          mask: true,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
      });
    }
  },
  // 校验上传数据
  checkUpQuery() {
    let {
      level,
      sex,
      cat_name,
      color,
      title,
      fileList,
      label,
      address,
      desc,
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
    } = this.data;
    let img = fileList?.[0]?.url;
    if (!img) {
      wx.showToast({
        title: "请上传文件",
        icon: "none",
      });
      return;
    }
    if (!title.trim()) {
      wx.showToast({
        title: "请输入标题",
        icon: "none",
      });
      return;
    }
    if (!label.trim()) {
      wx.showToast({
        title: "请选择标签",
        icon: "none",
      });
      return;
    }
    if (!desc) {
      wx.showToast({
        title: "请输入内容",
        icon: "none",
      });
      return;
    }
    if (!address) {
      wx.showToast({
        title: "请选择地点",
        icon: "none",
      });
      return;
    }
    return true;
  },
  bindbqclick(e) {
    console.log(e);
    this.setData({
      label: e.currentTarget.dataset.item.name,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   match_id: options?.match_id
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      endTime: getDate(new Date()),
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHotLable();
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

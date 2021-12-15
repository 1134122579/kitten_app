// pages/storelist/storelist.js
import Api from "../../api/index";
import storge from "../../utils/cache";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
let App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    fileList: [],
    car_photo: '',
    car_no: "", //车牌号
    brand_name: "", //	车辆品牌
    car_color: "", //车辆颜色
    vin_no: "", //	车架号
    car_type: "", //	车辆类型
    show: false,
    car_typeList: ["轿车", "suv", "mpv", "跑车", "皮卡", "微面"],
    isCardTypeshow: false,
    list: [],
  },
  afterRead(event) {
    let that = this
    const {
      file
    } = event.detail;
    console.log("afterRead", event);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: App.globalData.baseUrl + "/upCarImage", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      success(res) {
        // 上传完成需要更新 fileList
        res = JSON.parse(res.data);
        console.log(res.data.imgLink, "upImage");
        // const {
        //   fileList = []
        // } = that.data;
        // fileList.push({
        //   ...file,
        //   url: res.data.imgLink
        // });
        let fileList = [{
          ...file,
          url: res.data.imgLink
        }]
        that.setData({
          fileList,
          car_no: res.data.car_no
        });
        wx.hideLoading()
      },
    });
  },
  deleteImage() {
    this.setData({
      fileList: [],
    })
  },
  eidtClick(event) {
    let {
      car_photo,
      car_no,
      brand_name,
      car_color,
      vin_no,
      car_type,
      id
    } = event.detail
    this.setData({
      fileList: [{
        url: car_photo
      }],
      id,
      car_photo,
      car_no,
      brand_name,
      car_color,
      vin_no,
      car_type,
      show: true,
    })
    console.log('eidtClick', event)
  },
  oncancel() {
    this.setData({
      isCardTypeshow: false,
    });
  },
  onconfirm(event) {
    const {
      value,
      index
    } = event.detail;
    this.setData({
      car_type: value,
      isCardTypeshow: false,
    });
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
  },
  clickInput() {
    this.setData({
      isCardTypeshow: true,
    });
  },
  onAdd() {
    this.setData({
      show: false,
    });
  },
  setAdd() {
    let {
      id,
      fileList,
      car_photo,
      car_no,
      brand_name,
      car_color,
      vin_no,
      car_type
    } = this.data;
    car_photo = fileList?.[0]?.url
    if (!car_photo) {
      wx.showToast({
        title: "请车辆照片！",
        icon: "none",
      });
      return;
    }
    if (!car_no) {
      wx.showToast({
        title: "请输入车牌号",
        icon: "none",
      });
      return;
    }
    // if (!brand_name) {
    //   wx.showToast({
    //     title: "请输入车辆品牌",
    //     icon: "none",
    //   });
    //   return;
    // }
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    if (!id) {
      Api.addCar({
        car_photo,
        car_no,
        brand_name,
        car_color,
        vin_no,
        car_type
      }).then(
        (res) => {
          wx.hideLoading();
          this.getData()
          wx.showToast({
            title: "添加成功",
            icon: "none",
            image: "",
            duration: 1500,
            mask: false,
          });
    App.getUserinfoFn()
          
          this.setData({
            show: false,
          });
        }
      );
    } else {
      Api.editCar({
        id,
        car_photo,
        car_no,
        brand_name,
        car_color,
        vin_no,
        car_type
      }).then(
        (res) => {
          wx.hideLoading();
          this.getData()

          wx.showToast({
            title: "修改成功",
            icon: "none",
            image: "",
            duration: 1500,
            mask: false,
          });
    App.getUserinfoFn()

          this.setData({
            show: false,
          });
        }
      );
    }

  },
  addpopup() {
    let {
      build_num
    } = storge.getUserInfo()
    if (build_num >= 2) {
      wx.showToast({
        title: '最多添加2辆车',
        icon: 'none'
      })
      return
    }
    this.setData({
      fileList: [],
      id: null,
      car_photo: '',
      car_no: "", //车牌号
      brand_name: "", //	车辆品牌
      car_color: "", //车辆颜色
      vin_no: "", //	车架号
      car_type: "", //	车辆类型
      show: true,
    });
  },
  getData() {
    let {
      user_id
    } = storge.getUserInfo();
    Api.getUserCar({
      user_id
    }).then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  onClose(event) {
    let that = this;
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case "left":
      case "cell":
        instance.close();
        break;
      case "right":
        Dialog.confirm({
          context: this, //代表的当前页面
          selector: "#van-dialog", //选择器
          message: "确定删除吗？",
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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
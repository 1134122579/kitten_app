// pages/baomingpage/baomingpage.js
import Api from "../../api/index";
let time
Page({
  /**
   * 页面的初始数据
   */
  data: {
    copycontent:'',
    orderinfo: {},
    ispushorder: false,
    isorderInfoShow: false,
    match_id: null,
    isShowTypeList: true,
    show: false,
    z_price: 0,
    list: [],
    isCatObjlist: [],
    isHuansai: null,
    checkList: [],
    matchGroupobj: {},
  },
  // 点击复制订单号
  copyorderno(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: "none"
            })
          }
        })
      }
    })
  },
  // 下载图片
  downImage(e) {
    var url = e.currentTarget.dataset.url;
    console.log(e)
    if (!url) {
      return
    }
    wx.downloadFile({
      url: url,
      success: (res) => {
        var benUrl = res.tempFilePath;
        //图片保存到本地相册
        wx.saveImageToPhotosAlbum({
          filePath: benUrl,
          //授权成功，保存图片
          success: (data) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          //授权失败
          fail: (err) => {
            if (err.errMsg) { //重新授权弹框确认
              wx.showModal({
                title: '提示',
                content: '您好,请先授权，在保存此图片。',
                showCancel: false,
                success(res) {
                  if (res.confirm) { //重新授权弹框用户点击了确定
                    wx.openSetting({ //进入小程序授权设置页面
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                          wx.saveImageToPhotosAlbum({
                            filePath: benUrl,
                            success: (data) => {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                          })
                        } else { //用户未打开保存图片到相册的授权开关
                          wx.showModal({
                            title: '温馨提示',
                            content: '授权失败，请稍后重新获取',
                            showCancel: false,
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  onorderInfoClose() {
    this.setData({
      isorderInfoShow: false
    })
  },
  getSelectCatList() {
    Api.getSelectCatList().then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  onClick() {
    this.setData({
      show: true,
    });
  },
  cattypeitem(e) {
    let {
      cat,
      looktypeList,
      price,
      checkListId
    } = e.detail;
    console.log(e, "猫咪选项");
    let {
      isCatObjlist,
    } = this.data;
    let index = isCatObjlist.findIndex(item => item.id == cat.id)
    isCatObjlist[index]["looktypeList"] = looktypeList
    isCatObjlist[index]["price"] = price
    isCatObjlist[index]["group_ids"] = checkListId
    console.log(isCatObjlist)
    isCatObjlist = isCatObjlist.map((item) => {
      item["price"] = item?.looktypeList.reduce(
        (price, item) => {
          return Number(price) + Number(item.price)
        }, 0
      );
      return item;
    }) || 0;
    let zprice = isCatObjlist.reduce(
      (price, item) => {
        return Number(price) + Number(item.price)
      }, 0
    );
    console.log(isCatObjlist, zprice, 121545156)
    this.setData({
      isCatObjlist,
      ispushorder:false,
      z_price: zprice.toFixed(0),
    });
  },
  myevent(e) {
    console.log(e);
    let {
      isShow,
      isCatObjlist
    } = e.detail;
    if (isCatObjlist.length <= 0) {
      this.setData({
        z_price: 0,
      });
    }

    isCatObjlist = isCatObjlist.map((item) => {
      item["cat_id"] = item["id"];
      item["group_ids"] = item["group_ids"] ? item["group_ids"] : [];
      item["looktypeList"] = item["looktypeList"] ? item["looktypeList"] : [];
      item["price"] = item?.looktypeList.reduce(
        (price, item) => {
          return Number(price) + Number(item.price)
        }, 0
      );
      return item;
    });
    let zprice = isCatObjlist.reduce(
      (price, item) => {
        return Number(price) + Number(item.price)
      }, 0
    );
    this.setData({

      show: isShow,
      isCatObjlist,
      z_price: zprice.toFixed(0),
    });
  },
  // 创建订单
  onPlay() {

    let {
      isCatObjlist,
      match_id,
      ispushorder
    } = this.data;
    console.log(isCatObjlist)
    let nullprice = isCatObjlist.some((item) => item?.group_ids?.length <= 0);
    console.log(nullprice);
    if (isCatObjlist.length <= 0) {
      wx.showToast({
        title: "请选择猫咪",
        icon: "none",
      });
      return;
    }
    if (nullprice) {
      wx.showToast({
        title: "有猫咪没选择赛事",
        icon: "none",
      });
      return;
    }
    let catNolist = isCatObjlist.map((item) => {
      return item['register_no'];
    })

    let cat_info = isCatObjlist.map((item) => {
      let obj = {};
      obj["march_id"] = match_id;
      obj["price"] = item["price"];
      obj["cat_id"] = item["cat_id"];
      obj["group_ids"] = item["group_ids"];
      return obj;
    });
    console.log(catNolist, match_id,
      cat_info)
    if (ispushorder) {
      this.setData({
        isorderInfoShow: true
      })
      return
    }
    wx.showLoading({
      title: "提交中..",
    });
    try {
      Api.joinMatch({
        match_id,
        cat_info
      }).then((res) => {
        console.log(res, "创建订单成功");
        // 调用支付
        let {
          order_no
        } = res
        Api.payMatchOrder(res).then((res) => {
          let {
            nonceStr,
            paySign,
            signType,
            timeStamp,
            out_trade_no
          } = res;
          Api.getOrderCopyInfo({
            match_id,
            order_no
          }).then(res => {
            let copycontent=''
            res.orderInfo.forEach(item=>{
              copycontent=`${copycontent}
              猫咪ID号：${item.register_no}
              订单编号：${item.order_no}`
            })
            wx.hideLoading()
            this.setData({
              copycontent:copycontent,
              orderinfo: res,
              ispushorder: true,
              isorderInfoShow: true
            })
          })
          return
          wx.requestPayment({
            nonceStr,
            signType,
            package: res.package,
            paySign,
            timeStamp,
            success(data) {},
            complete() {
              wx.hideLoading();
              Api.queryMatchOrder({
                out_trade_no,
              }).then((res) => {
                wx.showToast({
                  title: "参加成功,将自动返回",
                  icon: "none",
                });
                time = setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  });
                }, 1000);
              });
            },
          });
        });
      });
    } catch (error) {
      wx.hideLoading()
    }

  },
  // 获取类型
  matchGroup() {
    let {
      match_id
    } = this.data;
    Api.matchGroup({
      match_id,
    }).then((res) => {
      this.setData({
        matchGroupobj: res,
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: options.match_id,
    });
    this.getSelectCatList();
    this.matchGroup();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      show: false,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(time)
  },

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
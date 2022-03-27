// pages/MatchOrder/MatchOrder.js
import Api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    isnulllist: false,
    orderdetailorder_no: null,
  },
  lookbutton(e) {
    let order_no = e.currentTarget.dataset.id;
    console.log(e);
    this.setData({
      orderdetailorder_no: order_no,
    });
  },
  delbutton(e){
    let order_no = e.currentTarget.dataset.id;
    Api.cancelOrder({order_no}).then(res=>{
      wx.showToast({
        title: '取消成功',
        icon:'none'
      })
      this.setData({
        page:1
      })
      this.getUserMatchOrder()
    })
  },
  getUserMatchOrder() {
    let { page, list } = this.data;
    Api.getUserMatchOrder({
      page,
    }).then((res) => {
      this.setData({
        isnulllist: res.lenght > 0 ? false : true,
      });
      if (page == 1) {
        this.setData({
          list: res,
        });
      } else {
        this.setData({
          list: list.concat(res),
        });
      }
    });
  },
  onpulldown() {
    this.data.page++;
    this.getUserMatchOrder();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserMatchOrder();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onPullDownRefresh: function () {
    this.onpulldown();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

// pages/typelistpage/typelistpage.js
import Api from "../../api/index";
import storage from '../../utils/cache'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageurl: "",
    car_no: null,
    pay_user_id: null,
    car_type:null,
    activeKey: 0,
    List: [],
    sonList: [],
    rediolist: [],
    disabled:true,
  },

  // 选择
  onredio(event) {
   console.log(event)
    let { id } = event.currentTarget.dataset.item;
    let { rediolist } = this.data;
   let is_id= rediolist.indexOf(id)==-1
   console.log(is_id,id,rediolist)
   if(is_id){
    rediolist.push(id)
    console.log(1,rediolist)
    this.setData({
      rediolist,
    });
   }else{
    rediolist= rediolist.filter(item=>item!=id)
    this.setData({
      rediolist,
    });
   }
   if(rediolist.length>0){
     this.setData({
      disabled:false
     })
   }else{
    this.setData({
      disabled:true
     })
   }

  },
  getClass() {
    Api.getClass().then((res) => {
      this.setData({
        List: res,
      });
      this.getProduct(res[0].id);
    });
  },
  getProduct(class_id) {
    let {car_type}=this.data
    console.log("上传数据==","class_id",class_id,"car_type",car_type)
    Api.getProduct({ class_id ,car_type}).then((res) => {
      this.setData({
        sonList: res,
      });
    });
  },
  onMake(){
    let {car_no,pay_user_id,rediolist,car_type}=this.data
    let shop_id=storage.getUserInfo().shop_id
    wx.showModal({
      content: '是否确认创建订单',
      title: '订单创建提示',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '创建中...',
            icon:"none",
            mask:true
          })
          Api.makeOrder({
            pay_user_id,
            car_type,
            car_no,
            project_ids:rediolist,
            pay_type:2,
            shop_id
          }).then(res=>{
            wx.hideLoading()
            wx.showToast({
              title: '创建成功',
              duration: 1500,
              icon: "none",
              mask: true,
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/morepage/more',
              })
            }, 1500);
          })
        }else{
          wx.showToast({
            title: '取消创建订单',
            icon: "none",
          })
        }

      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },
  sidebarChange(event) {
    console.log(event);
  },
  onsidebarClick(event) {
    let { id } = event.currentTarget.dataset.item;
    this.getProduct(id);
    console.log(event);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "options");
    let { car_no, pay_user_id,car_type} = options;
    this.setData({
      car_no,
      pay_user_id,
      car_type
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getClass();
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

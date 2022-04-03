// pages/matchdetail/matchdetail.js
import Api from "../../api/index";
import { formatDate } from "../../utils/util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ispwshow:false,
    nullheaderImage:
      "https://img.js.design/assets/img/61b44a697eee4352133690cc.png",
    getdata: {},
    timeData: {},
    match_id: "",
    page: 1,
    MatchImgList: [], // 精彩瞬间
    lookobj:{},//裁判详情
  },
  
  onPullDown() {
    this.data.page++;
    this.getMatchImg();
  },
  // 查看裁判
  lookpw(e){
    console.log(e)
    let {item}=e.currentTarget.dataset
    this.setData({
      ispwshow:true,
      lookobj:item
    })
  },
  onPwClose(){
this.setData({
  ispwshow:false
})
  },
  // 精彩瞬间
  getMatchImg() {
    let { match_id, page, MatchImgList } = this.data;
    Api.getMatchImg({ match_id, page }).then((res) => {
      this.setData({
        isNullList: res.length > 0 ? false : true,
        MatchImgList: res,
      });
      return;
      if (page == 1) {
        this.setData({
          MatchImgList: res,
        });
      } else {
        this.setData({
          MatchImgList: MatchImgList.concat(res),
        });
      }
    });
  },
  // 倒计时
  oncountChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  goBaobutton() {
    let { id } = this.data.getdata;
    wx.navigateTo({
      url: `/pages/baomingpage/baomingpage?match_id=${id}`,
    });
  },
  // 前往地址
  openLocation(e) {
    console.log('前往地址');
    return;
    let name = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude,
      longitude,
      scale: 18,
      name,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    this.setData({
      match_id: id,
      page: 1,
    });
    Api.get_match_details({
      match_id: id,
    }).then((res) => {
      res["djs_time"] =
        res["start_time"] * 1000 - +new Date() > 0
          ? res["start_time"] * 1000 - +new Date()
          : 0;
      res["start_time"] = formatDate(res["start_time"]);
      res["pwinfo"] = res["pwinfo"].map(item=>{
        item['photosheader']=item['photos']+'?imageView2/3/w/300'
        item['photosheader1']=item['photos']+'?imageView2/3/w/400'
        return item
      });
      res["end_time"] = formatDate(res["end_time"]);
      console.log(res);
      this.setData({
        getdata: res,
      });
    });
    this.getMatchImg();
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onPullDown();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { getdata } = this.data;
    return {
      title: getdata.title,
      imageUrl: getdata.cover,
    };
  },
});

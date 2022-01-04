// pages/cathouse/cathouse.js
import Api from '../../api/index' 
import storage from '../../utils/cache'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_id:0,
    listType: 'mycathouse',
    isNullList: true,
    listQuery: {
      page: 1,
      user_id: 35,
      cat_status: 1,
    },
    homenfo: {}, //猫舍信息
    catList: [
      {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 1,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    },    {
      "id": 1,
      "img": [
        "http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg"
      ],
      imgUrl:'http://cdn.521nuochen.cn/Cat/20211219114148/383/cat.jpg',
      "sex": 1,
      "cat_name": "小草",
      "like_num": 1000,
      "is_zan": 0,
      "age": "1岁10个月",
      "age_type": "成年猫",
      "nickname": "刘**",
      "headimgurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWrhyxTsFdyh0UReAaqmge2VGQ17uCI8dBLgzR2ibFPyzkNYSzJ7RWlgK9BD6xUyJAncLRKiaCgrgQ/132"
    }
  ], //猫咪列表
    isStatus: 1,
    typeList: [{
      status: 1,
      title: '代售'
    }, {
      status: 2,
      title: '展示'
    }, {
      status: 3,
      title: '种公'
    }, {
      status: 4,
      title: '种母'
    }]

  },
  ontabChange(event) {
    let status = event.detail.name;
    this.setData({
      isStatus: Number(status),
      is_list:true
    });
    // 1 赛事报名 2 实时赛事 3 赛事回顾 4赛事积分
    this.getUserCatList();
  },
  // 关注
  addFollow() {
    let {
      listQuery
    } = this.data
    wx.showLoading({
      title: '关注中..',
    })
    Api.addFollow({
      follow_user_id: listQuery.user_id
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '关注成功',
        icon: 'none'
      })

    })
  },
  // 上拉加载
  onflshpull() {
    (this.data.listQuery.page)++
    console.log(this.data.listQuery.page)
    this.getUserCatList()
  },
  // 获取数据
  getUserCatList() {
    // let {
    //   listQuery
    // } = this.data
    console.log(this.data.listQuery)
    Api.getUserCatList(this.data.listQuery).then(res => {
      let {
        homenfo,
        catiInfo
      } = res
      console.log(res, '猫舍数据')
      this.setData({
        homenfo,
        isNullList: catiInfo.length > 0 ? false : true
      })
      // if (listQuery.page == 1) {
      //   this.setData({
      //     ,
      //     catList:catiInfo
      //   })
      // }else{
      //   this.setData({
      //     homenfo,
      //     catList:catList.concat(catiInfo)
      //   })
      // }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {user_id}=storage.getUserInfo
    this.setData({
      "listQuery.user_id": options.user_id
    })
    this.setData({
    my_id:user_id
    })
    this.getUserCatList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.onflshpull()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
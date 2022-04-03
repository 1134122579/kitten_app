// pages/cathouse/cathouse.js
import Api from '../../api/index'
import storage from '../../utils/cache'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_id: 0,
    listType: 'mycathouse',
    isNullList: true,
    isEmpty:false,
    listQuery: {
      page: 1,
      user_id: '',
      cat_status: 2,
    },
    homenfo: {}, //猫舍信息
    catList: [], //猫咪列表
    isStatus: 2,
    typeList: [
      {
        status: 2,
        title: '待售'
      },
      {
        status: 1,
        title: '展示'
      },
      {
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
      is_list: true,
      "listQuery.cat_status": Number(status),
      "listQuery.page": 1
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
    (this.data.listQuery.page) ++
    this.getUserCatList()
  },
  // 获取数据
  getUserCatList() {
    let {
      listQuery,
      catList,
    } = this.data

    Api.getUserCatList(listQuery).then(res => {
      let {
        homenfo,
        catiInfo
      } = res
      console.log(res, '猫舍数据')
      this.setData({
        homenfo,
        isNullList: catiInfo?.length > 0 ? false : true
      })
      if (catiInfo?.length > 0) {
        catiInfo = catiInfo.map(item => {
          item['imgUrl'] = item['img'][0]
          // item['user_id'] = listQuery.user_id
          return {
            ...item,
          }
        })
      }
      this.setData({
        catList: catiInfo,
      isEmpty:false

        
      })
      return
      if (listQuery.page == 1) {
        this.setData({
          catList: catiInfo
        })
      } else {
        this.setData({
          catList: catList.concat(catiInfo)
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      user_id
    } = storage.getUserInfo
    this.setData({
      "listQuery.user_id": options.user_id,
      my_id: storage.getUserInfo().user_id
    })
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
    this.setData({
      isEmpty:true
    })
    this.getUserCatList()
    this.selectComponent("#tabs").resize();
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
    let {homenfo}=this.data
      return{
        title:homenfo.home_name
      }
  }
})
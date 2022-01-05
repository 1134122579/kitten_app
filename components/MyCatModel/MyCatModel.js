import Api from "../../api/index"

Component({
  options: {
    addGlobalClass: true, //使用全局组件 class
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer(newV, oldV) {}
    },
    isticket: {
      type: ["String", "Number"],
      value: '',
      observer(newV, oldV) {
        this.data.itemList.push(newV)
        this.setData({
          itemList: this.data.itemList
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemList: [],
    is_like: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gocatDteail() {
      let {
        item
      } = this.data
      wx.navigateTo({
        url: `/pages/catdetail/catdetail?user_id=${item.user_id}&cat_id=${item.id}`,
      })
    },
    onLike() {
      let {
        id,
        vote_id,
        is_zan
      } = this.data.item
      let {
        is_like
      } = this.data
      if (is_zan == 1 || is_like) {
        wx.showToast({
          title: '已点赞',
          icon: 'none'
        })
      }
      Api.onzanLike(
        this.data.item
      ).then(res => {
        this.setData({
          is_like: true
        })
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        })
      })
    },
    join_vote() {
      let {
        id,
        vote_id
      } = this.data.item
      this.triggerEvent("join_vote", this.data.item)

    }
  }
})
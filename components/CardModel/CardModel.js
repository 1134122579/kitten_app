// components/CardModel/CardModel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carItem: {
      type: Object,
      value: {}
    },
    isButton: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    array: [{
        id: 1,
        name: '轿车'
      },
      {
        id: 2,
        name: 'SUV'
      }
    ],
    pickerindex: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      let index = e.detail.value
      let {
        user_id,
        car_no,
      } = this.data.carItem
      let {array}=this.data
      this.triggerEvent('onCard', {
        car_no,
        pay_user_id: user_id,
        car_type: array[index].id
      })
    },
    edit(e) {
      let {
        item
      } = e.currentTarget.dataset
      let newDAteTime = Math.round(new Date() / 1000)
      if (newDAteTime <= item.next_edit_time) {
        wx.showToast({
          title: '一年内只能修改一次',
          icon: "none"
        })
        return
      }
      this.triggerEvent("eidtClick", item)
    },
    // 预览
    previewImage(e) {
      console.log(e);
      let {
        url
      } = e.currentTarget.dataset;
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url], // 需要预览的图片http链接列表
      });
    },
    gopage(event) {
      let {
        id,
        user_id,
        car_no
      } = event.currentTarget.dataset.item;
      this.triggerEvent('onCard', {
        car_no,
        pay_user_id: user_id,
        // car_type:
      })
    },
  }
})
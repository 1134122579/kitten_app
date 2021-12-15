// components/OrdeCard/OrdeCard.js

import Api from "../../api/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardItem: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    cancelOrder(event) {
      let {
        item
      } = event.currentTarget.dataset;
      this.triggerEvent("cancelOrderClick", {
        out_trade_no: item.order_no
      });
      console.log({
        out_trade_no: item.order_no
      })
      //这里giveFarther就是事件名，后面带着的就是传过去值
    },
    order(event) {
      let {
        item
      } = event.currentTarget.dataset;
      this.triggerEvent("payCarOrder", {
        order_no: item.order_no,
        pay_type:item.pay_type
      });
    },
    setClip(event) {
      let {
        text
      } = event.currentTarget.dataset
      wx.setClipboardData({
        data: text,
        success() {
          wx.getClipboardData({
            success: (option) => {
              // console.log('复制成功',option)
              // wx.showToast({
              //   title: '复制成功',
              //   icon: 'none'
              // })
            },
          })
        }
      })
    },
  },
});
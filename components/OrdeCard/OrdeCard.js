// components/OrdeCard/OrdeCard.js

import Api from "../../api/index";
import {
  formatDate
} from '../../utils/util'
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cardItem: {
      type: Object,
      value: {},
      observer(nv, ov) {
        console.log(nv, ov)
        nv['end_time'] =nv['end_time']? formatDate(nv['end_time']):'未知'
        nv['start_time'] = formatDate(nv['start_time'])
        nv['match_pv'] =nv['match_pv']>9999?`${parseInt(nv['match_pv']/10000)}W`:nv['match_pv']
        this.setData({
          item: nv
        })
      }

    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    golook() {
      let {
        id
      } = this.data.cardItem
      wx.navigateTo({
        url: `/pages/matchdetail/matchdetail?id=${id}`,
      })
    }

  },
});
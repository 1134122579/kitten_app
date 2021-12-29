// components/OrdeCard/OrdeCard.js

import Api from "../../api/index";
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
      observer(nv,ov){
        console.log(nv,ov)
      }
      
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
    golook(){
      let {id}=this.cardItem
  wx.navigateTo({
    url: `/pages/matchdetail/matchdetail?id=${id}`,
  })
    }
 
  },
});
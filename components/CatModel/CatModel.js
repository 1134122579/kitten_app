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
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    join_vote() {
      let {
        id,
        vote_id
      } =this.data.item
  
      this.triggerEvent("join_vote",this.data.item)
     
    }
  }
})
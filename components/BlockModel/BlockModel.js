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
    },
    isticket: {
      type: ["String", "Number"],
      value: '',
      observer(newV, oldV) {
        this.data.itemList.push(newV)
        console.log('newV',newV, this.data.itemList)
        this.setData({
          itemList:this.data.itemList
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    join_vote() {
      let {
        id,
        vote_id
      } = this.data.item

      this.triggerEvent("join_vote", this.data.item)

    }
  }
})
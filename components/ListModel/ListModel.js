// components/ListModel/ListModel.js
let leftHeight = 0,
  rightHeight = 0; //分别定义左右两边的高度
let query;
Component({
  options: {
    addGlobalClass: true, //使用全局组件 class
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newV, oldV) {
        // if (newV == oldV) {
        // console.log(newV, oldV)
        //   return
        // }
        this.setData({
          leftList: [], //左边数组
          rightList: [], //右边数组
        })
        this.waterfallFlow()
      }
    },
    isNullList:{
      type:Boolean,
      value:true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftList: [], //左边数组
    rightList: [], //右边数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    join_vote(e){
      this.triggerEvent("join_vote",e.detail)
    },
    //瀑布流布局
    async waterfallFlow() { //在获取list后调用
      const {
        list,
        leftList,
        rightList,
      } = this.data;
      query = wx.createSelectorQuery().in(this); //  组件必须加上this
      for (const item of list) {
        leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item); //判断两边高度，来觉得添加到那边
        let res = await this.getBoxHeight(leftList, rightList);
      }
    },
    getBoxHeight(leftList, rightList) {
      return new Promise((resolve, reject) => {
        this.setData({
          leftList,
          rightList
        });
        query.select('.tab_left').boundingClientRect();
        query.select('.tab_right').boundingClientRect();
        query.exec((res) => {
          leftHeight = res[0].height; //获取左边列表的高度
          rightHeight = res[1].height; //获取右边列表的高度
          resolve(res);
        });
      })
    },
  }
})
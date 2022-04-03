// components/ListModel/ListModel.js

import Api from "../../api/index";
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
    isdele: {
      type: Boolean,
      value: false
    },
    isStatus: {
      type: [String, Number],
      observer(newV, oldV) {
        if (newV != oldV) {
          this.data.leftList = []; //左边数组
          this.data.rightList = []; //左边数组
          this.data.alllist = []; //左边数组
          leftHeight = 0;
          rightHeight = 0; //分别定义左右两边的高度
          this.setData({
            leftList: [],
            rightList: [],
            alllist: [],
          });
        }
      },
    },
    listType: {
      type: String,
      value: "mycathouse",
    },
    list: {
      type: Array,
      observer(newV, oldV) {
        this.setData({
          alllist: newV,
          isNullList: newV.length > 0 ? true : false,
        });
        this.waterfallFlow();
      },
    },
    isticket: {
      type: String,
      value: "",
    },
    isSwitchList: {
      type: String,
      observer(newV, oldV) {},
    },
    isSearch: {
      type: Boolean,
      observer(newV, oldV) {},
    },
    isEmpty: {
      type: Boolean,
      observer(newV, oldV) {
        console.log(newV, "清空所有数据");
        if (newV) {
          leftHeight = 0;
          rightHeight = 0; //分别定义左右两边的高度
          this.data.leftList = []; //左边数组
          this.data.rightList = []; //左边数组
          this.data.alllist = []; //左边数组
          this.setData({
            leftList: [],
            rightList: [],
            alllist: [],
          });
        }
      },
    },
    isNullList: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    alllist: [],
    leftList: [], //左边数组
    rightList: [], //右边数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //预览图片
    previewImage(e) {
      var url = e.target.dataset.url;
      console.log(e)
      wx.previewImage({
        current: url, //当前点击的图片链接
        urls: [url], //图片数组
      });
    },
    join_vote(e) {
      this.triggerEvent("join_vote", e.detail);
    },
    ondele(e) {
      let {
        id
      } = e.detail
      let {
        leftList,
        rightList
      } = this.data
      Api.delDynamic({
        dynamic_id: id
      }).then((res) => {
        leftList = leftList.filter(item => item.id != id)
        rightList = rightList.filter(item => item.id != id)
        this.setData({
          leftList,
          rightList
        })
        wx.showToast({
          title: '删除成功',
        })
      });
      this.triggerEvent("ondele", e.detail);
    },
    //瀑布流布局
    async waterfallFlow() {
      //在获取list后调用
      let {
        alllist,
        leftList,
        rightList
      } = this.data;
      let leftListnew = [];
      let rightListnew = [];
      query = wx.createSelectorQuery().in(this); //  组件必须加上this
      if (alllist.length <= 0) return;
      for (const item of alllist) {
        let {
          leftList,
          rightList
        } = this.data;
        leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item); //判断两边高度，来觉得添加到那边
        // leftListnew=[...leftList,item]
        // leftHeight <= rightHeight
        //   ? (leftListnew = [...leftList, item])
        //   : (rightListnew = [...rightList, item]); //判断两边高度，来觉得添加到那边
        // console.log(leftListnew, "leftList");
        let res = await this.getBoxHeight(leftList, rightList);
      }
      // console.log(alllist, rightList, leftList, "瀑布流数据");
    },
    // 校验高度
    getBoxHeight(leftList, rightList) {
      return new Promise((resolve, reject) => {
        this.setData({
          leftList,
          rightList,
        });
        query.select(".tab_left").boundingClientRect();
        query.select(".tab_right").boundingClientRect();
        query.exec((res) => {

          leftHeight = res[0]?.height; //获取左边列表的高度
          rightHeight = res[1]?.height; //获取右边列表的高度
          resolve(res);
        });
      });
    },
    // 获取数据
  },

});
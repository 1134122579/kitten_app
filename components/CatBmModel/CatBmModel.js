// components/catBmModel/catBmModel.js
Component({
  options: {
    addGlobalClass: true, //使用全局组件 class
  },
  /**
   * 组件的属性列表
   */
  properties: {
    catItem: {
      type: Object,
      observer(newV, oldV) {
        this.setData({
          item: newV,
        });
      },
    },
    // 选择
    matchGroupobj: Object,
    isShowTypeList: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {},
    isHuansai: null,
    checkList: [],
    looktypeList: [],
    looktypeListcheck:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onrideo(e) {
      let { item } = e.currentTarget.dataset;
      this.setData({
        isHuansai: item.id,
      });
    },
    onClick() {
      let { item } = this.data;
      let { isShowTypeList } = this.data;
      if (isShowTypeList) {
        this.setData({
          show: true,
        });
      } else {
        this.triggerEvent("cattypeitem", { item });
      }
    },
    onClose() {
      this.setData({
        show: false,
      });
    },
    onokClick() {
      let { matchGroupobj,catItem, checkList, isHuansai, looktypeListcheck } = this.data;
      let list = [];
      let price=0
      if (!isHuansai) {
        wx.showToast({
          title: "环赛必选",
          icon: "none",
        });
        return;
      }
      // looktypeList = looktypeList.filter((item) => item.id != isHuansai);
      // console.log(looktypeList)
      list = matchGroupobj.huansai.filter((item) => item.id == isHuansai);
      let newList = looktypeListcheck.concat(list);
      newList.forEach(item=>{
        price=price+Number(item.price) 
      })
      this.setData({
        show: false,
        isHuansai,
        checkList,
        looktypeList: newList,
      });
      console.log({ isHuansai, checkList, newList });
      this.triggerEvent("typechecked", {
        cat:catItem,
        isHuansai,
        checkList,
        looktypeList: newList,
        checkListId:checkList.concat([isHuansai]) ,
        price
      });
    },
    // 多选
    oncheck(e) {
      let { item } = e.currentTarget.dataset;
      let { checkList=[], looktypeListcheck=[] } = this.data;
      if (checkList.includes(item.id)) {
        checkList = checkList.filter((catitem) => catitem != item.id);
        looktypeListcheck = looktypeListcheck.filter((catitem) => catitem.id != item.id);
      } else {
        
        checkList.push(item.id);
        looktypeListcheck.push(item);
      }
      this.setData({
        checkList,
        looktypeListcheck,
      });
    },
  },
});

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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择类型
    // typeitem(e) {
    //   console.log('选择类型', e)
    // },
    onrideo(e) {
      let { item } = e.currentTarget.dataset;
      this.setData({
        isHuansai: item.id,
      });
    },
    onClick() {
      let { item } = this.data;
      console.log(1231231231, item);
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
      let {matchGroupobj, checkList, isHuansai, looktypeList } = this.data;
      let list=[]
      if (!checkList) {
        wx.showToast({
          title: "赛事必选",
          icon: "none",
        });
        return;
      }
      
      if(!looktypeList.includes(item=>item.id==isHuansai)){
        list = matchGroupobj.beisai.filter((item) => item.id == isHuansai);
      }
      this.setData({
        show: false,
        looktypeList: looktypeList.concat(list),
      });
      console.log(looktypeList)
      this.triggerEvent("typechecked", { isHuansai, checkList,looktypeList });
    },
    // 多选
    oncheck(e) {
      let { checkList, looktypeList } = this.data;
      let { item } = e.currentTarget.dataset;
      console.log(item);
      if (checkList.includes(item.id)) {
        checkList = checkList.filter((catitem) => catitem != item.id);
        looktypeList = looktypeList.filter((catitem) => catitem != item.id);
      } else {
        checkList.push(item.id);
        looktypeList.push(item);
      }
      this.setData({
        checkList,
        looktypeList,
      });
    },
  },
});

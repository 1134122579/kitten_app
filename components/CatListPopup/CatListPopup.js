// components/CatListPopup/CatListPopup.js
Component({
  options: {
    addGlobalClass: true, //使用全局组件 class
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 猫咪列表
    catList: {
      type: Array,
      observer(newV, oldV) {
        this.setData({
          list: newV,
        });
      },
    },
    // 显示隐藏
    isShow: {
      type: Boolean,
      observer(newV, oldV) {
        this.setData({
          show: newV,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    show: false,
    isCatList: [],
    isCatObjlist:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择猫咪
    onClick(e) {
      let { isCatList ,isCatObjlist} = this.data;
      let {
        item,
      } = e.currentTarget.dataset;
      if (isCatList.includes(item.id)) {
        isCatList = isCatList.filter((catitem) => catitem != item.id);
        isCatObjlist = isCatObjlist.filter((catitem) => catitem.id != item.id);
      } else {
        isCatList.push(item.id);
        isCatObjlist.push(item);
      }
      this.setData({
        isCatList,
        isCatObjlist
      });
    },
    goadd(){
wx.navigateTo({
  url: '/pages/addcat/addcat',
})
    },
    onClose() {
      // let {isCatObjlist=[]}=this.data
      this.triggerEvent("myevent",  {
        isShow: !this.data.show,
        isCatObjlist:[]
      });
      this.setData({
        show: false,
        isCatObjlist:[],isCatList:[]
      });
    },
    onOkClick(e) {
      let {isCatObjlist}=this.data
      this.triggerEvent(
        "myevent",
        {
          isShow: !this.data.show,
          isCatObjlist
        }
      );
      this.setData({
        show: false,
      });
    },
  },
});

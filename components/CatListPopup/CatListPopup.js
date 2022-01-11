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
    // 是否单选 多选
    ischeckbox: {
      type: Boolean,
      value: true,
    },
    // 显示隐藏
    isShow: {
      type: Boolean,
      observer(newV, oldV) {
        if (!this.data.ischeckbox) {
          this.setData({
            isredioId: "",
          });
        }
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
    isCatObjlist: [],
    isredioId: "",
    rediocat: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择猫咪
    onClick(e) {
      let { ischeckbox } = this.data;
      if (ischeckbox) {
        this.ischeckbox(e);
      } else {
        this.radio(e);
      }
    },
    // 单选
    radio(e) {
      let { item } = e.currentTarget.dataset;
      this.setData({
        isredioId: item.id,
        rediocat: item,
      });
    },
    // 多选
    ischeckbox(e) {
      let { isCatList, isCatObjlist } = this.data;
      let { item } = e.currentTarget.dataset;
      if (isCatList.includes(item.id)) {
        isCatList = isCatList.filter((catitem) => catitem != item.id);
        isCatObjlist = isCatObjlist.filter((catitem) => catitem.id != item.id);
      } else {
        isCatList.push(item.id);
        isCatObjlist.push(item);
      }
      this.setData({
        isCatList,
        isCatObjlist,
      });
    },
    goadd() {
      wx.navigateTo({
        url: "/pages/addcat/addcat",
      });
    },
    onClose() {
      let { rediocat } = this.data;
      this.triggerEvent("myevent", {
        isShow: !this.data.show,
        isCatObjlist: [],
        rediocat,
      });
      this.setData({
        show: false,
        // isredioId:'',
        isCatObjlist: [],
        isCatList: [],
      });
    },
    onOkClick(e) {
      let {
        isCatObjlist,
        ischeckbox,
        isredioId,
        rediocat,
        isCatList,
      } = this.data;
      if (
        (ischeckbox && isCatObjlist.length <= 0) ||
        (!ischeckbox && !isredioId)
      ) {
        wx.showToast({
          title: "亲，请选择猫咪",
          icon: "none",
        });
        return;
      }
      this.triggerEvent("myevent", {
        isShow: !this.data.show,
        isCatObjlist,
        rediocat,
        isCatList,
      });
      this.setData({
        show: false,
      });
    },
  },
});

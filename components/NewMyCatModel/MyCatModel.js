import Api from "../../api/index";

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
      observer(newV, oldV) {},
    },
    isticket: {
      type: ["String", "Number"],
      value: "",
      observer(newV, oldV) {
        this.data.itemList.push(newV);
        this.setData({
          itemList: this.data.itemList,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_lazyload: true, //懒加载
    itemList: [],
    is_like: false,
    show:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageload() {
      this.setData({
        show: true,
      });
    },
    gocatDteail() {
      let { item } = this.data;
      wx.showLoading({
        title: "加载中...",
      });
      wx.navigateTo({
        url: `/pages/catdetail/catdetail?user_id=${item.user_id}&cat_id=${item.id}`,
      });
    },
    nogo() {
      console.log("禁止进入");
    },
    onLike() {
      let { id, vote_id, is_zan } = this.data.item;
      let { is_like } = this.data;
      if (is_zan == 1) {
        wx.showToast({
          title: "已点赞",
          icon: "none",
        });
      }
      Api.onzanLike(this.data.item).then((res) => {
        this.setData({
          is_like: true,
        });
        wx.showToast({
          title: "已点赞",
          icon: "none",
        });
      });
    },
    join_vote() {
      let { id, vote_id } = this.data.item;
      this.triggerEvent("join_vote", this.data.item);
    },
  },
});

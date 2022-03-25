import Api from "../../api/index";

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
      value: false,
    },
    item: {
      type: Object,
      value: {},
      observer(newV, oldV) {
        newV["zan_num"] =
          newV["zan_num"] > 10000 ? newV["zan_num"] + "w" : newV["zan_num"];
        if (newV["type"] == 2) {
          newV["link_url"] = newV["link_url"] + "?vframe/jpg/offset/0";
        }
        this.setData({
          item: newV,
        });
      },
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
    loading: true,
    is_lazyload: true, //懒加载
    itemList: [],
    is_like: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageload() {
      this.setData({
        loading: false,
      });
    },
    gocatDteail() {
      let { item } = this.data;
      wx.showLoading({
        title: "加载中..",
      });
      if (item.type == 2) {
        wx.navigateTo({
          url: `/pages/videopage/videopage?user_id=${item.user_id}&dynamic_id=${item.id}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/articlepage/articlepage?user_id=${item.user_id}&dynamic_id=${item.id}`,
        });
      }
    },
    nodetail(e) {
      console.log(e);
    },
    onLike() {
      let { id, vote_id, is_zan } = this.data.item;
      console.log("首页禁止点赞");
      return;
      let { is_like } = this.data;
      if (is_zan == 1 || is_like) {
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
          title: "点赞成功",
          icon: "none",
        });
      });
    },
    ondele(){
      this.triggerEvent("ondele", this.data.item);
    },
    join_vote() {
      let { id, vote_id } = this.data.item;
      this.triggerEvent("join_vote", this.data.item);
    },
  },
});

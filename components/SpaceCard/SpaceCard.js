// components/SpaceCard/SpaceCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spaceitem: {
      type: Object,
      value: {},
    },
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
    stop(e){
      console.log('阻止冒泡',e)
    },
    // 查看详情
    roomdetail(event) {
      // let { item } = event.currentTarget.dataset;
      let {spaceitem}=this.data
      console.log('spaceitem',spaceitem)
        wx.navigateTo({
          url: "/pages/roomdetail/roomdetail?id=" + spaceitem.id,
        });
    },
    setmobile(event) {
      console.log(event);
      let { mobile } = event.currentTarget.dataset;
      wx.makePhoneCall({
        phoneNumber: mobile,
      });
    },
    onlocation(event) {
      let { item } = event.currentTarget.dataset;
      let latitude = Number(item.lat);
      let longitude = Number(item.lng);
      wx.openLocation({
        name: item.name,
        address: item.address,
        latitude,
        longitude,
        scale: 18,
      });
    },
  },
});

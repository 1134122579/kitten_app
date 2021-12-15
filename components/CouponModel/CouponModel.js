// components/CardModel/CardModel.js
import QRCode from "../../utils/QRCode/index.js";
import {
  getDate
} from "../../utils/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponItem: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        // 第一种方式通过参数传递的方式触发函数的执行
     this.getData(newVal)
      }
    },
    isButton: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */

  data: {
    barcodeImagePath: '',
    show: false,
    newData:null
  },

  lifetimes: {
    attached() {},
    ready() {
      this.createdImg();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 数据处理
      getData(newVal){
        let  time_out = getDate(newVal["time_out"] + "000") ;
        newVal['time_out']=time_out
        this.setData({
          newData:newVal
        })
      },
      onclick(){
        this.setData({
          show:true
        })
      },
      onClose(){
        this.setData({
          show:false
        })
      },

    createdImg() {
      let {
        coupon_code,project_name,user_id,id
      } = this.data.couponItem
      let text=`${coupon_code}-${user_id}-${project_name}-${id}`
      console.log('生成的code',text)
      QRCode.newqrcode('qr' + coupon_code, {
        width: 320,
        height: 320,
        text: text,
        padding: 10,
        cb(res) {
          console.log(res)
        }
      }, this)
      this.drawImage()
    },
    drawImage() {
      let that = this;
      let {
        coupon_code
      } = this.data.couponItem
      let query = this.createSelectorQuery().in(this)
      query.select(`qr${coupon_code}`).fields({
        node: true,
        size: true
      }).exec(res => {
        console.log(res)
      })
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: `qr${coupon_code}`,
          success: function (res) {
            console.log(res);
            var tempFilePath = res.tempFilePath;
            that.setData({
              barcodeImagePath: tempFilePath,
            });
          },
          fail: function (res) {
            console.log(res);
          },
        });
      }, 500);
    },
    edit(e) {
      let {
        item
      } = e.currentTarget.dataset
      let newDAteTime = Math.round(new Date() / 1000)
      if (newDAteTime <= item.next_edit_time) {
        wx.showToast({
          title: '一年内只能修改一次',
          icon: "none"
        })
        return
      }
      this.triggerEvent("eidtClick", item)
    },
    // 预览
    previewImage(e) {
      let {
        url
      } = e.currentTarget.dataset;
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url], // 需要预览的图片http链接列表
      });
    },

  }
})
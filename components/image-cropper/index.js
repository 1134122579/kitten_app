/**
 * @author GuoNanLin
 * @date 2020-11-06
 */
Component({
  options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 原图地址
    'src':{
      type:String,
      observer: function(newVal, oldVal){
        if(!newVal){
          return
        }
        this.setData({
          imagePath: newVal
        })
        if(!this.data._isInit){
          this._init()
        }else{
          this._initImage()
        }
      }
    },
    // 裁剪框宽高比值
    'aspectRatio':{
      type:Number,
      observer: function(newVal, oldVal){
        if(!newVal){
          return
        }
        this.setData({
          _aspectRatio: newVal
        })
        if(this.data._isInit){
          // 初始化图片和裁剪框
          this._initImage()
        }
      }
    },
    // 是否等比缩放
    'isProportion':{
      type: Boolean,
      observer: function(newVal, oldVal){
        this.setData({
          isProportion: newVal
        })
      }
    },
    'quality':{
      type: Number,
      observer: function(newVal, oldVal){
        this.setData({
          _quality: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 渲染参数
     */

    // 图片地址
    imagePath:null,

    // 是否比例缩放 true：比例缩放 false：自由缩放
    isProportion: false ,

    // 图片定位
    viewImagesLocation:{
      width:0,
      height:0,
      top:0,
      left:0
    },
    
    // 裁剪框定位
    crop:{
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },

    // canvas 宽高
    canvas:{
      width: null,
      height: null
    },

    /**
     * 纯数据参数
     */

    // 组件是否初始化了
    _isInit: false,
    // 裁剪框宽高比值
    _aspectRatio:1,

    // 设备信息
    _systemInfo:null,
    // 原图相关信息
    _originalImageInfo:null,
    // 显示图片单边rpx 与 原图单边分辨率比值
    _viewThanOriginal:null,
    // 裁剪框移动时，辅助定位的参数
    _startX:null,
    _startY:null,
    _startCrop:null,

    // 输出裁切图的质量
    _quality: 1

  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      if(!this.data._ctx){
        this.setData({
          _ctx: wx.createCanvasContext('image-cropper-canvas-id',this)
        })
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() { },
    hide: function () { },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
        
    /**
     * 初始化组件
     */
    _init(){
      let that = this
      wx.getSystemInfo({
        success: e => {
          // 获取设备rpx与px的比值
          let systemInfo = e
          systemInfo.rpxPxRatio = 750 / systemInfo.windowWidth
          systemInfo.windowWidthRpx = systemInfo.windowWidth * systemInfo.rpxPxRatio
          systemInfo.windowHeightRpx = systemInfo.windowHeight * systemInfo.rpxPxRatio - 100
          that.setData({
            _systemInfo: systemInfo
          })
          // 初始化图片和裁剪框
          that._initImage()
        }
      })
    },
    /**
     * 初始化图片和裁剪框
     */
    _initImage(){

      let that = this

      let systemInfo = that.data._systemInfo

      that.setData({
        crop:{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      })

      wx.showLoading({
        title: '加载中',
      })
      wx.getImageInfo({
        src: that.data.imagePath,
        success (res) {
          // 设置原图信息
          let originalImageInfo = res
          that.setData({
            _originalImageInfo: originalImageInfo
          })

          // 画原图到canvas
          let ctx = that.data._ctx
          let oWoHRate = originalImageInfo.width / originalImageInfo.height
          let max = 4000
          let canvas
          if(originalImageInfo.width >= originalImageInfo.height){
            canvas = {
              width: originalImageInfo.width > max ? max : originalImageInfo.width,
              height: originalImageInfo.width > max ? max / oWoHRate  : originalImageInfo.height
            }
          }else{
            canvas = {
              width: originalImageInfo.height > max ? max * oWoHRate : originalImageInfo.width,
              height: originalImageInfo.height > max ? max : originalImageInfo.height
            }
          }
          that.setData({
            canvas:canvas
          })
          //            原图路径                       原图宽                   原图高                       canvas宽     canvas高
          ctx.drawImage(originalImageInfo.path, 0, 0, originalImageInfo.width, originalImageInfo.height,0,0,canvas.width,canvas.height);
          ctx.draw(false)

          // 当 viewWidth = 650 时,及图片两边留50黑边时
          let blackWidth = 40
          let viewWidth =  systemInfo.windowWidthRpx - blackWidth * 2
          let viewThanOriginal  = viewWidth / originalImageInfo.width
          let viewHeight = originalImageInfo.height * viewThanOriginal

          if(viewHeight < systemInfo.windowHeightRpx){

            that._setProportionCode(viewWidth,viewHeight)
            that._cropLocationCenter(viewWidth,viewHeight)

            that.setData({
              viewImagesLocation:{
                width: viewWidth,
                height: viewHeight,
                top: (systemInfo.windowHeightRpx - viewHeight)/ 2,
                left: blackWidth
              },
              crop:that.data.crop
            })
          }else{
            viewHeight = systemInfo.windowHeightRpx
            viewThanOriginal = viewHeight / originalImageInfo.height
            viewWidth =originalImageInfo.width  * viewThanOriginal

            that._setProportionCode(viewWidth,viewHeight)
            that._cropLocationCenter(viewWidth,viewHeight)

            that.setData({
              viewImagesLocation:{
                width: viewWidth,
                height: viewHeight,
                top: 0,
                left: (systemInfo.windowWidthRpx - viewWidth) / 2
              },
              crop:that.data.crop
            })
          }

          that.setData({
            _viewThanOriginal: viewThanOriginal,
            _isInit: true
          })
          wx.hideLoading()
        },
        fail(){
          wx.hideLoading()
        }
      })
    },

    /**
     * 设置裁剪框初始宽高
     */
    _setProportionCode(viewWidth,viewHeight){
      let that = this
      let aspectRatio = that.data._aspectRatio

      // 裁剪框初始宽度rpx
      var initCropWidth

      // 裁剪框初始高度rpx
      var initCropHeight

      if(aspectRatio > 0 && aspectRatio < 1){
        if(viewWidth >= viewHeight){
          initCropHeight = viewHeight - 50
        }else{
          initCropHeight = viewWidth - 50
        }
        that.setData({
          ["crop.right"]: initCropHeight * aspectRatio,
          ["crop.bottom"]: initCropHeight
        })
      }else{
        if(viewWidth >= viewHeight){
          initCropWidth = viewHeight - 50
        }else{
          initCropWidth = viewWidth - 50
        }
        that.setData({
          ["crop.right"]: initCropWidth,
          ["crop.bottom"]: initCropWidth/aspectRatio
        })
      }


    },
    /**
     * 裁剪框居中
     */
    _cropLocationCenter(viewWidth,viewHeight){
      let crop = this.data.crop
      let cropWidth = crop.right - crop.left
      let cropHeight = crop.bottom - crop.top

      crop.top = crop.top + viewHeight/2 - cropHeight/2
      crop.bottom = crop.bottom + viewHeight/2 - cropHeight/2

      crop.left = crop.left + viewWidth/2 - cropWidth/2
      crop.right = crop.right + viewWidth/2 - cropWidth/2
      return crop
    },

    /**
     * 裁剪框移动
     */
    _cropViewTouchstart(e){
      let systemInfo = this.data._systemInfo
      this.setData({
        _startX : e.touches[0].pageX * systemInfo.rpxPxRatio,
        _startY : e.touches[0].pageY * systemInfo.rpxPxRatio,
        _startCrop : this.data.crop
      })
    },
    _cropViewMove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let x = e.touches[0].pageX * systemInfo.rpxPxRatio
      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let crop = {
        top: that.data._startCrop.top - (that.data._startY - y),
        right: that.data._startCrop.right - (that.data._startX - x),
        bottom: that.data._startCrop.bottom - (that.data._startY - y),
        left: that.data._startCrop.left - (that.data._startX - x)
      }

      // 限制裁剪框移动范围，上右下左
      if( crop.top < 0 ){
        crop.top = 0 
        crop.bottom = that.data._startCrop.bottom - that.data._startCrop.top
      }

      if( crop.right > that.data.viewImagesLocation.width ){
        crop.right = that.data.viewImagesLocation.width
        crop.left = that.data.viewImagesLocation.width - that.data._startCrop.right + that.data._startCrop.left
      }

      if( crop.bottom > that.data.viewImagesLocation.height  ){
        crop.bottom = that.data.viewImagesLocation.height
        crop.top = that.data.viewImagesLocation.height - that.data._startCrop.bottom + that.data._startCrop.top
      }

      if( crop.left < 0 ){
        crop.left = 0
        crop.right = that.data._startCrop.right - that.data._startCrop.left
      }
      this.setData({
        crop:crop
      })
    }
    ,
    /**
     * 裁剪框的8个拖动点
     */
    // 左上
    _leftUpTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio
      let x = e.touches[0].pageX * systemInfo.rpxPxRatio
      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let left = x - that.data.viewImagesLocation.left

      let top

      
      if(that.data.isProportion){
        // 等比缩放
        top = that.data.crop.bottom - (that.data.crop.right - left)/aspectRatio 

        if( top < 0 ){
          return
        }
  
        if( left < 0 ){
          return
        }

        let minWidth
        let minHeight
        if(aspectRatio >= 1){
          minWidth = 80 * aspectRatio
          minHeight = 80
        }else{
          minWidth = 80
          minHeight = 80 / aspectRatio
        }

        if(that.data.crop.bottom - top < minHeight ){
          top = that.data.crop.bottom - minHeight
        }
  
        if(that.data.crop.right - left < minWidth ){
          left = that.data.crop.right - minWidth
        }


      }else{
        // 任意缩放
        top = y - that.data.viewImagesLocation.top 

        if( top < 0 ){
          top = 0
        }
  
        if( left < 0 ){
          left = 0
        }

        if(that.data.crop.bottom - top < 80 ){
          top = that.data.crop.bottom - 80
        }
        if(that.data.crop.right - left < 80 ){
          left = that.data.crop.right - 80
        }
      }

      this.setData({
        ["crop.top"]:top,
        ["crop.left"]: left
      })
    },
    // 上
    _upTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let top = y - that.data.viewImagesLocation.top

      if(top < 0 ){
        return
      }

      if(that.data.crop.bottom - top < 80 ){
        return
      }

      this.setData({
        ["crop.top"]:top
      })
    },
    // 右上
    _rightUpTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let x = e.touches[0].pageX * systemInfo.rpxPxRatio
      let y = e.touches[0].pageY * systemInfo.rpxPxRatio


      let right = x - that.data.viewImagesLocation.left

      let top 
      if(that.data.isProportion){
        top = that.data.crop.bottom - (right - that.data.crop.left)/aspectRatio // 等比缩放
        if( top < 0 ){
          return
        }
        if(x > (systemInfo.windowWidthRpx + that.data.viewImagesLocation.width)/2){
          return
        }

        let minWidth
        let minHeight
        if(aspectRatio >= 1){
          minWidth = 80 * aspectRatio
          minHeight = 80
        }else{
          minWidth = 80
          minHeight = 80 / aspectRatio
        }

        if(that.data.crop.bottom - top < minHeight ){
          top = that.data.crop.bottom - minHeight
        }
  
        if(right - that.data.crop.left < minWidth ){
          right = that.data.crop.left + minWidth
        }

      }else{
        top = y - that.data.viewImagesLocation.top //任意缩放
        if( top < 0 ){
          top = 0
        }
        if(x > (systemInfo.windowWidthRpx + that.data.viewImagesLocation.width)/2){
          right = that.data.viewImagesLocation.width
        }
  
        if(that.data.crop.bottom - top < 80 ){
          top = that.data.crop.bottom -80
        }
  
        if(right - that.data.crop.left < 80 ){
          right = that.data.crop.left + 80
        }
      }



      this.setData({
        ["crop.top"]: top,
        ["crop.right"]: right
      })
    },
    // 右
    _rightTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let x = e.touches[0].pageX * systemInfo.rpxPxRatio


      let right = x - that.data.viewImagesLocation.left

      if(x > (systemInfo.windowWidthRpx + that.data.viewImagesLocation.width)/2){
        return
      }

      if(right - that.data.crop.left < 80 ){
        return
      }

      this.setData({
        ["crop.right"]: right
      })
    },
    // 右下
    _rightDownTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let x = e.touches[0].pageX * systemInfo.rpxPxRatio
      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let right = x - that.data.viewImagesLocation.left

      let bottom
      if(that.data.isProportion){
        // 等比例缩放
        bottom = (right - that.data.crop.left)/aspectRatio + that.data.crop.top 
        if(x > (systemInfo.windowWidthRpx + that.data.viewImagesLocation.width)/2){
          return
        }
        if(bottom > that.data.viewImagesLocation.height){
          return
        }

        let minWidth
        let minHeight
        if(aspectRatio >= 1){
          minWidth = 80 * aspectRatio
          minHeight = 80
        }else{
          minWidth = 80
          minHeight = 80 / aspectRatio
        }
  
        if(bottom - that.data.crop.top < minHeight ){
          bottom = that.data.crop.top + minHeight
        }
  
        if(right - that.data.crop.left < minWidth ){
          right = that.data.crop.left + minWidth
        }
      }else{
        // 任意缩放
        bottom = y - that.data.viewImagesLocation.top 
        if(x > (systemInfo.windowWidthRpx + that.data.viewImagesLocation.width)/2){
          right = that.data.viewImagesLocation.width
        }
        if(bottom > that.data.viewImagesLocation.height){
          bottom = that.data.viewImagesLocation.height
        }
  
        if(bottom - that.data.crop.top < 80 ){
          bottom = that.data.crop.top + 80
        }
  
        if(right - that.data.crop.left < 80 ){
          right = that.data.crop.left + 80
        }
      }



      this.setData({
        ["crop.right"]:right,
        ["crop.bottom"]:bottom
      })
    },

    // 下
    _downTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let bottom = y - that.data.viewImagesLocation.top

      if( bottom > that.data.viewImagesLocation.height){
        return
      }

      if(bottom - that.data.crop.top < 80){
        return
      }

      this.setData({
        ["crop.bottom"]: bottom
      })
    },
    // 左下
    _leftDownTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let x = e.touches[0].pageX * systemInfo.rpxPxRatio
      let y = e.touches[0].pageY * systemInfo.rpxPxRatio

      let left = x - that.data.viewImagesLocation.left

      let bottom
      if(that.data.isProportion){
        // 等比缩放
        bottom = (that.data.crop.right - left)/aspectRatio + that.data.crop.top 
        if(x < that.data.viewImagesLocation.left){
          return
        }
        if(bottom > that.data.viewImagesLocation.height){
          return
        }

        let minWidth
        let minHeight
        if(aspectRatio >= 1){
          minWidth = 80 * aspectRatio
          minHeight = 80
        }else{
          minWidth = 80
          minHeight = 80 / aspectRatio
        }
  
        if(bottom - that.data.crop.top < minHeight ){
          bottom = that.data.crop.top + minHeight
        }
  
        if(that.data.crop.right - left < minWidth ){
          left = that.data.crop.right - minWidth
        }
      }else{
        //任意缩放
        bottom = y - that.data.viewImagesLocation.top 
        if(x < that.data.viewImagesLocation.left){
          left = 0
        }
        if(bottom > that.data.viewImagesLocation.height){
          bottom = that.data.viewImagesLocation.height
        }
  
        if(bottom - that.data.crop.top < 80 ){
          bottom = that.data.crop.top + 80
        }
  
        if(that.data.crop.right - left < 80 ){
          left = that.data.crop.right - 80
        }
      }



      this.setData({
        ["crop.left"]:left,
        ["crop.bottom"]:bottom
      })
    },
    // 左
    _leftTouchmove(e){
      let that = this
      let systemInfo = that.data._systemInfo
      let aspectRatio = that.data._aspectRatio

      let x = e.touches[0].pageX * systemInfo.rpxPxRatio

      let left = x - that.data.viewImagesLocation.left

      if(left < 0){
        return
      }

      if( that.data.crop.right - left < 80 ){
        return
      }

      this.setData({
        ["crop.left"]:left
      })
    },

    /**
     * 外部方法
     */

    /**
     * 获取裁剪结果
     */
    getResults(getCallback){
      let that = this
      let crop =JSON.parse(JSON.stringify( that.data.crop ))

      crop.top = Math.round(crop.top / that.data._viewThanOriginal)
      crop.right = Math.round(crop.right / that.data._viewThanOriginal)
      crop.bottom = Math.round(crop.bottom / that.data._viewThanOriginal)
      crop.left = Math.round(crop.left / that.data._viewThanOriginal)
      crop.width = crop.right - crop.left
      crop.height = crop.bottom -crop.top
  
      delete crop.bottom
      delete crop.right

      let originalImageInfo = that.data._originalImageInfo

      getCallback({
        crop: crop,
        originalImageInfo: originalImageInfo
      });
    },
    /**
     * 获取裁切后的图片路径
     */
    _getImagePath(getCallback){
      wx.showLoading({
        title: '请稍后',
        mask : true
      })
      let that = this;

      let crop =JSON.parse(JSON.stringify( that.data.crop ))

      crop.top = Math.round(crop.top / that.data._viewThanOriginal)
      crop.right = Math.round(crop.right / that.data._viewThanOriginal)
      crop.bottom = Math.round(crop.bottom / that.data._viewThanOriginal)
      crop.left = Math.round(crop.left / that.data._viewThanOriginal)
      crop.width = crop.right - crop.left
      crop.height = crop.bottom -crop.top

      let originalImageInfo = that.data._originalImageInfo

      let cropPath = originalImageInfo.path
      let cropTop = crop.top
      let cropLeft = crop.left
      let cropWidth = crop.width 
      let cropHeight = crop.height

      wx.getImageInfo({
        src: cropPath,
        success(o){
          that.setData({
            canvas:{
              width: o.width,
              height: o.height
            }
          })
  
          // 画图
          const query = that.createSelectorQuery()
          query.select('#image-cropper-canvas').fields({ node: true, size: true }).exec((res) => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
  
            let canvasWidth = res[0].width
            let canvasHeight = res[0].height
            
            // 设置画布宽高
            canvas.width = canvasWidth
            canvas.height = canvasHeight
            
            //canvas 2d 通过此函数创建一个图片对象
            let img = canvas.createImage();
  
            img.src = cropPath
  
            img.onload = (e) => {
              ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight,0,0,canvasWidth,canvasHeight);
  
              let maxCanvasRate =  300/canvasWidth
  
              let x = cropLeft * maxCanvasRate 
              let y =  cropTop * maxCanvasRate 
              let width = cropWidth * maxCanvasRate
              let height = cropHeight * maxCanvasRate
  
              wx.canvasToTempFilePath({
                x: x ,
                y: y ,
                width: width,
                height: height,
                destWidth: cropWidth,
                destHeight: cropHeight,
                canvas: canvas,
                fileType: 'jpg',
                quality: that.data._quality,
                success(res) {
                  wx.hideLoading()
                  getCallback({
                    path: res.tempFilePath
                  });
                },
                fail: function(e){
                  wx.hideLoading()
                  console.log(e)
                }
              })
            }
            img.onerror = (e) => {
              wx.hideLoading()
              console.error('err:', e)
            }
          })
        },
        fail: function(e){
          wx.hideLoading()
          console.log(e)
        }
      })
    },
    /**
     * 获取裁切后的图片路径
     */
    getImagePath(getCallback){
      wx.showLoading({
        title: '请稍后',
        mask : true
      })
      let that = this;

      let crop =JSON.parse(JSON.stringify( that.data.crop ))
      crop.right = Math.round(crop.right / that.data._viewThanOriginal)
      crop.bottom = Math.round(crop.bottom / that.data._viewThanOriginal)

      // 相对于原图的裁剪框坐标
      crop.top = Math.round(crop.top / that.data._viewThanOriginal)
      crop.left = Math.round(crop.left / that.data._viewThanOriginal)
      crop.width = crop.right - crop.left
      crop.height = crop.bottom -crop.top

      let cwOwRate = this.data.canvas.width / this.data._originalImageInfo.width
      // 相对于canvas的裁剪框坐标
      let canvasCropLeft = crop.left * cwOwRate
      let canvasCropTop =  crop.top * cwOwRate
      let canvasCropWidth = crop.width * cwOwRate
      let canvasCropHeight = crop.height * cwOwRate

      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: canvasCropLeft,
          y: canvasCropTop,
          width: canvasCropWidth ,
          height: canvasCropHeight,
          destWidth: canvasCropWidth ,
          destHeight: canvasCropHeight,
          canvasId: 'image-cropper-canvas-id',
          fileType: 'jpg',
          quality: that.data._quality,
          success(res) {
            wx.hideLoading()
            getCallback({
              path: res.tempFilePath
            });
          },
          fail(e){
            console.log(e)
            wx.hideLoading()
          }
        },that)
      }, 100) //延迟时间 这里是0.1秒

    }
  
  }
})

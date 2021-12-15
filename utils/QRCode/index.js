var barcode = require("./barcode");
// const { api } = require("./qrcode");
var qrcode = require("./qrcode");
var newQrcode = require('./weapp-qrcode')

function convert_length(length) {
  return Math.round((wx.getSystemInfoSync().windowWidth * length) / 750);
}
/**
 *barc  生成条码
 * @param {*} id canvas 的id String  必填
 * @param {*} code  内容条码 String 必填
 * @param {*} width 条码宽度  String/Number 必填
 * @param {*} height 条码高度 String/Number  必填
 * @param {*} bgcolor 条码背景颜色  String选填
 * @param {*} color 条码颜色  String 选填
 * @param {*} padding_width  条码左右边距  String/Number 选填
 * @param {*} padding_height   条码上下边距 String/Number 选填
 */

function barc(
  id,
  code,
  width,
  height,
  bgcolor,
  color,
  padding_width,
  padding_height
) {
  barcode.code128(
    wx.createCanvasContext(id),
    code,
    convert_length(width),
    convert_length(height),
    bgcolor,
    color,
    padding_width,
    padding_height
  );
}
/**
 *  * 生成二维码条码
 * @param {*} id canvas 的id  String 必填
 * @param {*} code 内容条码 String  必填
 * @param {*} 样式对象  obj codeSize  二维码大小 String/Number  必填 color 二维码 bgcolor 二维码背景颜色  String 选填颜色 String  选填
 * @param {*} $this  可以$this指向
 * @param {*} callback  回调函数
 */
function qrc(id, code, {
  codeSize,
  color,
  bgcolor
}, $this, callback) {
  qrcode.api.draw(
    code,
    id, {
      cavW: convert_length(codeSize),
      cavH: convert_length(codeSize),
      cavBgcolor: bgcolor,
      cavcolor: color,
    },
    $this,
    callback
  );
}

/**
 * 
 * @param {*} canvasId 
 * @param {*} param1 
 */
function newqrc(canvasId, {
  text,
  padding = 10,
  width,
  height,
  colorDark = "#000000",
  colorLight = "#ffffff",
  correctLevel = newQrcode.CorrectLevel.Q,
  cb
},$this) {
  new newQrcode(canvasId, {
    usingIn: $this,
    text,
    padding,
    width: convert_length(width),
    height: convert_length(height),
    colorDark,
    colorLight,
    correctLevel,
    callback: (res) => {
      // 生成二维码的临时文件
      console.log(res)
      cb(res)
    }
  });
}
module.exports = {
  barcode: barc,
  qrcode: qrc,
  newqrcode: newqrc
};
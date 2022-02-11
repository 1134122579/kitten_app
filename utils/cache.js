let name = "WX_FT_TOKEN";
let userName = "WX_FT_USERINFO";
import {
  Storage
} from './storage'
let $newstorage = new Storage()

export default {
  // 获取数据
  getToken(callback) {
    // let res = await $newstorage.get(name)
    return wx.getStorageSync(name)

  },
  setToken(data) {
    wx.setStorageSync(name, data);
    // $newstorage.set(name, data, false)
  },
  oldgetToken() {
    return wx.getStorageSync(name)
  },
  removeToken() {
    wx.removeStorageSync(name);
  },
  getUserInfo() {
    return wx.getStorageSync(userName);
  },
  getInfo(infoname) {
    return wx.getStorageSync(infoname);
  },
  setInfo(infoname, data) {
    wx.setStorageSync(infoname, data);
    // $newstorage.set(name, data, false)
  },
  removeInfo(infoname) {
    wx.removeStorageSync(infoname);
  },
  setUserInfo(data) {
    wx.setStorageSync(userName, data);
  },
  // 设置缓存时间
  setStorageTime() {
    //存一个过期时间
    var timestamp = Date.parse(new Date());
    var expiration = timestamp + 21600000;
    console.log(timestamp, expiration);
    wx.setStorageSync("index_data_expiration", expiration);
  },
  // 重新登录
  getStorageTime() {
    var expiration = wx.getStorageSync("index_data_expiration"); //拿到过期时间
    var timestamp = Date.parse(new Date()); //拿到现在时间
    //进行时间比较
    if (expiration < timestamp) {
      //过期了，清空缓存，跳转到登录
      console.log("缓存已过期");
      wx.clearStorageSync(); //清空缓存
      wx.redirectTo({
        url: "/pages/login/index",
      }); //跳转到登录
      return;
    }
  },
};
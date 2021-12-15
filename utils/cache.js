let name = "WX_FT_TOKEN";
let userName = "WX_FT_USERINFO";

export default {
  // 获取数据
  getToken() {
    return wx.getStorageSync(name);
    wx.getStorage({
      key: name,
      success (res) {
        // console.log(res.data)
        return res.data
      }
    })
  },
  setToken(data) {
    wx.setStorageSync(name, data);
  // wx.setStorage({
  //   key:name,
  //   data
  // })
  },
  removeToken() {
    wx.removeStorageSync(name);
  },
  getUserInfo() {
    return wx.getStorageSync(userName);
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

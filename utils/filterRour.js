// utils/filter.js
function loginCheck(pageObj) {
  if (pageObj.onHide) {
      let _onHide = pageObj.onHide;
      // 使用onLoad的话需要传递options
      console.log('路由拦截',_onHide(),storage.getToken(),999)
      pageObj.onHide = function (options) {
          // if(wx.getStorageSync('USERID')) {
          if(storage.getToken()) {
              // 获取当前页面
              let currentInstance = getPageInstance();
              _onHide.call(currentInstance, options);
          } else {
      console.log('路由拦截',storage.getToken(),7897897897)
              //跳转到登录页
              wx.reLaunch({
                  url: "/pages/login/login"
              });
          }
      }
  }
  return pageObj;
}

// 获取当前页面    
function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;
// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync('token', res.code)
        // console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
   //定义全局数据
   globalData: {
    userInfo: null,
    imgBaseUrl:'https://dianjiu.oss-cn-beijing.aliyuncs.com',
    shopinfo :[]
  }
})

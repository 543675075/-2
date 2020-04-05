// pages/button/button.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login(e) {
    console.log(e)
    // 取出个人信息
    const { userInfo } = e.detail
    // 加入到缓存
    wx.setStorageSync("userInfo", userInfo)
    wx.navigateBack({
      delta:1
    })
  }
})
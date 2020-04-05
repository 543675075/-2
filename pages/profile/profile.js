// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeInfo:["收藏的店铺","收藏的商品","关注的商品","我的足迹"],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // 取出缓存中的个人信息并保存
    this.setData({

      userInfo: wx.getStorageSync("userInfo")
    })
  },

  login(){
   wx.navigateTo({
     url: '/pages/button/button'
   })
  }
})
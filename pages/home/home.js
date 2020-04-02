// pages/home/home.js
import { 
        swiperData,
        navData,
        showData
                    } from '../../request/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    navList: [],
    showList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送轮播图网络请求
    swiperData().then(res => {
      // console.log(res)
      // 获取轮播数据并保存
      this.setData({
        swiperList : res.data.message.map(item=>{
          return item.image_src
        })
      })
    })
    //发送导航网络请求
    navData().then(res=>{
      // console.log(res)
      // 保存数据
      this.setData({
        navList: res.data.message
      })
    })
    //发送展示广告请求
    showData().then(res=>{
      // console.log(res)
      this.setData({
        showList: res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/goods-list/goods-list.js
import {
  goodsListData
} from '../../request/goods-list.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 商品数据
    goodsList: []
  },
  // 接口参数
  params: {
    query: "",
    cid: "",
    pagenum: 1, //当前页数
    pagesize: 10 //一页的容量
  },
  // 初始化总页数为0
  totalPages: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.cid)
    this.params.cid = options.cid || ''
    this.params.query = options.query || ''
    // 发送网络请求
    this._goodsListData(this.params)
    // console.log(this.data.goodsList)
  },


  // 上拉加载
  upLoading() {
    if (this.params.pagenum > this.totalPages) {
      wx.showToast({
        title: '我是有底线的',
        icon: "loading"
      })
    } else {

      this._goodsListData(this.params)
    }
  },

  // 网络请求封装
  _goodsListData(params) {
    goodsListData(params).then(res => {
      // console.log(res)
      // 获取总的商品数量
      const allNum = res.data.message.total
      // 计算总页数(总商品/页容量)
      this.totalPages = Math.ceil(allNum / this.params.pagesize)
      // 获取商品信息
      const newGoodsList = res.data.message.goods //新值
      const oldGoodsList = this.data.goodsList //data里本来的值
      // 再把新值增加到原值里
      oldGoodsList.push(...newGoodsList)
      // 请求最后新增页数+1
      this.params.pagenum += 1
      // 赋值
      this.setData({
        goodsList: oldGoodsList
      })

    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 下拉刷新(刷新就是重置所有数据，然后在调用网络请求)
    this.setData({
      goodsList: []
    })
    this.params.pagenum = 1
    this._goodsListData(this.params)
  },

})
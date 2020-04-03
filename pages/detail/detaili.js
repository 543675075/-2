// pages/detail/detaili.js
import {
  detailData
} from "../../request/detail.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
  },
  // 商品对象
  goodsData: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this._detailData(options.goodsId)


  },

  // 网络请求
  _detailData(goods_id) {
    detailData(goods_id).then(res => {
      console.log(res)

      this.setData({
        detailData: {
          goods_id: res.data.message.goods_id,
          goods_name: res.data.message.goods_name,
          goods_price: res.data.message.goods_price,
          goods_introduce: res.data.message.goods_introduce,
          pics: res.data.message.pics,
          // 取出一张购物车的封面图，为了能使用c-goods-item的自定义组件，键名为goods_small_logo
          goods_small_logo: res.data.message.goods_small_logo
        }
      })
      this.goodsData = this.data.detailData
      console.log(this.data.detailData)
    }).catch(err => {
      console.log(err)
    })
  },
  // 加入购物车
  pushGoods() {
    // 取出本地的购物车数据
    const cartGoods = wx.getStorageSync("goodsInfo") || []
    // if(!oldCartGoods){
    //   wx.setStorageSync("goodsInfo", { time: Datenow(), data: this.data.detailData })
    // }else{

    // }
    // 判断购物车有没有同类商品
    const index = cartGoods.findIndex((item,index,arr) => {
      return  item.goods_id === this.data.detailData.goods_id
    })
    if (index === -1) {
      //  第一次添加
      this.goodsData.num = 1
      // 这个属性是为了后面购物车计算的
      this.goodsData.checked = false
      cartGoods.push(this.goodsData)
    }else{
      // 本身存在
      cartGoods[index].num +=1
    }
    // 把商品重新添加回购物车缓存
    wx.setStorageSync("goodsInfo", cartGoods)

    // 添加成功弹窗提示
   wx.showToast({
     title: '加入成功',
     mask: true
   })
  }
  
})
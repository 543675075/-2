// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    payGoods: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中取出数据
    const address = wx.getStorageSync("address")
    const totalGoods = wx.getStorageSync("goodsInfo")
    // 从所有商品中刷选出待支付的商品
    const payGoods = totalGoods.filter(item=>{
      return item.checked == true
    })
    //计算总价格
    let totalPrice=0
    let totalNum= 0
    payGoods.forEach(item=>{
       totalPrice +=item.goods_price*item.num 
        totalNum += item.num
    })
    console.log(totalPrice)
    // 存入到data中
    this.setData({
      payGoods,
      address,
      totalPrice,
      totalNum
    })
  },
  handlePay(){
    wx.showModal({
      title: '友情提示',
      content: '个人账号没有支付这个权限',
    })
  }
})
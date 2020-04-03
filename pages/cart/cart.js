// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    // 总价
    totalPrice: 0,
    // 总数量
    totalNum : 0,
    // 全选
    allChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 从本地取出数据渲染
    const goods = wx.getStorageSync("goodsInfo")
    this.setData({
      goodsData: goods
    })
    // console.log(this.data.goodsData)
  },

  

  // 事件监听
  handlecheck(e){
    console.log(e)
    // 取出点击商品的索引
    const index = e.currentTarget.dataset.index
    // 取出商品列表
    let {goodsData} = this.data
    // 根据选中状态修改原商品数据中的chencked
    goodsData[index].chencked = !goodsData[index].chencked
  },




  
  goodsCount(e) {
    console.log(e)
    // 取出点击商品的索引值
    const index = e.currentTarget.dataset.index
    // 取出区分点击了减少还是增加的判断值
    const name = e.currentTarget.dataset.name
    // 取出购物车的商品数组
    let {goodsData} = this.data
    // 判断是否执行删除
    if (name == "reduce" && goodsData[index].num == 1) {
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success:()=>{
          goodsData.splice(index,1)
        }
      })
    }
  }
})
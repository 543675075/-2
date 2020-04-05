// pages/cart/cart.js
import {
  chooseAddress,
  openSetting,
  getSetting
} from '../../utils/c-wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodsData: [],
    // 总价
    totalPrice: 0,
    // 总数量
    totalNum: 0,
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
    this._updata(this.data.goodsData)
    // console.log(this.data.goodsData)
  },


  // 设置地址(自带的几个API改用promise方法提前封装好了)
  getAddress() {
    // 先获取用户当前的设置，根据设置进行判断
    getSetting().then(res => {
      const scope = res.authSetting["scope.address"]
      // scope有三种状态，true（获取地址点了确定）,false（获取地址点了取消）和undefined（没获取过地址）
      if (scope == false) {
        openSetting().then(res => {
          chooseAddress().then(res => {
            // 赋值
            this.setData({
              address: res
            })
            // 存入缓存
            wx.setStorageSync("address", this.data.address)
          })
        })
      } else {
        chooseAddress().then(res => {
          // 赋值
          this.setData({
            address: res
          })
          // 存入缓存
          wx.setStorageSync("address", this.data.address)
        })
      }
    })

    // chooseAddress().then(res => {
    //   console.log(res)
    // })
  },
  // 购物车商品选中触发事件监听
  handlecheck(e) {
    console.log(e)
    // 取出点击商品的索引
    const index = e.currentTarget.dataset.index
    // 取出商品列表
    let {
      goodsData
    } = this.data
    // 根据选中状态修改原商品数据中的checked
    goodsData[index].checked = !goodsData[index].checked
    // 更新底部tabbar
    this._updata(goodsData)


  },

  // 商品数量删改事件监听
  goodsCount(e) {
    console.log(e)
    // 取出点击商品的索引值
    const index = e.currentTarget.dataset.index
    // 取出区分点击了减少还是增加的判断值
    const method = e.currentTarget.dataset.method
    // 取出购物车的商品数组
    let {
      goodsData
    } = this.data
    // 判断是否执行删除
    if (method == -1 && goodsData[index].num == 1) {
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success: () => {
          goodsData.splice(index, 1)
          this._updata(goodsData)
        }
      })
    } else {
      goodsData[index].num += method
      this._updata(goodsData)
    }

  },

  // 实时跟新底部tabbar数据()
  _updata(v) {
    let allChecked = true
    let totalPrice = 0 //商品总价
    let totalNum = 0 //商品总数量
    // 判断全选按钮是否为true
    // 先判断商品是否为空
    v.length === 0 ? allChecked = false : allChecked = true
    v.forEach(item => {
      !item.checked ? allChecked = false : true
    })
    // 提取出选中的商品
    let newGoods = v.filter(item => {
      return item.checked == true
    })
    // 遍历选中商品并算出总价和总数量
    newGoods.forEach(item => {
      totalPrice += item.goods_price * item.num
      totalNum += item.num
    })
    // 重新赋值给data和缓存
    this.setData({
      goodsData: v,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("goodsInfo", v)
  },

  // 结算
  handlePay(){
    // 遍历所有商品
    if(!this.data.address.userName){
      wx.showToast({
        title: '请选择收获地址',
        icon: "none"
      })
      return
    }else if(this.data.totalNum == 0){
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
      return
    }

    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }

})
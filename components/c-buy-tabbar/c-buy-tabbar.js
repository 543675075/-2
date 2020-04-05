// components/c-buy-tabbar/c-buy-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalPrice: {
      type: Number,
      value: 0
    }
  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePay(){
      this.triggerEvent("handlePay")
    }
  }
})

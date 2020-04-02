// pages/category/category.js
import {
  categoryData
} from "../../request/category.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧标题数据
    categoryTitle: [],
    // 切换标题的索引值
    num: 0,
    // 右侧品牌数据
    categoryList: [],
    // scroll-view标题距离顶部的数值（每次点击左侧标题后需要重新赋值为0）
    scrollTop: 0
  },
  Message: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断本地是否有数据
    const Info = wx.getStorageSync("info")
    if(!Info){
      this._categoryData() 
    }else{
      if(Date.now()-Info.time>1000*10){
        this._categoryData() 
      }else{
        console.log("本地数据")
        this.setData({
          categoryTitle: Info.data.map(item => item.cat_name),
          categoryList: Info.data[0].children
        })
      }
    }

  },
  // 网络请求
  _categoryData() {
    categoryData().then(res => {
      // console.log(res)
      this.message = res.data.message
      // 把接口数据存入到本地存储中
      wx.setStorageSync("info", {time:Date.now(),data:this.message})  
      //保存数据 
      this.setData({
        categoryTitle: this.message.map(item => item.cat_name),
        categoryList: this.message[0].children
      })
    })
  },
  // 事件处理
  handleClick(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      num: index,
      categoryList: this.message[index].children,
      scrollTop: 0
    })
  }
})
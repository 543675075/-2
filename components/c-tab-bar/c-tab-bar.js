// components/c-tab-bar/c-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: ["综合","销量","价格"],
    num: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      console.log(e)
      this.setData({
        num: e.currentTarget.dataset.index
      })
    }
  }
})

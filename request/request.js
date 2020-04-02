const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
// 首页发送网络请求共三次，等三次都请求到之后在关闭加载中(声明一个变量，发送网络请求就++，请求完毕就--，然后等于0 关闭加载中)
let count = 0
export default function request(options){
  count++
 return new Promise((resolve,reject)=>{
   wx.showLoading({
     title: '加载中',
     mask: true
   })
   wx.request({
     url: baseUrl+options.url,
     method: options.method || "get",
     data: options.data || {},
     success: (res)=>{
       resolve(res)
      
     },
     fail: reject,
     complete:()=>{
       count--
       if (count === 0) wx.hideLoading()
     }
   })
  })
}
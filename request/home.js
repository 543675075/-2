import request from './request.js'

// 轮播图
export function swiperData(){
  return request({
    url: "/home/swiperdata"
  })
}

//导航
export function navData(){
  return request({
    url: "/home/catitems"
  })
}
//商品展示
export function showData(){
  return request({
    url: "/home/floordata"
  })
}
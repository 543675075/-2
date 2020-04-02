import request from './request.js'

export function detailData(goods_id){
  return request({
    url: "/goods/detail",
    data: {
      goods_id
    }
  })
}
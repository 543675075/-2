import request from './request.js'

export function goodsListData(options) {
  return request({
    url: "/goods/search",
    data: {
      query:options.query,
      cid: options.cid,
      pagenum: options.pagenum,
      pagesize: options.pagesize
    }
  })
}
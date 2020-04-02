import request from './request.js'

export function categoryData(){
  return request({
    url: '/categories'
  })
}
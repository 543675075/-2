

export function chooseAddress(){
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:resolve,
      fail: reject
    })
  })
}


export function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: resolve,
      fail: reject
    })
  })
}

export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: resolve,
      fail: reject
    })
  })
}
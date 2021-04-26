



const _tokenKey = 'token'
let instance
export class DataBus{

  constructor(){
    if(!instance) instance = this
    return instance

  }


  _save(key, data) {
    wx.setStorage({
      key,
      data
    })
  }

  _get(k) {
    try {
      var value = wx.getStorageSync(k)
      if (value) {
        return value
      }
    } catch (e) {
      console.error('获取用户信息错误')
      return null
    }
  }

  saveToken(t) {
    // console.warn('存入的token', t, s)
    // if (!t && !s) return
    // console.warn('存入的token success', t, s)
    // let d = { t, s }
    t = JSON.stringify(t)
    this._save( _tokenKey, t)
  }

  getToken() {
    try {
      let v = this._get( _tokenKey )
      v = JSON.parse(v)
      return v.token
    }
    catch (e) {
      return null
    }
  }
  delToken() {
    return this._remove(this._tokenKey)
  }





  
}
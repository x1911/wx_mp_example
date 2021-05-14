
const basicUrl = ''


import {DataBus} from './DataBus'
const DB = new DataBus()
let instance

export class Net{
  constructor(){
    if(instance) return instance
    instance = this
  }

  async post(url, data) {
    url = basicUrl + url
    try{
      const ans = await this._post(url, data)
      // console.log('post', ans.message, typeof ans)
      if(!ans) throw Error( ans )
      // if(!ans.success) throw Error( ans.msg )
      return ans
    }
    catch(e){
      this.alert(e)
    }
  }
  
  async getFunc(url, data = {}) {
    url = basicUrl + url
    try{
      const ans = await this._get(url, data)
      if(!ans) throw Error( ans )
      return ans
    }
    catch(e){
      this.alert(e)
    }
  }






  _post(url = this._basicUrl, data = {}) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      // const t = this

      let header = {
        'content-type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded', // 默认值
      }

      const tt = DB.getToken()
      if (tt) {
        header['x-access-token'] = tt
        header['Authorization'] = tt && tt.t
        header['Cookie'] = tt && tt.s // 手动维护一个cookie
      }

      console.log('header', header, tt)
      wx.request({
        url,
        data,
        method: 'POST',
        header,
        success(res) {
          // console.log('post check', url, header, res.header)
          console.log('post check', url, res.header, tt)
          // DB.saveToken(res.header.Authorization, res.header['Set-Cookie']) // 保存token
          resolve(res.data)
        },
        fail(err) {
          console.error('访问网络出错', err)
          reject(err)
        },
        complete() {
          wx.hideLoading()
        }
      })
    }) // promiese
  } // get


  _get(url = this._basicUrl, data = {}) { // 该项目暂不用
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      // wx.hideLoading()
      wx.request({
        url,
        data,
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': DB.getToken()
        },
        success(res) {
          // console.log('get成功', res)
          resolve(res.data)
        },
        fail(err) {
          console.error('访问网络出错', err)
          reject(err)
        },
        complete() {
          wx.hideLoading()
        }
      })
    }) // promiese
  } //get



  alert( title = '警告' ){
    if( typeof title === 'object' ) title = JSON.stringify( title )
    wx.showToast({
      title, //弹框内容
      icon: 'none',  //弹框模式
      duration: 3000    //弹框显示时间
    })
  }
  
}

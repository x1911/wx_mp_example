const url = ''

export const MsgTypes = Object.freeze({
    INIT: 1,
    CHAT: 2,
    PLAYERLIST: 3,
})

let isSocketOpen = false
let instance
export class Socket {
    constructor() {
        if (!instance) instance = this
        return instance

    }


    socketConnect() {

        this.surl = url

        return new Promise((res, rej) => {
            console.log('链接信息', this.surl)
            wx.connectSocket({
                url: this.surl,
            })
            wx.onSocketOpen(a => {
                isSocketOpen = true
                res(a)
            })
            wx.onSocketMessage((result) => {

                if (!this.msgs) this.msgs = []

                const data = JSON.parse(result.data)
                console.log('接收到服务器信息', result, this, data)
                if (data.type === MsgTypes.PLAYERLIST) {
                    this.playerList = data.list
                    let msg
                    if (data.new) msg = data.new + ' 加入了聊天室'
                    else if (data.leave) msg = data.leave + ' 离开了聊天室'
                    if (msg) this.msgs.push({ msg })
                }
                else if (data.type === MsgTypes.CHAT) this.msgs.push(data)

                // console.log('当前数据', this.msgs )
                if (this.onMsg) this.onMsg(this.msgs)
            })
        })
    }  //socketConnect


    sendMessage(data) {
        return new Promise((res, rej) => {
            if (!isSocketOpen) return
            wx.sendSocketMessage({
                data: JSON.stringify(data),
            })
        })
    }
}
'use strict'

//
exports.reply = function* (next){
    var message = this.weixin
    if(message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫二维码而来：' + message.EventKey + '' + message.ticket)
            }
            console.log(message)
            console.log(message.Event)
            this.body = '哈哈，你订阅了这个号\r\n' + "Ops……这里目前嘛也没有 \r 不过你可以试试输入1或2"
        } else if (message.Event === 'unsubscribe') {
            console.log('取消关注')
            this.body = ''
        } else if (message.Event === 'LOCAION') {
            this.body = '您的上报位置是:纬度'+message.Latitude+',经度'+message.Longitude+'。位置精度:'+message.Precision
        } else if (message.Event === 'CLICK'){
            this.body = '您点击了菜单：'+ message.EventKey
        } else if (message.Event === 'SCAN'){
            console.log('扫二维码而来：' + message.EventKey + '' + message.ticket)
            this.body = '看到你扫了一下哦'
        }
    }else if(message.MsgType === 'text'){
        var content = message.Content
        var reply = '你说的'+message.Content +'太复杂了，完全理解不了呢……试试iPhone7吧'
        if(content === '1') {
            reply = '天下第一吃大米'
        } else if(content === '2'){
                reply = '天下第二吃红薯'
        } else if(content.toUpperCase() === 'IPHONE7'){
            reply = [{
                title:'Tecnology Change the World',
                description:'This is 7',
                picUrl:'http://images.apple.com/v/home/cv/images/gallery/iphone_large.jpg',
                url:'http://images.apple.com/media/cn/iphone-7/2016/5937a0dc_edb0_4343_af1c_41ff71808fe5/films/materials/iphone7-materials-tft-cn-20160907_1536x640h.mp4'
                //url:'http://weibo.com/p/2304448e4576dee761607bf3c1bf3889d4e08e'
            }]
        }

        this.body = reply
    }

    yield next
}
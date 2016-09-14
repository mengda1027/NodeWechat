'user strict'

var util = require('./libs/util')
var path = require('path')
var wechat_file = path.join(__dirname,'./config/wechat.txt')

var config = {
    wechat:{
        appID:'wx86dd7713a5f744fa',
        appSecret:'aa0b1cda9dd29edd886eb31e24020a34',
        token:'mengda20160822',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        }
    }
}

module.exports = config
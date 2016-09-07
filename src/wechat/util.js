'use strict'

var Promise = require('bluebird')
var xml2js = require('xml2js')

/**
 * xml解析为json
 * @param xml
 * @returns {bluebird|exports|module.exports}
 */
exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve,reject){
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err) reject(err)
            else resolve(content)
        })
    })
}

/**
 * 格式化xml转化后的json对象
 * @param result
 * @returns {{}}
 */
function formatMessage(result){
    var message = {}
    if (typeof result === 'object'){
        var keys = Object.keys(result)
        for(var i=0;i<keys.length;i++){
            var item = result[keys[i]]
            var key = keys[i]
            if(!(item instanceof Array)||item.length===0){   //不是数组或长度为零
                continue
            }else if(item.length == 1){
                var val = item[0]
                if(typeof val ==='object'){
                    message[key] = formatMessage(item)
                }else {
                    message[key] = (val||'').trim()
                }
            }else{      //此时item 是数组
                message[key] = []
                for(var j = 0; j<item.length;j++){
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message
}

exports.formatMessage = formatMessage
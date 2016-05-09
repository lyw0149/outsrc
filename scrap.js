var http = require('http');
var request =require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var db = null;
 MongoClient.connect('mongodb://localhost:27017/hlsc',function(err,db1){
     db=db1
 })

var baseURL = 'http://www.hlsc.co.kr/front/brand/aj_item_search.php';
var form = {
    bd_id:'',
    wc_id:'',
    sort:'',
    aj_mode:'search',
    p:1,
    page_scale:2000,
    thumb_w:234,
    thumb_h:234,
    item_detail_length:300
}

var options = {
    method : 'POST',
    url : baseURL,
    form : form
}

request(options,function(err,res,body){
    var json = JSON.parse(body);
    if(json.msg == '성공'){
        json.arrList1.forEach(function(value,index){
        db.collection('items').insert(value);
            console.log(index,value.I_NAME,Object.keys(value).length);
        })
    }
})
    



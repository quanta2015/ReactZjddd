var fs = require('fs');
var https = require('https');
var path = require('path');
var cors = require('cors');
var axios = require('axios');
var logger = require('morgan');
var dotenv = require('dotenv');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());


app.use(express.static(__dirname + '/'));
app.use('/img', express.static('img'));


// var users     = require('./routes/users');
// var messages  = require('./routes/messages');
var proj  = require('./routes/proj');
var caro = require('./routes/caro');
var news = require('./routes/news');
var desi = require('./routes/desi');
var img  = require('./routes/img');

// app.use('/api/user', users)
// app.use('/api/message', messages)
app.use('/api/caro', caro);
app.use('/api/news', news);
app.use('/api/proj', proj);
app.use('/api/desi',desi);
app.use('/api/img', img);


app.get('/api/getToken',function(req,res,next) {
  var getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe9896d3baf022cd3&secret=d2d9696ba2c11eede4f55a5460acfb71'
  axios.get(getTokenUrl).then( (r)=> {
    var token = r.data.access_token
    var data = {
      "type":"news",
      "offset":0,
      "count":999
    }
    var getNewsUrl = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${token}`
    axios.post(getNewsUrl,data).then( (r)=> {
      console.log(r.data)
      var list = r.data.item;
      var ret = []

      for(var i=0;i<list.length;i++) {
        var o = {
          "_id":list[i].media_id,
          "date":list[i].content.create_time,
          "title":list[i].content.news_item[0].title,
          "digest":list[i].content.news_item[0].digest,
          "url":list[i].content.news_item[0].url,
          "content": list[i].content.news_item[0].content
        }
        ret.push(o)
      }
      
      res.send(JSON.stringify({msg:"wechat news success",'news':ret}));
    })
  })
})

var options = {
  key:fs.readFileSync('key/4700980_www.zjddd.com.key'),
  cert:fs.readFileSync('key/4700980_www.zjddd.com.pem')
}

https.createServer(options, app).listen(443, () => console.log("> Running on localhost:443"));
// app.listen(80, () => console.log("> Running on localhost:80"));
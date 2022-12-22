var fs = require('fs');
var https = require('https');
var path = require('path');
var cors = require('cors');
var axios = require('axios');
var dotenv = require('dotenv')
var express = require('express');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var schedule = require('node-schedule')
var cookieParser = require('cookie-parser');
var dayjs = require('dayjs')
var compressing = require('compressing')


dotenv.config();
const app = express();
app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser())

app.use(express.static(__dirname + '/'));
app.use('/img', express.static('img'));


var user = require('./routes/user');
var msg  = require('./routes/msg');
var proj = require('./routes/proj');
var caro = require('./routes/caro');
var news = require('./routes/news');
var desi = require('./routes/desi');
var img  = require('./routes/img');

app.use('/api/user', user)
app.use('/api/msg',  msg)
app.use('/api/caro', caro);
app.use('/api/news', news);
app.use('/api/proj', proj);
app.use('/api/desi', desi);
app.use('/api/img',  img);


//定时任务
scheduleScanMail()

function scheduleScanMail() {
  var rule = new schedule.RecurrenceRule(); 
  // rule.minute = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58]; 
  rule =  '30 1 1 * * 1'
  schedule.scheduleJob(rule,async ()=>{
    let zipfile    = `${dayjs().format('YYYY-MM-DD-hhmmss')}.zip`
    let sourceDir  = `${__dirname}/data`
    let bakcupFile = `${__dirname}/backup/${zipfile}`
    let msg = {
      from: "liyangtom@163.com",
      to:   "553713928@qq.com",
      subject: `${dayjs().format('YYYY年MM月DD日 hh:mm:ss')} 东都网站数据备份 `,
      html: `${dayjs().format('YYYY-MM-DD')}`,
      attachments: [{
        filename : zipfile,
        path: bakcupFile
      }]
    }

    await compressing.zip.compressDir(sourceDir,bakcupFile)

    sendMail(msg, ()=>{ console.log('backup success!') })

  })
}

function sendMail(message,cb) {
  let data = {
    host: "smtp.163.com",
    port: "465",
    secureConnection: false,
    // secure: true,
    auth: {
      user: "liyangtom@163.com",
      pass: "qwe123qwe123"
    }
  }

  let transporter = nodemailer.createTransport(data)
  
  transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
    }
    console.log('Message sent successfully!');
    transporter.close();
    cb()
  });
}



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
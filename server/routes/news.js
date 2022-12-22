var express = require('express');
var axios = require('axios');
var fs = require('fs');
var router = express.Router()
var dayjs = require('dayjs')

const getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe9896d3baf022cd3&secret=d2d9696ba2c11eede4f55a5460acfb71'

router.get('/getNews', (req, res) => {
  let news = fs.readFileSync(`./data/news.json`,'utf-8')
  res.status(200).json({ code: 200, news: JSON.parse(news).news })
})

router.post('/addNews', (req, res) => {
  const { title, content } = req.body
  let r = JSON.parse(fs.readFileSync('./data/news.json','utf-8'))
  r.news.unshift({
    id:dayjs().format('YYYYMMDDhhmmssSSS'),
    title: title,
    content:content,
    date: dayjs().format('YYYY-MM-DD')
  })
  fs.writeFileSync('./data/news.json', JSON.stringify(r))
  res.status(200).json({ code: 200, news: r.news })
})


router.post('/delNews', (req, res) => {
  const { id } = req.body
  let index = -1
  let r = JSON.parse(fs.readFileSync(`./data/news.json`,'utf-8'))
  r.news.forEach((item,i)=>{
    if (item.id === id) {
      index = i
    }
  })
  r.news.splice(index, 1)
  fs.writeFileSync('./data/news.json', JSON.stringify(r))
  res.status(200).json({ code: 200, news: r.news })
});



router.get('/getWeNews',function(req,res,next) {
  
  axios.get(getTokenUrl).then( (r)=> {

    console.log(r)
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

      console.log(ret)
      
      res.send(JSON.stringify({msg:"wechat news success",'news':ret}));
    })
  })
})


// router.post('/addNew', (req, res) => {
//   const { title, content, date } = req.body;
//   const newNew = new New({ title, content, date });
//   newNew.save()
//     .then(record => {
//       record.url = `/new/${record._id}`;
//       record.save()
//         .then(newRecord => {
//           res.status(200).json({
//             new: newRecord,
//             msg: '添加新公告成功！'
//           })
//         })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         errors: '添加新公告失败，请重试！'
//       });
//     });
// });

// router.get('/getAllNew', (req, res) => {
//   New.find({})
//     .sort({ date: 'desc' })
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         news: record,
//         msg: '获取公告成功！'
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取公告失败'
//       });
//     });  
// });

// router.get('/getNews', (req, res) => {
//   var page = parseInt(req.query.page);
//   var size = parseInt(req.query.size);
//   New.find({})
//     .sort({ date: 'desc' })
//     .limit(size)
//     .skip((page-1)*size)
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取工程项目成功！',
//         news: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取工程项目失败，请重试！'
//       });
//     });
// })

// router.post('/deleteNew', (req, res) => {
//   const { id } = req.body;
//   New.findOne({ _id: id })
//     .then(record => {
//       record.remove()
//         .then(() => {
//           res.status(200).json({
//             msg: '删除公告成功！'
//           });
//         })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '删除公告失败，请重试！'
//       });
//     });
// })

// router.get('/getNew/:id', (req, res) => {
//   const id = req.params.id;
//   New.findOne({ _id: id })
//     .then(record => {
//       res.status(200).json({
//         new: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取公告失败！'
//       });
//     });
// })

// router.get('/getNews/:count', (req, res) => {
//   const count = req.params.count;
//   New.find({})
//     .sort({ date: 'desc' })
//     .limit(parseInt(count))
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取工程项目成功！',
//         news: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取工程项目失败，请重试！'
//       });
//     });
// })

// router.post('/updateNew', (req, res) => {
//   const { title, content, id, date } = req.body;
//   New.findOneAndUpdate({ _id: id}, {$set: { title, content, date }}, function(err, record) {
//     if (err) res.status(500).json({ errors: '更新公告失败，请重试！' });
//     res.status(200).json({ msg: '更新公告成功！' });
//   });
// });


module.exports = router
// export default router;
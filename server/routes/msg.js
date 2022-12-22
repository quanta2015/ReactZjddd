var express = require('express')
var fs = require('fs')
var dayjs = require('dayjs')
const router = express.Router();

router.post('/addMsg', (req, res) => {
  const { name, phone, email, msg } = req.body;
  let r = JSON.parse(fs.readFileSync('./data/msg.json','utf-8'))
  r.msg.push({
    id:dayjs().format('YYYYMMDDhhmmssSSS'),
    date: dayjs().format('YYYY-MM-DD'),
    name: name,
    email:email,
    phone:phone,
    msg:msg,
  })
  fs.writeFileSync('./data/msg.json', JSON.stringify(r))
  res.status(200).json({ code: 200, msg: '您已留言成功！' })
})

router.get('/getMsg', (req, res) => {
  let msg = fs.readFileSync(`./data/msg.json`,'utf-8')
  res.status(200).json({ code: 200, msg: JSON.parse(msg).msg })
})

router.post('/delMsg', (req, res) => {
  let msg = fs.readFileSync(`./data/msg.json`,'utf-8')
  const { id } = req.body
  let index = -1
  let r = JSON.parse(fs.readFileSync(`./data/msg.json`,'utf-8'))
  r.msg.forEach((item,i)=>{
    if (item.id === id) {
      index = i
    }
  })
  r.msg.splice(index, 1);
  fs.writeFileSync('./data/msg.json', JSON.stringify(r))
  res.status(200).json({ code: 200, msg: r.msg })
})

module.exports = router

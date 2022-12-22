var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var dayjs = require('dayjs')
var router = express.Router();


router.get('/getAllCarousel', (req, res) => {
  let carl = fs.readFileSync(`./data/carl.json`,'utf-8')
  res.status(200).json({ code: 200, carl: JSON.parse(carl).carl })
})

router.post('/addCarl', (req, res) => {
  const { name, img } = req.body
  let r = JSON.parse(fs.readFileSync(`./data/carl.json`,'utf-8'))
  r.carl.push({
    id:dayjs().format('YYYYMMDDhhmmssSSS'),
    title: name,
    img:img,
  })
  fs.writeFileSync('./data/carl.json', JSON.stringify(r))
  res.status(200).json({ code: 200, carl: r.carl })
});

router.post('/delCarl', (req, res) => {
  console.log(req.body)
  const { id } = req.body
  let index = -1
  let r = JSON.parse(fs.readFileSync(`./data/carl.json`,'utf-8'))
  r.carl.forEach((item,i)=>{
    if (item.id === id) {
      index = i
    }
  })
  r.carl.splice(index, 1);
  fs.writeFileSync('./data/carl.json', JSON.stringify(r))
  res.status(200).json({ code: 200, carl: r.carl })
});


module.exports = router
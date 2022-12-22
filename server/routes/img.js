var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var router = express.Router()
var formidable = require('formidable')
var dayjs = require('dayjs')


router.post('/upload', function (req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req)
  form.on('fileBegin', function (name, file) {
    let type = file.name
    file.path = `img/${type}/${type}_${dayjs().format('YYYYMMDDhhmmssSSS')}.jpeg`
  })

  form.on('file', (name, file) => {
    res.status(200).json({
      code: 200,
      msg: '上传照片成功',
      data: {path: file.path}
    })
  })
})


router.get('/getHonr', (req, res) => {
  var ret = [];
  fs.readdirSync(path.resolve(__dirname, '../img/honor')).forEach(file => {
    ret.push({
      "title": file.replace(/(.*\/)*([^.]+).*/ig,"$2"),
      "img": 'img/honor/' + file,
    });
  });
  res.status(200).json({honr: ret});
});


module.exports = router
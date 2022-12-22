var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var dayjs = require('dayjs')
var router = express.Router();

function resize(path, width, height) {
  var index = path.lastIndexOf("\/");
  var after = path.substring(index + 1, path.length);
  var before = path.substring(0, index + 1);
  sharp(path).resize({ width, height }).toFile(before + 'icon_' + after)
    .then(function(newFileInfo) {
      console.log(newFileInfo)
    })
}

const projectImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/project');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
});

const projectImgUpload = multer({
  storage: projectImgStorage,
  limits: {
    fileSize: 10*1024*1024
  }
});


router.get('/getProj', (req, res) => {
  let ret = []
  let proj = fs.readFileSync(`./data/proj.json`,'utf-8')
  res.status(200).json({ code: 200, proj: JSON.parse(proj).proj })
})


router.post('/addProj', (req, res) => {
  const { name, type, category, img } = req.body
  let r = JSON.parse(fs.readFileSync(`./data/proj.json`,'utf-8'))
  r.proj.push({
    id:dayjs().format('YYYYMMDDhhmmssSSS'),
    title: name,
    type: type,
    category: category,
    img:img,
    date: dayjs().format('YYYY-MM-DD'),
  })
  fs.writeFileSync('./data/proj.json', JSON.stringify(r))

  img.map(path => { resize(path, 200) })
  res.status(200).json({ code: 200, proj: r.proj })
});

router.post('/delProj', (req, res) => {
  const { id } = req.body
  let index = -1
  let r = JSON.parse(fs.readFileSync(`./data/proj.json`,'utf-8'))
  r.proj.forEach((item,i)=>{
    if (item.id === id) {
      index = i
    }
  })
  r.proj.splice(index, 1);
  fs.writeFileSync('./data/proj.json', JSON.stringify(r))
  res.status(200).json({ code: 200, proj: r.proj })
});


module.exports = router
// export default router;
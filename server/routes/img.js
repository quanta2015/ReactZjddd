var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const router = express.Router();

const newImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/new');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
});

const newImgUpload = multer({
  storage: newImgStorage,
  limits: {
    fileSize: 10*1024*1024
  }
});


router.get('/getHonr', (req, res) => {
  let ret = []
  let honrPath = path.resolve(__dirname,'../img/honor')
  let files = fs.readdirSync(honrPath)
  files.forEach((file,index)=>{
    ret.push(`img/honor/${file}`)
  })

  res.status(200).json({ code: 200, honr: ret })
})



router.post('/upload', newImgUpload.single('new_img'), (req, res) => {
  console.log(req.file)
  if (req.file.path) {
    res.status(200).json({
      img: req.file.path
    })
  } else {
    res.status(500).json({})
  }
})


module.exports = router
// export default router;
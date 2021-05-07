var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

const router = express.Router();

// const carouselImgStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './img/carousel');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
//   }
// })

// const carouselImgUpload = multer({
//   storage: carouselImgStorage,
//   limits: {
//     fileSize: 10*1024*1024
//   }
// });


router.get('/getAllCarousel', (req, res) => {
  let ret = []
  let carl = fs.readFileSync(`./data/carl.json`,'utf-8')
  res.status(200).json({ code: 200, carl: JSON.parse(carl).carl })
})

// router.post('/addCarousel', carouselImgUpload.single('carousel_img'), (req, res) => {
//   const { title, desc, projectId } = req.body;
//   const carousel = new Carousel({ title, desc, projectId, img: req.file.path });
//   carousel.save()
//     .then(record => {
//       res.status(200).json({
//         carousel: record,
//         msg: '添加轮播图成功！'
//       })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '添加轮播图失败，请重试！'
//       });
//     });
// });



// router.post('/updateCarousel', carouselImgUpload.single('carousel_img'), (req, res) => {
//   const { title, desc, id, projectId } = req.body;

//   Carousel.findOne({ _id: id })
//     .then(record => {
//       fs.unlinkSync(record.img);
//       record.title = title;
//       record.desc = desc; 
//       record.projectId = projectId;
//       record.img = req.file.path;
//       record.save()
//         .then(newRecord => {
//           res.status(200).json({ msg: '更新成功！' });
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errors: '更新失败，请重试！' });
//     });
// })

// router.post('/getCarousel', (req, res) => {
//   const { id } = req. body;
//   Carousel.findOne({ _id: id })
//     .then(record => {
//       res.status(200).json({
//         carousel: record
//       })
//     })
//     .catch(err => {
//       errors: '获取失败！'
//     });
// })

// router.post('/deleteCarousel', (req, res) => {
//   const { id } = req.body;
//   Carousel.findOne({ _id: id })
//     .then(record => {
//       record.remove()
//         .then(record => {
//           fs.unlinkSync(record.img);
//           res.status(200).json({
//             msg: '删除成功！'
//           });
//         })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '删除失败，请重试！'
//       });
//     });
// });


module.exports = router
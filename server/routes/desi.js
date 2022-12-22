var express = require('express');
var multer = require('multer');
// var Designer = require('../models/designer');
var fs = require('fs');
var path = require('path');

const router = express.Router();

const designerImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/designer');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  }
});

const designerImgUpload = multer({
  storage: designerImgStorage,
  limits: {
    fileSize: 10*1024*1024
  }
});


router.get('/getDesi', (req, res) => {
  let ret = []
  let desi = fs.readFileSync(`./data/desi.json`,'utf-8')
  res.status(200).json({ code: 200, desi: JSON.parse(desi).desi })
})

router.post('/savDesi', (req, res) => {
  const { list } = req.body
  let r = JSON.parse(fs.readFileSync(`./data/desi.json`,'utf-8'))
  r.desi = list
  fs.writeFileSync('./data/desi.json', JSON.stringify(r))
  console.log(r.desi)
  res.status(200).json({ code: 200, desi: r.desi })
});



// router.post('/addDesigner', designerImgUpload.single('designer_img'), (req, res) => {
//   var { name, title, desc, projectsId } = req.body;
//   projectsId = JSON.parse(projectsId)
//   const designer = new Designer({ projectsId, name, title, desc, img: req.file.path });
//   designer.save()
//     .then(record => {
//       res.status(200).json({
//         designer: record,
//         msg: '添加设计师成功！'
//       })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '添加设计师失败，请重试！'
//       });
//     });
// });

// router.get('/getAllDesigner', (req, res) => {
//   Designer.find({})
//     .sort({ createdAt: 'desc' })
//     .populate([{
//       path: 'projectsId',
//       populate: [{
//         path: '_id',
//         model: 'Project'
//       }]
//     }])
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取设计师成功！',
//         designers: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取设计师失败，请重试！'
//       });
//     });
// });

// router.post('/updateDesigner', designerImgUpload.single('designer_img'), (req, res) => {
//   const { name, title, desc, id, projectsId } = req.body;

//   Designer.findOne({ _id: id })
//     .then(record => {
//       fs.unlinkSync(record.img);
//       record.projectsId = JSON.parse(projectsId);
//       record.name = name;
//       record.title = title;
//       record.desc = desc;
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

// router.post('/getDesigner', (req, res) => {
//   const { id } = req. body;
//   Designer.findOne({ _id: id })
//     .then(record => {
//       res.status(200).json({
//         designer: record
//       })
//     })
//     .catch(err => {
//       errors: '获取失败！'
//     });
// })

// router.post('/deleteDesigner', (req, res) => {
//   const { id } = req.body;
//   Designer.findOne({ _id: id })
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
// export default router;
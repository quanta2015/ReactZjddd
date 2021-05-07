var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var { getImgFromArray, getImgAfterDeleting, getImgAfterAdding } = require('../utils/imgArray');

const router = express.Router();

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

  console.log(proj)
  res.status(200).json({ code: 200, proj: JSON.parse(proj).proj })
})



// router.post('/addProject', projectImgUpload.array('project_imgs'), (req, res) => {
//   const { title, content, type, category, date } = req.body;

//   const project = new Project({ title, content, category, type, date, img: getImgFromArray(req.files) });
//   console.log(project)
//   project.save()
//     .then(record => {
//       record.img.map(path => {
//         resize(path, 200)
//       })

//       res.status(200).json({
//         project: record,
//         msg: '添加工程成功！'
//       })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '添加工程失败，请重试！'
//       });
//     });
// });

// router.get('/getProject/:id', (req, res) => {
//   const id =  req.params.id;
//   Project.findOne({ _id: id })
//     .then(record => {
//       res.status(200).json({
//         project: record
//       })
//     })
//     .catch(err => {
//       errors: '获取工程项目失败！'
//     });
// })

// router.get('/getProjects', (req, res) => {
//   var page = parseInt(req.query.page);
//   var size = parseInt(req.query.size);
//   Project.find({})
//     .sort({ createdAt: 'desc' })
//     .limit(size)
//     .skip((page-1)*size)
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取工程项目成功！',
//         projects: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取工程项目失败，请重试！'
//       });
//     });
// })

// router.get('/getProjects/:count', (req, res) => {
//   const count = parseInt(req.params.count);
//   Project.find({})
//     .sort({ createdAt: 'desc' })
//     .limit(count)
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取工程项目成功！',
//         projects: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取工程项目失败，请重试！'
//       });
//     });
// })

// router.get('/getAllProject', (req, res) => {
//   Project.find({})
//     .sort({ createdAt: 'desc' })
//     .exec()
//     .then(record => {
//       res.status(200).json({
//         msg: '获取工程项目成功！',
//         projects: record
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '获取工程项目失败，请重试！'
//       });
//     });
// });

// router.post('/deleteProject', (req, res) => {
//   const { id } = req.body;
//   Project.findOne({ _id: id })
//     .then(record => {
//       record.remove()
//         .then(record => {
//           // fs.unlinkSync(record.img);
//           res.status(200).json({
//             msg: '删除该工程成功！'
//           });
//         })
//     })
//     .catch(err => {
//       res.status(500).json({
//         errors: '删除该工程失败，请重试！'
//       });
//     });
// });

// router.post('/updateProject', projectImgUpload.array('project_imgs'), (req, res) => {
//   const { title, content, category, type, date, id, deleteImgs } = req.body;

//   Project.findOne({ _id: id })
//     .then(record => {
//       record.title = title;
//       record.content = content;
//       record.category = category; 
//       record.type = type; 
//       record.date = date; 
//       record.img = getImgAfterDeleting(record.img, deleteImgs);
//       record.img = getImgAfterAdding(record.img, req.files);

//       record.save()
//         .then(newRecord => {
//           newRecord.img.map(path => {
//             resize(path, 200)
//           })
//           res.status(200).json({ msg: '更新工程成功！' });
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errors: '更新工程失败，请重试！' });
//     });
// });


module.exports = router
// export default router;
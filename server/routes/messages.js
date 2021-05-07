var express = require('express');
var Message = require('../models/message');
var authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/addMessage', (req, res) => {
  const { name, phone, email, content } = req.body;
  const newMessage = new Message({ name, phone, email, content });
  newMessage.save()
    .then(record => {
      res.status(200).json({
        message: record,
        msg: '添加留言成功！'
      })
    })
    .catch(err => {
      res.status(500).json({
        errors: '添加留言失败，请重试！'
      });
    });
});

router.get('/getAllMessage', (req, res) => {
  Message.find({})
    .sort({ createdAt: 'desc' })
    .exec()
    .then(record => {
      res.status(200).json({
        messages: record,
        msg: "获取留言成功！"
      });
    })
    .catch(err => {
      res.status(500).json({
        errors: '获取留言失败！'
      });
    });
});

router.post('/deleteMessage', (req, res) => {
  const { id } = req.body;
  Message.findOne({ _id: id })
    .then(record => {
      record.remove()
        .then(() => {
          res.status(200).json({
            msg: '删除留言成功！'
          });
        })
    })
    .catch(err => {
      res.status(500).json({
        errors: '删除留言失败，请重试！'
      });
    });
})


module.exports = router
// export default router;
var express = require('express');
var User = require('../models/user');
var authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/login', (req, res) => {
  const { account, password } = req.body;
  User.findOne({ account })
    .then(user => {
      if (user && user.isValidPassword(password)) {
        res.status(200).json({
          msg: '登录成功！',
          user: user.toAuthJSON(),
        });
      } else {
        res.status(500).json({
          errors: '用户名或密码错误！'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errors: '登录失败，请重试！'
      });
    });
});

router.post('/resetPwd', authenticate, (req, res) => {
  const { newPwd, oldPwd } = req.body;
  const { account } = req.currentUser;

  User.findOne({ account })
    .then(user => {
      if (user.isValidPassword(oldPwd)) {
        user.password = newPwd;
        user.save()
          .then(() => {
            res.status(200).json({
                msg: '修改密码成功，请重新登录！'
            });
          });
      } else {
        res.status(500).json({
          errors: '原密码错误'
        });
      }
    })  
    .catch(err => {
      res.status(500).json({
        errors: '修改密码失败，请重试！'
      });
    });
});

module.exports = router;
// export default router;
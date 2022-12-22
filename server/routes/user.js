var express = require('express')
var jwt = require('jsonwebtoken')

var fs = require('fs');
// var authenticate = require('../middlewares/authenticate');

const router = express.Router()
const SECRET_KEY = 'ZJDDD_TOKEN'

router.post('/login', (req, res) => {
  const { usr, pwd } = req.body;
  let exist = false
  let user = JSON.parse(fs.readFileSync('data/user.json','utf-8')).user
  
  for(let i=0;i<user.length;i++) {
    if ((user[i].usr===usr)&&(user[i].pwd===pwd)) {
      exist = true
    }
  }


  if (exist) {
    let token = jwt.sign({ usr:usr, pwd:pwd }, SECRET_KEY)
    res.status(200).json({
      code: 200, 
      data: { usr:usr, pwd:pwd }, 
      token: token, 
      msg: '登录成功'
    })
  } else {
    res.status(200).json({code: 301, data: null, msg: '用户名或密码错误'})
  }
    
})



  // {
  //   account: this.account,
  //   token: this.generateJWT()
  // };


  
  // res.status(200).json({ 
  //   code: 200, carl: JSON.parse(carl).carl })


  // User.findOne({ account })
  //   .then(user => {
  //     if (user && user.isValidPassword(password)) {
  //       res.status(200).json({
  //         msg: '登录成功！',
  //         user: user.toAuthJSON(),
  //       });
  //     } else {
  //       res.status(500).json({
  //         errors: '用户名或密码错误！'
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       errors: '登录失败，请重试！'
  //     });
  //   });
// });

// router.post('/resetPwd', authenticate, (req, res) => {
router.post('/resetPwd', (req, res) => {
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
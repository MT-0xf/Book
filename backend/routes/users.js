var express = require('express');
var router = express.Router();

const db = require('../models')

/* GET users listing. */
router.get('/', function (req, res, next) {

  // Sequelizeのモデルを使ってデータを取得する
  db.Users.findAll().then(users => {
    if (!users) {
      console.log("ユーザーデータを取得できませんでした");
      res.send('Error');
    } else {
      res.json(users);
    }
  });
});

router.post('/regist', function (req, res, next) {
  if (req.body.name == undefined) {
    return res.send("error");
  }

  if (req.body.name == "") {
    return res.send("error");
  }
  if (req.body.name.length > 32) {
    return res.send("error");
  }

  if (req.body.password == undefined) {
    return res.send("error");
  }

  if (req.body.password == "") {
    return res.send("error");
  }

  if (req.body.password.length > 32) {
    return res.send("error");
  }

  if (req.body.confirmPassword == undefined) {
    return res.send("error");
  }

  if (req.body.confirmPassword == "") {
    return res.send("error");
  }

  if (req.body.confirmPassword.length > 32) {
    return res.send("error");
  }

  if (req.body.password != req.body.confirmPassword) {
    return res.send("error");
  }

  db.Users.findAll({
    where: {
      name: req.body.name
    }
  }).then(
    users => {
      if (users.length == 0) {
        db.sequelize.sync()
          .then(() => db.Users.create({
            name: req.body.name,
            password: req.body.password
          }));
        res.send('register-success');
      } else {
        res.send('duplication-error');
      }
    }
  );
});

router.post('/login', function (req, res, next) {  
  if (req.body.name == undefined) {
    return res.send("error");
  }

  if (req.body.name == "") {
    return res.send("error");
  }
  
  if (req.body.name.length > 32) {
    return res.send("error");
  }

  if (req.body.password == undefined) {
    return res.send("error");
  }

  if (req.body.password == "") {
    return res.send("error");
  }
  
  if (req.body.password.length > 32) {
    return res.send("error");
  }

  db.Users.findAll({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(
    users => {
      console.log(users);
      if (users.length == 0) {
        res.send('login-error');
      } else {
        res.send('login-success');
      }
    }
  );
});

module.exports = router;

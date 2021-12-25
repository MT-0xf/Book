var express = require('express');
var router = express.Router();

const db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {

  // Sequelizeのモデルを使ってデータを取得する
  db.User.findAll().then(users => {
    if (!users) {
        console.log("ユーザーデータを取得できませんでした");
        res.send('Error');
    } else {
        res.json(users);
    }
  });
});

router.post('/regist', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.User.create({
    id: 10,
    name: req.body.name,
    password: req.body.password
  }));
});


module.exports = router;

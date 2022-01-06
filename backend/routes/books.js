var express = require('express');
var router = express.Router();

const db = require('../models')

router.get('/', function(req, res, next) {
  db.Book.findAll().then(books => {
    if (!books) {
        console.log("データを取得できませんでした");
        res.send('Error');
    } else {
        res.json(books);
    }
  });
});

router.post('/regist', function(req, res, next) {  
  db.sequelize.sync()
  .then(() => db.Book.create({
    title: req.body.title,
    file: '/test',
    author_name: req.body.author_name,
    page_number: req.body.page_number
  }));
});


module.exports = router;

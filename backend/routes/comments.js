var express = require('express');
var router = express.Router();

const db = require('../models')

module.exports = router;

router.get('/', function (req, res, next) {
  db.Book.findAll().then(books => {
    if (!books) {
      console.log("データを取得できませんでした");
      res.send('Error');
    } else {
      res.json(books);
    }
  });
});

router.get('/:id', function (req, res, next) {
  db.Comments.findAll({
    where: {
      bookId: req.params.id
    }
  }).then(
  comments => {
    res.json(comments);
  });
});

router.post('/regist', function (req, res, next) {
  db.sequelize.sync()
    .then(() => db.Comments.create({
      bookId: req.body.bookId,
      name: req.body.name,
      date: req.body.date,
      content: req.body.content
    }));
});

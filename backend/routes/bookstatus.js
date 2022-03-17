var express = require('express');
var router = express.Router();

const db = require('../models')

module.exports = router;

router.post('/', function (req, res, next) {
  db.BookStatus.findAll({
    where: {
      name: req.body.name,
      bookId: req.body.bookId
    }
  }).then(
  bookStatus => {
    if (bookStatus.length > 0) {
      let response = { status: bookStatus[0].status }
      res.json(response);
    } else {
      let response = { status: 0 };
      res.json(response);
    }
  });
});

router.post('/addBook', function (req, res, next) {
  db.sequelize.sync()
    .then(() => {db.BookStatus.create({
      name: req.body.name,
      bookId: req.body.bookId,
      status: req.body.status
    }).then(() => {
      let response = { status: req.body.status };
      res.json(response);  
    });
  });
});

router.put('/addBook', function (req, res, next) {
  db.sequelize.sync()
    .then(() => {db.BookStatus.update({
      name: req.body.name,
      bookId: req.body.bookId,
      status: req.body.status
    }, 
    {
      where: {
        name: req.body.name,
        bookId: req.body.bookId
      }
    }).then( ()=> {
      let response = { status: req.body.status };
      res.json(response);
    });
  });
});

router.post('/liftBook', function (req, res, next) {
  db.BookStatus.findAll({
    where: {
      name: req.body.name,
      bookId: req.body.bookId
    }
  }).then(
  bookStatus => {
    bookStatus[0].destroy().then(() => {
      let status = { status: 0}
      res.json(status);
    });
  });
});




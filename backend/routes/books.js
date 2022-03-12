var express = require('express');
var router = express.Router();

const db = require('../models')
const fs = require('fs');
// npm i urlsafe-base64 でインストールしたモジュール。
const base64 = require('urlsafe-base64');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

router.get('/search', function(req, res, next) {
  db.Book.findAll({
      where: {
        title : {
          [Op.like]: "%" + req.query.keyword + "%"
        }
      }
    }).then(books => {
    if (!books) {
        console.log("データを取得できませんでした");
        res.send('Error');
    } else {
        books.map(book => {
          if (fs.existsSync(book.file)) {
            let img = fs.readFileSync(book.file, { encoding: "base64" });
            book.file = "data:image/jpeg;base64," + img;  
          }
        });
        res.json(books);
    }
  });
});

router.post('/regist', function(req, res, next) {
  var Base64 = {
    encode: function(str) {
        return btoa(unescape(encodeURIComponent(str)));
    },
    decode: function(str) {
        return decodeURIComponent(escape(atob(str)));
    }
  };
  
  let decoded = Base64.decode(req.body.file);
  decoded = decoded.split(',')[1];
  var img = base64.decode(decoded);

  let date = new Date();
  let filePath = './img/'
                + date.getFullYear().toString()
                + date.getMonth().toString()
                + date.getDate().toString()
                + date.getHours().toString()
                + date.getMinutes().toString()
                + date.getSeconds().toString()
                + date.getMilliseconds().toString()
                + '.jpg';

  fs.writeFile(filePath, img, function (err) {
      console.log(err);
  });

  db.sequelize.sync()
  .then(() => db.Book.create({
    title: req.body.title,
    file: filePath,
    author_name: req.body.author_name,
    page_number: req.body.page_number,
    scenario: req.body.scenario
  }));
});


module.exports = router;

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

  // npm i urlsafe-base64 でインストールしたモジュール。
  var base64 = require('urlsafe-base64');
  const fs = require('fs'); // fsモジュール読み込み

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

  // 試しにファイルをsample.jpgにして保存。Canvasではjpeg指定でBase64エンコードしている。
  fs.writeFile(filePath, img, function (err) {
      console.log(err);
  });

  db.sequelize.sync()
  .then(() => db.Book.create({
    title: req.body.title,
    file: filePath,
    author_name: req.body.author_name,
    page_number: req.body.page_number
  }));
});


module.exports = router;

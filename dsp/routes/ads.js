var express = require('express');
var router = express.Router();
var debug = require('debug')('dsp:server');


router.post('/', function(req, res, next) {
  req.app.db.findOne({ssp: req.body.sspid}, (err, doc) => {
    if (doc) {
      res.send(doc)
    } else {
      res.send(doc)
    }
  })
})

module.exports = router;

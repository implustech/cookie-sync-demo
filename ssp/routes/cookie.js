var express = require('express');
var router = express.Router();
var debug = require('debug')('ssp:server');


function setCookie(req, res, next) {
  return (err, doc) => {
    res.cookie('ssp', doc._id, {
      maxAge: 60000,
      httpOnly: true,
    });
    res.redirect(`http://localhost:3001/cookie?ssp=${doc._id}`)
  };
}

router.get('/', function(req, res, next) {
  let ssp = req.cookies.ssp
  let dspid = req.query.dsp

  // New SSP client, store to db with DSP client and send cookie
  // Redirect back to DSP site
  if (!ssp) {
    req.app.db.insert(
      {
        dsp: dspid
      },
      setCookie(req, res, next)
    );
  } else {
  // Existing SSP client,do cookie sync with DSP
  // Redirect back to DSP site
    req.app.db.update({
      _id: ssp
    }, {
      $set: {
        dsp: dspid
      }
    }, (err, doc) => {
      debug(`Cookie sync: DSP::${dspid}, SSP::${doc._id}`)
      res.redirect(`http://localhost:3001/cookie?ssp=${doc._id}`)
    })
  }
});

module.exports = router;

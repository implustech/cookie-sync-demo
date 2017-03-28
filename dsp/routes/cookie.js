var express = require('express');
var router = express.Router();
var debug = require('debug')('dsp:server');

function setCookie(req, res, next) {
  return (err, doc) => {
    // let cookieValue = `dsp-${doc._id}`;
    res.cookie('dsp', doc._id, {
      maxAge: 60000,
      httpOnly: true,
    });
    res.send(`<img src='http://localhost:3031/cookie?dsp=${doc._id}'>`)
  };
}

router.get('/', function(req, res, next) {
  let dsp = req.cookies.dsp;
  let sspid = req.query.ssp

  // New DSP client, store to db and send cookie
  // then Issue cookie sync with SSP
  if (!dsp) {
    debug('New DSP client w/o cookie')
    req.app.db.insert(
      {
        ssp: null,
        link: req.query.link,
        img: req.query.img
      },
      setCookie(req, res, next)
    );
  } else {
    // Existing DSP client
    req.app.db.update(
      {
        _id: dsp
      },
      {
        $set: {
          ssp: sspid
        }
      },
      (err, doc) => {
        // Redirect back from SSP, cookie sync done
        if (sspid) {
          debug(`Cookie sync: DSP::${dsp}, SSP::${sspid}`)
          res.send('cookie sync done')
        } else {
          // Issue cookie sync to SSP
          res.send(`<img src='http://localhost:3031/cookie?dsp=${doc._id}'>`)
        }
      }
    );
  }
});

module.exports = router;

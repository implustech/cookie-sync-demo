var express = require('express');
var router = express.Router();
var debug = require('debug')('dsp:server');
var axios = require('axios')


router.get('/', function(req, res, next) {

  // Ad request to DSP
  axios.post('http://localhost:3001/ads', {
    sspid: req.cookies.ssp
  })
    .then(response => {
      let d = response.data
      if (d) {
        res.send(`<a href='${d.link}' target='_blank'><img src='${d.img}' style='height: 100px'></a>`)
      } else {
        res.send('No Ad for you')
      }
    })
})

module.exports = router;

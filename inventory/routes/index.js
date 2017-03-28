var express = require('express');
var router = express.Router();

const adTag = `
<script type='text/javascript'>
  document.write ('<script type="text/javascript" src="http://localhost:3001/showad">');
  document.write ('</script>');
</script>
`;

router.get('/', function(req, res, next) {

  res.render('index', Object.assign({}, { title: 'inventory.com' },
    {script: adTag}
  ))

});

module.exports = router;

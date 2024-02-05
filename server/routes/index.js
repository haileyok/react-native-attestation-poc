var express = require('express');
const {doDeviceCheck} = require('../lib/deviceCheck')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Hello'
  })
});

router.post('/apple/deviceCheck', async (req, res) => {
  const deviceCheckRes = await doDeviceCheck(req.body.device_token)
  res.status(deviceCheckRes)
  res.send()
})

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, email: 'user1@gmail.com', password: '1111'},
    {id: 2, email: 'user2@gmail.com', password: '2222'}
  ])
});

module.exports = router;

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/views/', async  function(req, res, next) {
  let  data = {
    message: 'Tjenare världen!!!!!',
    layout:  'layout.njk',
    title: 'Yo mcflow'
  }

  res.render('index.njk', data)
})
module.exports = router;

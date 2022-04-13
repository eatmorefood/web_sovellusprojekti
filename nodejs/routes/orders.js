const express = require('express');
const router = express.Router();
const orders = require('../models/orders_model');
const passport = require('passport');


router.get('/:ID', passport.authenticate('jwt', { session: false }), function (req, res) {
  orders.getByCustomer(req.params.ID, function(err, dbResult) {
      if (err) {
          console.log(err);
        } else {
          res.json(dbResult);
        }
  })
});

router.get('/byrestaurant/:ID', passport.authenticate('jwt', { session: false }), function (req, res) {
  orders.getByRestaurant(req.params.ID, function(err, dbResult) {
      if (err) {
          console.log(err);
        } else {
          res.json(dbResult);
        }
  })
});




module.exports=router;
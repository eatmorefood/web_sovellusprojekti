const express = require('express');
const router = express.Router();
const passport = require('passport');
const customer = require('../models/customer_model');

router.get('/profile-data/:ID', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log(req.params.ID)
    customer.getProfileData(req.params.ID, function(err, dbResult) {
        if (err) {
            console.log(err);
          } else {
            res.json(dbResult);
          }
    })
});

// customer account creation (add customer) is done through signup router

module.exports=router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const customer = require('../models/signupbusiness_model');

router.get('/profile-data/:ID', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log(req.params.ID)
    customer.getProfileData(req.params.ID, function(err, dbResult) {
        if (err) {
            //console.log(err);
            console.log("database error")
            res.status(500);
          } else {
            res.status(200).json(dbResult);
          }
    })
});


module.exports=router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const customer = require('../models/customer_model');

router.get('/profile-data/:ID', passport.authenticate('jwt', { session: false }), function (req, res) {
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

router.post('/purchase', function (req, res) {
  if(!req.body.restID
    || !req.body.custID
    || !req.body.total
    || !req.body.foodID
    || !req.body.address
    || (typeof req.body.custID != 'string')
    || (typeof req.body.total != 'string')
    || (typeof req.body.foodID != 'string')
    || (typeof req.body.address != 'string')      
    ){
    console.log("Request data missing");
    return res.status(400).send({
        message: "Error! Could not create purchase record. Form data invalid.",
        success: false
    });
  }

  const date = new Date();

  let params = {
    date: date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear(),
    restID: req.body.restID,
    custID: req.body.custID,
    foodID: req.body.foodID,
    total: req.body.total, 
    address: req.body.address
  }

  customer.createPurchase(params, function(err, dbResult) {
      if (err) {
          //console.log(err);
          console.log("database error")
            res.status(500);
        } else {
          res.status(200).send({
            message: "Purchase successful",
            success: true
          })
        }
  })
});


module.exports=router;
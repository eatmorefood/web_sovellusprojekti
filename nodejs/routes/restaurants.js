const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');

router.get('/', function (req, res) {
    restaurant.getAllRestaurants(function(err, dbResult) {
        if (err) {
            console.log(err);
          } else {
            let data = dbResult;
            try{
              res.json(data.rows)
            } catch(err){
              res.send("nothing found")
            }
          }
    })
});

module.exports=router;
const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const multer_upload = multer({ storage });

router.get('/:id?', function (req, res) {
  if(req.params.id){ //get single restaurant by id, if id exist in params
    let restaurantId = req.params.id;

    restaurant.getByName(restaurantId, function (err, dbResult) {
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
    });
  } else { //if no id in params, get all restaurants
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
    });
  }   
});

router.put('/imageupload', multer_upload.single('image'), async (req, res) => { //update restaurant image
  console.log("req.body.id: " + req.body.id)
  console.log("req.file: " + req.file);
  console.log("req.file.path: " + req.file.path)

  let params = {
    id: req.body.id,
    image_url: req.file.path
  }

  console.log("params.id before sent: " + params.id)
  console.log("params.id before sent: " + params.image_url)
  
  restaurant.modifyIcon(params, function(err, dbResult) {
    if (err) {
      console.log(err);
    } else {
      let data = Object.assign({}, dbResult[0]);
      console.log("db result: " + data)
      console.log("image path updated succesfully")
    }
  })

  res.send('Restaurant image updated successfully');
});

module.exports = router;
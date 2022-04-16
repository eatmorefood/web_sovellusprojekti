const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');
const { storage } = require('../config/cloudinary');
const multer = require('multer');

const multer_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
      if (
          !file.mimetype.includes("image/png") &&
          !file.mimetype.includes("image/jpg") &&
          !file.mimetype.includes("image/jpeg")
      ) {
          console.log("file type not allowed")
          return cb(null, false);
      }
      cb(null, true);
  }
});

router.get('/:id?', function (req, res) {
  if(req.params.id){ //get single restaurant by id, if id exist in params
    let restaurantId = req.params.id;

    restaurant.getByName(restaurantId, function (err, dbResult) {
      if (err) {
        console.log("could not get single restaurant");
      } else {
        let data = dbResult;
        try{
          res.status(200).json(data.rows)
        } catch(err){
          res.status(404).send("nothing found")
        }
      }
    });
  } else { //if no id in params, get all restaurants
    restaurant.getAllRestaurants(function(err, dbResult) {
      if (err) {
        console.log("could not get all restaurants");
      } else {
        let data = dbResult;
        try{
          res.status(200).json(data.rows)
        } catch(err){
          res.status(404).send("nothing found")
        }
      }
    });
  }   
});

router.put('/imageupload', multer_upload.single('file'), async (req, res) => { //update restaurant image

  if(!req.body.id || !req.file){
    console.log("Request data missing or invalid file type");
    return res.status(400).send({
        message: "Error! Please fill all form data and check file type",
        success: false
    });
  }

  let params = {
    id: req.body.id,
    image_url: req.file.path
  }
  
  restaurant.modifyIcon(params, function(err, dbResult) {
    if (err) {
      console.log(err);
      console.log("database error")
      res.status(500);
    } else {
      //let data = Object.assign({}, dbResult[0]);
      //console.log("db result: " + data)
      console.log("image path updated succesfully")
    }
  })

  res.status(200).send('Restaurant image updated successfully');
});

module.exports = router;
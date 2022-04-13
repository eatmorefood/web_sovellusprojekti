const express = require('express');
const router = express.Router();
const meal = require('../models/meal_model');
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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

router.get('/byrestaurant/:id?', function (req, res) {
    if(req.params.id){ //get all foods for a restaurant by restaurant ID
        let restaurantId = req.params.id;
    
        meal.getByRestaurant(restaurantId, function (err, dbResult) {
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
        throw new Error('no restaurant ID given');
    };
});

router.get('/byid/:id?', function (req, res) {
    if(req.params.id){ //get all foods for a restaurant by restaurant ID
        let foodId = req.params.id;
    
        meal.getById(foodId, function (err, dbResult) {
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
        throw new Error('no restaurant ID given');
    };
});

router.post('/',
function (req, res) {
    if('name' in req.body == false){
        res.status(400);
        res.json({status: "Missing restaurant name from request body"});
        return;
    }
    

    const newMeal = {
        idfood: req.body.idfood,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        idrestaurant: req.body.idrestaurant,
        image: req.body.image
    }

    console.log(newMeal.idfood);

    try{

    
    if(newMeal.idfood)
    {
        var result = 
    meal.update(newMeal, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json({status: "meal updated"});
            console.log("meal updated with id: " + newMeal.idfood);
        }
    });
    console.log(result);
}

    else{
        console.log("New food");
        newMeal.idfood = uuidv4();
        meal.add(newMeal, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.status(201).json({status: "meal created"});
                console.log("meal created with id: " + newMeal.idfood);
            }
        });
    }
}
catch(exception){
    console.log(exception);
}
}),

router.put('/imageupload', multer_upload.single('image'), async (req, res) => { //update food image

    if(!req.body.idfood || !req.body.idrestaurant || !req.file){
        console.log("Request data missing or invalid file type");
        return res.status(400).send({
            message: "Error! Please fill all form data and check file type",
            success: false
        });
    }

    let params = {
        idfood: req.body.idfood,
        idrestaurant: req.body.idrestaurant,
        image_url: req.file.path
    }

    meal.modifyIcon(params, function(err, dbResult) {
        if (err) {
        console.log(err);
        } else {
        let data = Object.assign({}, dbResult[0]);
        console.log("db result: " + data)
        console.log("image path updated succesfully")
        }
    })

  res.send('Item image updated successfully');
});

module.exports = router;
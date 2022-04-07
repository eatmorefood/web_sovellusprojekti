const multer  = require('multer');
const path = require('path');
const restaurant = require('../models/restaurant_model');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public')); //uploads the image to this folder
    },

    filename: (req, file, cb) => { //sets name and extension for uploaded file
        cb(null, `restauranticon-${req.body.id}` + path.extname(file.originalname)); //path.extname gets the uploaded file extension (like .png)
    }
});

const multerFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) { // upload only png and jpg format
        return cb(new Error('Please upload a file in png or jpg format'));
    }
    cb(null, true) 
};

exports.upload = multer({ //uploads image after this is the database updated
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImage = async (req, res) => {
    if('id' in req.body == false){ //check if restaurant id present in request body
        res.status(400);
        res.json({status: "Missing id in request body"});
        return;
    }
    if(!req.files || req.files.length == 0){ //check if image present in request body
        res.status(400);
        res.json({status: "Missing image data in request body"});
        return;
    }
    if(req.files.length > 1){ //check if more than 1 image uploaded
        res.status(400);
        res.json({status: "Too many files uploaded"});
        return;
    }      
    
    const iconData = {
        id: req.body.id,
        image: req.files[0].filename,
    }
    
    restaurant.modifyIcon(iconData, function(err) { //send update request to database model handler
        if (err) {
            console.log(err);
        } else {
            res.status(200);
            res.json("Image uploaded for restaurant: " + iconData.id);
            console.log("updated image for restaurant: " + iconData.id);
        }
    });
    
}
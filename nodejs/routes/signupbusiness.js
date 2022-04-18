const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const signup = require('../models/signupbusiness_model');

router.post('/',
function (req, res) {
    if(('email' in req.body == false) || (typeof req.body.email != 'string')){
        res.status(400).json({status: "Missing email from request body"});
        return;
    }
    if(('name' in req.body == false) || (typeof req.body.name != 'string')){
        res.status(400).json({status: "Missing restaurant name from request body"});
        return;
    }
    if(('address' in req.body == false) || (typeof req.body.address != 'string')){
        res.status(400).json({status: "Missing address from request body"});
        return;
    }
    if(('open' in req.body == false) || (typeof req.body.open != 'string')){
        res.status(400).json({status: "Missing open from request body"});
        return;
    }
    if(('type' in req.body == false) || (typeof req.body.type != 'string')){
        res.status(400).json({status: "Missing type from request body"});
        return;
    }
    if(('password' in req.body == false) || (typeof req.body.password != 'string')){
        res.status(400).json({status: "Missing password from request body"});
        return;
    }
    var regExp = new RegExp("^[€\€]+$").test(req.body.pricelevel);
    if(('pricelevel' in req.body == false) || (regExp != true)){
        res.status(400).json({status: "Missing price level from request body"});
        return;
    }

   //create hash of the password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newBusiness = {
        id: uuidv4(),
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        open: req.body.open,
        type: req.body.type,
        pricelevel: req.body.pricelevel,
        password: passwordHash, //password needs to be hashed
        image: "no image added"
    }


    signup.add(newBusiness, function(err, dbResult) {
        if (err) {
            //console.log(err);
            console.log("database error")
            res.status(500);
        } else {
            res.status(201).json({status: "business created", id: dbResult.rows[0].idrestaurant});
            console.log("business created with id: " + newBusiness.id);
        }
    });

})
    
module.exports=router;
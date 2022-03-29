const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const signup = require('../models/customer_model');

router.post('/',
function (req, res) {
    if('fname' in req.body == false){
        res.status(400);
        res.json({status: "Missing first name from request body"});
        return;
    }
    if('lname' in req.body == false){
        res.status(400);
        res.json({status: "Missing last name from request body"});
        return;
    }
    if('email' in req.body == false){
        res.status(400);
        res.json({status: "Missing email from request body"});
        return;
    }
    if('phone' in req.body == false){
        res.status(400);
        res.json({status: "Missing phone number from request body"});
        return;
    }
    if('address' in req.body == false){
        res.status(400);
        res.json({status: "Missing address from request body"});
        return;
    }
    if('password' in req.body == false){
        res.status(400);
        res.json({status: "Missing password from request body"});
        return;
    }

   //create hash of the password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
        id: uuidv4(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: passwordHash //password needs to be hashed
    }

    //users.push(newUser);

    signup.add(newUser, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json({status: "customer created"});
            console.log("customer created with id: " + newUser.id);
        }
    });

})
    
module.exports=router;
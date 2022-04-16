const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const signup = require('../models/customer_model');

router.post('/',
function (req, res) {
    if(('fname' in req.body == false)  || (typeof req.body.fname != 'string')){
        res.status(400);
        res.json({status: "Missing first name from request body"});
        return;
    }
    if(('lname' in req.body == false)  || (typeof req.body.lname != 'string')){
        res.status(400);
        res.json({status: "Missing last name from request body"});
        return;
    }
    if(('phone' in req.body == false) || (typeof req.body.phone != 'string')){
        res.status(400);
        res.json({status: "Missing phone string from request body"});
        return;
    }
    if(('address' in req.body == false) || (typeof req.body.address != 'string')){
        res.status(400);
        res.json({status: "Missing address from request body"});
        return;
    }
    if(('password' in req.body == false) || (typeof req.body.password != 'string')){
        res.status(400);
        res.json({status: "Missing password from request body"});
        return;
    }
    if(('email' in req.body == false) || (typeof req.body.email != 'string')){
        res.status(400);
        res.json({status: "Missing email from request body"});
        return;
    } else { //check if a customer already exists with the given email
        try{
            let checkEmail = req.body.email.toLowerCase();
            signup.findExistingEmail(checkEmail, function(err, existingCustomer) {

                if (existingCustomer.rowCount > 0) { //existing email found
                    console.log("email exists")
                    res.status(400);
                    res.json({status: "Email already exists!"});
                    return;
                } else {
                    //create hash of the password
                    const salt = bcrypt.genSaltSync(10);
                    const passwordHash = bcrypt.hashSync(req.body.password, salt);

                    const date = new Date();

                    const newUser = {
                        id: uuidv4(),
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email.toLowerCase(),
                        phone: req.body.phone,
                        address: req.body.address,
                        creationdate: date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear(),
                        password: passwordHash //password needs to be hashed
                    }

                    signup.add(newUser, function(err) {
                        if (err) {
                            //console.log(err);
                            console.log("database error")
                            res.status(500);
                            return;
                        } else {
                            res.status(201).json({status: "customer created"});
                            console.log("customer created with id: " + newUser.id);
                        }
                    });
                }
            });
        } catch (err) {
            console.log("an error occurred")
            return;
        }
    }
})

router.get('/validatecustomeremail/:email', function (req, res) {
    if(req.params.email){
        try {
            let checkEmail = req.params.email.toLowerCase();
            signup.findExistingEmail(checkEmail, function(err, existingCustomer) {
                if (err) {
                    //console.log(err);
                    console.log("database error")
                    res.status(500);
                } else {
                    if (existingCustomer.rowCount > 0) { //existing email found                   
                        try{
                            res.send("email_exists")
                        } catch(err){
                            console.log("signup - couldn't sent response about if email exists")
                        }
                    } else {
                        res.status(200).send("OK");
                    }
                }
            })
        } catch (err) {
            console.log("an error occurred")
            res.status(500);
            return;
     
        }
    }
});
    
module.exports=router;
const bcrypt= require('bcryptjs');
const res = require('express/lib/response');
const pool = require('../database.js')

const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(new BasicStrategy(
    function(email, password, done){
        loginUser();

    async function loginUser() {
        const client = await pool.connect();
        try {
            await client.query('begin');
            var accCredentials = await JSON.stringify(client.query('select c."idcustomer" as idcustomer, u."password" as password from "customer" c, "userc" u where c."email" = ($1) and c."idcustomer" = u."idcustomer";',
            [email], (err, result) => {
                if(err){
                    res.status(500);
                    return done(err);
                }
                if(result.rows[0] == null) {
                    
                    //console.error('incorrect email');
                    res.status(401);
                    return done(null, false);
                } else {
                    //console.log(result.rows[0])
                    //console.log("user credentials found")

                    bcrypt.compare(password, result.rows[0].password, (err, valid) => {
                        if(err) {
                            console.error('password validation failed');
                            res.status(500);
                            return done(err);
                        }
                        if(valid) {
                            //console.log('password correct');

                            var accData = JSON.stringify(client.query('select "idcustomer", "fname", "lname", "email" from "customer" where "idcustomer" = $1;',
                            [result.rows[0].idcustomer], (err, results) => {
                                if(err){
                                    res.status(500);
                                    return done(err);
                                }
                                if(results.rows[0] == null) {
                                    console.error('could not retrieve user data after valid login');
                                    res.status(400);
                                    return done(null, false);
                                } else {
                                    var user = {
                                        id: results.rows[0].idcustomer,
                                        email: results.rows[0].email,
                                        fname: results.rows[0].fname,
                                        lname: results.rows[0].lname
                                    }
                                    //console.log(results);
                                    console.log("user with email: " + user.email + " has been authenticated");
                                    res.status(200);
                                    done(null, user);
                                }
                            }));
                        } else {
                            //console.log('incorrect password');
                            res.status(401);
                            return done(null, false);
                        }
                    })
                }
            }))
        } catch(e){
            res.status(500);
            throw(e);            
        }
    }
  }));

  //Restaurant
  passport.use("business", new BasicStrategy(
    function(email, password, done){
        loginUser();

    async function loginUser() {
        const client = await pool.connect();
        try {
            console.log("Toimiiko");
            await client.query('begin');
            var businessAccCredentials = await JSON.stringify(client.query('select u."idrestaurant" as idrestaurant, u."password" as password from "userr" u where u."email" = ($1);',
            [email], (err, result) => {
                if(err){
                    res.status(500);
                    return done(err);
                }
                if(result.rows[0] == null) {
                    
                    //console.error('incorrect email');
                    res.status(401);
                    return done(null, false);
                } else {
                    //console.log(result.rows[0])
                    //console.log("user credentials found")

                    bcrypt.compare(password, result.rows[0].password, (err, valid) => {
                        if(err) {
                            console.error('password validation failed');
                            res.status(500);
                            return done(err);
                        }
                        if(valid) {
                            //console.log('password correct');

                            var businessAccData = JSON.stringify(client.query('select "idrestaurant", "name", "address", "open", "type", "pricelevel" from "restaurant" where "idrestaurant" = $1;',
                            [result.rows[0].idrestaurant], (err, results) => {
                                if(err){
                                    res.status(500);
                                    return done(err);
                                }
                                if(results.rows[0] == null) {
                                    console.error('could not retrieve user data after valid login');
                                    res.status(400);
                                    return done(null, false);
                                } else {
                                    var user = {
                                        id: results.rows[0].idrestaurant,
                                        email: email,
                                        name: results.rows[0].name
                                    }
                                    //console.log(results);
                                    console.log("user with email: " + user.email + " has logged in");
                                    res.status(200);
                                    done(null, user);
                                }
                            }));
                        } else {
                            //console.log('incorrect password');
                            res.status(401);
                            return done(null, false);
                        }
                    })
                }
            }))
        } catch(e){
            res.status(500);
            throw(e);            
        }
    }
  }));

}
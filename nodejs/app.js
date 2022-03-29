const express = require('express');
const app = express();
var port = 8080;
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const login = require('./models/login_model');

app.use(bodyParser.json()); //whenever request body has type of json, this will activate
app.use(cors());

const signupRouter = require('./routes/signup.js');

var res1 = null;
var res2 = null;

passport.use(new BasicStrategy(
  function(email, password, done){
    login.findId(email, function(err, dbResult){
      if(err){
        console.log(err);
      } else {
        if(dbResult){
          res1 = dbResult.rows[0].idcustomer;
          console.log('user found')
          login.checkPassword(res1 , function(err, dbRes) {
            if(err){
              console.log(err);
            } else{
              if(dbRes){
                res2 = dbRes.rows[0].password;
                console.log('password found')
                if(bcrypt.compareSync(password, res2)){
                  //if passwords match, proceed to route handler¨
                  
                  login.getData(res1, function(err, result){
                    if(err){
                      console.log(err);
                    } else {
                      if(result){
                        var user = {
                          id: result.rows[0].idcustomer,
                          email: result.rows[0].email,
                          fname: result.rows[0].fname,
                          lname: result.rows[0].lname
                        }
                        console.log(result);
                        console.log(user);
                        console.log('correct password')
                        res1 = null;
                        res2 = null;
                        done(null, user);
                      }
                    }
                  }) 
                } else {
                  done(null, false); //no password found
                  console.log('wrong password')
                }
              }
            }
          })
        } else {
          console.log('user not found')
        }
      }
    })
  }
));

const jwtOptions ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mySecrectKey"
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
  console.log('JWT is valid')
  //console.log('payload: ')
  //console.log(jwt_payload)

  done(null, jwt_payload);
}))

app.get('/', (req, res) => { //public resource, JUST A TEST => can be deleted
  res.send('Hello World')
})

app.post('/jwtLogin', passport.authenticate('basic', { session: false }), (req, res) => {
  //check username and password already done through passport

  //console.log(req)

  //generate jwt
  const payload = { 
    user: {
      id: req.user.id,
      email: req.user.email,
      fname: req.user.fname,
      lname: req.user.lname
    }
  };

  const secretKey = "mySecrectKey"; //dont have it in the code above

  const options = {
    expiresIn: '1d'
  };

  const generatedJWT = jwt.sign(payload, secretKey, options);

  //send jwt as a response
  res.json({ jwt: generatedJWT }); //react app should store this
})

app.get('/jwt-protected', passport.authenticate('jwt', { session: false }), (req, res) => { //just a test, can be deleted
  //console.log(req.user);
  console.log("user ID from JWT is: " + req.user.user.id);

  res.json('Hello ' + req.user.user.fname + ' JWT PROTECTED CONTENT')
})

app.use('/signup', signupRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

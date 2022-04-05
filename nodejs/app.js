const express = require('express');
const app = express();
var port = 8080;
var path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()); //whenever request body has type of json, this will activate
app.use(cors());
app.use(helmet());

require('./config/passport')(passport);

const signupRouter = require('./routes/signup.js');
const customerRouter = require('./routes/customer.js');
var restaurantRouter = require('./routes/restaurant');

const jwtOptions ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mySecrectKey"
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
  //console.log('payload: ')
  //console.log(jwt_payload)

  done(null, jwt_payload);
}))

app.get('/', (req, res) => { //public resource, JUST A TEST => can be deleted
  res.send('Hello World')
})

app.post('/jwtLogin', passport.authenticate('basic', { session: false }), (req, res) => {
  //check username and password already done through passport

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

app.use('/signup', signupRouter);
app.use('/customer', customerRouter);
app.use('/restaurant', restaurantRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;

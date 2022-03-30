const express = require('express');
const app = express();
var port = 8080;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()); //whenever request body has type of json, this will activate
app.use(cors());

require('./config/passport')(passport);

const signupRouter = require('./routes/signup.js');

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

app.get('/jwt-protected', passport.authenticate('jwt', { session: false }), (req, res) => { //just a test, can be deleted
  res.json('Hello ' + req.user.user.fname + ' JWT PROTECTED CONTENT')
})

app.use('/signup', signupRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

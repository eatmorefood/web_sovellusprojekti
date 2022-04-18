require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.json()); //parse requests of content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse requests of content-type: application/x-www-form-urlencoded 

app.use('/business', express.static('reactBusinessBuild'));
app.use(express.static('reactCustomerBuild'));

require('./config/passport')(passport);

const signupRouter = require('./routes/signup.js');
const customerRouter = require('./routes/customer.js');
const businessRouter = require('./routes/business.js');
const signupbusinessRouter = require('./routes/signupbusiness.js');
const restaurantRouter = require('./routes/restaurants.js');
const mealRouter = require('./routes/meal.js');
const ordersRouter = require('./routes/orders.js');

const jwtOptions ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mySecrectKey"
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
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

//restaurant
app.post('/jwtBusinessLogin', passport.authenticate('business', { session: false }), (req, res) => {
  //check username and password already done through passport

  //generate jwt
  const payload = { 
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
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
app.use('/business', businessRouter);
app.use('/signupbusiness', signupbusinessRouter);
app.use('/restaurant', restaurantRouter);
app.use('/meal', mealRouter);
app.use('/orders',ordersRouter);

app.get('/business/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/reactBusinessBuild', 'index.html'))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/reactCustomerBuild', 'index.html'));
});

let serverInstance = null;

module.exports = {
  start: function() {
    serverInstance = app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  },
  close: function() {
    serverInstance.close();
  }
}

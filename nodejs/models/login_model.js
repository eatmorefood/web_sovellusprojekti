const db = require('../database');

const login={

    findId: function(email, callback) {
      await db.connect();
        return await db.query('select idcustomer from customer where email = $1;',
        [email], callback); 
    },

    checkPassword: function(userId, callback) {
      await db.connect();
      return await db.query('select password from userc where idcustomer = $1;',
      [userId], callback); 
    },

    getData: function(userId, callback) {
      await db.connect();
      return  db.query('select idcustomer, fname, lname, email from customer where idcustomer = $1;',
      [userId], callback); 
    },

    findRestaurantId: function(email, callback) {
      await db.connect();
      return await db.query('select idrestaurant from userr where email = $1',
      [email], callback);
    },

    checkRestaurantPassword: function(email, callback) {
      await db.connect();
      return await db.query('select password from userr where email = $1',
      [email], callback);
    },

    getRestaurantData: function(idRestaurant, callback) {
      await db.connect();
      return db.query('select idrestaurant, name, address, open, type, pricelevel from restaurant where idrestaurant = $1',
      [idRestaurant], callback);
    }
  }
  
  ;
            
  module.exports = login;
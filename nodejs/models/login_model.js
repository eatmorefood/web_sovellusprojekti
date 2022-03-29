const db = require('../database');

const login={

    findId: function(email, callback) {
        return db.query('select idcustomer from customers where email = $1;',
        [email], callback); 
      },

    checkPassword: function(userId, callback) {
        return db.query('select password from userc where idcustomer = $1;',
        [userId], callback); 
      },

    getData: function(userId, callback) {
    return db.query('select idcustomer, fname, lname, email from customers where idcustomer = $1;',
    [userId], callback); 
    }
  };
            
  module.exports = login;
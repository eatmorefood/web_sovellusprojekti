const db = require('../database');

const customer={

    add: function(newUser, callback) { 
          return db.query('with new_customer as (insert into "customer" ("idcustomer", "fname", "lname", "email", "phonenumber", "address") values ($1, $2, $3, $4, $5, $6) returning "idcustomer") insert into "userc" ("password", "idcustomer") values ($7, $1);',
          [newUser.id, newUser.fname, newUser.lname, newUser.email, newUser.phone, newUser.address, newUser.password], callback);
      },
    
    getProfileData: function(ID, callback) { 
        return db.query('select * from "customer" where "idcustomer" = $1;',
        [ID], callback);
    }

}
          
module.exports = customer;
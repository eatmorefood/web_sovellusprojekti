const db = require('../database');

const customer={

    add: function(newUser, callback) { 
          return db.query('with new_customer as (insert into "customer" ("idcustomer", "fname", "lname", "email", "phonenumber", "address", "creation_date") values ($1, $2, $3, $4, $5, $6, $7) returning "idcustomer") insert into "userc" ("password", "idcustomer") values ($8, $1);',
          [newUser.id, newUser.fname, newUser.lname, newUser.email, newUser.phone, newUser.address, newUser.creationdate , newUser.password], callback);
      },
    
    getProfileData: function(ID, callback) { 
        return db.query('select * from "customer" where "idcustomer" = $1;',
        [ID], callback);
    },

    findExistingEmail: function(checkEmail, callback) { 
        return db.query('select "email" from "customer" where "email" = $1;',
        [checkEmail], callback);
    },

    createPurchase: function(params, callback) {
        return db.query('insert into "orders" ("orderdate", "price", "idcustomer", "idrestaurant", "idfood", "deliveryaddress") values ($1, $2, $3, $4, $5, $6);',
        [params.date, params.total, params.custID, params.restID, params.foodID, params.address], callback);
    }

}
          
module.exports = customer;
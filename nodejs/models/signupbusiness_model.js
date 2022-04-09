const db = require('../database');

const business={

    add: function(newBusiness, callback) { 
          return db.query('with new_business as (insert into restaurant (name, address, open, type, pricelevel) values ($1, $2, $3, $4, $5) returning idrestaurant as insertedrestaurantid) insert into userr (password, email, idrestaurant) select $6, $7, insertedrestaurantid from new_business;',
          [newBusiness.name, newBusiness.address, newBusiness.open, newBusiness.type, newBusiness.pricelevel, newBusiness.password, newBusiness.email], callback);
      },
    
    getProfileData: function(ID, callback) { 
        return db.query('select * from restaurant where idrestaurant = $1;',
        [ID], callback);
    }

}
          
module.exports = business;
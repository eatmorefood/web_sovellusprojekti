const db = require('../database');

const business={

    add: function(newBusiness, callback) {
          return db.query('with new_business as (insert into restaurant (name, address, open, type, pricelevel, image) values ($1, $2, $3, $4, $5, $8) returning idrestaurant as insertedrestaurantid) insert into userr (password, email, idrestaurant) select $6, $7, insertedrestaurantid from new_business;',
          [newBusiness.name, newBusiness.address, newBusiness.open, newBusiness.type, newBusiness.pricelevel, newBusiness.password, newBusiness.email, newBusiness.image], callback);
      },
    getProfileData: function(ID, callback) { 
        return db.query('select restaurant.*, userr.email from restaurant join userr on userr.idrestaurant = restaurant.idrestaurant where restaurant.idrestaurant = $1;',
        [ID], callback);
    }

}
          
module.exports = business;
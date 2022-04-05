const db = require('../database');

const restaurant={

    getAllRestaurants: function(callback) { 
        return db.query('select * from "restaurant"',
        callback);
    }
}
          
module.exports = restaurant;
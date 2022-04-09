const db = require('../database');

const restaurant={

    getAllRestaurants: function(callback) { 
        return db.query('select * from "restaurant"',
        callback);
    },

    getByName: function(id, callback) { 
        return db.query('select * from "restaurant" where "idrestaurant" = $1',
        [id], callback);
    },

    modifyIcon: function(params, callback) {
        return db.query('update "restaurant" set "image" = $2 where "idrestaurant" = $1',
        [params.id, params.image_url], callback);
    }
}
          
module.exports = restaurant;
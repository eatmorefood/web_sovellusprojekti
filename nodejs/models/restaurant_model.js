const db = require('../database');

const restaurant={
    get: function(callback) {
        return db.query('select * from "restaurant"', callback);
    },
    getById: function(id, callback) {
        return db.query('select * from "restaurant" where "idrestaurant" = $1;', [id], callback);
    },
    add: function(restaurant, callback) {
        return db.query('insert into "restaurant" ("idrestaurant", "name", "address", "open", "type", "pricelevel") values ($1, $2, $3, $4, $5, $6)', 
        [ restaurant.idrestaurant, restaurant.name, restaurant.address, restaurant.open, restaurant.type, restaurant.pricelevel ], callback);
    },
    /*
    delete: function(id, callback) {
        return db.query('delete from "restaurant" where "idrestaurant" = $1', [id], callback);
    },
    update: function(id, restaurant, callback) {
        return db.query('update "restaurant" set "name"=$1, "address"=$2, "open"=$3, "type"=$4, "pricelevel"=$5 where idrestaurant=?', 
        [ restaurant.name, restaurant.address, restaurant.open, restaurant.type, restaurant.pricelevel, id], callback);
    }
    */
}
module.exports = restaurant;
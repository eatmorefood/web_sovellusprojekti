const db = require('../database');

const meal={

    getByRestaurant: function(id, callback) {
        return db.query('select * from "food" where "idrestaurant" = $1',
        [id], callback);
    },

    getById: function (id, callback) {
        return db.query('select * from food where idfood = $1',
        [id], callback);
    },

    add: function(newMeal, callback) { 
        return db.query('insert into food (idfood, category, name, description, price, idrestaurant, image) values ($1, $2, $3, $4, $5, $6, $7)',
        [newMeal.idfood, newMeal.category, newMeal.name, newMeal.description, newMeal.price, newMeal.idrestaurant, newMeal.image], callback);
    },

    update: function(newMeal, callback) { 
        return db.query('update food set category= $1, name= $2, description= $3, price= $4, idrestaurant= $5, image= $6 where idfood = $7',
        [newMeal.category, newMeal.name, newMeal.description, newMeal.price, newMeal.idrestaurant, newMeal.image, newMeal.idfood], callback);
    }
}
          
module.exports = meal;
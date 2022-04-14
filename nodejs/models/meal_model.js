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
        return db.query('insert into food (idfood, category, name, description, price, idrestaurant) values ($1, $2, $3, $4, $5, $6)',
        [newMeal.idfood, newMeal.category, newMeal.name, newMeal.description, newMeal.price, newMeal.idrestaurant], callback);
    },

    update: function(newMeal, callback) { 
        return db.query('update food set category= $1, name= $2, description= $3, price= $4, idrestaurant= $5 where idfood = $6',
        [newMeal.category, newMeal.name, newMeal.description, newMeal.price, newMeal.idrestaurant, newMeal.idfood], callback);
    },

    modifyIcon: function(params, callback) {
        return db.query('update food set image = $2 where idfood = $1',
        [params.idfood, params.image_url], callback);
    },

    delete: function(id, callback)
    {
        return db.query('delete from food where idfood = $1',
        [id], callback);
    }
}
          
module.exports = meal;
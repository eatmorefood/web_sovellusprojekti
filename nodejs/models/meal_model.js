const db = require('../database');

const meal={

    getByRestaurant: function(id, callback) {
        return db.query('select * from "food" where "idrestaurant" = $1',
        [id], callback);
    }
}
          
module.exports = meal;
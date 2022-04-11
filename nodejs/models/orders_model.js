const db = require('../database');

const orders={

    getAllorders: function(callback) { 
        return db.query('select * from "orders"',
        callback);
    },

    getByName: function(id, callback) { 
        return db.query('select * from "orders" where "idcustomer" = $1',
        [id], callback);
    }

}
          
module.exports = orders;
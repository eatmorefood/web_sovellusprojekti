const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');

/*
router.get('/', function (req, res) {
    restaurant.getAllRestaurants(function(err, dbResult) {
        if (err) {
            console.log(err);
          } else {
            let data = dbResult;
            try{
              res.json(data.rows)
            } catch(err){
              res.send("nothing found")
            }
          }
    })
});

module.exports=router;
*/

router.get('/:id?',
function(request, response) {
    if (request.params.id) {
        restaurant.getById(request.params.id, function(err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        });
    } else {
        restaurant.get(function(err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        });
    }
});

router.post('/',
function(request, response) {
    restaurant.add(request.body, function(err, dbResult) {
        if (err) {
            response.json(err);
        } else {
            response.json(request.body);
        }
    });
});

/*
router.delete('/:id',
function(request, response) {
    restaurant.delete(request.params.id, function(err, dbResult) {
        if (err) {
            response.json(err);
        } else {
            response.json(dbResult);
        }
    });
});
*/

router.put('/:id',
function (request, response) {
    console.log(request.body)
    restaurant.update(request.params.id, request.body, function(err, dbResult) {
        if (err) {
            response.json(err);
        } else {
            response.json(dbResult);
        }
    });
});

module.exports = router;
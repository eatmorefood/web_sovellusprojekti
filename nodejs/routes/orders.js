const express = require('express');
const router = express.Router();
const orders = require('../models/orders_model');

router.get('/:id?', function (req, res) {
    if(req.params.id){
      let ordersId = req.params.id;
  
      orders.getByName(ordersId, function (err, dbResult) {
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
      });
    } else { 
      orders.getAllorders(function(err, dbResult) {
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
      });
    }   
  });


module.exports=router;
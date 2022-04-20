var express = require('express');
const pizza_controlers = require('../controllers/pizza');
var router = express.Router();



/* GET costumes */
router.get('/', pizza_controlers.pizza_view_all_Page );

// GET request for one pizza. 
router.get('/pizza/:id', pizza_controlers.pizza_detail); 
 

module.exports = router;


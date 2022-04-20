var pizza = require('../models/pizza');

exports.pizza_list = async function (req, res) {
    try {
        tpizza = await pizza.find();
        res.send(tpizza);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.pizza_create_post = async function (req, res) {
    console.log(req.body)
    let document = new pizza();
    document.pizza_type = req.body.pizza_type;
    document.pizza_cost = req.body.pizza_cost;
    document.pizza_color = req.body.pizza_color;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle pizza delete on DELETE. 
exports.pizza_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await pizza.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
 



exports.pizza_view_all_Page = async function (req, res) {
    try {
        tpizza = await pizza.find();
        res.render('pizzas', { title: 'Pizza Search Results', results: tPizzas });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Pizza.
exports.pizza_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await pizza.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };

// Handle Pizza update form on PUT.
exports.pizza_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await pizza.findById( req.params.id)
    // Do updates of properties
    if(req.body.pizza_type)
    toUpdate.pizza_type = req.body.pizza_type;
    if(req.body.pizza_cost) toUpdate.pizza_cost = req.body.pizza_cost;
    if(req.body.pizza_color) toUpdate.pizza_color = req.body.pizza_color;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};
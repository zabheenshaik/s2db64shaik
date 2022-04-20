const mongoose = require("mongoose")
const pizzaSchema = mongoose.Schema({
    pizza_type: String,
    pizza_color: String,
    pizza_cost: Number
})
module.exports = mongoose.model("Pizza", pizzaSchema)
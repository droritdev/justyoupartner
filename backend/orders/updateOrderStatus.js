//Impot the order model
const orderModel = require('../models/orderModel');

//Update a specific (by order ID) order status
exports.updateOrderStatus = (req, res) => {
    orderModel.findByIdAndUpdate(
        req.body._id,
        {$set:req.body},{new:true}
    )
    .then(() => res.json({type: "success"}))
    .catch(err => res.status(400).json("Error: " + err));
}



//Impot the order model
const orderModel = require('../models/orderModel');

//{trainer.firstName:"Lotem", "status":"pending"}
//Get all orders with param trainer ID
exports.getOrdersByTrainerID = (req, res) => {
    orderModel.find(
        {
            "trainer.id" : req.params.id,
        }
    )
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err.data));
}
//Import trainer/client profile model
const chatModel = require('../models/chatModel');

//Update trainer info
exports.updateChat = (req, res) => {
    chatModel.findByIdAndUpdate(
        req.body._id,
        {$set:req.body},{new:true}
    )
    .then(() => res.json({type: "success"}))
    .catch(err => console.log(err.data));

}

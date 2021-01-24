//Import trainer/client profile model
const trainerProfileModel = require('../../models/trainerModels');

//Update trainer media
exports.updateMedia = (req, res) => {
    trainerProfileModel.findByIdAndUpdate(
        req.body._id,
        {$set:req.body},{new:true}
    )
    .then(() => res.json({type: "success"}))
    .catch(err => res.status(400).json("Error: " + err));

}

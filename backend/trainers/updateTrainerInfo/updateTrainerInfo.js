//Import trainer/client profile model
const trainerProfileModel = require('../../models/trainerModels');

//Update trainer info
exports.updateTrainerInfo = (req, res) => {
    trainerProfileModel.findByIdAndUpdate(
        req.body._id,
        {$set:req.body},{new:true}
    )
    .then(() => res.json({type: "success"}))
    .catch(err => console.log(err.data));
}

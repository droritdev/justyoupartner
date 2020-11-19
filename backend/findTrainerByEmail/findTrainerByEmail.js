//Import The trainer model
const trainerProfileModel = require('../models/trainerModels');

//Find trainers by category
exports.getTrainerByEmail = (req, res) => {
    trainerProfileModel.find(
        {
            email: req.params.email
        },
    )
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err.data));
}
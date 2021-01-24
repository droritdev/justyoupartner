//Import The trainer model
const trainerProfileModel = require('../../models/trainerModels');

//Find trainers by phone
exports.getTrainerByPhone = (req, res) => {
    trainerProfileModel.find(
        {
            phone: {
                areaCode: req.params.phone.slice(0, 3),
                phoneNumber: req.params.phone.slice(3)
            } 
        }
    )
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err.data));
}
//Import The trainer model
const clientProfileModel = require('../models/clientModels');

//Find trainers by category
exports.getClientByID = (req, res) => {
    clientProfileModel.findById(req.params.id)
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err.data));
}
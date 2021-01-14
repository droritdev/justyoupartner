//Import The chat model
const chatModel = require('../models/chatModel');

//Find chat by clientID and trainerID
exports.getChatByIDS = (req, res) => {
    var idsString = req.params.ids;
    var idsArray = idsString.split('@');
    chatModel.find(
        { 
            clientID: idsArray[0].trim(),
            trainerID: idsArray[1].trim()
        }
    )
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err.data));
}
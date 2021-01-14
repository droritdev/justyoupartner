//Import the chat model
const chatModel = require('../models/chatModel');

//Create new chat and add him to the dataBase
exports.createChat = (req, res) => { 
    //Creating a new chat
    const newChat = new chatModel(
        {
            clientID: req.body.clientID, 
            trainerID: req.body.trainerID, 
            chat: req.body.chat
        }
    );
    //Add the new chat to the data base
    newChat
        .save()
        .then(() => res.json({status: "success"}))
        .catch(err => console.log(err.data));
}
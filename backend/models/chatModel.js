//Mongoose library to create new schemas
const mongoose = require("mongoose");

//Create new mongoose schema variable
const Schema = mongoose.Schema;

//Create new chat schema
const chatSchema = new Schema(
    {
        clientID: {
            type: String,
            required: true,
            trim: true
        },
        trainerID: {
            type: String,
            required: true,
            trim: true
        },
        chat: {
            type: [Object],
            required: true,
        },     
    },
    {
        timestamps: true,
    }
);

//Create new chat model who will contain object tyoe of "chatSchema" 
const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
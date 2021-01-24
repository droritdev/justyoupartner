        //**External imports**//
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = mongoose.connection;
module.exports.mongoose = mongoose;

        //**Chat imports**//
const findMessageByIDS = require('./messages/findMessageByIDS');
const newMessage = require('./messages/newMessage');
const watchForUpdates = require('./messages/watchForUpdates');


        //**Trainer imports**//
const trainerRegister = require('./trainers/register/trainerRegister');
const findTrainerByEmail = require('./trainers/findTrainerByEmail/findTrainerByEmail');
const findTrainerByPhone = require('./trainers/findTrainerByPhone/findTrainerByPhone');
const updateMedia = require('./trainers/updateMedia/updateMedia');
const updateTrainerInfo = require('./trainers/updateTrainerInfo/updateTrainerInfo');



        //**Client imports**//
const findClientByID = require('./clients/findClientByID/findClientByID');
const findMultipleClients = require('./clients/findMultipleClients/findMultipleClients');



        //**SendGrid imports**//
const sendEmail = require('./sendGrid/sendEmail');
const sendAutomaticResponse = require('./sendGrid/sendAutomaticResponse');


        //**Twilio imports**//
const verificationCode = require('./twilio/verificationCode');
const makeCall = require('./twilio/makeCall');


        //**Orders imports**//
const updateOrderStatus = require('./orders/updateOrderStatus');
const getOrdersByTrainerID = require('./orders/getOrdersByTrainerID');



        //**In-app variables**//
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Connect to the data base
//Connect the server to the port
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(result => {
        app.listen(port, () => {
            console.log(`App running on port ${port}`);  
        });
    })
    .catch(err => console.log(err));



            ////**Chat end points**////
//End point to get chat message by clientID and trainerID (receiver and sender)
app.get('/messages/findMessageByIDS/:ids', findMessageByIDS.getMesssageByIDS);

//End point to create new chat message
app.post('/messages/newMessage', newMessage.createMessage);

//End point to observe new messages on chat
app.get('/messages/watchForUpdates/:receiver', watchForUpdates.watchForUpdates);






        ////**Trainer end points**////
//End point for confirming the registration and add a new trainer to the dataBase
app.post('/trainers/register', trainerRegister.register);

//End point to update trainer media
app.post('/trainers/updateMedia', updateMedia.updateMedia);

//End point to update trainer info
app.post('/trainers/updateTrainerinfo', updateTrainerInfo.updateTrainerInfo);

//End point to get trainer by email
app.get('/trainers/email/:email', findTrainerByEmail.getTrainerByEmail);

app.get('/trainers/phone/:phone', findTrainerByPhone.getTrainerByPhone);






        ////**Client end points**////
//End point to get client by ID
app.get('/clients/findByID/:id', findClientByID.getClientByID);

//End point to get client by ID
app.get('/clients/findMultipleClients/:idArray', findMultipleClients.getMultipleClients);





        ////**SendGrid end points**////
//End point for sending email to support
app.post('/send-email', sendEmail.sendEmail);

//End point for sending automatic response
app.post('/send-automatic-response', sendAutomaticResponse.sendAutomaticResponse);




        ////**Twilio end points**////
//End point for sending verification code
app.post('/send-verification-code', verificationCode.sendVerificationCode);

//End point for verifying the verification code
app.post('/verify-code', verificationCode.verifyCode);

//End point for making twilio phone call
app.post('/twilio/makeCall', makeCall.makeCall);





        ////**Orders end points**////
//End point for updating an order status
app.post('/orders/update-status', updateOrderStatus.updateOrderStatus);


//End point for searching order by trainer id
app.get('/orders/by-trainer-id/:id', getOrdersByTrainerID.getOrdersByTrainerID);





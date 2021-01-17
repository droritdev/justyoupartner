//Access to /.env variables
require('dotenv').config();

//Twilio library + Connect to Twilio account
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.makeCall = (req, res) => {
    console.log("start");
    client
    .calls
    .create({
        url: 'https://demo.twilio.com/welcome/voice.xml',
        to: '+972523720280',
        from: process.env.TWILIO_PHONE_NUMBER
    })
    .then((call)=> {
        console.log(call.sid);
    })
    .catch((err)=> {
        console.log(err);
    });
}
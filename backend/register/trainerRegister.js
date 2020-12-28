//Import the trainer model
const trainerProfileModel = require('../models/trainerModels');

//Register new trainer and add him to the dataBase
exports.register = (req, res) => { 
    //Creating a new trainer
    const trainerProfile = new trainerProfileModel(
        {
            name: {
                first: req.body.name.first, 
                last: req.body.name.last
            }, 
            birthday: req.body.birthday, 
            email:req.body.email, 
            password:req.body.password, 
            country:req.body.country, 
            categories: req.body.categories, 
            about_me: req.body.about, 
            certifications: req.body.certifications, 
            maximumDistance: Number(req.body.maximumDistance), 
            trainingSite1: req.body.trainingSite1, 
            trainingSite1: req.body.trainingSite2, 
            prices: { 
                single: {
                    singleAtTrainer: req.body.prices.single.singleAtTrainer, 
                    singleOutdoor: req.body.prices.single.singleOutdoor
                }, 
                couple: {
                    coupleAtTrainer: req.body.prices.couple.coupleAtTrainer, 
                    coupleOutdoor: req.body.prices.couple.coupleOutdoor
                } 
            }, 
            phone: {
                areaCode: req.body.phone.areaCode, 
                phoneNumber: req.body.phone.phoneNumber
            },
            location: {
                type: req.body.location.type,
                coordinates: req.body.location.coordinates
            },
            media : {
                images: req.body.media.images,
                videos: req.body.media.videos
            }
        }
    );
    //Add the new trainer to the data base
    trainerProfile
        .save()
        .then(() => res.json(trainerProfile))
        .catch(err => console.log(err.data));
}
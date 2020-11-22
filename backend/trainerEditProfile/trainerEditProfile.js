const trainerProfileModel = require('../models/trainerModels');

exports.editProfile = (req,res) => {
    let address1 = "";
    let address2 = "";

    if(req.body.trainingSite1 === ""){
        address1 = 'Outdoor';
    }
    else{
        address1 = req.body.trainingSite1;
    }
    
    if(req.body.trainingSite2 === ""){
        address2 = 'Outdoor';
    }
    else{
        address2 = req.body.trainingSite2;
    }

    trainerProfileModel.findOneAndUpdate(
        {email: req.params.email},
        {
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            birthday: req.body.birthday,
            categories: req.body.categories,
            maximumDistance: req.body.maximumDistance,
            trainingSite1: address1,
            trainingSite2: address2,
            about_me: req.body.aboutMe,
            certifications: req.body.certifications,
            //images
            prices: {
                single: {
                    singleAtTrainer: req.body.prices.single.singleAtTrainer,
                    singleOutdoor: req.body.prices.single.singleOutdoor
                },
                couple: {
                    coupleAtTrainer: req.body.prices.couple.coupleAtTrainer,
                    coupleOutdoor: req.body.prices.couple.coupleOutdoor
                }
            }
        }
    )
    .then(() => res.send("Trainer updated"))
    .catch((err) => res.send(err))
}
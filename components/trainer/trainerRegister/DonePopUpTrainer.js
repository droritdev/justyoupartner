import React, {useEffect, useContext} from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';
import axios from 'axios';

import {CountryContext} from '../../../context/trainerContextes/CountryContext';
import {EmailContext} from '../../../context/trainerContextes/EmailContext';
import {NameContext} from '../../../context/trainerContextes/NameContext';
import {BirthdayContext} from '../../../context/trainerContextes/BirthdayContext';
import {CategoryContext} from '../../../context/trainerContextes/CategoryContext';
import {AboutMeContext} from '../../../context/trainerContextes/AboutMeContext';
import {CertificationsContext} from '../../../context/trainerContextes/CertificationsContext';
import {MaximumDistanceContext} from '../../../context/trainerContextes/MaximumDistanceContext';
import {TrainingSiteContext} from '../../../context/trainerContextes/TrainingSiteContext';
import {TrainingPriceContext} from '../../../context/trainerContextes/TrainingPriceContext';
import {PasswordContext} from '../../../context/trainerContextes/PasswordContext';
import {PhoneContext} from '../../../context/trainerContextes/PhoneContext';

//Pop up page which shows a Done picture and disaperes after 2 seconds
const DonePopUpTrainer = ({navigation}) => {
    const {firstName} = useContext(NameContext);
    const {lastName} = useContext(NameContext);
    const {birthday} = useContext(BirthdayContext);
    const {emailAddress} = useContext(EmailContext);
    const {password} = useContext(PasswordContext);
    const {country} = useContext(CountryContext);
    const {aboutMe} = useContext(AboutMeContext);
    const {certifications} = useContext(CertificationsContext);
    const {categories} = useContext(CategoryContext);
    const {maximumDistnace} = useContext(MaximumDistanceContext);
    const {trainingSite1} = useContext(TrainingSiteContext);
    const {trainingSite2} = useContext(TrainingSiteContext);
    const {singlePriceAtTrainer} = useContext(TrainingPriceContext);
    const {singlePriceOutdoor} = useContext(TrainingPriceContext);
    const {couplePriceAtTrainer} = useContext(TrainingPriceContext);
    const {couplePriceOutdoor} = useContext(TrainingPriceContext);
    const {areaCode} = useContext(PhoneContext);
    const {phoneNumber} = useContext(PhoneContext);

    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    const registerTrainer = () => {
        axios  
        .post('/trainers/register', {
            name: {
                first: firstName,
                last: lastName
            },
            birthday: birthday,
            email: emailAddress,
            password: password,
            country: country,
            categories: categories,
            about: aboutMe,
            certifications: certifications,
            maximumDistance: maximumDistnace,
            trainingSite1: trainingSite1,
            trainingSite1: trainingSite2,
            prices: { 
                single: {
                    singleAtTrainer: singlePriceAtTrainer, 
                    singleOutdoor: singlePriceOutdoor
                }, 
                couple: {
                    coupleAtTrainer: couplePriceAtTrainer, 
                    coupleOutdoor: couplePriceOutdoor
                } 
            }, 
            phone: {
                areaCode: areaCode, 
                phoneNumber: phoneNumber
            },
            location: {
                type: 'Point',
                coordinates: [32.124602, 34.825223]
            }
        },
        config
        )
        .then((res) => {
            navigation.navigate('WelcomeTrainer')
        })
        .catch((err) => alert(err.data));
    }

    //Automaticlly navigates to the WelcomeTrainer popUp page after 2 seconds (2 * 1000 mili seconds = 2 seconds)
    setTimeout(() => 
        navigation.navigate('WelcomeTrainer'), 3000
    );

    setTimeout(() => registerTrainer(), 1000);

    return(
        <View style={styles.container}>
            <Image 
                source={require('../../../images/doneImage.jpeg')}
                style={styles.doneImage}
            />
            <Text style={styles.registeringText}>Done</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    registeringText: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 25
    },
    doneImage: {
        height: Dimensions.get('window').height * .25,
        width : Dimensions.get('window').height * .25
    }
});

export default DonePopUpTrainer;
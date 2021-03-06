import React, {useEffect, useState, useContext} from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions, Alert} from 'react-native';
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
import {MediaContext} from '../../../context/trainerContextes/MediaContext';
import {PaypalUsernameContext} from '../../../context/trainerContextes/PaypalUsernameContext';

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import * as Progress from 'react-native-progress';




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
    const {coordinates1} = useContext(TrainingSiteContext);
    const {coordinates2} = useContext(TrainingSiteContext);
    const {singlePriceAtTrainer} = useContext(TrainingPriceContext);
    const {singlePriceOutdoor} = useContext(TrainingPriceContext);
    const {couplePriceAtTrainer} = useContext(TrainingPriceContext);
    const {couplePriceOutdoor} = useContext(TrainingPriceContext);
    const {areaCode} = useContext(PhoneContext);
    const {phoneNumber} = useContext(PhoneContext);
    const {mediaPictures} = useContext(MediaContext);
    const {mediaVideos} = useContext(MediaContext);
    const {paypalUsername} = useContext(PaypalUsernameContext);

    var picturesURL = [];
    var videosURL = [];
    const [isLoading, setIsLoading] = useState(true);


    const config = {
        withCredentials: true,
        baseURL: 'https://trainer.iqdesk.info:443/',
        headers: {
          "Content-Type": "application/json",
        },
    };



    //Check if the upload to Firebase is finished
    const checkFinishFirebaseUpload = async () => {
        // console.log('incheckfinish')
        if (mediaPictures.length === picturesURL.length && mediaVideos.length == videosURL.length) {
            clearInterval(checkFinishInterval);
            registerTrainer();
        }
    }


    //Create Firebase user
    const createUserFirebase = () => {
        auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((data) => {
                console.log('User account created & signed in!');
                const userRef = "/trainers/" + data.user.uid + "/";
                uploadMedia(userRef);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.log('Error in createuserwithemail ', error.code, error);
            });
    }


    //Upload all media to firebase
    const uploadMedia = async (userRef) => {
        console.log('in uploadmedia')
        for (let i = 0; i < mediaPictures.length; i++) {
            uploadImage(userRef, mediaPictures[i], i);
        }   
        for (let i = 0; i < mediaVideos.length; i++) {
            uploadVideo(userRef, mediaVideos[i], i);
         }        
    }


    //Upload image to firebase storage
    const uploadImage = async (userRef, imageUri, imageNum) => {
        console.log('in uploadimage')
        let ref = storage().ref(userRef+"images/trainerImage"+imageNum+getFormat(imageUri));
        await ref.putFile(imageUri).then((snapshot) => {
        })
          .catch((e) => console.log("fail"));

        await ref.getDownloadURL().then((url) => {
            picturesURL.push(url);
        })
    }



    //Upload video to firebase storage
    const uploadVideo = async (userRef, videoUri, videoNum) => {
        let ref = storage().ref(userRef+"videos/trainerVideo"+videoNum+getFormat(videoUri));
        await ref.putFile(videoUri).then((snapshot) => {

          })
          .catch((e) => console.log("fail"));

        await ref.getDownloadURL().then((url) => {
            videosURL.push(url);
        })
    }



    //Get file format (.jpg, .png, .mp4, etc)
     const getFormat = (uri) => {
         console.log('ingetformat')
         indexOfDot = uri.indexOf('.', uri.length-6);
         return uri.slice(indexOfDot);
     }



    //FAKE INFO FOR DEBUGGING
    // name: {
    //     first: "lala",
    //     last: "lala"
    // },
    // birthday: "1/1/2021",
    // email: "testing234@gmail.com",
    // password: "MTIzNDU2",
    // country: "United States",
    // categories: ['swim', 'hunt', 'poop'],
    // about: 'asdasdasdsa',
    // certifications: 'asdasdasdsa',
    // maximumDistance: 50,
    // prices: { 
    //     single: {
    //         singleAtTrainer: '25', 
    //         singleOutdoor: '35'
    //     }, 
    //     couple: {
    //         coupleAtTrainer: '40', 
    //         coupleOutdoor: '50'
    //     } 
    // }, 
    // phone: {
    //     areaCode: '001', 
    //     phoneNumber: '1234567'
    // },
    // location: {
    //     trainingSite1: {
    //         address: 'lala street',
    //         coordinates: [32.211, 32.4343]
    //     },
    //     trainingSite2: {
    //         address: 'lala street',
    //         coordinates: [32.211, 32.4343]
    //     }
    // },
    // media: {
    //     images: [],
    //     videos: []
    // }


    //Register trainer to mongodb
    const registerTrainer = async () => {
        console.log('in register trainer')
        console.log('paypalUsername ', paypalUsername)
        axios  
        .post('/trainers/register', {
            name: {
                first: firstName,
                last: lastName
            },
            birthday: birthday,
            email: emailAddress,
            password: password,
            paypalUsername: paypalUsername,
            country: country,
            categories: categories,
            about: aboutMe,
            certifications: certifications,
            maximumDistance: maximumDistnace,
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
                trainingSite1: {
                    address: trainingSite1,
                    coordinates: coordinates1
                },
                trainingSite2: {
                    address: trainingSite2,
                    coordinates: coordinates2
                }
            },
            media: {
                images: picturesURL,
                videos: videosURL
            }
        },
        config
        )
        .then((res) => {
            setIsLoading(false);
            setTimeout(function(){navigation.navigate('WelcomeTrainer')}, 2000);
        })
        .catch((err) => {
            setIsLoading(false);
            console.log('registering trainer in mongodb failed ', err);
            var user = auth().currentUser;
            user.delete()
            .then(() => {
                console.log('firebase user deleted')
                Alert.alert('Trainer registration failed')
            })
            .catch((err) => {
                console.log('error firebase user not deleted ', err)
                Alert.alert('Trainer registration failed  - email cannot be reused')
            });
        });
    }


    //start account creating process
    setTimeout(() => createUserFirebase(), 20);

    //start interval to check if upload is done
    var checkFinishInterval = setInterval(() => checkFinishFirebaseUpload(), 1000);
   

    return(
        <View style={styles.container}>
            {isLoading?            
             <View>
                <View style={styles.progressView}>
                    <Progress.Circle size={Dimensions.get('window').height * .25} indeterminate={true} />
                </View>
                <View style={styles.loadingTextView}>
                    <Text style={styles.registeringText}>Creating account...</Text>
                </View>
            </View>
            : 
            <View>
                <Image 
                    source={require('../../../images/doneImage.jpeg')}
                    style={styles.doneImage}
                />
                <Text style={styles.registeringText}>Done</Text>
            </View> 
            }
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
    loadingTextView: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .020
    },
    progressView: {
        alignSelf: 'center'
    },
    registeringText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .040,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .020
    },
    doneImage: {
        height: Dimensions.get('window').height * .25,
        width : Dimensions.get('window').height * .25
    }
});

export default DonePopUpTrainer;
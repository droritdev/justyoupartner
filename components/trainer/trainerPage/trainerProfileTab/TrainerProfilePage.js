import React, {useRef, useContext, useState, useEffect} from 'react';
import {Modal, Alert, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/Feather';

import {IdContext} from '../../../../context/trainerContextes/IdContext';
import {MediaContext} from '../../../../context/trainerContextes/MediaContext';
import {CountryContext} from '../../../../context/trainerContextes/CountryContext';
import {EmailContext} from '../../../../context/trainerContextes/EmailContext';
import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {BirthdayContext} from '../../../../context/trainerContextes/BirthdayContext';
import {CategoryContext} from '../../../../context/trainerContextes/CategoryContext';
import {AboutMeContext} from '../../../../context/trainerContextes/AboutMeContext';
import {CertificationsContext} from '../../../../context/trainerContextes/CertificationsContext';
import {MaximumDistanceContext} from '../../../../context/trainerContextes/MaximumDistanceContext';
import {TrainingSiteContext} from '../../../../context/trainerContextes/TrainingSiteContext';
import {TrainingPriceContext} from '../../../../context/trainerContextes/TrainingPriceContext';
import {PasswordContext} from '../../../../context/trainerContextes/PasswordContext';
import {PhoneContext} from '../../../../context/trainerContextes/PhoneContext';
import {CalendarContext} from '../../../../context/trainerContextes/CalendarContext';
import {ReviewsContext} from '../../../../context/trainerContextes/ReviewsContext';



//The trainer main profile page - profile area
const TrainerProfilePage = ({navigation}) => {
    
    const {trainerID, dispatchTrainerID} = useContext(IdContext);
    const {firstName, dispatchFirst} = useContext(NameContext);
    const {lastName, dispatchLast} = useContext(NameContext);
    const {birthday, dispatchBirthday} = useContext(BirthdayContext);
    const {emailAddress, dispatchEmail} = useContext(EmailContext);
    const {password, dispatchPassword} = useContext(PasswordContext);
    const {country, dispatchCountry} = useContext(CountryContext);
    const {aboutMe, dispatchAboutMe} = useContext(AboutMeContext);
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);
    const {categories, dispatchCategories} = useContext(CategoryContext);
    const {maximumDistnace, dispatchMaximumDistance} = useContext(MaximumDistanceContext);
    const {trainingSite1, dispatchTrainingSite1} = useContext(TrainingSiteContext);
    const {trainingSite2, dispatchTrainingSite2} = useContext(TrainingSiteContext);
    const {singlePriceAtTrainer, dispatchSingleAtTrainer} = useContext(TrainingPriceContext);
    const {singlePriceOutdoor, dispatchSingleOutdoor} = useContext(TrainingPriceContext);
    const {couplePriceAtTrainer, dispatchCoupleAtTrainer} = useContext(TrainingPriceContext);
    const {couplePriceOutdoor, dispatchCoupleOutdoor} = useContext(TrainingPriceContext);
    const {areaCode, dispatchArea} = useContext(PhoneContext);
    const {phoneNumber, dispatchNumber} = useContext(PhoneContext);
    const {mediaPictures, dispatchMediaPictures} = useContext(MediaContext);
    const {mediaVideos, dispatchMediaVideos} = useContext(MediaContext);
    const {calendar, dispatchCalendar} = useContext(CalendarContext);
    const {reviews, dispatchReviews} = useContext(ReviewsContext);

    //ref to show covid alert
    let dropDownAlertRef = useRef(null);

    const [age, setAge] = useState();
    const [starRating ,setStarRating] = useState();
    const [isSingle, setIsSingle] = useState(true);

    //Modal to display if there is no internet connection
    const [internetModalVisible, setInternetModalVisible] = useState(false);

    //Modal to display for covid-19 alert tap
    const [covidModalVisible, setCovidModalVisible] = useState(false);
    const [showCovidOverlay, setShowCovidOverlay] = useState(true)

    useEffect(() => {
        checkInterntIsOn()
    }, [navigation])
    
    //Format the categories list to lower case with first letter upper case
    const categoryDisplayFormat = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    //Check if information can be retrived from database (interent/server issue)
    const checkInterntIsOn = async () => {
        //Wait for response if the data reading was successfull
        var success =  await getInfoFromMongoDB();

        if (success) {
            //Dismiss the no internet connection modal
            setInternetModalVisible(false);

        } else {

            //Show the no internet connection modal if it's not already been displayed
            if(!internetModalVisible) {
                setInternetModalVisible(false);
            }
            
            //Retry to establish connection after 15 seconds
            setTimeout(() => checkInterntIsOn(), 15000)
        }

    }


    const config = {
        withCredentials: true,
        baseURL: 'http://justyou.iqdesk.info:8081/',
        headers: {
          "Content-Type": "application/json",
        },
    };

     //Load all trainer info from mongodb to the dispatch
    const getInfoFromMongoDB = async () => {
        var success =  true;
        
        await axios
        .get('/trainers/email/'+auth().currentUser.email,
        config
        )
        .then((doc) => {
            if(doc) {
                loadStarRating(doc);
                calculateTrainerAge(doc);

                dispatchTrainerID({
                    type: 'SET_TRAINER_ID',
                    trainerID: doc.data[0]._id   
                });     

                dispatchEmail({
                    type: 'SET_EMAIL_ADDRESS',
                    emailAddress: doc.data[0].email   
                });

                dispatchPassword({
                    type: 'SET_PASSWORD',
                    password: doc.data[0].password   
                });
        
                dispatchFirst({
                    type: 'SET_FIRST_NAME',
                    firstName: doc.data[0].name.first
                });
        
                dispatchLast({
                    type: 'SET_LAST_NAME',
                    lastName: doc.data[0].name.last
                })
        
                dispatchBirthday({
                    type: 'SET_BIRTHDAY',
                    birthday: doc.data[0].birthday
                })

                dispatchReviews({
                    type: 'SET_REVIEWS',
                    reviews: doc.data[0].reviews
                })

                dispatchCategories({
                    type: 'SET_CATEGORIES',
                    categories: doc.data[0].categories
                })

                dispatchMaximumDistance({
                    type: 'SET_MAXIMUM_DISTANCE',
                    maximumDistnace: doc.data[0].maximumDistance
                })

                dispatchTrainingSite1({
                    type: 'SET_TRAINING_SITE_1',
                    trainingSite1: doc.data[0].location.trainingSite1.address
                })

                dispatchTrainingSite2({
                    type: 'SET_TRAINING_SITE_2',
                    trainingSite2: doc.data[0].location.trainingSite2.address
                })

                dispatchAboutMe({
                    type: 'SET_ABOUT_ME',
                    aboutMe: doc.data[0].about_me
                })

                dispatchCertifications({
                    type: 'SET_CERTIFICATIONS',
                    certifications: doc.data[0].certifications
                })

                dispatchSingleAtTrainer({
                    type: 'SET_SINGLE_AT_TRAINER',
                    singleAtTrainer: doc.data[0].prices.single.singleAtTrainer
                })

                dispatchSingleOutdoor({
                    type: 'SET_SINGLE_OUTDOOR',
                    singleOutdoor: doc.data[0].prices.single.singleOutdoor
                })

                dispatchCoupleAtTrainer({
                    type: 'SET_COUPLE_AT_TRAINER',
                    coupleAtTrainer: doc.data[0].prices.couple.coupleAtTrainer
                })

                dispatchCoupleOutdoor({
                    type: 'SET_COUPLE_OUTDOOR',
                    coupleOutdoor: doc.data[0].prices.couple.coupleOutdoor
                })

                dispatchMediaPictures({
                    type: 'SET_MEDIA_PICTURES',
                    mediaPictures: doc.data[0].media.images
                });

                dispatchMediaVideos({
                    type: 'SET_MEDIA_VIDEOS',
                    mediaVideos: doc.data[0].media.videos
                });


                dispatchCalendar({
                    type: 'SET_CALENDAR',
                    calendar: doc.data[0].calendar
                });
            }
            else{
                Alert.alert(
                    'Acount not found',
                    "We couldn't retrive information about your account. \n Please contact support for further assistance.",
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            }
        })
        .catch((err) => {
            success = false;

            if(!internetModalVisible) {
                dispatchAboutMe({
                    type: 'SET_ABOUT_ME',
                    aboutMe: ""
                })
    
                dispatchCertifications({
                    type: 'SET_CERTIFICATIONS',
                    certifications: ""
                })
            }

        });

        return success;
    };



   //When page is focused, load info again
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         //Check if covid alert was dismissed
    //         if(global.covidAlert) {
    //             if(dropDownAlertRef.state.isOpen === false) {
    //                 //Show covid alert
    //                 dropDownAlertRef.alertWithType('info', 'Latest information on CVOID-19', 'Click here to learn more.');
    //             }
    //         } else {
    //             dropDownAlertRef.closeAction();
    //         }

    //     checkInterntIsOn();
    // });
    
    //     return unsubscribe;
    //   }, [navigation]);




    //Load trainer star rating
    const loadStarRating = (doc) => {
        var reviews = doc.data[0].reviews;

        if (reviews.length === 0) {
            setStarRating(0);
        } else {
            var sumStars = 0;
            for (let index = 0; index < reviews.length; index++) {
                const singleReviewStar = reviews[index].stars;
                sumStars += Number(singleReviewStar);
            }
            setStarRating((sumStars/reviews.length).toFixed(1));
        }
    }


    //Calculate trainer age
    const calculateTrainerAge = (doc) => {
        let array = doc.data[0].birthday.split('/');
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let todayDay = today.getDate();
        let age = year - (Number(array[2]));
        if(month < (Number(array[0]))){
            age--;
        }
        if((Number(array[0])) === month && todayDay < (Number(array[1]))){
            age--
        }
        setAge(age);
    }



    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsSingle(!isSingle);
    }




    //Handle press on why us button
    const handleOnWhyUsPrees = () => {
        // axios
        //   .post('/twilio/makeCall', {},
        //   config
        //   )
        //   .then(() => {
        //   })
        //   .catch(()=> {

        //   })
        navigation.navigate('WhyUS');
    }

    //Handle press on updates
    const handleUpdatesPress = () => {
        navigation.navigate('Updates');
    }


    //Handle press on Q & A button
    const handleQandAPress = () => {
        navigation.navigate('QuestionsAndAnswers');
    }

    const handleOnEditProfilePressed = () => {
        navigation.navigate('TrainerEditProfile');
    }

    const handleOnCustomerServicePressed = () => {
        navigation.navigate('CustomerService');
    }

    const handleOnSettingsPress = () => {
        navigation.navigate('TrainerSettings');
    }

    const handleOnReviewsPressed = () => {
        navigation.navigate('TrainerReviews');
    }


    //Update the covid alert var to false (will not display coivd alert anymore)
    const covidAlertCancel = () => {
        global.covidAlert = false;
    }


    //Show the covid information modal
    const covidAlertTap = () => {
        setCovidModalVisible(true);
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <Modal                
                animationType="slide"
                transparent={true}
                visible={false}
                onRequestClose={() => { setInternetModalVisible(false)}}
            >
                <View style={styles.noInternetContainer}>
                    <View style={styles.noInternetModalContainer}>
                        <Icon name="wifi-off" size={Dimensions.get('window').width * .2} style={styles.noInternetIcon} />
                        <Text style={styles.noInternetTitle}>No internet connection</Text>
                        <Text style={styles.noInternetMessage}>Please check your internet connection.</Text>
                        <View style={styles.progressView}>
                                <Progress.Circle size={Dimensions.get('window').height * .07} indeterminate={true} />
                        </View>
                    </View>
                </View>

            </Modal>

            {showCovidOverlay && 
                <View style={styles.covidOverlay}>
                <TouchableWithoutFeedback onPress={covidAlertTap}>
                <View>
                <Text style={styles.covidOverlayText}>Latest information on COVID-19</Text>
                <Text style={styles.covidOverlayText}>Click here to learn more</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setShowCovidOverlay(false)}>
                <View style={styles.closeButton}><Text style={styles.xButton}>X</Text></View>
                </TouchableWithoutFeedback>
                </View>
            }
            <Modal                
                animationType="slide"
                transparent={true}
                cancelable={true}
                visible={covidModalVisible}
                onRequestClose={()=>{}}
            >
                <View style={styles.covidContainer}>
                    
                    <View style={styles.covidModalContainer}>
                        <Icon
                            name="x-circle" 
                            size={Dimensions.get('window').width * .05} 
                            style={styles.covidCloseIcon} 
                            onPress={()=> {setCovidModalVisible(false)}}
                        />
                        <Text style={styles.covidTitle}>COVID-19 Information</Text>
                        <Text style={styles.covidMessage}>{"We at JustYou take care to follow the changing guidelines of the Ministry of Health regarding the coronavirus. Before ordering, the personal trainer and the client will fill out a statement that they do indeed meet the requirements of the law regarding the coronavirus. \nAs Everyone knows, the guidelines may change at any time and we will make the adujstments according to the changes to be determined by the Ministry of Health. Adherence to these requirments is for all of us for your health and safety and we will know better days"}.</Text>
                    </View>
                </View>

            </Modal>

            {/* <View style={styles.covidAlertView}>
                <DropdownAlert
                        ref={(ref) => {
                        if (ref) {
                            dropDownAlertRef = ref;
                        }
                        }}
                        containerStyle={styles.covidAlertContainer}
                        showCancel={true}
                        infoColor ={'deepskyblue'}
                        onCancel={covidAlertCancel}
                        closeInterval = {0}
                        onTap={covidAlertTap}
                        titleNumOfLines={1}
                        messageNumOfLines={1}
                />
            </View> */}
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <View style={styles.imageAndDetailsContainer}>
                        <FastImage
                            style={styles.profileImage}
                            source={{
                                uri: mediaPictures[0],
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    <View style={styles.nameRatingAgeContainer}>
                        <Text style={styles.nameText}>{firstName+" "+lastName}</Text>
                        <Text style={styles.personalTrainerText}>Personal Trainer</Text> 
                        <View style={styles.ratingAndAge}>
                            <Text style={styles.ratingText}>{starRating} </Text>
                            <Image
                                source={require('../../../../images/starIconBlue.png')}
                                style={styles.startIcon}
                            />
                            <Text style={styles.ageText}> - Age {age}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.categoryCertSitesAbout}>
                    <Text style={styles.categoriesTitle}>
                        Categories: {<Text style={styles.categoriesText}>{categoryDisplayFormat(categories.join(', '))}</Text>}
                    </Text>
                    <Text style={styles.certificationsTitle}>
                        Certifications: {<Text style={styles.certificationsText}>{certifications.length > 80 ? certifications.slice(0, 80)+"...": certifications}</Text>}
                    </Text>

                    <Text style={styles.trainingSiteTitle}>
                        Primary Address: {<Text style={styles.certificationsText}>{trainingSite1}</Text>}
                    </Text>
                    {trainingSite2===undefined? null : 
                        <Text style={styles.trainingSiteTitle}>
                        Secondary Address: {<Text style={styles.certificationsText}>{trainingSite2}</Text>}
                    </Text>}
                    <Text style={styles.aboutMeTitle}>
                        About Me: {<Text style={styles.aboutMeText}>
                            {aboutMe.length > 80 ? aboutMe.slice(0, 80)+"..."
                            : aboutMe}</Text>}
                    </Text>
                </View>
                <View style={styles.pricingContainer}>
                    <View style={ styles.pricingLabels}>
                        <TouchableOpacity 
                            style={isSingle ? styles.singlePricing : styles.singlePricingLabeld}
                            onPress={handleFlipToggle}
                        >
                            <Text style={isSingle ? styles.singleText : styles.singleTextLabeld}>Single</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={isSingle ? styles.couplePricing : styles.couplePricingLabeld}
                            onPress={handleFlipToggle}
                        >
                            <Text style={isSingle ? styles.coupleText : styles.coupleTextLabeld}>Couple</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceTextsContainer}>
                        <Text style={styles.priceTexts}>Training cost at trainer site: {isSingle ? singlePriceAtTrainer+"$" : couplePriceAtTrainer+"$"}</Text>
                        <Text style={styles.priceTexts}>Training cost outdoor: {isSingle ? singlePriceOutdoor+"$" : couplePriceOutdoor+"$"}</Text>
                    
                    </View>
                </View>
                <View style={styles.whyUsQaUpdatesContainer}>
                    <TouchableOpacity 
                        style={styles.whyUsButton}
                        onPress={() => handleOnWhyUsPrees()}
                    >
                        <Text style={styles.whyUsTitle}>WHY US</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.questionsButton}
                        onPress={() => handleQandAPress()}
                    >
                        <Text style={styles.questionsTitle}>Q & A's</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.updatesButton}
                    onPress={() => handleUpdatesPress()}
                    >
                        <Text style={styles.updatesTitle}>UPDATES</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.moreContainer}>
                    <Text style={styles.moreTitle}>More</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.editProfileRow}>
                            <TouchableOpacity
                                onPress={() => handleOnEditProfilePressed()}
                            >
                                <Text style={styles.editProfileTitle}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.arrowButton}
                                onPress={() => handleOnEditProfilePressed()}
                            >
                                <Image
                                    source={require('../../../../images/arrowButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.reviewsRow}>
                            <TouchableOpacity
                            onPress={() => handleOnReviewsPressed() }
                            >
                                <Text style={styles.reviewsTitle}>Reviews</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.arrowButton} 
                            onPress={() => handleOnReviewsPressed() }
                            >
                                <Image
                                    source={require('../../../../images/arrowButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.customerServiceRow}>
                            <TouchableOpacity
                                onPress={() => handleOnCustomerServicePressed()}    
                            >
                                <Text style={styles.customerServicesTitle}>Customer Service</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.arrowButton}>
                                <Image
                                    source={require('../../../../images/arrowButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.settingsRow}>
                            <TouchableOpacity
                                onPress={() => handleOnSettingsPress()}
                            >
                                <Text style={styles.settingsTitle}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.arrowButton}
                                onPress={() => handleOnSettingsPress()}
                            >
                                <Image
                                    source={require('../../../../images/arrowButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={styles.deadAreaBottom}
                    />
                </View>
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection: 'column'
    },
    headerContainer: {
        alignItems: 'center'
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    imageAndDetailsContainer: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .1227,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .02
    },
    profileImage: {
        height: Dimensions.get('window').width * .265,
        width: Dimensions.get('window').width * .265,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'grey'
    },
    nameRatingAgeContainer: {
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width * .0483,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .11
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
    },
    personalTrainerText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022,
        color: 'deepskyblue'
    },
    ratingAndAge: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .022
    },
    ratingText: {
        fontSize: Dimensions.get('window').height * .02
    },
    startIcon: {
        height: Dimensions.get('window').height * .022,
        width: Dimensions.get('window').height * .022
    },
    ageText: {
        fontSize: Dimensions.get('window').height * .02
    },
    categoryCertSitesAbout: {
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .033,
        width: Dimensions.get('window').width * .9
    },
    categoriesRow: {
        flexDirection: 'row'
    },
    categoriesTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02
    },
    categoriesText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '400'
    },
    certificationsTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02,
        marginTop: Dimensions.get('window').height * .0055
    },
    certificationsText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '400'
    },
    trainingSiteTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02,
        marginTop: Dimensions.get('window').height * .0055
    },
    trainingSiteText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '400'
    },
    aboutMeTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02,
        marginTop: Dimensions.get('window').height * .0055
    },
    aboutMeText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '400',
        marginTop: Dimensions.get('window').height * .0055
    },
    pricingContainer: {
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483
    },
    pricingLabels: {
        flexDirection: 'row'
    },
    singlePricing: {
        width: Dimensions.get('window').width * .25,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'deepskyblue'
    },
    singlePricingLabeld: {
        width: Dimensions.get('window').width * .25,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    singleText: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'white',
        fontWeight: 'bold'
    },
    singleTextLabeld: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    couplePricing: {
        width: Dimensions.get('window').width * .25,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        alignItems: 'center'
    },
    couplePricingLabeld: {
        width: Dimensions.get('window').width * .25,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        backgroundColor: 'deepskyblue',
        alignItems: 'center'
    },
    coupleText: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    coupleTextLabeld: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'white',
        fontWeight: 'bold'
    },
    priceTextsContainer: {
        marginTop: Dimensions.get('window').height * .020,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .058
    },
    priceTexts: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02
    },
    priceSideNote: {
        color: 'grey'
    },
    whyUsQaUpdatesContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .95,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height * .050
    },
    whyUsButton: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.065,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'gainsboro'
      },
      whyUsTitle: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 18,
      },
      questionsButton: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.065,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'gainsboro'
      },
      questionsTitle: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      },
      updatesButton: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.065,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'gainsboro'
      },
      updatesTitle: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      },
    socialButtons: {
        flexDirection: 'row',
        width: Dimensions.get('window').width ,
        marginTop: Dimensions.get('window').height * .011,
        alignSelf: 'center'
    },
    facebookButton: {
        width: Dimensions.get('window').width * .5, 
        height: Dimensions.get('window').height * .066
    },
    instagramImage: {
        width: Dimensions.get('window').width * .5, 
        height: Dimensions.get('window').height * .066,
    },
    moreContainer: {
        marginTop: Dimensions.get('window').height * .022,
    },
    moreTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    rowContainer: {
        height: Dimensions.get('window').height * .044,
        justifyContent: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
    },
    arrowImage: {
        height: Dimensions.get('window').height * .018,
        marginTop: 8
    },
    arrowButton: {
        
    },
    editProfileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editProfileTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    editProfileButton: {

    },
    reviewsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewsTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    reviewsButton: {

    },
    customerServiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    customerServicesTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    customerServicesButton: {

    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    settingsTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    settingsButton: {
    },
    deadAreaBottom: {
        backgroundColor: 'whitesmoke',
        height: Dimensions.get('window').height * .033
    },
    customerServicePanel: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * .8
    },
    noInternetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    noInternetModalContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width * .8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      noInternetIcon: {
        marginTop: Dimensions.get('window').height * .015,
        alignSelf: 'center',
      },
      noInternetTitle: {
        marginTop: Dimensions.get('window').height * .017,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
      },
      noInternetMessage: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .013,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .02,
      },
      progressView: {
        marginBottom: Dimensions.get('window').height * .01,
        alignSelf: 'center'
    },
    covidAlertView: {
        zIndex: 2,
        opacity: 0.9
    },
    covidAlertContainer: {
        backgroundColor: 'deepskyblue',
    },
    covidContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    covidModalContainer: {
        backgroundColor: "white",
        height: Dimensions.get('window').height * .45,
        width: Dimensions.get('window').width * .9,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    covidTitle: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    covidMessage: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .013,
        alignSelf: 'center',
        marginLeft: Dimensions.get('window').width * .020,
        fontSize: Dimensions.get('window').height * .02,
    },
    covidCloseIcon: {
        marginTop: Dimensions.get('window').height * .015,
        marginRight: Dimensions.get('window').width * .015,
        alignSelf: 'flex-end',
    },
    covidOverlay: {
        zIndex: 2,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.9,
        backgroundColor: 'deepskyblue',
        width: Dimensions.get('window').width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      },
      covidOverlayText: {
        color: 'white',
        fontSize: 22
      },
      closeButton:{
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10
      },
      xButton: {
        color: 'white',
        fontSize: 24
      }
      
});
export default TrainerProfilePage;
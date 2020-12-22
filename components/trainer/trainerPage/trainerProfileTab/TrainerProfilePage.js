import React, {useContext, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

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

//The trainer main profile page - profile area
const TrainerProfilePage = ({navigation}) => {
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

    const [age, setAge] = useState();
    const [isSingle, setIsSingle] = useState(true);

    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    //Calculate the trainers age according to the his birthday
    // useEffect(() => {
    //     axios
    //         .get('/trainers/omer@hotmail.com',
    //         config
    //     )
    //     .then((doc) => {
    //         if(doc){
    //             dispatchEmail({
    //                 type: 'SET_EMAIL_ADDRESS',
    //                 emailAddress: doc.data[0].email   
    //             });

    //             dispatchFirst({
    //                 type: 'SET_FIRST_NAME',
    //                 firstName: doc.data[0].name.first
    //             });

    //             dispatchLast({
    //                 type: 'SET_LAST_NAME',
    //                 lastName: doc.data[0].name.last
    //             })

    //             dispatchBirthday({
    //                 type: 'SET_BIRTHDAY',
    //                 birthday: doc.data[0].birthday
    //             })

    //             let array = doc.data[0].birthday.split('/');
    //             let today = new Date();
    //             let year = today.getFullYear();
    //             let month = today.getMonth();
    //             let todayDay = today.getDate();
    //             let age = year - (Number(array[2]));
    //             if(month < (Number(array[0]))){
    //                 age--;
    //             }
    //             if((Number(array[0])) === month && todayDay < (Number(array[1]))){
    //                 age--
    //             }
    //             setAge(age);

    //             dispatchCategories({
    //                 type: 'SET_CATEGORIES',
    //                 categories: doc.data[0].categories
    //             })

    //             dispatchMaximumDistance({
    //                 type: 'SET_MAXIMUM_DISTANCE',
    //                 maximumDistnace: doc.data[0].maximumDistance
    //             })

    //             dispatchTrainingSite1({
    //                 type: 'SET_TRAINING_SITE_1',
    //                 trainingSite1: doc.data[0].trainingSite1
    //             })

    //             dispatchTrainingSite2({
    //                 type: 'SET_TRAINING_SITE_2',
    //                 trainingSite2: doc.data[0].trainingSite2
    //             })

    //             dispatchAboutMe({
    //                 type: 'SET_ABOUT_ME',
    //                 aboutMe: doc.data[0].about_me
    //             })

    //             dispatchCertifications({
    //                 type: 'SET_CERTIFICATIONS',
    //                 certifications: doc.data[0].certifications
    //             })

    //             dispatchSingleAtTrainer({
    //                 type: 'SET_SINGLE_AT_TRAINER',
    //                 singleAtTrainer: doc.data[0].prices.single.singleAtTrainer
    //             })

    //             dispatchSingleOutdoor({
    //                 type: 'SET_SINGLE_OUTDOOR',
    //                 singleOutdoor: doc.data[0].prices.single.singleOutdoor
    //             })

    //             dispatchCoupleAtTrainer({
    //                 type: 'SET_COUPLE_AT_TRAINER',
    //                 coupleAtTrainer: doc.data[0].prices.couple.coupleAtTrainer
    //             })

    //             dispatchCoupleOutdoor({
    //                 type: 'SET_COUPLE_OUTDOOR',
    //                 coupleOutdoor: doc.data[0].prices.couple.coupleOutdoor
    //             })
    //         }
    //         else{
    //             alert("No trainer");
    //         }
    //     })
    //     .catch((err) => alert(err));
    // }, [])

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsSingle(!isSingle);
    }

    //Handle press on why us button
    const handleOnWhyUsPrees = () => {
        navigation.navigate('WhyUS');
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

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <View style={styles.imageAndDetailsContainer}>
                    <TouchableOpacity>
                        <Image
                        style={styles.profileImage} 
                        />
                    </TouchableOpacity>
                    <View style={styles.nameRatingAgeContainer}>
                        <Text style={styles.nameText}>{firstName+" "+lastName}</Text>
                        <Text style={styles.personalTrainerText}>Personal Trainer</Text> 
                        <View style={styles.ratingAndAge}>
                            <Text style={styles.ratingText}>8.7 </Text>
                            <Image
                                source={require('../../../../images/starIconBlue.png')}
                                style={styles.startIcon}
                            />
                            <Text style={styles.ageText}> - age {age}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.categoryCertSitesAbout}>
                    <Text style={styles.categoriesTitle}>
                        Categories: {<Text style={styles.categoriesText}>{categories.join(', ')}</Text>}
                    </Text>
                    <Text style={styles.certificationsTitle}>
                        Certifications: {<Text style={styles.certificationsText}>{certifications}</Text>}
                    </Text>
                    <Text style={styles.trainingSiteTitle}>
                        Training Sites: {<Text style={styles.certificationsText}>{trainingSite2 !== "" ? trainingSite1+", "+trainingSite2 : trainingSite1}</Text>}
                    </Text>
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
                    <TouchableOpacity style={styles.updatesButton}>
                        <Text style={styles.updatesTitle}>UPDATES</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialButtons}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../../images/facebookButton.png')}
                            style={styles.facebookButton}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../../images/instegramButton.png')}
                            style={styles.instegramImage}
                        />
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
                            <TouchableOpacity>
                                <Text style={styles.reviewsTitle}>Reviews</Text>
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
        flexDirection: 'column',
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
        height: Dimensions.get('window').height * .111
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
        borderRadius: 10,
        backgroundColor: 'deepskyblue',
        height: Dimensions.get('window').height * .066,
        width: Dimensions.get('window').width * .305,
        justifyContent: 'center'
    },
    whyUsTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278,
        alignSelf: 'center'
    },
    questionsButton: {
        borderRadius: 10,
        backgroundColor: 'deepskyblue',
        height: Dimensions.get('window').height * .066,
        width: Dimensions.get('window').width * .305,
        justifyContent: 'center'
    },
    questionsTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center'
    },
    updatesButton: {
        borderRadius: 10,
        backgroundColor: 'deepskyblue',
        height: Dimensions.get('window').height * .066,
        width: Dimensions.get('window').width * .305,
        justifyContent: 'center'
    },
    updatesTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center'
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
    instegramImage: {
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
    }
});
export default TrainerProfilePage;
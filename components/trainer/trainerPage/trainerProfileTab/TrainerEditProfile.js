import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";

import PickCategories from '../../../globalComponents/PickCategories';

import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {MediaContext} from '../../../../context/trainerContextes/MediaContext';
import {BirthdayContext} from '../../../../context/trainerContextes/BirthdayContext';
import {CategoryContext} from '../../../../context/trainerContextes/CategoryContext';
import {AboutMeContext} from '../../../../context/trainerContextes/AboutMeContext';
import {CertificationsContext} from '../../../../context/trainerContextes/CertificationsContext';
import {MaximumDistanceContext} from '../../../../context/trainerContextes/MaximumDistanceContext';
import {TrainingSiteContext} from '../../../../context/trainerContextes/TrainingSiteContext';
import {TrainingPriceContext} from '../../../../context/trainerContextes/TrainingPriceContext';

import AppButton from '../../../globalComponents/AppButton';


const TrainerEditProfile = ({navigation}) => {

    const {firstName, dispatchFirst} = useContext(NameContext);
    const {lastName, dispatchLast} = useContext(NameContext);
    const {profileImage, dispatchProfileImage} = useContext(MediaContext);
    const {birthday, dispatchBirthday} = useContext(BirthdayContext);
    const {categories, dispatchCategories} = useContext(CategoryContext);
    const {aboutMe, dispatchAboutMe} = useContext(AboutMeContext);
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);
    const {maximumDistnace, dispatchMaximumDistance} = useContext(MaximumDistanceContext);
    const {trainingSite1, dispatchTrainingSite1} = useContext(TrainingSiteContext);
    const {trainingSite2, dispatchTrainingSite2} = useContext(TrainingSiteContext);
    const {singlePriceAtTrainer, dispatchSingleAtTrainer} = useContext(TrainingPriceContext);
    const {singlePriceOutdoor, dispatchSingleOutdoor} = useContext(TrainingPriceContext);
    const {couplePriceAtTrainer, dispatchCoupleAtTrainer} = useContext(TrainingPriceContext);
    const {couplePriceOutdoor, dispatchCoupleOutdoor} = useContext(TrainingPriceContext);

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    //const [profileImageSource, setProfileImageSource] = useState(require('../../images/profilePic.png'));
    const [minimumDate, setMinimumDate] = useState("");
    const [maximumDate, setMaximumDate] = useState("");
    const [birthdaySelected, setBirthdaySelected] = useState("Set your birthday");
    const [selectedItems, setSelectedItems] = useState([]);
    const [maxDistanceSelected, setMaxDistanceSelected] = useState();
    const [aboutMeInput, setAboutMeInput] = useState("");
    const [certificationsInput, setCertificationsInput] = useState("");
    const [sliderValue, setSliderValue] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [singleAtTrainerInput, setSingleAtTrainerInput] = useState("");
    const [singleOutdoorInput, setSingleOutdoorInput] = useState("");
    const [coupleAtTrainerInput, setCoupleAtTrainerInput] = useState("");
    const [coupleOutdoorInput, setCoupleOutdoorInput] = useState("");

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isSingle, setIsSingle] = useState(true);

    const [isNamesError, setIsNamesError] = useState(false); 
    const [nameErrorMessage ,setNameErrorMessage] = useState("Fill all the name fields");
    const [isBirthdayErrorMessage, setIsBirthdayErrorMessage] = useState(false);
    const [isBirthdaySelected, setIsBirthdaySelected] = useState(false);
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [categoryMessageError,setCategoryMessageError] = useState("");
    const [isTrainingSiteError, setIsTrainingSiteError] = useState(false);
    const [trainingSiteErrorMessage, setTrainingSiteErrorMessage] = useState("");
    const [isPriceError, setIsPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");

    const charsLimit = 130;

    const [aboutMeCopy, setAboutMeCopy] = useState("");
    const [certificationsCopy, setCertificationsCopy] = useState("");

    let categoriesCopy = [];


    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        axios
            .get('/trainers/omer@hotmail.com',
            config
        )
        .then((doc) => {
            if(doc){
                dispatchFirst({
                    type: 'SET_FIRST_NAME',
                    firstName: doc.data[0].name.first
                });
                setFirstNameInput(doc.data[0].name.first);

                dispatchLast({
                    type: 'SET_LAST_NAME',
                    lastName: doc.data[0].name.last
                })
                setLastNameInput(doc.data[0].name.last);

                dispatchBirthday({
                    type: 'SET_BIRTHDAY',
                    birthday: doc.data[0].birthday
                })
                setBirthdaySelected(doc.data[0].birthday);

                dispatchCategories({
                    type: 'SET_CATEGORIES',
                    categories: doc.data[0].categories
                })
                setSelectedItems(doc.data[0].categories);

                dispatchMaximumDistance({
                    type: 'SET_MAXIMUM_DISTANCE',
                    maximumDistnace: doc.data[0].maximumDistance
                })
                setMaxDistanceSelected(doc.data[0].maximumDistance);
                setSliderValue(doc.data[0].maximumDistance+" MILES")

                dispatchTrainingSite1({
                    type: 'SET_TRAINING_SITE_1',
                    trainingSite1: doc.data[0].trainingSite1
                })
                setAddress1(doc.data[0].trainingSite1);

                dispatchTrainingSite2({
                    type: 'SET_TRAINING_SITE_2',
                    trainingSite2: doc.data[0].trainingSite2
                })
                setAddress2(doc.data[0].trainingSite2);

                dispatchAboutMe({
                    type: 'SET_ABOUT_ME',
                    aboutMe: doc.data[0].about_me
                })
                setAboutMeInput(doc.data[0].about_me);

                dispatchCertifications({
                    type: 'SET_CERTIFICATIONS',
                    certifications: doc.data[0].certifications
                })
                setCertificationsInput(doc.data[0].certifications);

                dispatchSingleAtTrainer({
                    type: 'SET_SINGLE_AT_TRAINER',
                    singleAtTrainer: doc.data[0].prices.single.singleAtTrainer
                })
                setSingleAtTrainerInput(doc.data[0].prices.single.singleAtTrainer);

                dispatchSingleOutdoor({
                    type: 'SET_SINGLE_OUTDOOR',
                    singleOutdoor: doc.data[0].prices.single.singleOutdoor
                })
                setSingleOutdoorInput(doc.data[0].prices.single.singleOutdoor);

                dispatchCoupleAtTrainer({
                    type: 'SET_COUPLE_AT_TRAINER',
                    coupleAtTrainer: doc.data[0].prices.couple.coupleAtTrainer
                })
                setCoupleAtTrainerInput(doc.data[0].prices.couple.coupleAtTrainer);

                dispatchCoupleOutdoor({
                    type: 'SET_COUPLE_OUTDOOR',
                    coupleOutdoor: doc.data[0].prices.couple.coupleOutdoor
                })
                setCoupleOutdoorInput(doc.data[0].prices.couple.coupleOutdoor);
            }
            else{
                alert("No trainer");
            }
        })
        .then(() => {
            let date = new Date();
            let date2 = new Date();
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth();
            let currentDay = new Date().getDate();
            date.setFullYear(currentYear - 70, currentMonth, currentDay)
            date2.setFullYear(currentYear - 18, currentMonth, currentDay)
            setMinimumDate(date);
            setMaximumDate(date2);
        })
        .catch((err) => alert(err))
    },[])

    const handleYesDialog = () => {
        setDialogVisible(false);
        if(aboutMe !== aboutMeInput){
            dispatchAboutMe({
                type: 'SET_ABOUT_ME',
                aboutMe: aboutMeInput
            })
        }
        if(certifications !== certificationsInput){
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: certificationsCopy
            })
        }
        navigation.navigate('TrainerProfilePage');
    };

    const handleNoDialog = () => {
        setDialogVisible(false);
    };

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        setDialogVisible(true);
    }
    
    const handleOnChangeFirstName = (value) => {
        setIsNamesError(false);
        setIsPriceError(false);
        setFirstNameInput(value);
    }

    const handleOnChangeLastName = (value) => {
        setIsNamesError(false);
        setIsPriceError(false);
        setLastNameInput(value);
    }

    //Sets the birthday of the user when selected
    const handleConfirm = (date) => {
        setBirthdaySelected((date.getMonth()+1)+"/"+date.getUTCDate()+"/"+date.getUTCFullYear());
        setDatePickerVisible(false);
    };

    //Hides the Date picker when user close/confirm
    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    //Shows the date picker when user press the button
    const handleDateInputPressed = () => {
        // setIsNamesError(false);
        // setIsBirthdayErrorMessage(false);
        // setIsCategoryError(false);
        // setIsTrainingSiteError(false);
        // setIsPriceError(false);
        setDatePickerVisible(!datePickerVisible);
    }
    const handleOnCategoryPressed = () => {
        navigation.navigate('TrainerPickCategoriesEditProfile');
    }

    //Sets the slider value to the value
    const handleSliderValueChange = (value) => {
        // setIsNamesError(false);
        // setIsBirthdayErrorMessage(false);
        // setIsCategoryError(false);
        // setIsTrainingSiteError(false);
        // setIsPriceError(false);
        setSliderValue(value+" MILE");
        setMaxDistanceSelected(value);
    }

    const handleOnAboutMePress = () => {
        navigation.navigate('TrainerAboutMeEditProfile');
    }

    const handleCertificationsPress = () => {
        navigation.navigate('TrainerCertificationsEditProfile');
    }

    //Sets the first address to the value
    const handleOnChangeAddress1 = (text) => {
        setIsNamesError(false);
        setIsPriceError(false);
        setAddress1(text);
    }
    
    //Sets the second address to the value
    const handleOnChangeAddress2 = (text) => {
        setIsNamesError(false);
        setIsPriceError(false);
        setAddress2(text);
    }

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsSingle(!isSingle);
    }

    const handleAtTrainerPriceChange = (value) => {
        setIsNamesError(false);
        setIsPriceError(false);
        if(isSingle){
          setSingleAtTrainerInput(value);
        }
        else{
          setCoupleAtTrainerInput(value);
        }
    }

    //sets the training at outdoor price to the value - by the type of: single/couple
    const handleOutdoorPriceChange = (value) => {
        setIsNamesError(false);
        setIsPriceError(false);
        if(isSingle){
            setSingleOutdoorInput(value);
        }
        else{
            setCoupleOutdoorInput(value);
        }
    }

    const handleOnApprovePressed = () => {
        if(firstNameInput === "" || lastNameInput === "" || selectedItems.length === 0 || (trainingSite1 === "" && trainingSite2 === "") || (singleAtTrainerInput === "" && singleOutdoorInput === "" && coupleAtTrainerInput === "" && coupleOutdoorInput === "")){
            if(firstNameInput === "" || lastNameInput === ""){
                setIsNamesError(true);
                alert("1")
            }
            else if(selectedItems.length === 0){
                setCategoryMessageError("Pick at least one category");
                setIsCategoryError(true);
                alert("2")
            }
            else if(address1 === "" && address2 === ""){
                setTrainingSiteErrorMessage("Enter at least one training site");
                setIsTrainingSiteError(true);
                alert("3")
            }
            else if(singleAtTrainerInput === "" && singleOutdoorInput === "" && coupleAtTrainerInput === "" && coupleOutdoorInput === ""){
                setPriceErrorMessage("Enter at least one training price");
                setIsPriceError(true);
                alert("4")
            }
        }
        else{
            if(firstNameInput !== firstName){
                dispatchFirst({
                    type: 'SET_FIRST_NAME',
                    firstName: firstNameInput
                });
            }
            if(lastNameInput !== lastName){
                dispatchLast({
                    type: 'SET_LAST_NAME',
                    lastName: lastNameInput
                })
            }
            if(birthdaySelected !== birthday){
                dispatchBirthday({
                    type: 'SET_BIRTHDAY',
                    birthday: birthdaySelected
                })
            }
            if(maxDistanceSelected !== maximumDistnace){
                dispatchMaximumDistance({
                    type: 'SET_MAXIMUM_DISTANCE',
                    maximumDistnace: maxDistanceSelected
                })
            }
            if(address1 !== trainingSite1){
                if(address1 !== ""){
                    dispatchTrainingSite1({
                        type: 'SET_TRAINING_SITE_1',
                        trainingSite1: address1
                    })
                }
                else{
                    dispatchTrainingSite1({
                        type: 'SET_TRAINING_SITE_1',
                        trainingSite1: 'Outdoor'
                    })
                }
            }
            if(address2 !== trainingSite2){
                if(address2 !== ""){
                    dispatchTrainingSite2({
                        type: 'SET_TRAINING_SITE_2',
                        trainingSite2: address2
                    })
                }
                else{
                    dispatchTrainingSite2({
                        type: 'SET_TRAINING_SITE_2',
                        trainingSite1: 'Outdoor'
                    })
                }
            }
            if(singleAtTrainerInput !== singlePriceAtTrainer){
                dispatchSingleAtTrainer({
                    type: 'SET_SINGLE_AT_TRAINER',
                    singleAtTrainer: singleAtTrainerInput
                })
            }
            if(singleOutdoorInput !== singlePriceOutdoor){
                dispatchSingleOutdoor({
                    type: 'SET_SINGLE_OUTDOOR',
                    singleOutdoor: singleOutdoorInput
                })
            }
            if(coupleAtTrainerInput !== couplePriceAtTrainer){
                dispatchCoupleAtTrainer({
                    type: 'SET_COUPLE_AT_TRAINER',
                    coupleAtTrainer: coupleAtTrainerInput
                })
            }
            if(coupleOutdoorInput !== couplePriceAtTrainer){
                dispatchCoupleOutdoor({
                    type: 'SET_COUPLE_OUTDOOR',
                    coupleOutdoor: coupleOutdoorInput
                })
            }

            axios
                .put('/trainers/settings/edit-profile/omer@hotmail.com' , {
                    name: {
                        first: firstNameInput,
                        last: lastNameInput
                    },
                    birthday: birthdaySelected,
                    categories: categories,
                    maximumDistance: maxDistanceSelected,
                    trainingSite1: address1,
                    trainingSite2: address2,
                    aboutMe: aboutMe,
                    certifications: certifications,
                    prices: {
                        single: {
                            singleAtTrainer: singlePriceAtTrainer,
                            singleOutdoor: singlePriceOutdoor
                        },
                        couple: {
                            coupleAtTrainer: couplePriceAtTrainer,
                            coupleOutdoor: couplePriceOutdoor
                        }
                    }
                },
                config
                )
                .then((doc) => {
                    if(doc){
                        navigation.navigate('TrainerProfilePage');
                    }
                    else{
                        alert("error");
                    }
                })
                .catch((err) => alert(err.data));
        }
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View>
                    <Dialog.Container visible={dialogVisible}>
                        <Dialog.Title style={styles.dialogTitle}>Attention</Dialog.Title>
                        <Dialog.Description style={styles.dialogContent}>Changes will not be saved - are you sure?</Dialog.Description>
                        <Dialog.Button label="No" onPress={(() => handleNoDialog())} />
                        <Dialog.Button label="Yes" onPress={() => handleYesDialog()} />

                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={dialogVisible}>
                        <Dialog.Title style={styles.dialogTitle}>Attention</Dialog.Title>
                        <Dialog.Description style={styles.dialogContent}>Changes will not be saved - are you sure?</Dialog.Description>
                        <Dialog.Button label="No" onPress={(() => handleNoDialog())} />
                        <Dialog.Button label="Yes" onPress={() => handleYesDialog()} />

                    </Dialog.Container>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <TouchableOpacity
                        onPress={() => handleOnArrowPress()}
                    >
                    <Image
                        source={require('../../../../images/blackArrow.png')}
                        style={styles.arrowImage}
                    />
                </TouchableOpacity>
                <Text style={styles.editProfileTitle}>Edit Profile</Text>
                <View style={styles.namesContainer}>
                    <View style={styles.namesAndErrorContainer}>
                        <View style={styles.namesRowContainer}>
                            <TextInput
                                style={styles.namesInput}
                                textAlign='center'
                                placeholder={firstNameInput}
                                onChangeText={(value) => handleOnChangeFirstName(value)}
                            />
                            <TextInput
                                style={styles.namesInput}
                                textAlign='center'
                                placeholder={lastNameInput}
                                onChangeText={value => handleOnChangeLastName(value)}
                            />
                            <TouchableOpacity 
                                //onPress={handleProfileImage}
                            >
                                <Image
                                    source={profileImage}
                                    style={styles.profileImage}
                                />
                            </TouchableOpacity>
                        </View>
                        {isNamesError ? 
                            <Text style={styles.nameErrorMessage}>{nameErrorMessage}</Text>
                        : null}
                    </View>
                    <Text style={styles.nameExplination}>Your name help the clients to identify you</Text>
                </View>
                <Text style={styles.birthdayText}>Birthday</Text>
                <View style={styles.birthdayContainer}>
                    <View style={styles.birthdayBoxContainer}>
                    <View style={styles.birthdayBox}>
                        <TouchableOpacity
                        onPress={() => handleDateInputPressed()}
                        >
                        <Text style={styles.birthdayPicked}>{birthdaySelected}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDateInputPressed()}
                        >
                            <Image
                                source={require('../../../../images/calendarIcon.png')}
                                style={styles.calendarIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    </View>
                    <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleConfirm(date)}
                        onCancel={hideDatePicker}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        headerTextIOS="Pick a date - minimum 18"
                    />
                </View>
                <Text style={styles.categoryTitle}>CATEGORY</Text>
                <View style={styles.categoryContainer}>
                    <View style={styles.categoryBoxContainer}>
                    <View style={styles.categoryBox}>
                        <TouchableOpacity
                        onPress={() => handleOnCategoryPressed()}
                        >
                            <Text style={categories.length > 0 ? styles.categoryPicked : styles.categoryUnPicked}>{categories.length > 0 ? categories.length+" Selected" : "Pick categories"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleOnCategoryPressed()}
                        >
                        <Image
                            source={require('../../../../images/categoryIcon.png')}
                            style={styles.categoryIcon}
                        />
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <View style={styles.sliderContainer}>
                    <Text style={styles.maxDistanceText}>MAXIMUM DISTANCE</Text>
                    <Text style={styles.sliderValueTitle}>{sliderValue}</Text>
                    <Slider
                        value={maxDistanceSelected}
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor="deepskyblue"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => handleSliderValueChange(value)}
                        step={1}
                        thumbTintColor='deepskyblue'
                    />
                </View>
                <View style={styles.trainingSiteContainer}>
                    <Text style={styles.trainingSiteText}>TRAINING SITE</Text>
                        <TextInput
                            style={styles.trainingSiteInput}
                            title='address'
                            placeholder={address1}
                            onChangeText={(text) => handleOnChangeAddress1(text)}
                        /> 
                        <TextInput
                            style={styles.trainingSiteInput}
                            title='address'
                            placeholder={address2}
                            onChangeText={(text) => handleOnChangeAddress2(text)}
                        /> 
                </View>
                <View style={styles.inputsContainer}>
                    <View style={styles.aboutMeContainer}>
                        <View style={styles.aboutMeButtonWritten}>
                            <TouchableOpacity
                                onPress={() => handleOnAboutMePress()}
                            >
                                <Text style={styles.aboutMeText}>{aboutMe.length > charsLimit ? aboutMe.slice(0,charsLimit)+"..." : aboutMe}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pencilButtonAboutMe}>
                            <TouchableOpacity
                                onPress={() => handleOnAboutMePress()}
                            >
                                <Image
                                    source={require('../../../../images/pencil.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.certificationsContainer}>
                        <View style={styles.certificationsButtonWritten}>
                            <TouchableOpacity
                                onPress={() => handleCertificationsPress()}
                            >
                                <Text style={styles.certificationsText}>{certifications.length > charsLimit ? certifications.slice(0,{charsLimit})+"..." : certifications}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pencilButtonCertifications}>
                            <TouchableOpacity
                                onPress={() => handleCertificationsPress()}
                            >
                                <Image
                                    source={require('../../../../images/pencil.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.priceSectionContainer}>
                    <Text style={styles.pricingTitle}>Please price your training type:</Text>
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
                    <View style={styles.pricingContainer}>
                        <View style={styles.atTrainerSite}>
                            <Text style={styles.atTrainerSiteText}>AT TRAINER SITE</Text>
                            <TextInput
                                style={styles.atTrainingSiteInput}
                                placeholder={isSingle ? singleAtTrainerInput : coupleAtTrainerInput}
                                onChangeText={(value) => handleAtTrainerPriceChange(value)}
                            />
                        </View>
                        <View style={styles.outDoor}>
                            <Text style={styles.outDoorText}>OUTDOOR</Text>
                            <TextInput
                                style={styles.outDoorInput}
                                placeholder={isSingle ? singleOutdoorInput: coupleOutdoorInput}
                                onChangeText={(value) => handleOutdoorPriceChange(value)}
                            />
                        </View>
                        {isPriceError ? 
                            <Text style={styles.priceErrorMessage}>{priceErrorMessage}</Text>
                        : null}
                    </View>
                </View>
                <View style={styles.nextButtonContainer}>
                <AppButton 
                     title="Approve"
                     onPress={handleOnApprovePressed}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
    headerContainer: {
        alignItems: 'center'
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .033,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .0483
    },
    editProfileTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .022
    },
    namesAndErrorContainer: {
        height: Dimensions.get('window').height * .11,
    }, 
    namesRowContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .95,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },  
    namesInput: {
        marginTop: Dimensions.get('window').height * .022,
        borderColor: 'deepskyblue',
        borderRadius: 17,
        borderWidth: 3,
        height: Dimensions.get('window').height * .065,
        width: Dimensions.get('window').width * .34,
        justifyContent: 'center',
        fontSize: Dimensions.get('window').height * .02
    },
    profileImage: {
        width: Dimensions.get('window').width * .225,
        height: Dimensions.get('window').height * .1,
        borderRadius: 20
    },
    nameErrorMessage: {
        color: 'red',
        marginLeft: Dimensions.get('window').width * .0483
    },  
    nameExplination: {
        color: 'grey',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .011
    },
    birthdayText: {
        marginTop: Dimensions.get('window').height * .033,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278,
        marginLeft: Dimensions.get('window').width * .0483
    },
    birthdayContainer: {
        height: Dimensions.get('window').height * .066,
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .011
    },
    birthdayBoxContainer: {
        height: Dimensions.get('window').height * .065,
        width: Dimensions.get('window').width * .93,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 17,
        justifyContent: 'center'
    },
    birthdayBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Dimensions.get('window').height * .065,
        width: Dimensions.get('window').width * .9,
    },
    birthdayUnPicked: {
        textAlign: 'center',
        color: 'grey',
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: '300',
        marginLeft: Dimensions.get('window').width * .3
    },
    birthdayPicked: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .3,
        color: 'lightgrey'
    },
    calendarIcon: {
        height: Dimensions.get('window').height * .04,
        width: Dimensions.get('window').height * .04,
    },
    birthdayErrorMessage: {
        marginLeft: Dimensions.get('window').width * .0483,
        color: 'red',
        marginTop: Dimensions.get('window').height * .0055
    },  
    datePicker: {
        marginTop: Dimensions.get('window').height * .011,
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .0483
    },
    categoryTitle: {
        marginTop: Dimensions.get('window').height * .033,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278,
        marginLeft: Dimensions.get('window').width * .0483
    },
    categoryContainer: {
        height: Dimensions.get('window').height * .066,
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .011
    },
    categoryBoxContainer: {
        height: Dimensions.get('window').height * .065,
        width: Dimensions.get('window').width * .93,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 17,
        justifyContent: 'center'
    },
    categoryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Dimensions.get('window').height * .065,
        width: Dimensions.get('window').width * .9,
    },
    categoryUnPicked: {
        textAlign: 'center',
        color: 'grey',
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: '300',
        marginLeft: Dimensions.get('window').width * .3
    },
    categoryPicked: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .3,
        color: 'lightgrey'
    },
    categoryIcon: {
        height: Dimensions.get('window').height * .04,
        width: Dimensions.get('window').height * .04,
    },
    categoryErrorMessage: {
        color: 'red',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .0055
    },
    sliderContainer: {
        marginTop: Dimensions.get('window').height * .022
    },  
    maxDistanceText: {
        fontSize: Dimensions.get('window').height * .022,
        marginTop: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
        fontWeight: 'bold'
    },  
    sliderValueTitle: {
        fontSize: Dimensions.get('window').height * .02,
        marginTop: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .049
    },
    slider: {
        width: Dimensions.get('window').width * .9,
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .022
    },
    trainingSiteContainer: {
        width: Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height * .220,
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .038
    },
    trainingSiteText: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0241,
        fontWeight: 'bold'
    },
    trainingSiteInput: {
        marginTop: Dimensions.get('window').height * .022,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 17,
        height: Dimensions.get('window').height * .065,
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center'
    },
    inputsContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .3,
        marginTop: Dimensions.get('window').height * .044
    },
    aboutMeContainer: {
        borderColor: 'deepskyblue',
        borderRadius: 17,
        borderWidth: 3,
        height: Dimensions.get('window').height * .135,
        width: Dimensions.get('window').width * .9,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    aboutMeButton: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .055
    },
    aboutMeButtonWritten: {
        alignSelf: 'flex-start',
    },
    aboutMeTitle: {
        fontSize: Dimensions.get('window').height * .02,
    },
    aboutMeText: {
        marginTop: Dimensions.get('window').height * .011,
        marginLeft: Dimensions.get('window').width * .0241,
        fontSize: Dimensions.get('window').height * .02,
        color: 'black'
    },
    pencilButtonAboutMe: {
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: Dimensions.get('window').width * .012,
        marginBottom: Dimensions.get('window').height * .0055
    },
    pencilButtonCertifications: {
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: Dimensions.get('window').width * .012,
        marginBottom: Dimensions.get('window').height * .0055
    },
    certificationsContainer: {
        borderColor: 'deepskyblue',
        borderRadius: 17,
        borderWidth: 3,
        height: Dimensions.get('window').height * .135,
        width: Dimensions.get('window').width * .9,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },  
    certificationsButton: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .055
    },
    certificationsButtonWritten: {
        alignSelf: 'flex-start',
    },
    certificationsTitle: {
        fontSize: Dimensions.get('window').height * .02
    },
    certificationsText: {
        marginTop: Dimensions.get('window').height * .011,
        marginLeft: Dimensions.get('window').width * .0241,
        fontSize: Dimensions.get('window').height * .02,
        color: 'black'
    },
    priceSectionContainer: {
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483,
        height: Dimensions.get('window').height * .195
    },
    pricingTitle: {
        fontSize: Dimensions.get('window').height * .022 
    },
    pricingLabels: {
        marginTop: Dimensions.get('window').height * .018,
        marginBottom: Dimensions.get('window').height * .018,
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
    pricingContainer: {
        flexDirection: 'column'
    },
    atTrainerSite: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .055,
        alignItems: 'center'
        
    },
    atTrainingSiteInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .17,
        height: Dimensions.get('window').height * .04,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022
    },
    atTrainerSiteText: {
        fontSize: Dimensions.get('window').height * .022
    },
    outDoor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .9,
        alignItems: 'center'
    },
    outDoorInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .17,
        height: Dimensions.get('window').height * .04,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022
    },
    outDoorText: {
        fontSize: Dimensions.get('window').height * .022
    },
    priceErrorMessage: {
        color: 'red',
        marginTop: Dimensions.get('window').height * .0055
    },
    nextButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: Dimensions.get('window').height * .022,
        marginTop: Dimensions.get('window').height * .066,
        alignItems: 'center'
    },
    nextButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    nextButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    },
    dialogTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    dialogContent: {
        fontSize: Dimensions.get('window').height * .02
    }
});

export default TrainerEditProfile;
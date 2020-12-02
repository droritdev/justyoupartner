import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, Button} from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons';
import Slider from '@react-native-community/slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import PickCategories from '../../globalComponents/PickCategories';
import {EmailContext} from '../../../context/trainerContextes/EmailContext';
import {NameContext} from '../../../context/trainerContextes/NameContext';
import {MediaContext} from '../../../context/trainerContextes/MediaContext';
import {BirthdayContext} from '../../../context/trainerContextes/BirthdayContext';
import {CategoryContext} from '../../../context/trainerContextes/CategoryContext';
import {AboutMeContext} from '../../../context/trainerContextes/AboutMeContext';
import {CertificationsContext} from '../../../context/trainerContextes/CertificationsContext';
import {MaximumDistanceContext} from '../../../context/trainerContextes/MaximumDistanceContext';
import {TrainingSiteContext} from '../../../context/trainerContextes/TrainingSiteContext';
import {TrainingPriceContext} from '../../../context/trainerContextes/TrainingPriceContext';

//Here the trainer enters his: full name, images/videos, birthday, training categories, maximum distance to be fined, writes about him, certifications, at least one training site, and training prices
const ProfileDetailsPage2Trainer = ({navigation}) => {
    const {emailAddress} = useContext(EmailContext);
    const {dispatchFirst} = useContext(NameContext);
    const {dispatchLast} = useContext(NameContext);
    const {profileImage} = useContext(MediaContext);
    const {dispatchBirthday} = useContext(BirthdayContext);
    const {categories, dispatchCategories} = useContext(CategoryContext);
    const {aboutMe} = useContext(AboutMeContext);
    const {certifications} = useContext(CertificationsContext);
    const {dispatchMaximumDistance} = useContext(MaximumDistanceContext);
    const {dispatchTrainingSite1} = useContext(TrainingSiteContext);
    const {dispatchTrainingSite2} = useContext(TrainingSiteContext);
    const {dispatchSingleAtTrainer} = useContext(TrainingPriceContext);
    const {dispatchSingleOutdoor} = useContext(TrainingPriceContext);
    const {dispatchCoupleAtTrainer} = useContext(TrainingPriceContext);
    const {dispatchCoupleOutdoor} = useContext(TrainingPriceContext);

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    //const [profileImageSource, setProfileImageSource] = useState(require('../../images/profilePic.png'));
    const [minimumDate, setMinimumDate] = useState("");
    const [maximumDate, setMaximumDate] = useState("");
    const [birthdaySelected, setBirthdaySelected] = useState("Set your birthday");
    const [selectedItems, setSelectedItems] = useState([]);
    const [maxDistanceSelected, setMaxDistanceSelected] = useState("1");
    const [aboutMeInput, setAboutMeInput] = useState("");
    const [certificationsInput, setCertificationsInput] = useState("");
    const [sliderValue, setSliderValue] = useState("1 MILES");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [isSingle, setIsSingle] = useState(true);
    const [singleAtTrainerInput, setSingleAtTrainerInput] = useState("");
    const [singleOutdoorInput, setSingleOutdoorInput] = useState("");
    const [coupleAtTrainerInput, setCoupleAtTrainerInput] = useState("");
    const [coupleOutdoorInput, setCoupleOutdoorInput] = useState("");

    const [isNamesError, setIsNamesError] = useState(false); 
    const [nameErrorMessage ,setNameErrorMessage] = useState("");
    const [isBirthdayErrorMessage, setIsBirthdayErrorMessage] = useState(false);
    const [isBirthdaySelected, setIsBirthdaySelected] = useState(false);
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [categoryMessageError,setCategoryMessageError] = useState("");
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isTrainingSiteError, setIsTrainingSiteError] = useState(false);
    const [trainingSiteErrorMessage, setTrainingSiteErrorMessage] = useState("");
    const [isPriceError, setIsPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");

    const charsLimit = 130;

    //Sets the minimum age to 18 every time
    useEffect (() => {
      let date = new Date();
      let date2 = new Date();
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      date.setFullYear(currentYear - 70, currentMonth, currentDay)
      date2.setFullYear(currentYear - 18, currentMonth, currentDay)
      setMinimumDate(date);
      setMaximumDate(date2);
    }, []);
    
    //Navigates back to the ProfileDetailsPage1Trainer
    const handleArrowButton = () => {
      navigation.navigate('ProfileDetailsPage1Trainer');
    }

    //Sets the firstName input to the value
    const handleOnChangeFirstName = (text) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setFirstNameInput(text);
    }

    //Sets the lastName input to the value
    const handleOnChangeLasttName = (text) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setLastNameInput(text);
    }

    //Sets the birthday of the user when selected
    const handleConfirm = (date) => {
      setBirthdaySelected((date.getMonth()+1)+"/"+date.getUTCDate()+"/"+date.getUTCFullYear());
      setDatePickerVisible(false);
      setIsBirthdaySelected(true);
    };

    //Hides the Date picker when user close/confirm
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    //Shows the date picker when user press the button
    const handleDateInputPressed = () => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setDatePickerVisible(!datePickerVisible);
    }

    const handleOnCategoryPressed = () => {
      navigation.navigate('PickCategoryTrainer');
    }

    //Sets the slider value to the value
    const handleSliderValueChange = (value) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setSliderValue(value+" MILE");
      setMaxDistanceSelected(value);
    }

    //Sets the first address to the value
    const handleOnChangeAddress1 = (text) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setAddress1(text);
    }

    //Sets the second address to the value
    const handleOnChangeAddress2 = (text) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setAddress2(text);
    }

    //sets the training at the trainer price to the value - by the type of: single/couple
    const handleAtTrainerPriceChange = (value) => {
      setIsNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
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
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      if(isSingle){
        setSingleOutdoorInput(value);
      }
      else{
        setCoupleOutdoorInput(value);
      }
    }

    //Navigates to the AddPhotosTrainer page where the trainer can add images/videos
    const handleProfileImage = () => {
      navigation.navigate("AddPhotosTrainer");
    }

    //Navigates to the AboutMeTrainer page for the user to write about himself
    const handleOnAboutMePress = () => {
      navigation.navigate('AboutMeTrainer');
    }

    //Navigates to the CertificationsTrainer page for the user to write his certifications
    const handleCertificationsPress = () => {
      navigation.navigate('CertificationsTrainer');
    }

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
      setIsSingle(!isSingle);
    }

    //Handle the next button press, if ok - saves all values states and navigates to the PaymentsAndPolicyTrainer page
    const handleNext = () => {
      if(firstNameInput === "" || lastNameInput === ""){
        setIsNamesError(true);
        setNameErrorMessage('Fill all the name fields');
      }
      else if(birthdaySelected === "Set your birthday"){
        setBirthdayErrorMessage("Select birthday");
        setIsBirthdayErrorMessage(true);
      }
      else if(categories.length === 0){
        setCategoryMessageError("Pick at least one category");
        setIsCategoryError(true);
      }
      else if(address1 === "" && address2 === ""){
        setTrainingSiteErrorMessage("Enter at least one training site");
        setIsTrainingSiteError(true);
      }
      else if(singleAtTrainerInput === "" && singleOutdoorInput === "" && coupleAtTrainerInput === "" && coupleOutdoorInput === ""){
        setPriceErrorMessage("Enter at least one training price");
        setIsPriceError(true);
      } 
      else{
        dispatchFirst({
          type: 'SET_FIRST_NAME',
          firstName: firstNameInput
        });

        dispatchLast({
          type: 'SET_LAST_NAME',
          lastName: lastNameInput
        });

        dispatchBirthday({
          type: 'SET_BIRTHDAY',
          birthday: birthdaySelected
        });

        dispatchMaximumDistance({
          type: 'SET_MAXIMUM_DISTANCE',
          maximumDistnace: maxDistanceSelected
        });

        if(address1 !== ""){
          dispatchTrainingSite1({
            type: 'SET_TRAINING_SITE_1',
            trainingSite1: address1
          });
        }
        if(address1 !== ""){
          dispatchTrainingSite2({
            type: 'SET_TRAINING_SITE_2',
            trainingSite2: address2
          });
        }
        
        if(singleAtTrainerInput !== ""){
          dispatchSingleAtTrainer({
            type: 'SET_SINGLE_AT_TRAINER',
            singleAtTrainer: singleAtTrainerInput
          });
        }
        if(singleOutdoorInput !== ""){
          dispatchSingleOutdoor({
            type: 'SET_SINGLE_OUTDOOR',
            singleOutdoor: singleOutdoorInput
          });
        }
        if(coupleAtTrainerInput !== ""){
          dispatchCoupleAtTrainer({
            type: 'SET_COUPLE_AT_TRAINER',
            coupleAtTrainer: coupleAtTrainerInput
          });
        }
        if(coupleOutdoorInput !== ""){
          dispatchCoupleOutdoor({
            type: 'SET_COUPLE_OUTDOOR',
            coupleOutdoor: coupleOutdoorInput
          });
        }

        navigation.navigate('PaymentsAndPolicyTrainer');
      }
    }

    return(
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={handleArrowButton}
          >
            <Image
              source={require('../../../images/arrowBack.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileDetailesText}>Profile Details</Text>
            <View style={styles.upperContainer}>
              <View style={styles.nameAndImageContanier}>
                <TextInput
                  style={styles.textInput}
                  textAlign='center'
                  placeholder='First name'
                  placeholderTextColor='darkgrey'
                  onChangeText={value => handleOnChangeFirstName(value)}
                />
                <TextInput
                  style={styles.textInput}
                  textAlign='center'
                  placeholder='Last name'
                  placeholderTextColor='darkgrey'
                  onChangeText={value => handleOnChangeLasttName(value)}
                />
                <TouchableOpacity 
                  onPress={handleProfileImage}>
                  <Image
                    source={profileImage}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>
              {isNamesError ?
                <Text style={styles.nameErrorMessage}>{nameErrorMessage}</Text>
              : null}
              <Text style={styles.nameExplenation}>Your name help the client to identify you</Text>
            </View>
          <Text style={styles.birthdayText}>Birthday</Text>
          <View style={styles.birthdayContainer}>
            <View style={styles.birthdayBoxContainer}>
              <View style={styles.birthdayBox}>
                <TouchableOpacity
                  onPress={() => handleDateInputPressed()}
                >
                  <Text style={isBirthdaySelected ? styles.birthdayPicked : styles.birthdayUnPicked}>{birthdaySelected}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDateInputPressed()}
                >
                  <Image
                    source={require('../../../images/calendarIcon.png')}
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
            {isBirthdayErrorMessage ? 
              <Text style={styles.birthdayErrorMessage}>{birthdayErrorMessage}</Text>
            : null}
          </View>
          <Text style={styles.emailAddressText}>EMAIL ADDRESS</Text>
          <TextInput 
            editable={false}
            placeholder={emailAddress}
            placeholderTextColor='black'
            style={styles.emailAddressButton}
          />
          <Text style={styles.emailExplinationText}>We use your email to send you receips. your mobile number is required to enhance account security.</Text>
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
                    source={require('../../../images/categoryIcon.png')}
                    style={styles.categoryIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {isCategoryError ? 
                  <Text style={styles.categoryErrorMessage}>{categoryMessageError}</Text>
            : null}
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.aboutMeContainer}>
              <View style={aboutMe === "ABOUT ME" ? styles.aboutMeButton : styles.aboutMeButtonWritten}>
                <TouchableOpacity
                  onPress={() => handleOnAboutMePress()}
                >
                  <Text style={aboutMe === "ABOUT ME" ? styles.aboutMeTitle :styles.aboutMeText}>{aboutMe.length > charsLimit ? aboutMe.slice(0,charsLimit)+"..." : aboutMe}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pencilButtonAboutMe}>
                <TouchableOpacity
                  onPress={() => handleOnAboutMePress()}
                >
                  <Image
                    source={require('../../../images/pencil.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.certificationsContainer}>
              <View style={certifications === "CERTIFICATIONS" ? styles.certificationsButton : styles.certificationsButtonWritten}>
                <TouchableOpacity
                  onPress={() => handleCertificationsPress()}
                >
                  <Text style={certifications === "CERTIFICATIONS" ? styles.certificationsTitle : styles.certificationsText}>{certifications.length > charsLimit ? certifications.slice(0,{charsLimit})+"..." : certifications}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pencilButtonCertifications}>
                <TouchableOpacity
                  onPress={() => handleCertificationsPress()}
                >
                  <Image
                    source={require('../../../images/pencil.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.maxDistanceText}>MAXIMUM DISTANCE</Text>
            <Text style={styles.sliderValueTitle}>{sliderValue}</Text>
            <Slider
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
              placeholder='Number/Street/City/State/Zip Code'
              onChangeText={(text) => handleOnChangeAddress1(text)}
            /> 
            <TextInput
              style={styles.trainingSiteInput}
              title='address'
              placeholder='Number/Street/City/State/Zip Code'
              onChangeText={(text) => handleOnChangeAddress2(text)}
            /> 
            {isTrainingSiteError ? 
              <Text style={styles.trainingSiteErrorText}>{trainingSiteErrorMessage}</Text>
            : null}                                                          
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
                  value={isSingle ? singleAtTrainerInput : coupleAtTrainerInput}
                  placeholder='$$$'
                  placeholderTextColor='black'
                  onChangeText={(value) => handleAtTrainerPriceChange(value)}
                />
              </View>
              <View style={styles.outDoor}>
                <Text style={styles.outDoorText}>OUTDOOR</Text>
                <TextInput
                  style={styles.outDoorInput}
                  placeholder='$$$'
                  placeholderTextColor='black'
                  onChangeText={(value) => handleOutdoorPriceChange(value)}
                  value={isSingle ? singleOutdoorInput: coupleOutdoorInput}
                />
              </View>
              {isPriceError ? 
                <Text style={styles.priceErrorMessage}>{priceErrorMessage}</Text>
              : null}
            </View>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
       </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: 'white'
    },
    container: {
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    arrowImage: {
      marginLeft: Dimensions.get('window').width * .0483
    },
    profileDetailesText: {
      marginLeft: Dimensions.get('window').width * .0483,
      marginTop: Dimensions.get('window').height * .0278,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .04
    },
    upperContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .14,
      marginTop: Dimensions.get('window').height * .022
    },
    nameAndImageContanier: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('screen').width * .95,
      marginLeft: Dimensions.get('window').width * .045
    },
    textInput: {
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
      marginLeft: Dimensions.get('window').width * .0483,
      color: 'red'
    },
    nameExplenation: {
      color: 'darkgrey',
      width: Dimensions.get('window').width,
      textAlign: 'center',
      fontSize: Dimensions.get('window').height * .018
    },
    birthdayText: {
      marginTop: Dimensions.get('window').height * .033,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0483
    },
    birthdayContainer: {
      height: Dimensions.get('window').height * .072,
      alignItems: 'center',
      marginTop: Dimensions.get('window').height * .01
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
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: Dimensions.get('window').width * .3
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
      marginTop: 10,
      width: Dimensions.get('window').width * .9,
      marginLeft: Dimensions.get('window').width * .0483
    },
    emailAddressText: {
      marginTop: Dimensions.get('window').height * .044,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0483
    },
    emailAddressButton: {
      marginTop: Dimensions.get('window').height * .011,
      borderColor: 'deepskyblue',
      backgroundColor: 'lightgrey',
      borderRadius: 17,
      borderWidth: 3,
      height: Dimensions.get('window').height * .065,
      width: Dimensions.get('window').width * .93,
      justifyContent: 'center',
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center'
    },
    emailExplinationText: {
      marginTop: Dimensions.get('window').height * .011,
      textAlign: 'center'
    },
    BirthdaySlidePanel: {
      backgroundColor: 'deepskyblue',
      height: Dimensions.get('window').height * .4
    },
    categoryTitle: {
      marginTop: Dimensions.get('window').height * .033,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0483
    },
    categoryContainer: {
      height: Dimensions.get('window').height * .072,
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
      fontWeight: 'bold',
      marginLeft: Dimensions.get('window').width * .3
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
      height: Dimensions.get('window').height * .12,
      alignSelf: 'center',
      justifyContent: 'center'
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
      fontSize: Dimensions.get('window').height * .02
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
      height: Dimensions.get('window').height * .12,
      alignSelf: 'center',
      justifyContent: 'center'
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
      fontSize: Dimensions.get('window').height * .02
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
      fontSize: Dimensions.get('window').height * .019,
      marginTop: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .05
    },
    slider: {
      width: Dimensions.get('window').width * .9,
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .011
    },
    trainingSiteContainer: {
      width: Dimensions.get('window').width * .95,
      height: Dimensions.get('window').height * .220,
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .04
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
    trainingSiteErrorText: {
      marginTop: Dimensions.get('window').height * .011,
      color: 'red',
      alignSelf: 'center'
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
      marginTop: Dimensions.get('window').height * .019,
      marginBottom: Dimensions.get('window').height * .019,
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
  });

  export default ProfileDetailsPage2Trainer;
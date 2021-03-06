import React, {useRef, useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons';
import Slider from '@react-native-community/slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
const storageRef = storage().ref('/images/');

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

import AppButton from '../../globalComponents/AppButton';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';
import BirthdayPicker from '../../globalComponents/BirthdayPicker';

//Here the trainer enters his: full name, images/videos, birthday, training categories, maximum distance to be fined, writes about him, certifications, at least one training site, and training prices
const ProfileDetailsPage2Trainer = ({navigation}) => {
    const {emailAddress} = useContext(EmailContext);
    const {dispatchFirst} = useContext(NameContext);
    const {dispatchLast} = useContext(NameContext);
    const {profileImage} = useContext(MediaContext);
    const {dispatchBirthday} = useContext(BirthdayContext);
    const {categories, dispatchCategories} = useContext(CategoryContext);
    const {aboutMe, dispatchAboutMe} = useContext(AboutMeContext);
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);
    const {dispatchMaximumDistance} = useContext(MaximumDistanceContext);
    const {trainingSite1, dispatchTrainingSite1} = useContext(TrainingSiteContext);
    const {trainingSite2, dispatchTrainingSite2} = useContext(TrainingSiteContext);
    const {dispatchSingleAtTrainer} = useContext(TrainingPriceContext);
    const {dispatchSingleOutdoor} = useContext(TrainingPriceContext);
    const {dispatchCoupleAtTrainer} = useContext(TrainingPriceContext);
    const {dispatchCoupleOutdoor} = useContext(TrainingPriceContext);


    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [minimumDate, setMinimumDate] = useState("");
    const [maximumDate, setMaximumDate] = useState("");
    const [birthdaySelected, setBirthdaySelected] = useState("Set your birthday");
    const [selectedItems, setSelectedItems] = useState([]);
    const [maxDistanceSelected, setMaxDistanceSelected] = useState("1");
    const [aboutMeInput, setAboutMeInput] = useState("");
    const [certificationsInput, setCertificationsInput] = useState("");
    const [sliderValue, setSliderValue] = useState("1 MILES");
    const [isSingle, setIsSingle] = useState(true);
    const [singleAtTrainerInput, setSingleAtTrainerInput] = useState("");
    const [singleOutdoorInput, setSingleOutdoorInput] = useState("");
    const [coupleAtTrainerInput, setCoupleAtTrainerInput] = useState("");
    const [coupleOutdoorInput, setCoupleOutdoorInput] = useState("");

    const [isNamesError, setIsNamesError] = useState(false); 
    const [nameErrorMessage ,setNameErrorMessage] = useState("");
    const [isFirstNamesError, setIsFirstNamesError] = useState(false);
    const [firstNamesErrorMessage, setFirstNameErrorMessage] = useState("");
    const [isLastNamesError, setIsLastNamesError] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [isBirthdayErrorMessage, setIsBirthdayErrorMessage] = useState(false);
    const [isBirthdaySelected, setIsBirthdaySelected] = useState(false);
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [categoryMessageError,setCategoryMessageError] = useState("");
    const [isAboutMeError, setIsAboutMeError] = useState(false);
    const [aboutMeMessageError,setAboutMeErrorMessage] = useState("");
    const [isCertificationError, setIsCertificationError] = useState(false);
    const [certificationMessageError, setCertificationMessageError] = useState("");
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isTrainingSiteError, setIsTrainingSiteError] = useState(false);
    const [trainingSiteErrorMessage, setTrainingSiteErrorMessage] = useState("");
    const [isPriceError, setIsPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");

    
    const scrollRef = useRef();

    //Scroll the user UI to specific position
    const scrollTo = (where) => {
      y = 0;

      switch (where) {
        case "aboutMe":
          y = Dimensions.get('window').height * 0.80;
          break;
        case "certifications":
          y = Dimensions.get('window').height * 0.80;
          break;
      }
      scrollRef.current?.scrollTo({
          y: y,
          animated: true
      });
    }



    const charsLimit = 130;

    //Sets the minimum age to 18 every time
    useEffect (() => {
      setIsNamesError(false);
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      setMaximumDate(new Date().setFullYear(currentYear - 18, currentMonth, currentDay));
      setMinimumDate(new Date().setFullYear(currentYear - 120, currentMonth, currentDay));
    }, []);

    useEffect(() => {
      dispatchCategories({
        type: 'SET_CATEGORIES',
        categories: []
      });
      dispatchAboutMe({
        type: 'SET_ABOUT_ME',
        aboutMe: ""
      });
      dispatchCertifications({
        type: 'SET_CERTIFICATIONS',
        certifications: ""
      });
      dispatchTrainingSite1({
        type: 'SET_TRAINING_SITE_1',
        trainingSite1: ""
      });
      dispatchTrainingSite2({
        type: 'SET_TRAINING_SITE_2',
        trainingSite2: ""
      });
    }, [navigation])
    
    //Navigates back to the ProfileDetailsPage1Trainer
    const handleArrowButton = () => {
      navigation.navigate('ProfileDetailsPage1Trainer');
    }


    const openAddressWindow = (type) => {
      console.log('pressed trainer site input')
      navigation.navigate('AddressTrainer', {type: type});
    }


    //Sets the firstName input to the value
    const handleOnChangeFirstName = (text) => {
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setFirstNameInput(text);
    }

    //Sets the lastName input to the value
    const handleOnChangeLasttName = (text) => {
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setLastNameInput(text);
    }

    //Sets the birthday of the user when selected
    const handleConfirm = (date) => {
      var timestamp = new Date().getTime() - (18 * 365 * 24 * 60 * 60 * 1000);

      if (date.getTime() > timestamp) {
        date.setFullYear(date.getFullYear()-18);
      } 

      setBirthdaySelected((date.getMonth()+1)+"/"+date.getDate()+"/"+date.getUTCFullYear());
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
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setDatePickerVisible(!datePickerVisible);
    }

    const handleOnCategoryPressed = () => {
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      navigation.navigate('PickCategoryTrainer');
    }

    //Sets the slider value to the value
    const handleSliderValueChange = (value) => {
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      setSliderValue(value+" MILE");
      setMaxDistanceSelected(value);
    }

    //sets the training at the trainer price to the value - by the type of: single/couple
    const handleAtTrainerPriceChange = (value) => {
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
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
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
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
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      navigation.navigate('AboutMeTrainer');
    }

    //Navigates to the CertificationsTrainer page for the user to write his certifications
    const handleCertificationsPress = () => {
      setIsNamesError(false);
      setIsFirstNamesError(false);
      setIsLastNamesError(false);
      setIsBirthdayErrorMessage(false);
      setIsCategoryError(false);
      setIsAboutMeError(false);
      setIsCertificationError(false);
      setIsTrainingSiteError(false);
      setIsPriceError(false);
      navigation.navigate('CertificationsTrainer');
    }

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
      setIsSingle(!isSingle);
    }

    //Handle the next button press, if ok - saves all values states and navigates to the PaymentsAndPolicyTrainer page
    const handleNext = () => {
      if (profileImage === require('../../../images/profileImage.jpeg')) {
        setIsNamesError(true);
        setNameErrorMessage('Profile image is required');
        scrollTo("profileImage");
      }
      else if(firstNameInput === "" && lastNameInput === ""){
        setIsNamesError(true);
        setNameErrorMessage('First and Last name are required');
        scrollTo("name");
      }
      else if(firstNameInput === "") {
        setFirstNameErrorMessage("First name field is required");
        setIsFirstNamesError(true);
        scrollTo("name");
      }
      else if(lastNameInput === "") {
        setLastNameErrorMessage("Last name field is required");
        setIsLastNamesError(true);
        scrollTo("name");
      }
      else if(birthdaySelected === "Set your birthday"){
        setBirthdayErrorMessage("Select birthday");
        setIsBirthdayErrorMessage(true);
        scrollTo("birthday");
      }
      else if(categories.length === 0){
        setCategoryMessageError("Pick at least one category");
        setIsCategoryError(true);
        scrollTo("categories");
      } 
      else if (aboutMe === "Write about yourself...") {
        setAboutMeErrorMessage("Enter at least 20 characters about yourself.");
        setIsAboutMeError(true);
        scrollTo("aboutMe");
      }
      else if (certifications === "Write your certifications...") {
        setCertificationMessageError("Enter at least 20 characters about your certifications.");
        setIsCertificationError(true);
        scrollTo("certifications");
      }
      // else if(trainingSite1 === "" && trainingSite2 === ""){
      //   setTrainingSiteErrorMessage("Enter at least one training site");
      //   setIsTrainingSiteError(true);
      // }
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

        if(trainingSite1 !== ""){
          dispatchTrainingSite1({
            type: 'SET_TRAINING_SITE_1',
            trainingSite1: trainingSite1
          });
        }
        if(trainingSite2 !== ""){
          dispatchTrainingSite2({
            type: 'SET_TRAINING_SITE_2',
            trainingSite2: trainingSite2
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

        navigation.navigate('PaypalUsername');
      }
    }


    //show only 3 categories.
    const showCategories = () => {
      let text = "";
      for (let i = 0; i<categories.length; i++) {
        if(i<4) {
          text += categories[i] + ((i<categories.length-1 && i<3)? ", " : "");
        } else {
          text += "..."
          break;
        }
      }
      return text;
    }


    return(
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView ref={scrollRef} style={styles.container}>
        <ArrowBackButton
          onPress={handleArrowButton}
        />
          <Text style={styles.profileDetailesText}>Profile Details</Text>
            <View style={styles.upperContainer}>
              <View style={styles.nameAndImageContanier}>
              <TouchableOpacity 
                  onPress={handleProfileImage}>
                  {profileImage === require('../../../images/profileImage.jpeg')?
                    <Image
                    source={profileImage}
                    style={styles.profileImage}
                    />
                  :
                    <Image
                    source={{uri: profileImage}}
                    style={styles.profileImage}
                    />
                  }

                </TouchableOpacity>
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
              </View>
              {isNamesError ?
                <Text style={styles.nameErrorMessage}>{nameErrorMessage}</Text>
              : null}
              {isFirstNamesError ?
              <Text style={styles.nameErrorMessage}>{firstNamesErrorMessage}</Text>
            :null}

            {isLastNamesError?
            <Text style={styles.nameErrorMessage}>{lastNameErrorMessage}</Text>
            :null}
              <Text style={styles.nameExplanation}>Your name and photo help the customer to identify you.</Text>
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
              maximumDate={new Date((maximumDate))}
              minimumDate={new Date((minimumDate))}
              headerTextIOS="Pick a date - minimum 18"
            />
            {isBirthdayErrorMessage ? 
              <Text style={styles.birthdayErrorMessage}>{birthdayErrorMessage}</Text>
            : null}
          </View>
          <Text style={styles.emailAddressText}>Email Address</Text>
          <TextInput 
            editable={false}
            placeholder={emailAddress}
            placeholderTextColor='black'
            style={styles.emailAddressButton}
          />
          <Text style={styles.emailExplanationText}>We use your email to send you reciepts.</Text>
          <Text style={styles.categoryTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryBoxContainer}>
              <View style={styles.categoryBox}>
                <TouchableOpacity
                  onPress={() => handleOnCategoryPressed()}
                >
                  <Text style={categories.length > 0 ? styles.categoryPicked : styles.categoryUnPicked}>{categories.length > 0 ? showCategories() : "Pick categories"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleOnCategoryPressed()}
                  style={{position: 'absolute', right: 5, bottom: 10}}
                >
                  <Image
                    source={require('../../../images/pencilIcon.png')}
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
            <Text style={styles.categoryTitle}>About Me</Text>
            <TouchableOpacity
                  onPress={() => handleOnAboutMePress()}
                >
            <View style={styles.aboutMeContainer}>
            
              <View style={aboutMe === "Write about yourself..." ? styles.aboutMeButton : styles.aboutMeButtonWritten}>
                  <Text style={aboutMe === "Write about yourself..." ? styles.aboutMeTitle :styles.aboutMeText}>{aboutMe.length > charsLimit ? aboutMe.slice(0,charsLimit)+"..." : aboutMe}</Text>
              </View>
              <View style={styles.pencilButtonAboutMe}>
                <TouchableOpacity
                  onPress={() => handleOnAboutMePress()}
                >
                  <Image
                    source={require('../../../images/pencilIcon.png')}
                    style={styles.categoryIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            </TouchableOpacity>

            {isAboutMeError ?
                <Text style={styles.aboutMeErrorMessage}>{aboutMeMessageError}</Text>
              : null}
            <Text style={styles.categoryTitle}>Certifications</Text>
            <TouchableOpacity
                  onPress={() => handleCertificationsPress()}
                >
            <View style={styles.certificationsContainer}>
              <View style={certifications === "Write your certifications..." ? styles.certificationsButton : styles.certificationsButtonWritten}>
                
                  <Text style={certifications === "Write your certifications..." ? styles.certificationsTitle : styles.certificationsText}>{certifications.length > charsLimit ? certifications.slice(0,{charsLimit})+"..." : certifications}</Text>
              </View>
              <View style={styles.pencilButtonCertifications}>
                <TouchableOpacity
                  onPress={() => handleCertificationsPress()}
                >
                  <Image
                    source={require('../../../images/pencilIcon.png')}
                    style={styles.categoryIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            </TouchableOpacity>
            {isCertificationError ?
                <Text style={styles.certificationErrorMessage}>{certificationMessageError}</Text>
              : null}
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.maxDistanceText}>Maximum Distance</Text>
            <Text style={styles.sliderValueTitle}>{sliderValue}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              minimumTrackTintColor="deepskyblue"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => handleSliderValueChange(value)}
              tapToSeek={true}
              step={1}
              thumbTintColor='deepskyblue'
            />
            <Text style={styles.distanceExplanation}>Indicates the distance in which potentional customers can see your profile.</Text>
          </View>
          <View style={styles.trainingSiteContainer}>
            <Text style={styles.trainingSiteText}>Training Site</Text>
            <TouchableOpacity onPress = {() => openAddressWindow(1)}>
            <View style={styles.trainingSiteView}>
              <Text style={styles.trainingSiteInput}>{trainingSite1 ? trainingSite1 : 'Primary Address'}</Text>
              {/* <TextInput
                style={styles.trainingSiteInput}
                title='address'
                placeholder='Primary Address'
                pointerEvents="none"
                // value = {trainingSite1 === "" ? "" : trainingSite1}
              /> */}
              </View>   
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openAddressWindow(2)}>
              <View style={styles.trainingSiteView}>
                <Text style={styles.trainingSiteInput}>{trainingSite2 ? trainingSite2 : 'Secondary Address'}</Text>
              </View>  
            </TouchableOpacity>
            {isTrainingSiteError ? 
              <Text style={styles.trainingSiteErrorText}>{trainingSiteErrorMessage}</Text>
            : null}                                                          
          </View>
          <View style={styles.priceSectionContainer}>
            <Text style={styles.pricingTitle}>Training Price</Text>
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
                <View style={styles.atTrainerSitePrice}>
                  <Image
                  source={require('../../../images/dollarSign.jpeg')}
                  style={styles.dollarImage}
                  />
                <TextInput
                  style={styles.atTrainingSiteInput}
                  value={isSingle ? singleAtTrainerInput : coupleAtTrainerInput}
                  placeholder='0'
                  keyboardType='numeric'
                  placeholderTextColor='grey'
                  onChangeText={(value) => handleAtTrainerPriceChange(value)}
                />
                </View>
              </View>
              <View style={styles.outDoor}>
                <Text style={styles.outDoorText}>OUTDOOR</Text>
                <View style={styles.outDoorPrice}>
                <Image
                  source={require('../../../images/dollarSign.jpeg')}
                  style={styles.dollarImage}
                  />
                <TextInput
                  style={styles.outDoorInput}
                  placeholder='0'
                  keyboardType='numeric'
                  placeholderTextColor='grey'
                  onChangeText={(value) => handleOutdoorPriceChange(value)}
                  value={isSingle ? singleOutdoorInput: coupleOutdoorInput}
                />
                 </View>
              </View>
              {isPriceError ? 
                <Text style={styles.priceErrorMessage}>{priceErrorMessage}</Text>
              : null}
            </View>
          </View>
          <View style={styles.nextButtonContainer}>
          <AppButton 
              title="Next"
              onPress={handleNext}
            />
          </View>
       </ScrollView>
       </KeyboardAvoidingView>
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
    dollarImage: {
      width: Dimensions.get('window').width * .02,
      height: Dimensions.get('window').height * .02,
      marginTop: Dimensions.get('window').height * .01,
      marginRight: Dimensions.get('window').width * .015,
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
      width: Dimensions.get('window').width * .93,
      height: Dimensions.get('window').width * .15,
      marginLeft: Dimensions.get('window').width * .025
    },
    textInput: {
      marginTop: Dimensions.get('window').height * .032,
      borderColor: 'deepskyblue',
      borderRadius: 17,
      borderWidth: 1,
      height: Dimensions.get('window').height * .065,
      width: Dimensions.get('window').width * .34,
      fontSize: Dimensions.get('window').height * .025
    },
    profileImage: {
      marginTop: Dimensions.get('window').height * .015,
      width: Dimensions.get('window').height * .095,
      height: Dimensions.get('window').height * .095,
      overflow: 'hidden',
      borderRadius: Dimensions.get('window').height * .095 / 2
    },

    nameErrorMessage: {
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .040,
      marginLeft: Dimensions.get('window').width * .0483,
      color: 'red'
    },
    nameExplanation: {
      marginTop: Dimensions.get('window').height * .005,
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
      borderWidth: 1,
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
      color: 'black',
      fontSize: Dimensions.get('window').height * .025,
      marginLeft: Dimensions.get('window').width * .3
    },
    calendarIcon: {
      height: Dimensions.get('window').height * .045,
      width: Dimensions.get('window').height * .045,
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
      borderWidth: 1,
      height: Dimensions.get('window').height * .065,
      width: Dimensions.get('window').width * .93,
      justifyContent: 'center',
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center'
    },
    emailExplanationText: {
      marginTop: Dimensions.get('window').height * .011,
      color: 'darkgrey',
      width: Dimensions.get('window').width,
      textAlign: 'center',
      fontSize: Dimensions.get('window').height * .018
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
      borderWidth: 1,
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
      position: 'relative'
      //paddingRight: 5
    },
    categoryUnPicked: {
      textAlign: 'center',
      color: 'grey',
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: '300',
      marginLeft: Dimensions.get('window').width * .3
    },
    categoryPicked: {
      textAlign: 'left',
      color: 'black',
      marginLeft: Dimensions.get('window').width * .010,
      fontSize: Dimensions.get('window').height * .022,
    },
    categoryIcon: {
      height: Dimensions.get('window').height * .02,
      width: Dimensions.get('window').height * .02,
    },
    categoryErrorMessage: {
      color: 'red',
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .0055
    }, 
    aboutMeErrorMessage: {
      color: 'red',
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .0055
    },
    certificationErrorMessage: {
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
      marginTop: Dimensions.get('window').height * .010,
      borderColor: 'deepskyblue',
      borderRadius: 17,
      borderWidth: 1,
      height: Dimensions.get('window').height * .135,
      width: Dimensions.get('window').width * .9,
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    aboutMeButton: {
      height: Dimensions.get('window').height * .12,
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    aboutMeButtonWritten: {
      alignSelf: 'flex-start',
    },
    aboutMeTitle: {
      fontSize: Dimensions.get('window').height * .02,
      color: 'grey'
    },
    aboutMeText: {
      color: 'black',
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
      marginTop: Dimensions.get('window').height * .010,
      borderColor: 'deepskyblue',
      borderRadius: 17,
      borderWidth: 1,
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
      fontSize: Dimensions.get('window').height * .02,
      color: 'grey'
    },
    certificationsText: {
      color: 'black',
      marginTop: Dimensions.get('window').height * .011,
      marginLeft: Dimensions.get('window').width * .0241,
      fontSize: Dimensions.get('window').height * .02
    },
    sliderContainer: {
      marginTop: Dimensions.get('window').height * .15
    },  
    maxDistanceText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginTop: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .0483,
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
    distanceExplanation: {
      marginTop: Dimensions.get('window').height * .010,
      color: 'darkgrey',
      width: Dimensions.get('window').width,
      textAlign: 'center',
      fontSize: Dimensions.get('window').height * .018
    },
    trainingSiteContainer: {
      width: Dimensions.get('window').width * .95,
      height: Dimensions.get('window').height * .220,
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height * .04
    },
    trainingSiteText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0241,
    },
    trainingSiteView: {
      width: '100%',
      //justifyContent: 'center',
      //alignItems: 'center'
    },
    trainingSiteInput: {
      marginTop: Dimensions.get('window').height * .022,
      borderWidth: 1,
      borderColor: 'deepskyblue',
      borderRadius: 17,
      height: Dimensions.get('window').height * .065,
      lineHeight: Dimensions.get('window').height * .065,
      fontSize: Dimensions.get('window').height * .017,
      textAlign: 'center',
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
      paddingBottom: 0,
      textAlignVertical: 'center'
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
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
    },
    pricingLabels: {
      marginTop: Dimensions.get('window').height * .019,
      marginBottom: Dimensions.get('window').height * .019,
      flexDirection: 'row'
    },  
    singlePricing: {
      width: Dimensions.get('window').width * .25,
      height: Dimensions.get('window').height * .04,
      borderWidth: 1,
      borderColor: 'deepskyblue',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      alignItems: 'center',
      backgroundColor: 'deepskyblue'
    },
    singlePricingLabeld: {
      width: Dimensions.get('window').width * .25,
      height: Dimensions.get('window').height * .04,
      borderWidth: 1,
      borderColor: 'deepskyblue',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    singleText: {
      marginTop: Dimensions.get('window').height * .005,
      fontSize: Dimensions.get('window').height * .022,
      color: 'white',
      fontWeight: 'bold'
    },
    singleTextLabeld: {
      marginTop: Dimensions.get('window').height * .005,
      fontSize: Dimensions.get('window').height * .022,
      color: 'deepskyblue',
      fontWeight: 'bold'
    },
    couplePricing: {
      width: Dimensions.get('window').width * .25,
      height: Dimensions.get('window').height * .04,
      borderWidth: 1,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      borderColor: 'deepskyblue',
      alignItems: 'center'
    },
    couplePricingLabeld: {
      width: Dimensions.get('window').width * .25,
      height: Dimensions.get('window').height * .04,
      borderWidth: 1,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      borderColor: 'deepskyblue',
      backgroundColor: 'deepskyblue',
      alignItems: 'center'
    },
    coupleText: {
      marginTop: Dimensions.get('window').height * .005,
      fontSize: Dimensions.get('window').height * .022,
      color: 'deepskyblue',
      fontWeight: 'bold'
    },
    coupleTextLabeld: {
      marginTop: Dimensions.get('window').height * .005,
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
    atTrainerSitePrice: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    atTrainingSiteInput: {
      borderWidth: 1,
      borderColor: 'deepskyblue',
      width: Dimensions.get('window').width * .17,
      height: Dimensions.get('window').height * .05,
      textAlign: 'center',
      fontSize: Dimensions.get('window').height * .022,
      padding: 0,
      marginBottom: 5
    },
    atTrainerSiteText: {
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: 'bold'
    },
    outDoor: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width * .9,
      alignItems: 'center'
    },
    outDoorPrice: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    outDoorInput: {
      borderWidth: 1,
      borderColor: 'deepskyblue',
      width: Dimensions.get('window').width * .17,
      height: Dimensions.get('window').height * .05,
      textAlign: 'center',
      fontSize: Dimensions.get('window').height * .022,
      padding: 0
    },
    outDoorText: {
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: 'bold'
    },
    priceErrorMessage: {
      color: 'red',
      marginTop: Dimensions.get('window').height * .0055
    },  
    nextButtonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: Dimensions.get('window').height * .066,
      alignItems: 'center',
      marginBottom: 30
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
import React, {useState, useEffect, useContext, Fragment} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, FlatList} from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

//import ImagePicker from 'react-native-image-picker'

import {EmailContext} from '../../../context/placeContextes/EmailContext';
import {CompanyNameContext} from '../../../context/placeContextes/CompanyNameContext';
import {CompanyNumberContext} from '../../../context/placeContextes/CompanyNumberContext';
import {AddressContext} from '../../../context/placeContextes/AddressContext';
import {AboutThePlaceContext} from '../../../context/placeContextes/AboutThePlaceContext';
import {CategoryContext} from '../../../context/placeContextes/CategoryContext';
import {TrainingPriceContext} from '../../../context/placeContextes/TrainingPriceContext';

import AppButton from '../../globalComponents/AppButton';


//Here the place enters his: name, number, address, categories and images/videos
const ProfileDetailsPage2Place = ({navigation}) => {
    const {emailAddress} = useContext(EmailContext);
    const {dispatchName} = useContext(CompanyNameContext);
    const {dispatchCompanyNumber} = useContext(CompanyNumberContext);
    const {dispatchAddress} = useContext(AddressContext);
    const {aboutThePlace} = useContext(AboutThePlaceContext);
    const {categories} = useContext(CategoryContext);
    const {dispatchSingle} = useContext(TrainingPriceContext);
    const {dispatchCouple} = useContext(TrainingPriceContext);

    const [companyNameInput, setCompanyNameInput] = useState("");
    const [companyNumberInput, setCompanyNumberInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    //const [profileImageSource, setProfileImageSource] = useState("");
    const [singlePriceInput, setSinglePriceInput] = useState("");
    const [couplePriceInput, setCouplePriceInput] = useState("");

    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setIsNameErrorMessage] = useState("Enter your company name");
    const [isNumberError, setIsNumberError] = useState(false);
    const [numberErrorMessage, setNumberErrorMessage] = useState("Enter your company number");
    const [isAddressError, setIsAddressError] = useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = useState("Enter your company address");
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("Pick at least 1 category");
    const [isPriceError, setIsPriceError] = useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = useState("Enter at least 1 pricing");

    const charsLimit = 150;
    
    //Navigates back to the profile details page
    const handleArrowButton = () => {
      navigation.navigate('ProfileDetailsPage1Place');
    }

    //Sets the company name to the value
    const handleOnCompanyNameChange = (text) => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      setCompanyNameInput(text);
    }

    //Sets the company number to the value
    const handleOnCompanyNumberChange = (text) => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      setCompanyNumberInput(text);
    }

    //Sets the company address to the value
    const handleOnAddressChange = (text) => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      setAddressInput(text);
    }

    const handleProfileImage = () => {
      alert("Image");
      // const options = {
      //   title: 'Select photo'
      // };

      // ImagePicker.showImagePicker(options, (res) => {
      //   if(res.didCancel){
      //     alert("cancel")
      //   }
      //   else if(res.error){
      //     alert(res.error)
      //   }
      //   else{
      //     const source = {uri: res.uri};
      //     setProfileImageSource(source);
      //   }
      // })
    }

    //Navigates to the category picker page
    const handleOnCategoryPressed = () => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      navigation.navigate('PickCategoryPlace');
    }

    //Navigates to the AboutThePlace page
    const handleOnaboutThePlacePress = () => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      navigation.navigate('AboutThePlace');
    }

    const handleOnSinglePriceChange = (value) => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      setSinglePriceInput(value);
    }

    const handleOnCouplePriceChange = (value) => {
      setIsAddressError(false);
      setIsCategoryError(false);
      setIsNameError(false);
      setIsNumberError(false);
      setIsPriceError(false);
      setCouplePriceInput(value);
    }

    //Handles the next button, if ok - navigates to the payments page
    const handleNext = () => {
      if(companyNameInput === ""){
        setIsNameError(true);
      }
      else if(companyNumberInput === ""){
        setIsNumberError(true);
        setNumberErrorMessage("Enter your company number")
      }
      else if(!Number(companyNumberInput)){
        setIsNumberError(true);
        setNumberErrorMessage("Enter digits only");
      }
      else if(addressInput === ""){
        setIsAddressError(true);
      }
      else if(categories.length < 1){
        setIsCategoryError(true);
      }
      else if(singlePriceInput == "" && couplePriceInput == ""){
        setIsPriceError(true);
      }
      else{
        dispatchName({
          type: 'SET_COMPANY_NAME',
          companyName: companyNameInput
        });

        dispatchCompanyNumber({
          type: 'SET_COMPANY_NUMBER',
          companyNumber: companyNumberInput
        });

        dispatchAddress({
          type: 'SET_ADDRESS',
          address: addressInput
        });

        dispatchSingle({
          type: 'SET_SINGLE_PRICE',
          singlePrice: singlePriceInput
        });

        dispatchCouple({
          type: 'SET_COUPLE_PRICE',
          couplePrice: couplePriceInput
        });

        navigation.navigate('PaymentsAndPolicyPlace');
      }
    }
    return(
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps={"true"}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                onPress={handleArrowButton}
                >
                <Image
                    source={require('../../../images/arrowBack.png')}
                    style={styles.arrowImage}
                />
                </TouchableOpacity>
                <Text style={styles.profileDetailesText}>Profile Details</Text>
            </View>
            <View style={styles.nameAndAddressContainer}>
              <View style={styles.nameContanier}>
                  <Text style={styles.nameText}>Company Name</Text>
                  <TextInput
                  style={styles.nameInput}
                  textAlign='center'
                  placeholderTextColor='darkgrey'
                  onChangeText={value => handleOnCompanyNameChange(value)}
                  />
                  {isNameError ? 
                    <Text style={styles.nameNumberAddressCategoryErrorMessage}>{nameErrorMessage}</Text>
                  : null}
              </View>
              <View style={styles.nameContanier}>
                  <Text style={styles.nameText}>Company Number</Text>
                  <TextInput
                  style={styles.nameInput}
                  textAlign='center'
                  placeholderTextColor='darkgrey'
                  onChangeText={value => handleOnCompanyNumberChange(value)}
                  />
                  {isNumberError ? 
                    <Text style={styles.nameNumberAddressCategoryErrorMessage}>{numberErrorMessage}</Text>
                  : null}
              </View>
              <View style={styles.addressContainer}>
                  <Text style={styles.addressText}>Address</Text>
                  <TextInput
                  style={styles.addressInput}
                  title='address'
                  placeholder='Number/Street/City/State/Zip Code'
                  onChangeText={(value) => handleOnAddressChange(value)}
                  />       
                  {isAddressError ? 
                    <Text style={styles.nameNumberAddressCategoryErrorMessage}>{addressErrorMessage}</Text>
                  : null}                                                 
              </View>
            </View>
            <View style={styles.emailAddressContainer}>
                <Text style={styles.emailAddressText}>Email Address</Text>
                <TextInput 
                    editable={false}
                    placeholder={emailAddress}
                    placeholderTextColor='black'
                    style={styles.emailAddressInput}
                />
                <Text style={styles.emailExplinationText}>We use your email to send you receips. your mobile number is required to enhance account security.</Text>
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
                      source={require('../../../images/categoryIcon.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {isCategoryError ? 
                    <Text style={styles.nameNumberAddressCategoryErrorMessage}>{categoryErrorMessage}</Text>
              : null}
            </View>
            <View style={styles.aboutAndPhotosContainer}>
              <View style={styles.aboutMeContainer}>
                <View style={aboutThePlace === "ABOUT THE PLACE" ? styles.aboutMeButton : styles.aboutMeButtonWritten}>
                  <TouchableOpacity
                    onPress={() => handleOnaboutThePlacePress()}
                  >
                    <Text style={aboutThePlace === "ABOUT THE PLACE" ? styles.aboutMeTitle :styles.aboutMeText}>{aboutThePlace.length > charsLimit ? aboutThePlace.slice(0,charsLimit)+"..." : aboutThePlace}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.pencilButtonAboutMe}>
                  <TouchableOpacity
                    onPress={() => handleOnaboutThePlacePress()}
                  >
                    <Image
                      source={require('../../../images/pencil.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.imagesContainer}>
                  <Image
                      source={require('../../../images/camera.png')}
                      style={styles.cameraIcon}
                  />
                  <Text style={styles.photosText}>PHOTOS FOR YOUR PROFILE</Text>
                  <Text style={styles.accessText}>(access to photos from ypur phone)</Text>
              </View>
            </View>
            <View style={styles.priceSectionContainer}>
              <Text style={styles.pricingTitle}>Please price your training type:</Text>
              <View style={styles.pricingContainer}>
                  <View style={styles.personal1Client}>
                  <Text style={styles.personal1ClientText}>Personal Trainer & Client</Text>
                  <TextInput
                      style={styles.personal1ClientInput}
                      title='$$$'
                      placeholder='$$$'
                      placeholderTextColor='black'
                      onChangeText={(value) => handleOnSinglePriceChange(value)}
                  />
                  </View>
                  <View style={styles.personal2Clients}>
                  <Text style={styles.personal2ClientsText}>Personal Trainer & 2 Clients</Text>
                  <TextInput
                      style={styles.personal2ClientsInput}
                      title='$$$'
                      placeholder='$$$'
                      placeholderTextColor='black'
                      onChangeText={(value) => handleOnCouplePriceChange(value)}
                  />
                  </View>
              </View>
              {isPriceError ? 
                <Text style={styles.nameNumberAddressCategoryErrorMessage}>{priceErrorMessage}</Text>
              : null}
            </View>
            <View style={styles.nextButtonContainer}>
            <AppButton 
                title="Next"
                onPress={handleNext}
              />
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
        //height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white'
      },
      headerContainer: {

      },
      arrowImage: {
        marginTop: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483
      },
      profileDetailesText: {
        marginTop: Dimensions.get('window').height * .033,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0424,
        marginLeft: Dimensions.get('window').width * .0483
      },
      nameAndAddressContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .334,
        marginTop: Dimensions.get('window').height * .033
      },
      nameContanier: {
        width: Dimensions.get('window').width * .93,
        flexDirection: 'column',
        height: Dimensions.get('window').height * .09,
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
      nameText: {
        fontSize: Dimensions.get('window').height * .0189,
      },
      nameInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 20,
        height: Dimensions.get('window').height * .055,
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center',
        marginTop: 10
      },
      nameNumberAddressCategoryErrorMessage: {
        color: 'red',
        textAlign: 'center'
      },
      addressContainer: {
        width: Dimensions.get('window').width * .93,
        flexDirection: 'column',
        height: Dimensions.get('window').height * .09,
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
      addressText: {
        fontSize: Dimensions.get('window').height * .0189,
      },
      addressInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 20,
        height: Dimensions.get('window').height * .055,
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center',
        marginTop: 10
      },
      emailAddressContainer: {
        width: Dimensions.get('window').width * .93,
        height: Dimensions.get('window').height * .14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .044
      },
      emailAddressText: {
        fontSize: Dimensions.get('window').height * .0189
      },
      emailAddressInput: {
        borderColor: 'deepskyblue',
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .93,
        justifyContent: 'center',
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      emailExplinationText: {
        textAlign: 'center'
      },
      categoryTitle: {
        marginTop: Dimensions.get('window').height * .033,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278,
        marginLeft: Dimensions.get('window').width * .0483
      },
      categoryContainer: {
        height: Dimensions.get('window').height * .0725,
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .01
      },
      categoryBoxContainer: {
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .93,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 20,
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
        height: Dimensions.get('window').height * .03,
        width: Dimensions.get('window').height * .03,
      },
      categoryErrorMessage: {
        color: 'red',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .0055
      }, 
      aboutAndPhotosContainer: {
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
        marginTop: Dimensions.get('window').height * .01,
        marginLeft: Dimensions.get('window').width * .024,
        fontSize: Dimensions.get('window').height * .02
      },
      pencilButtonAboutMe: {
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: Dimensions.get('window').width * .012,
        marginBottom: Dimensions.get('window').height * .0055
      },
      imagesContainer: {
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        width: Dimensions.get('window').width * .9,
        borderColor: 'deepskyblue',
        height: Dimensions.get('window').height * .134,
        alignSelf: 'center',
        justifyContent: 'center'
      },
      cameraIcon: {
        borderRadius: 40
      },
      photosText: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'black'
      },
      accessText: {
        color: 'black',
        fontSize: Dimensions.get('window').height * .015
      },
      priceSectionContainer: {
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0362,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .14
      },
      pricingTitle: {
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: 'bold' 
      }, 
      pricingContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .1
      },
      personal1Client: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .925,
        height: Dimensions.get('window').height * .045,
        alignItems: 'center'
      },
      personal1ClientInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .17,
        height: Dimensions.get('window').height * .04,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022
      },
      personal1ClientText: {
        fontSize: Dimensions.get('window').height * .022
      },
      personal2Clients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .925,
        alignItems: 'center'
      },
      personal2ClientsInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .17,
        height: Dimensions.get('window').height * .04,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .022
      },
      personal2ClientsText: {
        fontSize: Dimensions.get('window').height * .022
      },
      nextButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').height * .044,
        alignItems: 'center',
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

  export default ProfileDetailsPage2Place;
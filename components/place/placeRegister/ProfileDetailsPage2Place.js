import React, {useState, useEffect, useContext, Fragment} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, FlatList} from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

//import ImagePicker from 'react-native-image-picker'
import MultiSelect from 'react-native-multiple-select';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {EmailContext} from '../../../context/placeContextes/EmailContext';
import {CompanyNameContext} from '../../../context/placeContextes/CompanyNameContext';
import {AddressContext} from '../../../context/placeContextes/AddressContext';
import {AboutThePlaceContext} from '../../../context/placeContextes/AboutThePlaceContext';
import {CategoryContext} from '../../../context/placeContextes/CategoryContext';

//Here the place enters his: name, number, address, categories and images/videos
const ProfileDetailsPage2Place = ({navigation}) => {
    const {emailAddress} = useContext(EmailContext);
    const {dispatchName} = useContext(CompanyNameContext);
    const {dispatcAddress} = useContext(AddressContext);
    const {aboutThePlace} = useContext(AboutThePlaceContext);
    const {categories, dispatchCategories} = useContext(CategoryContext);

    const [companyNameInput, setCompanyNameInput] = useState("");
    const [companyNumberInput, setCompanyNumberInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    //const [profileImageSource, setProfileImageSource] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressZipCode, setAddressZipCode] = useState("");
    const [isSingle, setIsSingle] = useState(true);

    const charsLimit = 150;

    let categoryItems = [
      {
        id: '1',
        name: 'Trx'
      },
      {
        id: '2',
        name: 'Yoga'
      },
      {
        id: '3',
        name: 'Running'
      },
      {
        id: '4',
        name: 'Gym'
      }
    ];
    
    //Navigates back to the profile details page
    const handleArrowButton = () => {
      navigation.navigate('ProfileDetailsPage1Place');
    }

    //Sets the company name to the value
    const handleOnCompanyNameChange = (text) => {
      setCompanyNameInput(text);
    }

    //Sets the company number to the value
    const handleOnCompanyNumberChange = (text) => {
      setCompanyNumberInput(text);
    }

    //Sets the company address to the value
    const handleOnAddressChange = (text) => {
      setAddressInput(text);
    }
    
    const handleItemSelected = (item) => {
      let selectedTemp = [...selectedItems];
      selectedTemp[selectedTemp.length] = item;
      setSelectedItems(selectedTemp);
    }
  
    const handleRemoveItem = (item, index) => {
      setSelectedItems(selectedItems.filter((sitem) => sitem.name !== item.name));
    }

    //Sets the category array to the selected items
    const onSelectedItemsChange = (selectedItems) => {
      setSelectedItems(selectedItems);
    };

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

    const handleOnCategoryPressed = () => {
      navigation.navigate('PickCategoryPlace');
    }

    //Navigates to the AboutThePlace page
    const handleOnaboutThePlacePress = () => {
      navigation.navigate('AboutThePlace');
    }

    //Handles the next button, if ok - navigates to the payments page
    const handleNext = () => {
      //selectedItems.map((item) => alert(item.name));

      dispatchName({
        type: 'SET_COMPANY_NAME',
        companyName: companyNameInput
      });

      navigation.navigate('PaymentsAndPolicyPlace');
    }
    return(
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
              </View>
              <View style={styles.nameContanier}>
                  <Text style={styles.nameText}>Company Number</Text>
                  <TextInput
                  style={styles.nameInput}
                  textAlign='center'
                  placeholderTextColor='darkgrey'
                  onChangeText={value => handleOnCompanyNumberChange(value)}
                  />
              </View>
              <View style={styles.addressContainer}>
                  <Text style={styles.addressText}>ADDRESS</Text>
                  <TextInput
                  style={styles.addressInput}
                  title='address'
                  placeholder='Number/Street/City/State/Zip Code'
                  onChangeText={(value) => handleOnAddressChange(value)}
                  />                                                        
              </View>
            </View>
            <View style={styles.emailAddressContainer}>
                <Text style={styles.emailAddressText}>EMAIL ADDRESS</Text>
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
              {/* {isCategoryError ? 
                    <Text style={styles.categoryErrorMessage}>{categoryMessageError}</Text>
              : null} */}
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
                  />
                  </View>
                  <View style={styles.personal2Clients}>
                  <Text style={styles.personal2ClientsText}>Personal Trainer & 2 Clients</Text>
                  <TextInput
                      style={styles.personal2ClientsInput}
                      title='$$$'
                      placeholder='$$$'
                      placeholderTextColor='black'
                  />
                  </View>
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
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column'
      },
      headerContainer: {

      },
      arrowImage: {
        marginTop: 60,
        marginLeft: 20
      },
      profileDetailesText: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 38,
        marginLeft: 20
      },
      nameAndAddressContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 300,
        marginTop: 30
      },
      nameContanier: {
        width: Dimensions.get('window').width * .93,
        flexDirection: 'column',
        height: Dimensions.get('window').height * .09,
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
      nameText: {
        fontSize: 17,
      },
      nameInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 20,
        height: Dimensions.get('window').height * .055,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
      },
      addressContainer: {
        width: Dimensions.get('window').width * .93,
        flexDirection: 'column',
        height: Dimensions.get('window').height * .09,
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
      addressText: {
        fontSize: 17,
      },
      addressInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 20,
        height: Dimensions.get('window').height * .055,
        fontSize: 20,
        textAlign: 'center'
      },
      emailAddressContainer: {
        width: Dimensions.get('window').width * .93,
        height: Dimensions.get('window').height * .14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 40
      },
      emailAddressText: {
        fontSize: 17
      },
      emailAddressInput: {
        borderColor: 'deepskyblue',
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .93,
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      emailExplinationText: {
        textAlign: 'center'
      },
      categoryTitle: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 20
      },
      categoryContainer: {
        height: 65,
        alignItems: 'center',
        marginTop: 10
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
        fontSize: 20,
        fontWeight: '300',
        marginLeft: Dimensions.get('window').width * .3
      },
      categoryPicked: {
        textAlign: 'center',
        fontSize: 20,
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
        marginTop: 5
      }, 
      aboutAndPhotosContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .3,
        marginTop: 40
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
        fontSize: 18,
      },
      aboutMeText: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18
      },
      pencilButtonAboutMe: {
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: 5,
        marginBottom: 5
      },
      imagesContainer: {
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        width: Dimensions.get('window').width * .9,
        borderColor: 'deepskyblue',
        height: 120,
        alignSelf: 'center',
        justifyContent: 'center'
      },
      cameraIcon: {
        borderRadius: 40
      },
      photosText: {
        fontSize: 17,
        color: 'black'
      },
      accessText: {
        color: 'black',
        fontSize: 13
      },
      priceSectionContainer: {
        marginTop: 30,
        marginLeft: 15,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .14
      },
      pricingTitle: {
        fontSize: 22,
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
        height: 45,
        alignItems: 'center'
      },
      personal1ClientInput: {
        borderWidth: 3,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .17,
        height: Dimensions.get('window').height * .04,
        textAlign: 'center',
        fontSize: 20
      },
      personal1ClientText: {
        fontSize: 20
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
        fontSize: 20
      },
      personal2ClientsText: {
        fontSize: 20
      },
      nextButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        marginTop: 40,
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
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
      },
  });

  export default ProfileDetailsPage2Place;
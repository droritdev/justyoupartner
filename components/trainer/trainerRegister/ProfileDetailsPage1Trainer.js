import React, {useState, useContext, useEffect} from 'react';
import {Alert, StyleSheet, View, Text, Image, Dimensions, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipToggle from 'react-native-flip-toggle-button';
import {Dropdown} from 'react-native-material-dropdown-v2';
import MultiSelect from 'react-native-multiple-select';

import {Platform} from 'react-native';
import {openSettings, check, checkNotifications, requestNotifications, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {CountryContext} from '../../../context/trainerContextes/CountryContext';

import PickCountry from '../../globalComponents/PickCountry';
import AppButton from '../../globalComponents/AppButton';
import FlipToggleButton from '../../globalComponents/FlipToggleButton';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';



//Here the user picks his country and grante the push and location pemissions
const ProfileDetailsPage1Trainer = ({navigation}) => {
    const {country, dispatchCountry} = useContext(CountryContext);
    const [isLocationPermission, setIsLocationPermission] = useState(true);
    const [isPushPermission, setIsPushPermission] = useState(true);
    const [isTermsConditions, setIsTermsConditions] = useState(true);
    const [isPermissionsNotConfirmed, setIsPermissionsNotConfirmed] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Pick a country");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [isCountryErrorMessage, setIsCountryErrorMessage] = useState(false);
    const [countryErrorMessage,setCountryErrorMessage] = useState("");
    const [isCountrySelected, setIsCountrySelected] = useState(false);
    const [visible, setVisible] = useState(false);

    //Checks if both permissions granted every time each of them changes
    useEffect(() => {
      if(isLocationPermission && isPushPermission){
        setIsPermissionsNotConfirmed(false);
      }
    },[isPushPermission, isLocationPermission])

    //Navigates back to the create password page and Re-set the password in the passwordContext
    const handleArrowButton = () => {
      navigation.navigate('CreatePasswordTrainer');
    }

    //Navigates to terms and conditions page
    const handleReadMore = () => {
      navigation.navigate('TermsConditionsTrainer');
    }
    

    //Sets the selected country array to the value
    const handleOnChangeCountry = (value) => {
      setIsCountrySelected(true);
      setIsCountryErrorMessage(false);
      setIsPermissionsNotConfirmed(false);
      setCountryErrorMessage("");
      setSelectedCountry(value);
      setSelectedCountryName(value);
    }

    //When user press the world icon, the country picker modal whill be visible
    const handleOnWorldIconPress = () => {
      setVisible(true);
    }

    //Closes the country picker modal
    const handleOnModalClose = () => {
      setVisible(false);
    }

    //Sets the location permission to the value
    const handleLocationToggleChange = (newState) => {
      if(newState) {
        //toogle is on
        askForPermission();
        // checkLocationPermission();
      } else {
        //toogle is off
        setIsLocationPermission(newState);
      }
    }
    
    //Sets the terms and conditions to the value
    const handleTermsToggleChange = (newState) => {
      setIsTermsConditions(newState);
    }



    //check if the location permission is enabled
    const checkLocationPermission = () => {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              alert('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              //permission wasn't asked yet
                askForPermission();
              break;
            case RESULTS.LIMITED:
              alert('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              //permission is granted
              setIsLocationPermission(true);
              break;
            case RESULTS.BLOCKED:
              //permission is not allowed
              setIsLocationPermission(false);
              showOpenSettingsAlert("location");
              break;
          }
        })
        .catch((error) => {
        });
    }



    // prompt permission window to the user
    const askForPermission = () => {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        })).then((result) => {
          if(result == 'granted') {
            //user has granted permission
            setIsLocationPermission(true);
          } else {
            //user has declined permission
            setIsLocationPermission(false);
          }
        });
    }



    // show alert to send user to his settings (user has decliend permission)
    const showOpenSettingsAlert = (type) => {
      title = "";
      msg = "";
      switch (type) {
        case "location":
          title = "Location is disabled";
          msg = "To continue, allow JustYou app to access your location"
          break;
        case "notifications":
          title = "Notifications is disabled";
          msg = "To continue, allow JustYou app to show notifcations"
          break;
      }
      Alert.alert(
        title,
        msg,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => openSettings() }
        ],
        { cancelable: false }
      );
    }



 

    //Sets the push permission to the value
    const handleNotificationsToggleChange = (newState) => {
      if(newState){
        checkNotifications().then(({status, settings}) => {
          switch(status){
            case "blocked":
              showOpenSettingsAlert("notifications");
            break;
            case "denied":
              requestNotifications(['alert', 'sound']).then(({status, settings}) => { 
                if(status === "granted") {
                  setIsPushPermission(newState);
                }
              });
            break;
            case "granted":
              setIsPushPermission(newState);
            break;
          }
        }
        );
      } else {
        setIsPushPermission(newState);
      }
    }
    
    //Handle the next button press - if ok, navigates to ProfileDetailsPage2
    const handleNext = () => {
      // if(!isCountrySelected){
      //   setCountryErrorMessage("You must pick a country");
      //   setIsCountryErrorMessage(true);
      // }
      if(!isLocationPermission || !isPushPermission){
        setIsPermissionsNotConfirmed(true);
      } else if (!isTermsConditions) {
        
      }
      else{
        setIsPermissionsNotConfirmed(false);
        dispatchCountry({
          type: 'SET_COUNTRY',
          country: 'United States'
        });
        navigation.navigate('ProfileDetailsPage2Trainer');
      }
    }
  
    return(
      <SafeAreaView style={styles.container}>
        <ArrowBackButton
          onPress={handleArrowButton}
        />
          <View style={styles.upperContainer}>
            <Text style={styles.profileDetailesText}>Profile Details</Text>
            <Text style={styles.fillTheFieldsText}></Text>
            <View style={styles.countryContainer}>
              <Text style={styles.countryTitle}>Country</Text>
              <View styles={styles.countryPicker}>
                <View style={styles.containerUSA}>
                  <View style={styles.viewUSA}>
                    <Text style={styles.textUSA}>United States</Text>
                  </View>
                  <Image 
                    source={require('../../../images/worldIcon.png')}
                    style={styles.image}
                  />
                </View>
                {/* <PickCountry
                  initValue={selectedCountry}
                  onChange={(option) => handleOnChangeCountry(option.label)}
                  visible={visible}
                  onModalClose={() => handleOnModalClose()}
                  onPress={() => handleOnWorldIconPress()}
                />
                {isCountryErrorMessage ? 
                  <Text style={styles.countryErrorText}>Pick a country</Text>
                : null} */}
              </View>
            </View>
          </View>
          <View style={styles.permissionsContainer}>
            <Text style={styles.permissionsText}>Permissions</Text>
            <View style={styles.permissionsSection}>
              <Text 
                style={{fontWeight: 'bold', fontSize: 20}}
              >Location</Text> 
              <FlipToggleButton
                value={isLocationPermission}
                onToggle={(newState) => handleLocationToggleChange(newState)}
              />
            </View>
            <Text style={{color: 'grey'}}>By sharing your location you'll see which instructors and sport clubs are next to you
            </Text>

            <View style={styles.permissionsSection}>
              <Text 
                style={{fontWeight: 'bold', fontSize: 20}}
              >Allow push notifications</Text>
              <FlipToggleButton
                value={isPushPermission}
                onToggle={(newState) => handleNotificationsToggleChange(newState)}
              />
            </View>
            <Text style={{color: 'grey'}}>
              We'll let you know how your order is doing
            </Text>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>Terms & Conditions </Text>
            <View style={styles.termsSection}>
                <Text 
                  style={styles.policyText}
                >
                  I have read and agree with the user terms of service and I understand that my personal data will be processed in accordance with Just You privacy statment.  
                </Text> 
              <FlipToggleButton
                value={isTermsConditions}
                onToggle={(newState) => handleTermsToggleChange(newState)}
              />
            </View>      
          </View>
          <TouchableOpacity
                  onPress={()=>handleReadMore()}
                  style={styles.readMoreContainer}
              >
                  <Text style={styles.readMoreText}>
                      Read more
                  </Text>
              </TouchableOpacity>  

          
          {isPermissionsNotConfirmed ?
          <Text style={styles.permissionsErrorText}>Please allow both permissions to continue the registration</Text>
          :null}

        {!isTermsConditions && !isPermissionsNotConfirmed ?
          <Text style={styles.permissionsErrorText}>Please aggre to our terms & conditions </Text>
          :null}

          <View style={styles.nextButtonContainer}>
          <AppButton 
              title="Next"
              onPress={handleNext}
            />
          </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height,
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    arrowImage: {
      marginTop: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .0483
    },
    upperContainer: {
      height: Dimensions.get('window').height * .275,
    },
    profileDetailesText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .042,
      marginLeft: Dimensions.get('window').width * .0483
    },
    fillTheFieldsText: {
      marginTop: Dimensions.get('window').height * .01,
      fontSize: Dimensions.get('window').height * .025,
      marginLeft: Dimensions.get('window').width * .0483
    },
    countryContainer: {
      marginTop: Dimensions.get('window').height * .022,
      height: Dimensions.get('window').height * .11,
    },
    countryTitle: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0483
    },
    countryErrorText: {
      textAlign:'center',
      color: 'red',
      fontSize: Dimensions.get('window').height * .019
    },
    permissionsContainer: {
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .24,
      marginTop: Dimensions.get('window').height * .02,
      marginLeft: Dimensions.get('window').width * .0483
    },
    permissionsText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .029
    },
    permissionsSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .03,
      marginRight: Dimensions.get('window').width * .0483,
      marginTop: Dimensions.get('window').height * .022
    },
    permissionsErrorText: {
      textAlign:'center',
      color: 'red',
      fontSize: Dimensions.get('window').height * .018,
      marginTop: Dimensions.get('window').height * .015
    }, 
    termsContainer: {
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .15,
      marginTop: Dimensions.get('window').height * .03,
      marginLeft: Dimensions.get('window').width * .0483
    },
    termsText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .029
    },
    termsSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: Dimensions.get('window').width * .0483,
    },
    nextButtonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
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
    policyText: {
      marginTop: Dimensions.get('window').height * .01,
      width: Dimensions.get('window').width * .7,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .017
  },
  readMoreText: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height * .015,
  },
  readMoreContainer: {
    marginTop: Dimensions.get('window').height * .01,
    marginLeft: Dimensions.get('window').width * .0483
  },
  containerUSA: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    width: Dimensions.get('window').width * .95, 
    alignItems: 'center',
    marginTop: 20
  },
  viewUSA: {
    width: Dimensions.get('window').width * .825,
    height: 60,
    justifyContent: 'center',
    borderColor: 'deepskyblue',
    borderRadius: 17,
    borderWidth: 2,
    alignItems: 'center'
  },
  textUSA: {
    color: 'black',
    fontSize: 20,
    fontWeight: '300'
  },
  image: {
    width: 60,
    height: 60
  }
  });

  export default ProfileDetailsPage1Trainer;
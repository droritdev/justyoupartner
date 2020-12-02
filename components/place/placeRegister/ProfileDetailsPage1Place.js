import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipToggle from 'react-native-flip-toggle-button';
import {Dropdown} from 'react-native-material-dropdown'

import PickCountry from '../../globalComponents/PickCountry';
import {CountryContext} from '../../../context/placeContextes/CountryContext';

//Here the user picks his country and grante the push and location pemissions
const ProfileDetailsPage1Place = ({navigation}) => {
    const {country, dispatchCountry} = useContext(CountryContext);
    const [isLocationPermission, setIsLocationPermission] = useState(true);
    const [isPushPermission, setIsPushPermission] = useState(true);
    const [isPermissionsNotConfirmed, setIsPermissionsNotConfirmed] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Pick a country");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [isCountryErrorMessage, setIsCountryErrorMessage] = useState(false);
    const [countryErrorMessage,setCountryErrorMessage] = useState("Pick a country");
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
      navigation.navigate('CreatePasswordPlace');
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
      setIsCountryErrorMessage(false);
      setIsPermissionsNotConfirmed(false);
      setCountryErrorMessage("");
      setVisible(true);
    }

    //Closes the country picker modal
    const handleOnModalClose = () => {
      setIsCountryErrorMessage(false);
      setIsPermissionsNotConfirmed(false);
      setCountryErrorMessage("");
      setVisible(false);
    }

    //Sets the location permission to the value
    const handleLocationToggleChange = (newState) => {
      setIsCountryErrorMessage(false);
      setIsPermissionsNotConfirmed(false);
      setCountryErrorMessage("");
      setIsLocationPermission(newState);
    }

    //Sets the push permission to the value
    const handlePermissionToggleChange = (newState) => {
      setIsCountryErrorMessage(false);
      setIsPermissionsNotConfirmed(false);
      setCountryErrorMessage("");
      setIsPushPermission(newState);
    }
    
    //Handle the next button press - if ok, navigates to ProfileDetailsPage2
    const handleNext = () => {
      if(!isCountrySelected){
        setCountryErrorMessage("You must pick a country");
        setIsCountryErrorMessage(true);
      }
      else if(!isLocationPermission || !isPushPermission){
        setIsPermissionsNotConfirmed(true);
      }
      else{
        setIsPermissionsNotConfirmed(false);
        dispatchCountry({
          type: 'SET_COUNTRY',
          country: selectedCountryName
        });
        navigation.navigate('ProfileDetailsPage2Place');
      }
    }
  
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={handleArrowButton}
        >
          <Image
            source={require('../../../images/arrowBack.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
        <View style={styles.upperContainer}>
          <Text style={styles.profileDetailesText}>Profile Details</Text>
          <Text style={styles.fillTheFieldsText}>Please fill out all fields:</Text>
          <View style={styles.countryContainer}>
              <Text style={styles.countryTitle}>Country</Text>
              <View styles={styles.countryPicker}>
                <PickCountry
                  initValue={selectedCountry}
                  onChange={(option) => handleOnChangeCountry(option.label)}
                  visible={visible}
                  onModalClose={() => handleOnModalClose()}
                  onPress={() => handleOnWorldIconPress()}
                />
                {isCountryErrorMessage ? 
                  <Text style={styles.countryErrorText}>{countryErrorMessage}</Text>
                : null}
              </View>
          </View>
        </View>
        <View style={styles.permissionsContainer}>
          <Text style={styles.permissionsText}>Permissions</Text>
          <View style={styles.permissionsSection}>
            <Text 
              style={{fontWeight: 'bold', fontSize: 20}}
            >Location</Text>
            <FlipToggle
              value={isLocationPermission}
              buttonHeight={30}
              buttonWidth={70}
              buttonRadius={40}
              sliderWidth={35}
              sliderHeight={30}
              sliderRadius={50}
              sliderOffColor={'black'}
              sliderOnColor={'white'}
              buttonOffColor={'grey'}
              buttonOnColor={'deepskyblue'}
              onToggle={(newState) => handleLocationToggleChange(newState)}
            />
          </View>
          <Text style={{color: 'grey'}}>By sharing your location you'll see which instructors and sport clubs are next to you
          </Text>
          <View style={styles.permissionsSection}>
            <Text 
              style={{fontWeight: 'bold', fontSize: 20}}
            >Allow push notifications</Text>
            <FlipToggle
              value={isPushPermission}
              buttonHeight={30}
              buttonWidth={70}
              buttonRadius={40}
              sliderWidth={35}
              sliderHeight={30}
              sliderRadius={50}
              sliderOffColor={'black'}
              sliderOnColor={'white'}
              buttonOffColor={'grey'}
              buttonOnColor={'deepskyblue'}
              onToggle={(newState) => handlePermissionToggleChange(newState)}
            />
          </View>
          <Text style={{color: 'grey'}}>
            We'll let you know how your order is doing
          </Text>
        </View>
        {isPermissionsNotConfirmed ?
        <Text style={styles.permissionsErrorText}>Please allow both permissions to continue the registration</Text>
        :null}
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
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
      marginTop: Dimensions.get('window').height * .033,
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .275,
    },
    profileDetailesText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0424,
      marginLeft: Dimensions.get('window').width * .0483
    },
    fillTheFieldsText: {
      fontSize: Dimensions.get('window').height * .0278,
      marginLeft: Dimensions.get('window').width * .0483
    },
    countryContainer: {
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
      fontSize: Dimensions.get('window').height * .0167,
      marginTop: Dimensions.get('window').height * .0055
    },
    permissionsContainer: {
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .24,
      marginTop: 70,
      marginLeft: Dimensions.get('window').width * .0483
    },
    permissionsText: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0278
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
      fontSize: Dimensions.get('window').height * .0167,
      marginTop: Dimensions.get('window').height * .0278
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
  });

  export default ProfileDetailsPage1Place;
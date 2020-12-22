import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {PhoneContext} from '../../../context/placeContextes/PhoneContext';
 
//Here the user enters his full phone number (area code and phone number) and verify it with a code sent to his phone
const PhoneNumberVerificationPlace = ({navigation}) => {
    const {dispatchArea} = useContext(PhoneContext);
    const {dispatchNumber} = useContext(PhoneContext);
    const [areaCodeInput, setAreaCodeInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");
    const [fullPhoneNumber, setFullPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isNextError, setIsNextError] = useState(false);
    const [nextErrorMessage, setNextErrorMessage] = useState("");
  
    const config = {
      withCredentials: true,
      baseURL: 'http://localhost:3000/',
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Sets the areaCode object to the value
    const handleOnChangeAreaCode = (value) => {
      setIsNextError(false);
      setPhoneErrorMessage(false);
      setAreaCodeInput(value);
    }

    //Sets the phoneNumebr object to the value
    const handleOnChangePhoneNumber = (value) => {
      setIsNextError(false);
      setPhoneErrorMessage(false);
      setPhoneNumberInput(value);
    }

    //Sets the code object to the value
    const handleOnChangeCode = (value) => {
      setIsNextError(false);
      setPhoneErrorMessage(false);
      setCode(value);
    }

    //When pressed, the verify button checks if the numebr is valid and calls the sendVerificationCode function
    const handleVerify = () => {
      let areaCodeTemp = Number(areaCodeInput);
      let phoneNumberTemp = Number(phoneNumberInput);

      if(areaCodeInput === "" || phoneNumberInput == ""){
        setPhoneErrorMessage("Both fields are required");
        setIsPhoneError(true);
        setIsNextError(true);
      }
      else if(!(Number.isInteger(areaCodeTemp)) || !(Number.isInteger(phoneNumberTemp))){
        setPhoneErrorMessage("Enter digits only")
        setIsPhoneError(true);
        setIsNextError(true);
      }
      else if(areaCodeInput.length != 3 || phoneNumberInput.length != 7){
        setPhoneErrorMessage("Enter a valid phone number")
        setIsPhoneError(true);
        setIsNextError(true);
      }
      else{
        setIsPhoneError(false);
        setIsNextError(false);
        setFullPhoneNumber("+972"+(areaCodeInput.concat(phoneNumberInput)));
        sendVerificationCode();
      }
    }

    //The function who sends the verify code to the user
    const sendVerificationCode = () => {
      if(isPhoneError){
        setNextErrorMessage("You must set all valid fields to continue");
        setIsNextError(true);
      }
      else{
        //alert("ok");
        // alert(fullPhoneNumber)
        // axios
        //   .post('/send-verification-code', {
        //     to: fullPhoneNumber,
        //     channel: "sms"
        //   },
        //   config
        //   )
        //   .then((res) => {
        //     if(res !== null) {
        //       if(res.data.status === 'pending'){
        //         alert("pending");
        //       }
        //       else{
        //         alert("Error 1");
        //       }
        //     }
        //     else{
        //       alert("Error 2");
        //     }
        //   }
        //   )
        //   .catch((error) => {
        //     alert(error)
        //   })
        }
    }

    //When preesed, the app checks if the code (when entered) is equal to the code was sent to the user - if so, navigates to the DonePopIp page
    const handleNext = () => {
      if(areaCodeInput === "" || phoneNumberInput === ""){
        setNextErrorMessage("Fill the fields to verify your phone number");
        setIsNextError(true);
      }
      else if(code === ""){
        setNextErrorMessage("Enter your code to continue");
        setIsNextError(true);
      }
      else if(!Number(code)){
        setNextErrorMessage("Enter only digits");
        setIsNextError(true);
      }
      else if(code.length !== 5){
        setNextErrorMessage("Code should be 5 digits");
        setIsNextError(true);
      }
      else{
        navigation.navigate('DonePopUpPlace');
        // axios
        //   .post('/verify-code', {
        //     to: fullPhoneNumber,
        //     code: code
        //   },
        //   config
        //   )
        //   .then((res) => {
        //     if(res !== null) {
        //       if(res.data.status === 'approved'){
        //         alert("approved");
        //         dispatchArea({
        //           type: 'SET_AREA_CODE',
        //           areaCode: areaCodeInput
        //         });
        
        //         dispatchNumber({
        //           type: 'SET_PHONE_NUMBER',
        //           phoneNumber: phoneNumberInput
        //         })
        //         navigation.navigate('DonePopUpPlace');
        //       }
        //       else{
        //         alert("Error 1");
        //       }
        //     }
        //     else{
        //       alert("Error 2");
        //     }
        //   }
        //   )
        //   .catch((error) => {
        //     alert(error)
        //   })
        }
    }
  
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.justYouHeader}>Just You</Text>
              <Text style={styles.partnerHeader}>Partner</Text>
            </View>
            <View style={styles.phoneContainer}>
              <Text style={styles.inputTitle}>PHONE NUMBER</Text>
              <View style={styles.phoneTextInput}>
              <TextInput
                  style={styles.areaCodeInput}
                  textAlign='center'
                  placeholder='+001'
                  onChangeText={text => handleOnChangeAreaCode(text)}
              />
              <TextInput
                  style={styles.phoneNumberInput}
                  textAlign='center'
                  placeholder='00000000000'
                  onChangeText={text => handleOnChangePhoneNumber(text)}
              />
              </View>
              {isPhoneError ?
              <Text style={styles.phoneErrorMessage}>{phoneErrorMessage}</Text>
              :null}
              <View style={styles.verifyExplenationContainer}>
              <Text style={styles.verifyExplenationText}>Adding your phone number will strengthen your account security. We'll send you a text with a 5-digit code to verify your account.</Text>
              </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={() => handleVerify()}
                >
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.codeTextInput}>
              <TextInput
                  style={{fontSize: Dimensions.get('window').height * .025}}
                  placeholder='Enter your code'
                  textAlign='center'
                  onChangeText={text => handleOnChangeCode(text)}
              />
            </View>
            <View>
                <TouchableOpacity 
                  style={styles.sendAgainButton}
                  onPress={() => sendVerificationCode()}
                >
                  <Text style={styles.resendCodeText}>No SMS? Tap to resend</Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.nextButtonContainer}>
              {isNextError ?
              <Text style={styles.nextErrorMessage}>{nextErrorMessage}</Text>
              :null}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => handleNext()}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height,
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    headerContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    justYouHeader: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .033
    },
    partnerHeader: {
      color: 'deepskyblue',
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .022
    },
    phoneContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * .19,
      marginTop: Dimensions.get('window').height * .044
    },
    inputTitle: {
      fontSize: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .0483
    },
    phoneTextInput: {
      flexDirection: 'row',
      borderColor: 'deepskyblue',
      justifyContent: 'center',
      fontSize: Dimensions.get('window').height * .025
    },
    areaCodeInput: {
        borderRadius: 20,
        marginRight: Dimensions.get('window').width * .0241,
        borderColor: 'deepskyblue',
        borderWidth: 3,
        height: Dimensions.get('window').height * .06,
        width: Dimensions.get('window').width * .3,
        fontSize: Dimensions.get('window').height * .025
    },
    phoneNumberInput: {
        borderRadius: 20,
        borderColor: 'deepskyblue',
        borderWidth: 3,
        height: Dimensions.get('window').height * .06,
        width: Dimensions.get('window').width * .6,
        fontSize: Dimensions.get('window').height * .025
    },
    phoneErrorMessage: {
        color: 'red',
        marginLeft: Dimensions.get('window').width * .0483
    },
    verifyExplenationContainer: {
        width: Dimensions.get('window').width * .8,
        alignSelf: 'center'
    },
    verifyExplenationText: {
        textAlign:'center',
        fontSize: Dimensions.get('window').height * .0189,
    },
    verifyButton: {
        marginTop: Dimensions.get('window').height * .044,
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    verifyButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    },
    codeTextInput: {
        borderColor: 'deepskyblue',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .07,
        width: Dimensions.get('window').width * .9,
        marginTop: Dimensions.get('window').height * .077,
        justifyContent: 'center',
        fontSize: Dimensions.get('window').height * .025,
        alignSelf: 'center'
    },
    sendAgainButton: {
      marginTop: Dimensions.get('window').height * .066,
      width: Dimensions.get('window').width * .55,
      height: Dimensions.get('window').height * .04,
      backgroundColor: 'lightgrey',
      borderRadius: 5,
      justifyContent: 'center',
      marginLeft: Dimensions.get('window').width * .0483
    },
    resendCodeText: {
      color: 'deepskyblue', 
      fontSize: Dimensions.get('window').height * .022,
      fontWeight: '600',
      alignSelf: 'center'
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
    nextErrorMessage: {
        color: 'red',
        marginLeft: Dimensions.get('window').width * .0483,
        marginBottom: Dimensions.get('window').height * .022
    }
});

export default PhoneNumberVerificationPlace;
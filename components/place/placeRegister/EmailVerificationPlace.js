import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {EmailContext} from '../../../context/placeContextes/EmailContext';
import AppButton from '../../globalComponents/AppButton';

//Here the user enters the verification code he recived to his mail address
const EmailVerificationPlace = ({navigation}) => {
    const {emailAddress, dispatchEmail} = useContext(EmailContext);
    const [code, setCode] = useState("");
    const [codeErrorMessage, setCodeErrorMessage] = useState("");
    const [isErrorCodeMessage, setIsErrorCodeMessage] = useState(false);

    const config = {
      withCredentials: true,
      baseURL: 'https://trainer.iqdesk.info:443/',
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Navigate back to the SignUp page
    const handleArrowButton = () => {
      dispatchEmail({
        type: 'SET_EMAIL_ADDRESS',
        emailAddress: ""
      })
      navigation.navigate('SignUpPlace');
    }

    //Set the code to the value in the text field
    const handleOnInputChange = (text) => {
      setIsErrorCodeMessage(false);
      setCode(text);
      if(Number(text) && text.length === 5){
        setIsErrorCodeMessage(false);
      }
    }

    //Re-send the verification code
    const sendVerifyEmail = () => {
      alert('Email sent');
        // axios
        //   .post('/send-verification-code', {
        //     to: emailAddress,
        //     channel: "email"
        //   },
        //   config
        // )
        // .then((res) => {
        //   if(res !== null) {
        //     if(res.data.status === 'pending'){
        //       alert('pending')
        //     }
        //     else{
        //       alert(res.data);
        //     }
        //   }
        //   else{
        //     alert("Error 2");
        //   }
        // }
        // )
        // .catch((error) => {
        //   alert(error)
        // })
    }

    //Handle the next button press
    const handleNext = () => {
      if(code === ""){
        setCodeErrorMessage("You didnt enter the code");
        setIsErrorCodeMessage(true);
      }
      else if(!(Number(code))){
        setCodeErrorMessage("Enter digits only");
        setIsErrorCodeMessage(true);
      }
      else if(code.length < 5 || code.length > 5 ){
        setCodeErrorMessage("Code is 5 digits");
        setIsErrorCodeMessage(true);
      }
      else{
        setIsErrorCodeMessage(false);
        navigation.navigate('CreatePasswordPlace');
        // axios
        //   .post('/verify-code', {
        //     to: emailAddress,
        //     code: code
        //   },
        //   config
        // )
        // .then((res) => {
        //   if(res !== null) {
        //     if(res.data.status === 'approved'){
        //       alert("ok");
        //       setIsErrorCodeMessage(false);
        //       setCodeErrorMessage("");
        //       navigation.navigate('CreatePasswordPartner');
        //     }
        //     else{
        //       setCodeErrorMessage("Wrong Code - try again");
        //       alert("error");
        //     }
        //   }
        //   else{
        //     alert("Error2")
        //   }
        // }
        // )
        // .catch((error) => {
        //   alert(error)
        // })
      }
    }

    //Handle the Re-send button press
    const handleResendEmail = () => {
      sendVerifyEmail();
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
        <Text style={styles.verifyEmailTitle}>Verify email</Text>
        <Text style={styles.verifyEmailText}>We've sent a code to {<Text style={{color: 'deepskyblue'}}>{emailAddress}</Text>}. To continue, enter your code here bellow.</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your code'
            textAlign='center'
            onChangeText={text => handleOnInputChange(text)}
          />
          {isErrorCodeMessage ?
            <Text style={styles.codeErrorText}>{codeErrorMessage}</Text>
          :null}
        </View>
        <View style={styles.fotterContainer}>
            <Text style={styles.didntGetEmailText}>Didn't get an email? Please make sure we have your email address right, or maybe it went to spam</Text>
            <TouchableOpacity 
              style={styles.sendAgainButton}
              onPress={handleResendEmail}
            >
              <Text style={styles.sendAgainButtonText}>Resend email</Text> 
            </TouchableOpacity>
        </View>
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
      flexDirection: 'column',
      height: Dimensions.get('window').height,
      backgroundColor: 'white'
    },
    arrowImage: {
        marginTop: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483
    },
    verifyEmailTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .044,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .033
    },
    verifyEmailText: {
        width: Dimensions.get('window').width * .875,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .028,
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483
    },
    textInputContainer: {
      height: Dimensions.get('window').height * .25
    },
    textInput: {
        borderColor: 'deepskyblue',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .08,
        marginRight: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .066,
        justifyContent: 'center',
        fontSize: Dimensions.get('window').height * .0267,
        marginLeft: Dimensions.get('window').width * .0483,
        fontSize: Dimensions.get('window').height * .033
    },
    codeErrorText: {
      textAlign:'center',
      color: 'red',
      fontSize: Dimensions.get('window').height * .022,
      marginTop: Dimensions.get('window').height * .0055
    },
    fotterContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginLeft: Dimensions.get('window').width * .0483,

    },
    didntGetEmailText: {
      width: Dimensions.get('window').width * .9,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .028
    },
    sendAgainButton: {
      marginTop: Dimensions.get('window').height * .022,
      width: Dimensions.get('window').width * .35,
      height: Dimensions.get('window').height * .035,
      backgroundColor: 'lightgrey',
      borderRadius: 5,
      justifyContent: 'center'
    },
    sendAgainButtonText: {
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
      fontSize: Dimensions.get('window').height * .028,
      fontWeight: 'bold',
      color: 'white'
    },
  });

  export default EmailVerificationPlace;
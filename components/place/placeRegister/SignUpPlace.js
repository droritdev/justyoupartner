import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import {EmailContext} from '../../../context/placeContextes/EmailContext';

//Here the user enters his email address to verify his account
const SignUpPlace = ({navigation}) => {
    const {dispatchEmail} = useContext(EmailContext);
    const [emailIsValidate, setEmailIsValidate] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [emailAddressInput, setEmailAddressInput] = useState("");
    const [inputIsValid,setInputIsValid] = useState(false);

    const config = {
      withCredentials: true,
      baseURL: 'http://justyou.iqdesk.info:8081/',
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Navigates back to the SignUpAs page
    const handleArrowButton = () => {
      navigation.navigate('SignUpAs');
    }

    //Navigate to Login page
    const handleSignIn = () => {
      navigation.navigate('LogInPlace');
    }

    //Send the verification code to the user's email
    const sendVerifyEmail = () => {
      navigation.navigate('EmailVerificationPlace');
        // axios
        //   .post('/send-verification-code', {
        //     to: emailAddressInput,
        //     channel: "email"
        //   },
        //   config
        // )
        // .then((res) => {
        //   if(res !== null) {
        //     if(res.data.status === 'pending'){
        //       navigation.navigate('EmailVerificationPlace')
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

    //Set the emailAddressInput to the value in the text field
    const handleInput = (text) => {
      setEmailAddressInput(text);
      setEmailErrorMessage(false);
      let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(mailformat.test(text)){
        setEmailIsValidate(true);
        setInputIsValid(true);
      }
      else{
        setInputIsValid(false);
      }
    }

    //Handle the next button press to send the verify code
    const handleNext = () => {
      if(inputIsValid){
        dispatchEmail({
          type: 'SET_EMAIL_ADDRESS',
          emailAddress: emailAddressInput.toLowerCase()
        });
        sendVerifyEmail();
      }
      else if(emailAddressInput === ""){
        setEmailErrorMessage("Email address is required");
        setEmailIsValidate(false);
      }
      else{
        dispatchEmail({
          type: 'SET_EMAIL_ADDRESS',
          emailAddress: ""
        });
        setEmailErrorMessage("Enter a valid email address");
        setEmailIsValidate(false);
      }
    }
  
    return(
      <View style={styles.container}>
        <TouchableOpacity
            onPress={handleArrowButton}
        >
            <Image
                source={require('../../../images/arrowBack.png')}
                style={styles.arrowImage}
            />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
            <Text style={styles.justYouHeader}>Just You</Text>
            <Text style={styles.PartnerText}>Partner</Text>
        </View>
        <Text style={styles.signUpText}>Sign up and start searching</Text>
        <Text style={styles.inputTitle}>Email</Text>
        <View style={styles.textInput}>
          <TextInput
            style={{fontSize: 25}}
            textAlign='center'
            placeholder='Enter your email address'
            onChangeText={text => handleInput(text)}
            value={emailAddressInput}
          />
        </View>
        <View>
            {!emailIsValidate ?
            <Text style={styles.emailErrorText}>{emailErrorMessage}</Text>
            :null}   
        </View>
        <View style={styles.fotterContainer}>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => handleNext()}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          <View style={styles.alreadyHaveAccountContainer}>
            <Text style={styles.alreadyHaveAnAccountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => handleSignIn()}
            >
            <Text style={styles.signInText}>Sign In</Text> 
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height,
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    arrowImage: {
      marginTop: Dimensions.get('window').height * .0781,
      marginLeft: Dimensions.get('window').width * .0483
    },
    headerContainer: {
      marginLeft: Dimensions.get('window').width * .0483,
      marginTop: Dimensions.get('window').height * .033,
      width: Dimensions.get('window').width * .297
    },
    justYouHeader: {
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .033
    },
    PartnerText: {
      marginTop: Dimensions.get('window').height * .0055,
      color: 'deepskyblue',
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .022,
      textAlign: 'center'
    },
    signUpText: {
      fontSize: Dimensions.get('window').height * .044,
      fontWeight: 'bold',
      width: Dimensions.get('window').width * .8,
      marginTop: Dimensions.get('window').height * .033,
      marginLeft: Dimensions.get('window').width * .0483,
    },
    inputTitle: {
      marginTop: Dimensions.get('window').height * .066,
      fontSize: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .0483,
    },
    textInput: {
      borderColor: 'deepskyblue',
      borderRadius: 20,
      borderWidth: 3,
      height: Dimensions.get('window').height * .08,
      marginRight: Dimensions.get('window').width * .0483,
      marginTop: Dimensions.get('window').height * .00892,
      justifyContent: 'center',
      marginLeft: Dimensions.get('window').width * .0483,
    },
    emailErrorText: {
        textAlign:'center',
        color: 'red',
        fontSize: Dimensions.get('window').height * .022
    },
    fotterContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: Dimensions.get('window').height * .044,
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
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * .022
  },
    alreadyHaveAnAccountText: {
      color: 'grey'
    },
    signInText: {
      fontWeight: 'bold',
      color: 'deepskyblue'
    }
});

export default SignUpPlace;
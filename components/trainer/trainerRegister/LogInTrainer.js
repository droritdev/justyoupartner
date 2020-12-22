import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, SafeAreaView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import {EmailContext} from '../../../context/trainerContextes/EmailContext';
import {PasswordContext} from '../../../context/trainerContextes/PasswordContext';

//The log in page for exsisting users
const LogInTrainer = ({navigation}) => {
    const {emailAddress, dispatchEmail} = useContext(EmailContext);
    const {password, dispatchPassword} = useContext(PasswordContext);

    const [isErrorMessage, setIsErrorMessage] = useState(false);
    
    const [errorMessage, setErrorMessage] = useState("");

    const [emailAddressInput, setEmailAddressInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    //Navigates back to the SignUpTrainer page
    const handleArrowButton = () => {
        navigation.navigate('SignUpTrainer');
    }


    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;



    //Auth user with Firebase after validation and login button click
    //After auth is complete, navigate to welcome page
    const authUser = () => {
        auth()
        .signInWithEmailAndPassword(emailAddressInput, passwordInput)
        .then(() => {
            dispatchEmail({
                type: 'SET_EMAIL_ADDRESS',
                emailAddress: emailAddressInput
              });
              dispatchPassword({
                type: 'SET_PASSWORD',
                password: passwordInput
              });
            navigation.navigate('WelcomeTrainer');
        })
        .catch(error => {
            alert("The user doesn't exist");
        });
    }


    //Handle when user enters his email address
    const handleOnChangePhoneEmail = (text) => {
        setEmailAddressInput(text);
        setIsErrorMessage(false);
        let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(mailformat.test(text)){
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    //Handle when user enters his password
    const handleOnChangePassword = (text) => {
        setPasswordInput(text);
        setIsErrorMessage(false);
    }


    //Handle when user presses the log in button to try and log in to his user
    const handleLogInButton = () => {
        if(emailAddressInput == "" && passwordInput == "") {
            setErrorMessage("Both fields are required");
            setIsErrorMessage(true);
        }
        else if(emailAddressInput == "") { 
            setErrorMessage("Email address is required");
            setIsErrorMessage(true);
        }

        else if(passwordInput == "") {
                setErrorMessage("Password is required");
                setIsErrorMessage(true);
        } 
        else if (isEmailValid && passwordInput != "") {
            authUser();
        }
        else if (!isEmailValid) {
            setErrorMessage("Email is not valid");
            setIsErrorMessage(true);
        }
        else {
            setIsErrorMessage(true);
        }
    }

    //Navigates back to the SignUp page
    const handleSignUpButton = () => {
        navigation.navigate('SignUpTrainer');
    }

    //Navigates to the ForgotPassword page when the user dont remember his password
    const handleForgotPasswordButton = () => {
        navigation.navigate('ForgotPasswordTrainer');
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
            <View style={styles.headerContainer}>
                <Text style={styles.justYouTitle}>Just You</Text>
                <Text style={styles.partnerText}>Partner</Text>
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email address'
                    placeholderTextColor='grey'
                    onChangeText={(value) => handleOnChangePhoneEmail(value)}
                    value={emailAddressInput}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor='grey'
                    onChangeText={(value) => handleOnChangePassword(value)}
                    value={passwordInput}
                />
            </View>
            {!isErrorMessage ? null:
              <Text style={styles.errorText}>{errorMessage}</Text>}   
            <TouchableOpacity
                onPress={handleForgotPasswordButton}
            >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.logInButtonContainer}>
                <TouchableOpacity
                    style={styles.logInButton}
                    onPress={handleLogInButton}
                >
                    <Text style={styles.logInButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.alreadyHaveAccountContainer}>
                    <Text style={styles.alreadyHaveAnAccountText}>Don't have an account? </Text>
                        <TouchableOpacity
                        onPress={handleSignUpButton}
                        >
                        <Text style={styles.signInText}>Sign Up</Text> 
                        </TouchableOpacity>
                </View>
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
    headerContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    justYouTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .05,
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
    },
    inputsContainer: {
        marginTop: Dimensions.get('window').height * .055,
        flexDirection: 'column',
        //height: Dimensions.get('window').height * .2,
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .075,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .033
    },
    errorText: {
        marginTop: Dimensions.get('window').height * .010,
        textAlign:'center',
        color: 'red',
        fontSize: Dimensions.get('window').height * .022
    },
    forgotPassword: {
        alignSelf: 'center',
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018,
        marginTop: Dimensions.get('window').height * .033
    },
    logInButtonContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .088
    },
    logInButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    logInButtonText: {
        fontSize: Dimensions.get('window').height * .028,
        fontWeight: 'bold',
        color: 'white'
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center'
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

export default LogInTrainer;
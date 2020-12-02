import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, SafeAreaView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

//Here the existing user logs back in to the app
const LogInPlace = ({navigation}) => {
    const [phoneEmailInput, setPhoneEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    //Navigates back to the SignUp page
    const handleArrowButton = () => {
        navigation.navigate('SignUpPlace');
    }

    //Handle the user input when enters his phone or email address
    const handleOnChangePhoneEmail = (value) => {
        setIsErrorMessage(false);
        setPhoneEmailInput(value);
    }

    //Handle the user input when enters his password
    const handleOnChangePassword = (value) => {
        setIsErrorMessage(false);
        setPasswordInput(value);
    }

    //If logged in, Navigates to the profile page
    const handleLogInButton = () => {
        if(phoneEmailInput === ""){
            setIsErrorMessage(true);
            setErrorMessage("Enter phone number or email")
        }
        else if(passwordInput === ""){
            setIsErrorMessage(true);
            setErrorMessage("Enter password")
        }
        // navigation.navigate('WelcomePlace');
    }

    //Navigates back to the SignUp page
    const handleSignUpButton = () => {
        navigation.navigate('SignUpPlace');
    }

    //Navigates to the Reset password page
    const handleForgotPasswordButton = () => {
        navigation.navigate('ForgotPasswordPlace');
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
            <Text style={styles.justYouTitle}>Just You</Text>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Phone number or Email'
                    placeholderTextColor='grey'
                    onChangeText={(value) => handleOnChangePhoneEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='grey'
                    onChangeText = {(value) => handleOnChangePassword(value)}
                />
                {isErrorMessage ?
                    <Text style={styles.ErrorMessage}>{ErrorMessage}</Text>
                :null}
                <TouchableOpacity
                    onPress={handleForgotPasswordButton}
                >
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
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
    justYouTitle: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .05,
        alignSelf: 'center'
    },
    inputsContainer: {
        marginTop: Dimensions.get('window').height * .1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .23
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .066,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center'
    },
    ErrorMessage: {
        textAlign: 'center',
        color: 'red'
    },  
    forgotPassword: {
        alignSelf: 'center',
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    logInButtonContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .07
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
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
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

export default LogInPlace;
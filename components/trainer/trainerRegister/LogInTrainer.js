import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, SafeAreaView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import {PasswordContext} from '../../../context/trainerContextes/PasswordContext';

//The log in page for exsisting users
const LogInTrainer = ({navigation}) => {
    const {dispatchPasswrod} = useContext(PasswordContext);
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    //Navigates back to the SignUpTrainer page
    const handleArrowButton = () => {
        navigation.navigate('SignUpTrainer');
    }

    //Handle when user enters his phone/email address
    const handleOnChangePhoneEmail = () => {

    }

    //Handle when user presses the log in button to try and log in to his user
    const handleLogInButton = () => {
        navigation.navigate('WelcomeTrainer');
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
                    placeholder='Phone number or Email'
                    placeholderTextColor='grey'
                    onChangeText={(value) => handleOnChangePhoneEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='grey'
                />
                <View>
                    {isPasswordErrorMessage ?
                        <Text>Passwords not matched</Text>
                    :null}
                </View>
            </View>
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
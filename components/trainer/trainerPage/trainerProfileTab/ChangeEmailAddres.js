import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import {EmailContext} from '../../../../context/trainerContextes/EmailContext';

const ChangeEmailAddress = ({navigation}) => {
    const {emailAddress, dispatchEmail} = useContext(EmailContext);

    const [emailAddressInput, setEmailAddressInput] = useState("");
    const [codeInput, setCodeInput] = useState("");

    const [isCodeSent, setIsCodeSent] = useState('none');
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isCodeError, setIsCodeError] = useState(false);
    const [codeErrorMessage, setCodeErrorMessage] = useState("");

    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const sendVerifyEmail = () => {
        alert("Code sent");
        //   axios
        //     .post('/send-verification-code', {
        //       to: emailAddress,
        //       channel: "email"
        //     },
        //     config
        //   )
        //   .then((res) => {
        //     if(res !== null) {
        //       if(res.data.status === 'pending'){
        //           alert("Code sent");
        //       }
        //       else{
        //         alert(res.data);
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

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerSettings');
    }

    const handleGetCodePressed = () => {
        setIsEmailError(false);
        if(emailAddressInput === ""){
            setIsEmailError(true);
            setEmailErrorMessage("Enter an email address");
        }
        else if(!(mailformat.test(emailAddressInput))){
            setIsEmailError(true);
            setEmailErrorMessage("Enter a valid email address");
        }
        // else if(emailAddressInput.toLowerCase() !== emailAddress){
        //     setIsEmailError(true);
        //     setEmailErrorMessage("Enter your current email address");
        // }
        else{
            setIsCodeSent('flex');
            sendVerifyEmail();
        }
    }

    const HandleOnEmailInputChange = (value) => {
        setIsEmailError(false);
        setEmailAddressInput(value);
    }

    const handleOnCodeInputChange = (value) => {
        setIsEmailError(false);
        setIsCodeError(false);
        setCodeInput(value);
    }

    const handleApprovePressed = () => {
        if(isCodeSent){
            if(codeInput === ""){
                setIsCodeError(true);
                setCodeErrorMessage("Enter the code");
            }
            else if(!(Number(codeInput))){
                setIsCodeError(true);
                setCodeErrorMessage("Enter digits only");
            }
            else if(codeInput.length != 5){
                setIsCodeError(true);
                setCodeErrorMessage("Code is 5 digits");
            }
            else{
                navigation.navigate('TrainerSettings');
                // axios
                // .post('/verify-code', {
                //   to: emailAddress,
                //   code: codeInput
                // },
                // config
                // )
                // .then((res) => {
                //     if(res !== null) {
                //     if(res.data.status === 'approved'){
                //         setIsCodeError(false);
                //         navigation.navigate('TrainerSettings');
                //     }
                //     else{
                //         setIsCodeError(true);
                //         setCodeErrorMessage("Wrong Code - try again")
                //     }
                //     }
                //     else{
                //     alert("Error2")
                //     }
                // }
                // )
                // .catch((error) => {
                //     alert(error)
                // })
            }
        }
        else{
            setIsEmailError(true);
            setEmailErrorMessage("Get code first");
        }
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.titlesContainer}>
                <Text style={styles.justYouHeader}>Just You</Text>
                <Text style={styles.partnerText}>Partner</Text>
            </View>
            <TouchableOpacity
                    style={styles.arrowBackButton} 
                    onPress={() => handleOnArrowPress()}
                >
                <Image
                    source={require('../../../../images/blackArrow.png')}
                />
            </TouchableOpacity>
            <Text style={styles.changeEmailTitle}>Change email address</Text>
            <View style={styles.emailAndErrorContainer}>
                <View style={styles.emailInput}>
                    <TextInput
                        style={{fontSize: 25}}
                        textAlign='center'
                        placeholder='Enter your email address'
                        onChangeText={text => HandleOnEmailInputChange(text)}
                    />
                </View>
                {isEmailError ?
                    <Text style={styles.emailErrorMessage}>{emailErrorMessage}</Text>
                : null}
            </View>
            <Text style={styles.codeExplination}>A 5 digit code will be sent to you to confirm your new eddress</Text>
            <View style={styles.getCodeButtonContainer}>
                <TouchableOpacity
                style={styles.getCodeButton}
                onPress={() => handleGetCodePressed()}
                >
                <Text style={styles.getcodeButtonText}>Send code</Text>
                </TouchableOpacity>
            </View>
            <View display={isCodeSent}>
                <View style={styles.codeAndErrorContainer}>
                    <View style={styles.codelInput}>
                        <TextInput
                            style={{fontSize: 25}}
                            textAlign='center'
                            placeholder='Enter your code'
                            onChangeText={text => handleOnCodeInputChange(text)}
                        />
                    </View>
                    {isCodeError ? 
                        <Text style={styles.codeErrorMessage}>{codeErrorMessage}</Text>
                    : null}
                </View>
                <Text style={styles.codeExplination2}>Enter the code you recived to approve your new address</Text>
                <View style={styles.approveCodeButtonContainer}>
                    <TouchableOpacity
                    style={styles.approveCodeButton}
                    onPress={() => handleApprovePressed()}
                    >
                    <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        flexDirection: 'column'
    },
    titlesContainer: {
        alignItems: 'center',
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .033,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    arrowBackButton: {
        alignItems: 'flex-start',
        marginLeft: Dimensions.get('window').width * .047
    },
    changeEmailTitle: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .03,
    },
    emailAndErrorContainer: {
        height: Dimensions.get('window').height * .15
    },
    emailInput: {
      borderColor: 'deepskyblue',
      borderRadius: 20,
      borderWidth: 3,
      height: Dimensions.get('window').height * .085,
      marginRight: Dimensions.get('window').width * .0483,
      marginTop: Dimensions.get('window').height * .044,
      justifyContent: 'center',
      marginLeft: Dimensions.get('window').width * .0483,
    },
    emailErrorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .0033
    },
    codeExplination: {
        color: 'grey',
        fontSize: Dimensions.get('window').height * .017,
        width: Dimensions.get('window').width * .6,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .011
    },
    getCodeButtonContainer: {
        marginTop: Dimensions.get('window').height * .044
    },
    getCodeButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    getcodeButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    },
    codeAndErrorContainer: {
        height: Dimensions.get('window').height * .2
    },
    codelInput: {
        borderColor: 'deepskyblue',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .085,
        marginRight: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .088,
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width * .0483
    },
    codeErrorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .0033
    },
    codeExplination2: {
        color: 'grey',
        fontSize: Dimensions.get('window').height * .017,
        width: Dimensions.get('window').width * .7,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .011
    },
    approveCodeButtonContainer: {
        marginTop: Dimensions.get('window').height * .011,
        flex: 1,
        justifyContent: 'flex-end',
    },
    approveCodeButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    approveButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default ChangeEmailAddress;
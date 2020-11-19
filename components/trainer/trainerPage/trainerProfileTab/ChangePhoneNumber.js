import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FlipToggle from 'react-native-flip-toggle-button';

//The question and answers page
const ChangePhoneNumber = ({navigation}) => {

    const [codeInput, setCodeInput] = useState("");

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerSettings');
    }

    return(
        <SafeAreaView style={styles.container}>
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
            <Text style={styles.changePhoneTitle}>Change phone number</Text>
            <View style={styles.phoneTextInput}>
                <TextInput
                    style={styles.areaCodeInput}
                    textAlign='center'
                    placeholder='+001'
                    //onChangeText={text => handleOnChangeAreaCode(text)}
                />
                <TextInput
                    style={styles.phoneNumberInput}
                    textAlign='center'
                    placeholder='00000000000'
                    //onChangeText={text => handleOnChangePhoneNumber(text)}
                />
            </View>
            {/* {isPhoneError ?
                <Text style={styles.phoneErrorMessage}>{phoneErrorMessage}</Text>
            :null} */}
            <View style={styles.verifyExplenationContainer}>
                <Text style={styles.verifyExplenationText}>Adding your phone number will strengthen your account security. We'll send you a text with a 5-digit code to verify your account.</Text>
            </View>
            <View style={styles.verifyButtonContainer}>
                <TouchableOpacity
                    style={styles.verifyButton}
                    //onPress={handleVerify}
                >
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.codelInput}>
                <TextInput
                    style={{fontSize: 25}}
                    textAlign='center'
                    placeholder='Enter your code'
                    //onChangeText={text => handleInput(text)}
                    value={codeInput}
                />
            </View>
            <View>
                <TouchableOpacity 
                style={styles.sendAgainButton}
                //onPress={sendVerificationCode}
                >
                    <Text style={styles.resendCodeText}>No SMS? Tap to resend</Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.doneButtonContainer}>
                <TouchableOpacity
                    style={styles.doneButton}
                    //onPress={handleVerify}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}   

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titlesContainer: {
        alignItems: 'center',
    },
    justYouHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 20
    },
    arrowBackButton: {
        alignItems: 'flex-start',
        marginLeft: 15
    },
    changePhoneTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: Dimensions.get('window').height * .03,
    },
    phoneTextInput: {
        flexDirection: 'row',
        borderColor: 'deepskyblue',
        justifyContent: 'center',
        fontSize: 24,
        marginTop: 15
    },
    areaCodeInput: {
        borderRadius: 20,
        marginRight: 10,
        borderColor: 'deepskyblue',
        borderWidth: 3,
        height: Dimensions.get('window').height * .06,
        width: Dimensions.get('window').width * .3,
        fontSize: 25
    },
    phoneNumberInput: {
        borderRadius: 20,
        borderColor: 'deepskyblue',
        borderWidth: 3,
        height: Dimensions.get('window').height * .06,
        width: Dimensions.get('window').width * .6,
        fontSize: 25
    },
    phoneErrorMessage: {
        color: 'red',
        marginLeft: 25
    },
    verifyExplenationContainer: {
        width: Dimensions.get('window').width * .8,
        alignSelf: 'center',
        marginTop: 10
    },
    verifyExplenationText: {
        textAlign:'center',
        fontSize: 17,
        color: 'grey'
    },
    verifyButtonContainer: {
        marginTop: 30
    },
    verifyButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    verifyButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    codelInput: {
        borderColor: 'deepskyblue',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .06,
        marginRight: 20,
        marginTop: 80,
        justifyContent: 'center',
        marginLeft: 20
    },
    sendAgainButton: {
        marginTop: 30,
        width: Dimensions.get('window').width * .55,
        height: Dimensions.get('window').height * .04,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 20
    },
    resendCodeText: {
        color: 'deepskyblue', 
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center'
    },
    doneButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 100
    },
    doneButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    doneButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default ChangePhoneNumber;
import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {Accordion, Block} from 'galio-framework';

//The question and answers page
const ChangeEmailAddress = ({navigation}) => {

    const [emailAddressInput, setEmailAddressInput] = useState("");
    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerSettings');
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
            <View style={styles.emailInput}>
                <TextInput
                    style={{fontSize: 25}}
                    textAlign='center'
                    placeholder='Enter your email address'
                    onChangeText={text => handleInput(text)}
                    value={emailAddressInput}
                />
            </View>
            <Text style={styles.codeExplination}>A 5 digit code will be sent to you to confirm your new eddress</Text>
            <View style={styles.getCodeButtonContainer}>
                <TouchableOpacity
                style={styles.getCodeButton}
                //onPress={handleNext}
                >
                <Text style={styles.getcodeButtonText}>Get Code</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.codelInput}>
                <TextInput
                    style={{fontSize: 25}}
                    textAlign='center'
                    placeholder='Enter your code'
                    onChangeText={text => handleInput(text)}
                    value={emailAddressInput}
                />
            </View>
            <Text style={styles.codeExplination2}>Enter the code you recived to approve your new address</Text>
            <View style={styles.approveCodeButtonContainer}>
                <TouchableOpacity
                style={styles.approveCodeButton}
                //onPress={handleNext}
                >
                <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
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
    changeEmailTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: Dimensions.get('window').height * .03,
    },
    emailInput: {
      borderColor: 'deepskyblue',
      borderRadius: 20,
      borderWidth: 3,
      height: Dimensions.get('window').height * .085,
      marginRight: 20,
      marginTop: 40,
      justifyContent: 'center',
      marginLeft: 20,
    },
    codeExplination: {
        color: 'grey',
        fontSize: 15,
        width: Dimensions.get('window').width * .6,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    getCodeButtonContainer: {
        marginTop: 40
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
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    codelInput: {
        borderColor: 'deepskyblue',
        borderRadius: 20,
        borderWidth: 3,
        height: Dimensions.get('window').height * .085,
        marginRight: 20,
        marginTop: 80,
        justifyContent: 'center',
        marginLeft: 20
    },
    codeExplination2: {
        color: 'grey',
        fontSize: 15,
        width: Dimensions.get('window').width * .7,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    approveCodeButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 100
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
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default ChangeEmailAddress;
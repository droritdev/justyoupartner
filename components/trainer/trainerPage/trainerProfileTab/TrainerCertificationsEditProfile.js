import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {CertificationsContext} from '../../../../context/trainerContextes/CertificationsContext';

import AppButton from '../../../globalComponents/AppButton';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';


//Here The trainer user writes his certifications
const TrainerCertificationsEditProfile = ({navigation}) => {
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);

    const [isLimit, setIsLimit] = useState(false);
    const [charsLength, setCharsLength] = useState(0);

    const [isError, setIsError] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");

    const [oldText, setOldText] = useState(certifications);

    const charLimit = 250;

    //Sets the display text to blank if nothing was writen. If written, the details will be displayed
    useEffect(() => {
        if(certifications === 'Write your certifications...'){
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: ""
            })
            setIsLimit(true);
            setErrorMessage('Please enter at least 20 characters');
        } else {
            setCharsLength(certifications.length);
        }
    }, [])

    
     //Check if user has enterd at least 20 characters
     const handleSubmit = () => {
        if(isLimit) {
            setIsError(true);
        } else {
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: certifications
            })
            navigation.navigate('TrainerEditProfile')
        }
    }

        //Navigates back to the profile details page
        const handleArrowButton = () => {
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: oldText
            })
            navigation.navigate('TrainerEditProfile');
        }


    //Sets the deatils object to the value
    const handleOnInputChange = (value) => {
        setIsError(false);
        setIsLimit(false);

        if (value.length < 20) {
            setIsLimit(true);
            setErrorMessage('Please enter at least 20 characters');
        }
        
        if(value.length > charLimit){
            setIsError(true);
            setErrorMessage('The maximum number of characters is 250');
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: value.slice(0, charLimit)
            })
        }
        else{
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: value
            })
            setCharsLength(value.length);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            <ArrowBackButton
                onPress={handleArrowButton}
            />
                <Text style={styles.profileDetailesText}>Certifications</Text>
            </View>
            <Text style={styles.shareYourCertifications}>Share certifications (up to {charLimit} chars):  {charsLength}</Text>
            <View style={styles.textConatiner}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={certifications}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(value) => handleOnInputChange(value)}
                        focusable={true}
                    />
                </View>
            </View>
            {isError ?
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              : null}

            <View style={styles.submitButtonContainer}>
            <AppButton 
                title="Submit"
                onPress={handleSubmit}
              />
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .16,
        marginTop: Dimensions.get('window').height * .022,
        borderBottomWidth: 1,
        borderBottomColor: 'deepskyblue'
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .0483
    },
    profileDetailesText: {
        marginTop: Dimensions.get('window').height * .0278,
        marginLeft: Dimensions.get('window').width * .0483,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .042
    },
    shareYourCertifications: {
        marginTop: Dimensions.get('window').height * .011,
        marginLeft: Dimensions.get('window').width * .0483,
        fontSize: Dimensions.get('window').height * .020,
        alignSelf: 'center',
        fontWeight: '500',
    },
    textConatiner: {
        marginTop: Dimensions.get('window').height * .020,
        width: Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height * .5,
        borderColor: 'deepskyblue',
        borderRadius: 17,
        borderWidth: 3,
        alignSelf: 'center'
    },  
    textInputContainer: {
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .033,
        width: Dimensions.get('window').width * .8
    },
    textInput: {
        fontSize: Dimensions.get('window').height * .022,
    },
    errorMessage: {
        marginTop: Dimensions.get('window').height * .015,
        marginLeft: Dimensions.get('window').width * .0483,
        color: 'red'
      },
    submitButtonContainer: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .025,
        alignItems: 'center'
      },
    submitButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
      },
      submitButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
      },

});

export default TrainerCertificationsEditProfile;
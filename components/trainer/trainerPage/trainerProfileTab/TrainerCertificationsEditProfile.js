import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {CertificationsContext} from '../../../../context/trainerContextes/CertificationsContext';

//Here The trainer user writes his certifications
const TrainerCertificationsEditProfile = ({navigation}) => {
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);

    const [isLimit, setIsLimit] = useState(false);
    const [charsLength, setCharsLength] = useState(certifications.length);

    const charLimit = 251;

    //Sets the display text to blank if nothing was writen. If written, the details will be displayed
    useEffect(() => {
        if(certifications === 'CERTIFICATIONS'){
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: ""
            })
        }
    }, [])

    //Navigates back to the profile details page
    const handleArrowButton = () => {
        if(certifications === ""){
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: "Personal Trainer"
            })
        }
        navigation.navigate('TrainerEditProfile');
    }

    //Sets the deatils object to the value
    const handleOnInputChange = (value) => {
        if(value.length === charLimit){
            setIsLimit(true);
        }
        else{
            setCharsLength(value.length);
            setIsLimit(false)
            dispatchCertifications({
                type: 'SET_CERTIFICATIONS',
                certifications: value
            })
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                onPress={() => handleArrowButton()}
                >
                <Image
                    source={require('../../../../images/arrowBack.png')}
                    style={styles.arrowImage}
                />
                </TouchableOpacity>
                <Text style={styles.profileDetailesText}>Profile Details</Text>
            </View>
            <Text style={styles.shareYourCertifications}>Share certifications (up to {charLimit-1} chars):  {charsLength}</Text>
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
        </View>
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
        marginTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'deepskyblue'
    },
    arrowImage: {
        marginLeft: 20
    },
    profileDetailesText: {
        marginTop: 25,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 38
    },
    shareYourCertifications: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: '500',
    },
    textConatiner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .5
    },  
    textInputContainer: {
        marginLeft: 20,
        marginTop: 30,
        width: Dimensions.get('window').width * .9
    },
    textInput: {
        fontSize: 20,
    }

});

export default TrainerCertificationsEditProfile;
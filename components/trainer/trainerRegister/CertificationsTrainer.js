import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {CertificationsContext} from '../../../context/trainerContextes/CertificationsContext';

//Here The trainer user writes his certifications
const CertificationsTrainer = ({navigation}) => {
    const {certifications, dispatchCertifications} = useContext(CertificationsContext);

    const [isLimit, setIsLimit] = useState(false);
    const [charsLength, setCharsLength] = useState(0);

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
                certifications: "CERTIFICATIONS"
            })
        }
        navigation.navigate('ProfileDetailsPage2Trainer');
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
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                onPress={() => handleArrowButton()}
                >
                <Image
                    source={require('../../../images/arrowBack.png')}
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
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: '500',
    },
    textConatiner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .5
    },  
    textInputContainer: {
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .033,
        width: Dimensions.get('window').width * .9
    },
    textInput: {
        fontSize: Dimensions.get('window').height * .022,
    }

});

export default CertificationsTrainer;
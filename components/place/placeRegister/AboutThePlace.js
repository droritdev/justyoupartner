import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {AboutThePlaceContext} from '../../../context/placeContextes/AboutThePlaceContext';

//Here The place user writes about the place
const AboutThePlace = ({navigation}) => {
    const {aboutThePlace, dispatchAboutThePlace} = useContext(AboutThePlaceContext);
    
    const [isLimit, setIsLimit] = useState(false); //The limit of the words to write
    const [charsLength, setCharsLength] = useState(0);//counter for the chars

    const charLimit = 501;


    //Sets the display text to blank if nothing was writen. If written, the details will be displayed
    useEffect(() => {
        if(aboutThePlace === 'ABOUT THE PLACE'){
            dispatchAboutThePlace({
                type: 'SET_ABOUT_THE_PLACE',
                aboutThePlace: ""
            })
        }
    }, [])

    //Navigates back to the profile details page
    const handleArrowButton = () => {
        if(aboutThePlace === ""){
            dispatchAboutThePlace({
                type: 'SET_ABOUT_THE_PLACE',
                aboutThePlace: "ABOUT THE PLACE"
            })
        }
        navigation.navigate('ProfileDetailsPage2Place')
    }

    //Sets the deatils object to the value
    const handleOnInputChange = (value) => {
        if(value.length === charLimit){
            setIsLimit(true);
        }
        else{
            setCharsLength(value.length);
            setIsLimit(false)
            dispatchAboutThePlace({
                type: 'SET_ABOUT_THE_PLACE',
                aboutThePlace: value
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
                    source={require('../../../images/arrowBack.png')}
                    style={styles.arrowImage}
                />
                </TouchableOpacity>
                <Text style={styles.profileDetailesText}>Profile Details</Text>
            </View>
            <Text style={styles.writeAboutThePlace}>Write about the place (up to {charLimit-1} chars):  {charsLength}</Text>
            <View style={styles.textConatiner}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={aboutThePlace}
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
    writeAboutThePlace: {
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

export default AboutThePlace;
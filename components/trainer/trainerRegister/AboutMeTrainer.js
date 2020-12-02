import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {AboutMeContext} from '../../../context/trainerContextes/AboutMeContext';

//Here The trainer user writes about him
const AboutMeTrainer = ({navigation}) => {
    const {aboutMe, dispatchAboutMe} = useContext(AboutMeContext);
    
    const [isLimit, setIsLimit] = useState(false);
    const [charsLength, setCharsLength] = useState(0);

    const charLimit = 501;

    //Sets the display text to blank if nothing was writen. If written, the details will be displayed
    useEffect(() => {
        if(aboutMe === 'ABOUT ME'){
            dispatchAboutMe({
                type: 'SET_ABOUT_ME',
                aboutMe: ""
            })
        }
    }, [])

    //Navigates back to the profile details page
    const handleArrowButton = () => {
        if(aboutMe === ""){
            dispatchAboutMe({
                type: 'SET_ABOUT_ME',
                aboutMe: "ABOUT ME"
            })
        }
        navigation.navigate('ProfileDetailsPage2Trainer')
    }
    
    //Sets the deatils object to the value
    const handleOnInputChange = (value) => {
        if(value.length === charLimit){
            setIsLimit(true);
        }
        else{
            setCharsLength(value.length);
            setIsLimit(false)
            dispatchAboutMe({
                type: 'SET_ABOUT_ME',
                aboutMe: value
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
            <Text style={styles.writeAboutYourselfTitle}>Write about yourself (up to {charLimit-1} chars):  {charsLength}</Text>
            <View style={styles.textConatiner}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={aboutMe}
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
    writeAboutYourselfTitle: {
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

export default AboutMeTrainer;
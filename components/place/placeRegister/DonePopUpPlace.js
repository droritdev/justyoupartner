import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';

//Pop up page which shows a Done picture and disaperes after 2 seconds
const DonePopUpPlace = ({navigation}) => {

    //Automaticlly navigates to the WelcomeTrainer popUp page after 2 seconds (2 * 1000 mili seconds = 2 seconds)
    setTimeout(() => navigation.navigate('WelcomePlace'), 2000);

    return(
        <View style={styles.container}>
            <Image 
                source={require('../../../images/successfullyIcon.png')}
            />
            <Text style={styles.registeringText}>Done</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    registeringText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .044,
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .0278
    }
});

export default DonePopUpPlace;
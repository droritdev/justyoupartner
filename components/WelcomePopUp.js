import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import axios from 'axios';

//Page 1 of the app, welcoming the user
const WelcomePopUpTrainer = ({navigation}) => {



    //Aoutomaticlly navigates to the next page in 4 seconds (4 * 1000 milli secons = 4000)
    setTimeout(() => navigation.navigate('GetStarted'), 4000);

    return(
        <View style={styles.welcomePage1}>
            <View style={styles.textContainer}>
                <Text style={styles.justYoutitle}>Just You</Text>
                <Text style={styles.pertnerTitle}>Partner</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomePage1: {
        backgroundColor: 'dodgerblue',
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .15,
        alignItems: 'center'
    },
    justYoutitle: {
        fontSize: 90,
        color: 'white',
        fontWeight: 'bold'
    },
    pertnerTitle: {
        fontSize: 45,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default WelcomePopUpTrainer;
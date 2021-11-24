import React, { useContext } from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';

import {NameContext} from '../../../context/trainerContextes/NameContext';

//The last page before the user moves to his profile page
const WelcomeTrainer = ({navigation}) => {
    const {firstName} = useContext(NameContext);

    //Navigates automaticlly to the profile page after 2 seconds
    setTimeout(() => navigation.navigate('TrainerContainer'), 1500);
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.justYouText}>Just You</Text>
                <Text style={styles.welcomeUserText}>WELLCOME {firstName.toUpperCase()}</Text>
            </View>
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
    textContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .15,
        alignItems: 'center',
        textAlign: 'center'
    },
    justYouText: {
        fontWeight: 'bold',
        color: 'deepskyblue',
        fontSize: 80,
        alignSelf: 'center'
    },
    welcomeUserText: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'steelblue',
        fontSize: 40
    }
});

export default WelcomeTrainer;
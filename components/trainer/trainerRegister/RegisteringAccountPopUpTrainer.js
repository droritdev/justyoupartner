import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';

//Registration loading Pop up page wich disaperes after 2.5 seconds
const RegisteringAccountPopUpTrainer = ({navigation}) => {

    //Automaticlly navigates to the DetailsSuccessfullyTrainer page after 2.5 seconds (2.5 * 1000 mili seconds = 2.5 seconds)
    setTimeout(() => navigation.navigate('DetailsSuccessfullyTrainer'), 2500);

    return(
        <View style={styles.container}>
            <Text style={styles.registeringText}>Registering account...</Text>
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
        fontSize: 30
    }
});

export default RegisteringAccountPopUpTrainer;
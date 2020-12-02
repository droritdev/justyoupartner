import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Dimensions} from 'react-native';

//Details seccssufuly entered pop up wich disaperes after 2 seconds
const DetailsSuccessfullyPlace = ({navigation}) => {

    //Automaticlly navigates to the PhoneNumberVerificationTrainer page after 2 seconds (2 * 1000 mili seconds = 2 seconds)
    setTimeout(() => navigation.navigate('PhoneNumberVerificationPlace'), 2000);

    return(
        <View style={styles.container}>
            <Text style={styles.registeringText}>THE DETAILS SUCCESSFULLY ENTERD!</Text>
            <Image 
                source={require('../../../images/successfullyIcon.png')}
            />
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
        marginBottom: Dimensions.get('window').height * .033
    }
});

export default DetailsSuccessfullyPlace;
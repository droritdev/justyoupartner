import React, { useContext } from 'react';
import {StyleSheet, View, Text, Dimensions, Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {SignUpAsContext, signUpAsContext} from '../context/SignAsTypeContext';

//Here the user have 2 choises - sign as trainer or place
const SignUpAs = ({navigation}) => {
    const {dispatchSignAsType} = useContext(SignUpAsContext);

    //Sets the registration type of the user to Personal Trainer
    const handleOnPersonalTrainerPress = () => {
        dispatchSignAsType({
            type: 'SET_SIGN_AS_TYPE',
            signAsType: 'Personal Trainer'
        });
        navigation.navigate('SignUpTrainer');
    }
    //Sets the registration type of the user to Place
    const handleOnPlacePress = () => {
        dispatchSignAsType({
            type: 'SET_SIGN_AS_TYPE',
            signAsType: 'Place'
        });
        navigation.navigate('SignUpPlace');
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.PartnerText}>Partner</Text>
                </View>
                <Text style={styles.signUpAsTitle}>Sign up as:</Text>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleOnPersonalTrainerPress}
                        >
                            <Text style={styles.buttonText}>Personal Trainer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleOnPlacePress}
                        >
                            <Text style={styles.buttonText}>Place</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerContainer: {
        marginLeft: 20,
        width: 123
    },
    justYouHeader: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    PartnerText: {
        marginTop: 5,
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    signUpAsTitle: {
        marginLeft: 20,
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 40
    },
    buttonsContainer: {
        height: Dimensions.get('window').height * .5,
        justifyContent: 'center'
    },
    buttonnContainer: {
        alignItems: 'center'
    },
    button: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .08,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 15,
        marginTop: 25
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },

});

export default SignUpAs;
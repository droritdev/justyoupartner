import React, { useContext } from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native';

import {CompanyNameContext} from '../../../context/placeContextes/CompanyNameContext';

//Welcome popup page for the place
const WelcomePlace = ({navigation}) => {
    const {companyName} = useContext(CompanyNameContext);

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.justYouText}>Just You</Text>
                <Text style={styles.welcomeUserText}>WELLCOME{"\n"+companyName.toUpperCase()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .15,
        alignItems: 'center'
    },
    justYouText: {
        fontWeight: 'bold',
        color: 'deepskyblue',
        fontSize: 80
    },
    welcomeUserText: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'steelblue',
        fontSize: 40,
        textAlign: 'center'
    }
});

export default WelcomePlace;
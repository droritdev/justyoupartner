import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import ArrowBackButton from '../../../globalComponents/ArrowBackButton';

const WhyUs = ({navigation}) => {

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerProfilePage');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            
                <ArrowBackButton
                    onPress={handleOnArrowPress}
                />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Why Sould You Work With</Text>
                <Text style={styles.juustYouTitle}>Just You Partner</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Text style={styles.reasonsPreview}>Five reasons why you should work with Just You:</Text>
            </View>
            <View style={styles.reasonsContainer}>
                <View style={styles.reasonRow}>
                    <Image
                        source={require('../../../../images/whyUsBlowVi.png')}
                        style={styles.viImage}
                    />
                    <Text style={styles.reasonText}>Easy and quick search for personal trainer</Text>
                </View>
                <View style={styles.reasonRow}>
                    <Image
                        source={require('../../../../images/whyUsBlowVi.png')}
                        style={styles.viImage}
                    />
                    <Text style={styles.reasonText}>Wide selection of personal trainers by category</Text>
                </View>
                <View style={styles.reasonRow}>
                    <Image
                        source={require('../../../../images/whyUsBlowVi.png')}
                        style={styles.viImage}
                    />
                    <Text style={styles.reasonText}>Possibility of setting personal training ad hoc with no restriction to any location</Text>
                </View>
                <View style={styles.reasonRow}>
                    <Image
                        source={require('../../../../images/whyUsBlowVi.png')}
                        style={styles.viImage}
                    />
                    <Text style={styles.reasonText}>Fast and easy payment</Text>
                </View>
                <View style={styles.reasonRow}>
                    <Image
                        source={require('../../../../images/whyUsBlowVi.png')}
                        style={styles.viImage}
                    />
                    <Text style={styles.reasonText}>Quick synchronization of setting the training date to your personal calendar</Text>
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height
    },
    coverImage: {
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .022
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .0055,
        paddingBottom: 20,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278
    },
    juustYouTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278,
        color: 'deepskyblue'
    },
    reasonsPreview: {
        fontSize: Dimensions.get('window').height * .019,
        fontWeight: 'bold',
        marginTop: Dimensions.get('window').height * .011
    },
    reasonsContainer: {
        marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .275,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    reasonRow: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .9,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    viImage: {
        marginRight: Dimensions.get('window').width * .0724
    },
    reasonText: {
        fontSize: Dimensions.get('window').height * .018,
        width: Dimensions.get('window').width * .8
    }
});

export default WhyUs;
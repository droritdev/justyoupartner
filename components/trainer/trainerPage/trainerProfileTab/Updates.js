import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';

const Updates = ({navigation}) => {


    useEffect (() => {
        //Hide bottom navigation UI
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })
    }, []);

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        })
        navigation.navigate('TrainerProfilePage');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.justYouHeader}>Just You</Text>
                <Text style={styles.partnerText}>Partner</Text>
            </View>
            <ArrowBackButton
                onPress={handleOnArrowPress}
            />

            <Text style={styles.pageTitle}> {'Updates'} </Text>

            <View style={styles.greyBorder}></View>
            
            

            <Text style={styles.explenationText}> {'New updates are coming, stay posted!'} </Text>
        </SafeAreaView>
    )
}   

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        flex: 1
    },
    container: {
        flex: 1
    },
    headerContainer: {
        alignItems: 'center'
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    arrowBackButton: {
        alignItems: 'flex-start',
        marginLeft: Dimensions.get('window').width * .047
    },
    pageTitle: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .01,
        fontSize: Dimensions.get('window').height * .04,
        fontWeight: '600',
    }, 
    comingSoonImage: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .3
    },
    greyBorder: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        width: Dimensions.get('window').width * .4,
        borderTopWidth: 3,
        borderTopColor: 'lightgrey',
    },
    explenationText: {
        marginTop: Dimensions.get('window').height * .1,
        fontWeight: '500',
        color: 'grey',
        fontSize: Dimensions.get('window').height * .019,
        textAlign:'center',
    },
});

export default Updates;
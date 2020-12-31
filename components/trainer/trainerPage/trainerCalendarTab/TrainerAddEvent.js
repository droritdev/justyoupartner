import React, {useContext, useState, useEffect} from 'react';
import {Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EventCalendar from 'react-native-events-calendar';
import Dialog from "react-native-dialog";
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';

//The trainer's order page - pennding + stats
const TrainerAddEvent = ({navigation}) => {
    
    //Navigates back to the profile details page
    const handleArrowButton = () => {
        navigation.navigate('TrainerCalendar');
    }

    return(
        <SafeAreaView style={styles.pageContainer}>
            <ArrowBackButton
                onPress={handleArrowButton}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        pageContainer: {
            flex: 1,
            marginTop: Dimensions.get('window').height * .020,
            backgroundColor: 'white'
        }, 
});

export default TrainerAddEvent;
import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import {Accordion, Block} from 'galio-framework';
import auth from '@react-native-firebase/auth';

//The question and answers page
const TrainerSettings = ({navigation}) => {

    const [dialogVisible, setDialogVisible] = useState(false);

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerProfilePage');
    }

    const handleYesDialog = () => {
        setDialogVisible(false);
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    };

    const handleNoDialog = () => {
        setDialogVisible(false);
    };

    const handleOnSignOutPress = () => {
        setDialogVisible(true);
    }

    const handleOnChangeEmailPress = () => {
        navigation.navigate('ChangeEmailAddress');
    }

    const handleOnChangePhonePressed = () => {
        navigation.navigate('ChangePhoneNumber');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title style={styles.dialogTitle}>Are You Sure?</Dialog.Title>
                    <Dialog.Button style={styles.cancelDialog} label="Cancel" onPress={(() => handleNoDialog())} />
                    <Dialog.Button style={styles.signOutDialog} label="Sign Out" onPress={() => handleYesDialog()} />

                </Dialog.Container>
            </View>
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <TouchableOpacity
                        style={styles.arrowBackButton} 
                        onPress={() => handleOnArrowPress()}
                    >
                    <Image
                        source={require('../../../../images/blackArrow.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.settingsTitle}>Settings</Text>
                <View style={styles.settingsContainer1}>
                    <View style={styles.paymentsRow}>
                        <TouchableOpacity
                            //onPress={() => handleOnEditProfilePressed()}
                        >
                            <Text style={styles.paymentsTitle}>Methods of payment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.arrowButton}
                            //onPress={() => handleOnEditProfilePressed()}
                        >
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.changeEmailRow}>
                        <TouchableOpacity
                            onPress={() => handleOnChangeEmailPress()}
                        >
                            <Text style={styles.changeEmailTitle}>Change email address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.arrowButton}
                            onPress={() => handleOnChangeEmailPress()}
                        >
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                                onPress={() => handleOnChangeEmailPress()}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.changePhoneRow}>
                        <TouchableOpacity
                            onPress={() => handleOnChangePhonePressed()}
                        >
                            <Text style={styles.changePhoneTitle}>Change phone number</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton}>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                                onPress={() => handleOnChangePhonePressed()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.settingsContainer2}>
                    <View style={styles.policyrow}>
                        <TouchableOpacity
                            //onPress={() => handleOnEditProfilePressed()}
                        >
                            <Text style={styles.policytitle}>Privacy policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.arrowButton}
                            //onPress={() => handleOnEditProfilePressed()}
                        >
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.termsRow}>
                        <TouchableOpacity>
                            <Text style={styles.termsTitle}>Terms & Conditions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton}>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signOutRow}>
                        <TouchableOpacity
                            onPress={() => handleOnSignOutPress()}
                        >
                            <Text style={styles.signOutTitle}>Sign out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.arrowButton}
                            onPress={() => handleOnSignOutPress()}
                        >
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}   

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        flex: 1
    },
    dialogTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    dialogContent: {
        fontSize: Dimensions.get('window').height * .02
    },
    cancelDialog: {
        color: 'black'
    },
    signOutDialog: {
        color: 'red',
        fontWeight: 'bold'
    },
    container: {
        flex: 1
    },
    titlesContainer: {
        alignItems: 'center',
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .033,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    arrowBackButton: {
        alignItems: 'flex-start',
        marginLeft: Dimensions.get('window').width * .047
    },
    settingsTitle: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .0278,
    },
    settingsContainer1: {
        marginTop: Dimensions.get('window').height * .033,
        borderTopWidth: 2,
        borderTopColor: 'lightgrey'
    },
    arrowImage: {
        height: Dimensions.get('window').height * .02,
        marginTop: Dimensions.get('window').height * .01
    },
    arrowButton: {
        
    },
    paymentsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    paymentsTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    editProfileButton: {

    },
    changeEmailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    changeEmailTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    reviewsButton: {

    },
    changePhoneRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    changePhoneTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    customerServicesButton: {

    },
    disableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    disableTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    customerServicesButton: {

    },
    settingsContainer2: {
        marginTop: Dimensions.get('window').height * .111,
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    policyrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    policytitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    termsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    termsTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    signOutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        height: Dimensions.get('window').height * .04,
        alignItems: 'center'
    },
    signOutTitle: {
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
    },


});

export default TrainerSettings;
import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import {Accordion, Block} from 'galio-framework';
import auth from '@react-native-firebase/auth';

import ArrowBackButton from '../../../globalComponents/ArrowBackButton';

//The question and answers page
const TrainerSettings = ({navigation}) => {

    const [dialogVisible, setDialogVisible] = useState(false);

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

    const handleYesDialog = () => {
        setDialogVisible(false);
        auth()
        .signOut()
        .then(() => {
            navigation.goBack()
            navigation.navigate('GetStarted')
        })
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

    const handlePrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    }

    const handleTermsConditions = () => {
        navigation.navigate('TermsConditions');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title style={styles.dialogTitle}>Do you want to sign out?</Dialog.Title>
                    <Dialog.Button style={styles.cancelDialog} label="Cancel" onPress={(() => handleNoDialog())} />
                    <Dialog.Button style={styles.signOutDialog} label="Sign Out" onPress={() => handleYesDialog()} />

                </Dialog.Container>
            </View>
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <ArrowBackButton
                    onPress={handleOnArrowPress}
                />
                <Text style={styles.settingsTitle}>Settings</Text>
                <View style={styles.settingsContainer1}>
                    <View style={styles.paymentsRow}>
                        <TouchableOpacity
                            //onPress={() => handleOnEditProfilePressed()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.paymentsTitle}>Methods of payment</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.changeEmailRow}>
                        <TouchableOpacity
                            onPress={() => handleOnChangeEmailPress()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.changeEmailTitle}>Change email address</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                                onPress={() => handleOnChangeEmailPress()}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.changePhoneRow}>
                        <TouchableOpacity
                            onPress={() => handleOnChangePhonePressed()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.changePhoneTitle}>Change phone number</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                                onPress={() => handleOnChangePhonePressed()}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.settingsContainer2}>
                    <View style={styles.policyrow}>
                        <TouchableOpacity
                            onPress={() => handlePrivacyPolicy()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.policytitle}>Privacy policy</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.termsRow}>
                        <TouchableOpacity
                            onPress={() => handleTermsConditions()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.termsTitle}>Terms & Conditions</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signOutRow}>
                        <TouchableOpacity
                            onPress={() => handleOnSignOutPress()}
                        >
                            <View style={styles.rowStyle}>
                            <Text style={styles.signOutTitle}>Sign out</Text>
                            <Image
                                source={require('../../../../images/arrowButton.png')}
                                style={styles.arrowImage}
                            />
                            </View>
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
    rowStyle: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});

export default TrainerSettings;
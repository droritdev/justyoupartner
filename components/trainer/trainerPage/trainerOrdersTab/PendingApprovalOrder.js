import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//The trainer's order page - pennding + approved
const PendingApprovalOrder = ({navigation}) => {


    const handleArrowButton = () => {
        navigation.navigate('TrainerOrdersPage');
    }


    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <TouchableOpacity
                    onPress={handleArrowButton}
                >
                    <Image
                        source={require('../../../../images/arrowBack.png')}
                        style={styles.arrowImage}
                    />
                </TouchableOpacity>
                <Text style={styles.pendingTitle}>PENDING APPROVAL</Text>
                <View style={styles.imageNameApproveRowContainer}>
                    <View style={styles.imageNameApproveRow}>
                        <Image
                            //source={}
                            style={styles.profileImage}
                        />
                        <View style={styles.nameAndButtonsContainer}>
                            <Text style={styles.nameTitle}>Erez Buganim</Text>
                            <View style={styles.buttonsRowContaier}>
                                <View style={styles.buttonsRow}>
                                    <View style={styles.buttonAndTitle}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../../../images/callIcon.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTitle}>Call</Text>
                                    </View>
                                    <View style={styles.buttonAndTitle}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../../../images/chatIcon.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTitle}>Chat</Text>
                                    </View>
                                    <View style={styles.buttonAndTitle}>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../../../../images/declineIcon.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTitle}>Decline</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            //onPress={}
                            style={styles.approveButton}
                        >
                            <Text style={styles.approveButtonText}>APPROVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.orderInformationContainer}>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Date:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>3.6.2020</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Time:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>16:00</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Address:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>5th Ave, NY, NY</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Type of training:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>Personal</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        alignItems: 'center',
    },
    justYouHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 15
    },
    arrowImage: {
        marginLeft: 15
    },
    pendingTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15
    },
    imageNameApproveRowContainer: {
        height: Dimensions.get('window').height * .15,
        justifyContent: 'center'
    },  
    imageNameApproveRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width * .925,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 30
    },
    profileImage: {
        backgroundColor: 'gainsboro',
        width: Dimensions.get('window').height * .08,
        height: Dimensions.get('window').height * .08,
        borderRadius: 40
    },
    nameAndButtonsContainer: {
        
    },
    nameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        width: Dimensions.get('window').width * .4
    },
    buttonsRowContaier: {
        width: Dimensions.get('window').width * .35,
        alignSelf: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    buttonAndTitle: {
        alignItems: 'center'
    },
    buttonTitle: {
        textAlign: 'center',
        fontSize: 10
    },  
    approveButton: {
        height: 50,
        width: Dimensions.get('window').width * .275,
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    approveButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    orderInformationContainer: {
        marginTop: 50,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .275
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
    },
    informationView: {
        backgroundColor: 'gainsboro',
        width: Dimensions.get('window').width * .4,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * .05,
        borderRadius: 10
    },
    informationText: {
        fontSize: 18,
    }

});

export default PendingApprovalOrder;
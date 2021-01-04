import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {OrderContext} from '../../../../context/orderContexts/OrderContext';
import FastImage from 'react-native-fast-image';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import Icon from 'react-native-vector-icons/Feather';

//The trainer's order page - pennding + approved
const PendingApprovalOrder = ({navigation}) => {

    const {orderObject, dispatchOrderObject} = useContext(OrderContext);

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
                <ArrowBackButton
                onPress={handleArrowButton}
                />
                <Text style={styles.pendingTitle}>Order pending for approval</Text>

                <View style={styles.imageNameRowContainer}>
                        <FastImage
                                    style={styles.profileImage}
                                    source={{
                                    uri: orderObject.client.profilePic,
                                    priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={styles.nameButtonsColumContainer}>
                            <View style={styles.nameBox}>
                                <Text style={styles.nameText}>{orderObject.client.firstName + " " + orderObject.client.lastName}</Text>
                            </View>

                            <View style={styles.buttonsRowContaier}>
                                <View style={styles.buttonsRow}>
                                    <View style={styles.buttonAndTitle}>
                                        <TouchableOpacity style={styles.iconBackStyle}>
                                            <Icon name="phone-call" size={30} style={styles.phoneCallIcon}/>
                                           
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTitle}>Call</Text>
                                    </View>
                                    <View style={styles.buttonAndTitle}>
                                        <TouchableOpacity style={styles.iconBackStyle}>
                                            <Icon name="message-circle" size={30} style={styles.messageIcon}/>
                                        </TouchableOpacity>
                                        <Text style={styles.buttonTitle}>Chat</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                </View>






                <View style={styles.orderInformationContainer}>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Date:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.trainingDate.startTime.slice(0, 10)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Time:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.trainingDate.startTime.slice(11, 16) + ' - ' + orderObject.trainingDate.endTime.slice(11, 16)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Address:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.location.address}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Type of training:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.type}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    //onPress={}
                        style={styles.approveButton}
                    >
                        <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    //onPress={}
                        style={styles.declineButton}
                    >
                        <Text style={styles.approveButtonText}>Decline</Text>
                </TouchableOpacity>
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
        fontSize: Dimensions.get('window').height * .027,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .025
    },
    pendingTitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .018
    },
    imageNameRowContainer: {
        marginTop: Dimensions.get('window').height * .05,
        flexDirection: 'row',
        width: Dimensions.get('window').width * .9,
        alignSelf: 'center',
       
    },  
    profileImage: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
        width: Dimensions.get('window').height * .09,
        height: Dimensions.get('window').height * .09,
        borderRadius: 40
    },
    nameAndButtonsContainer: {
        
    },
    nameTitle: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
    },
    buttonsRowContaier: {
        width: Dimensions.get('window').width * .35,
        alignSelf: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .011,
        justifyContent: 'space-between'
    },
    buttonAndTitle: {
        alignItems: 'center'
    },
    buttonTitle: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .011
    },  
    approveButton: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .08,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    declineButton: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .02,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        backgroundColor: 'crimson',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    approveButtonText: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'white',
        fontWeight: 'bold'
    },
    topBorder: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    orderInformationContainer: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
        marginTop: Dimensions.get('window').height * .055,
        height: Dimensions.get('window').height * .275,
        width: Dimensions.get('window').width *.85,
        alignSelf: 'center'
    },
    orderRow: {
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .08,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
        
    },
    orderRowSecond: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: Dimensions.get('window').width *.85,
        height: Dimensions.get('window').height * .08,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    title: {
        marginTop: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .022,
    },
    informationView: {
        width: Dimensions.get('window').width * .4,
        marginTop: Dimensions.get('window').height * .02,
        alignItems: 'center',
        height: Dimensions.get('window').height * .05,
        borderRadius: 10
    },
    informationText: {
        fontSize: Dimensions.get('window').height * .02,
    },
    nameBox: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .7
    },
    nameText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    dateBox: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .275
    },
    dateText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    phoneCallIcon: {
        marginLeft: Dimensions.get('window').width * .01, 
        marginTop: Dimensions.get('window').width * .02, 
        width: Dimensions.get('window').width * .09, 
        height: Dimensions.get('window').height * .04,
        color: 'white'
    },
    messageIcon: {
        marginLeft: Dimensions.get('window').width * .015, 
        marginTop: Dimensions.get('window').width * .015, 
        width: Dimensions.get('window').width * .09, 
        height: Dimensions.get('window').height * .04,
        color: 'white'
    },
    iconBackStyle: {
        backgroundColor: 'deepskyblue',
        borderRadius: 40,
        width: Dimensions.get('window').width * .1, 
        height: Dimensions.get('window').height * .05,
    }

});

export default PendingApprovalOrder;
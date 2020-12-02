import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//The trainer's order page - pennding + approved
const ApprovedOrder = ({navigation}) => {

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
                <Text style={styles.approvedTitle}>APPROVED</Text>
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
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            //onPress={}
                            style={styles.approveButton}
                        >
                            <Text style={styles.approveButtonText}>APPROVED</Text>
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
    approvedTitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .018
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
        marginTop: Dimensions.get('window').height * .033
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
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        width: Dimensions.get('window').width * .4
    },
    buttonsRowContaier: {
        width: Dimensions.get('window').width * .24,
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
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .011,
    },  
    approveButton: {
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .275,
        backgroundColor: 'gainsboro',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    approveButtonText: {
        fontSize: Dimensions.get('window').height * .022,
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
        fontSize: Dimensions.get('window').height * .022,
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
        fontSize: Dimensions.get('window').height * .02,
    }
});

export default ApprovedOrder;
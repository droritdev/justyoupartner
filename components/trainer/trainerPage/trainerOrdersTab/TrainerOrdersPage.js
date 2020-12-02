import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//The trainer's order page - pennding + approved
const TrainerOrdersPage = ({navigation}) => {

    const [isPending, setIsPending] = useState(true);

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsPending(!isPending);
    }

    const handleOnArrowPendingPressed = () => {
        navigation.navigate('PendingApprovalOrder');
    }

    const handleArrowApprovedPressed = () => {
        navigation.navigate('ApprovedOrder');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <View style={ styles.pendingOrApprovedContainer}>
                    <TouchableOpacity 
                        style={isPending ? styles.pendingLabeld : styles.pendingNotLabeld}
                        onPress={() => handleFlipToggle()}
                    >
                        <Text style={isPending ? styles.pendingTextLabeld : styles.pendingTextNotLabeld}>PENDING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={isPending ? styles.approvedLabeld : styles.approvedNotLabeld}
                        onPress={() => handleFlipToggle()}
                    >
                        <Text style={isPending ? styles.approvedTextNotLabeld : styles.approvedTextLabeld}>APPROVED</Text>
                    </TouchableOpacity>
                </View>
                {isPending ?
                    <View style={styles.pendingContainer}>
                        <View style={styles.pendingOrderView}>
                            <View style={styles.pendingOrder}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                                <View style={styles.nameBox}>
                                    <Text style={styles.nameText}>Omer Ohana</Text>
                                </View>
                                <View style={styles.dateBox}>
                                    <Text style={styles.dateText}>3.6.2020</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.arrowButton}
                                    onPress={() => handleOnArrowPendingPressed()}
                                >
                                    <Image
                                        source={require('../../../../images/arrowBlueButton.png')}
                                        style={styles.arrowImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    : 
                    <View style={styles.pendingContainer}>
                        <View style={styles.pendingOrderView}>
                            <View style={styles.pendingOrder}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                                <View style={styles.nameBox}>
                                    <Text style={styles.nameText}>Daniel Neeman</Text>
                                </View>
                                <View style={styles.dateBox}>
                                    <Text style={styles.dateText}>4.9.2020</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.arrowButton}
                                    onPress={() => handleArrowApprovedPressed()}
                                >
                                    <Image
                                        source={require('../../../../images/arrowBlueButton.png')}
                                        style={styles.arrowImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    }
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
        fontSize: Dimensions.get('window').height * .025,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    pendingOrApprovedContainer:{
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483
    },
    pendingLabeld: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'deepskyblue',
        justifyContent: 'center'
    },
    pendingNotLabeld: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    pendingTextLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'white',
        fontWeight: 'bold'
    },
    pendingTextNotLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    approvedLabeld: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    approvedNotLabeld: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        backgroundColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    approvedTextNotLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    approvedTextLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'white',
        fontWeight: 'bold'
    },
    pendingContainer: {
        marginTop: Dimensions.get('window').height * .033,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    pendingOrderView: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    pendingOrder: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .011,
        marginBottom: Dimensions.get('window').height * .011,
        width: Dimensions.get('window').width * .95,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    image: {
        height: Dimensions.get('window').height * .066,
        width: Dimensions.get('window').height * .066,
        backgroundColor: 'gainsboro',
        borderRadius: 30
    },
    nameBox: {
        backgroundColor: 'gainsboro',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .375
    },
    nameText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    dateBox: {
        backgroundColor: 'gainsboro',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .275
    },
    dateText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    arrowImage: {
        marginTop: Dimensions.get('window').height * .0055
    },
    arrowButton: {
    },
});

export default TrainerOrdersPage;
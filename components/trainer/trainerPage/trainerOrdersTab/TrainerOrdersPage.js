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

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <View style={ styles.pendingOrApprovedContainer}>
                    <TouchableOpacity 
                        style={isPending ? styles.pendingLabeld : styles.pendingNotLabeld}
                        onPress={handleFlipToggle}
                    >
                        <Text style={isPending ? styles.pendingTextLabeld : styles.pendingTextNotLabeld}>PENDING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={isPending ? styles.approvedLabeld : styles.approvedNotLabeld}
                        onPress={handleFlipToggle}
                    >
                        <Text style={isPending ? styles.approvedTextNotLabeld : styles.approvedTextLabeld}>APPROVED</Text>
                    </TouchableOpacity>
                </View>
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
                            <TouchableOpacity style={styles.arrowButton}>
                                <Image
                                    source={require('../../../../images/arrowBlueButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            <TouchableOpacity style={styles.arrowButton}>
                                <Image
                                    source={require('../../../../images/arrowBlueButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            <TouchableOpacity style={styles.arrowButton}>
                                <Image
                                    source={require('../../../../images/arrowBlueButton.png')}
                                    style={styles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
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
    pendingOrApprovedContainer:{
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20
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
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    pendingTextNotLabeld: {
        fontSize: 18,
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
        fontSize: 18,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    approvedTextLabeld: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    pendingContainer: {
        marginTop: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    pendingOrderView: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    pendingOrder: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width * .95,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    image: {
        height: 60,
        width: 60,
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
        fontSize: 18,
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
        fontSize: 18,
        fontWeight: '500'
    },
    arrowImage: {
        marginTop: 5
    },
    arrowButton: {
    },
});

export default TrainerOrdersPage;
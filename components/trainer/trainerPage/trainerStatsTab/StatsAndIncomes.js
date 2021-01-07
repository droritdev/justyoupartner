import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';


//The trainer's order page - pennding + stats
const StatsAndIncomes = ({navigation}) => {

    const [isIncome, setIsIncome] = useState(true);
    const [completedOrders, setCompletedOrders] = useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // getTrainerOrders();
        });
    
        
        return unsubscribe;
      }, [navigation]);


    // //Get all orders by trainer ID, sort by time created, assaign to designated const
    // const getTrainerOrders = () => {
    //     axios
    //     .get('/orders/by-trainer-id/'+trainerID, 
    //     config
    //     )
    //     .then((doc) => {
    //         var allOrders = doc.data;
    //         var completedOrders = [];

    //         for (let index = 0; index < allOrders.length; index++) {
    //             const singleOrder = allOrders[index];
    //             if (singleOrder.status === "completed") {
    //                 completedOrders.push(singleOrder);
    //             } 
    //         }

    //         pendingOrders = sortOrders(pendingOrders);


    //         setPendingOrders(pendingOrders);
    //         setApprovedOrders(approvedOrders);
    //     })
    //     .catch((err) => alert(err));
    // }

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsIncome(!isIncome);
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <View style={ styles.incomeOrStatsContainer}>
                <TouchableOpacity 
                    style={isIncome ? styles.incomeLabeld : styles.incomeNotLabeld}
                    onPress={() => handleFlipToggle()}
                >
                    <Text style={isIncome ? styles.incomeTextLabeld : styles.incomeTextNotLabeld}>INCOME</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isIncome ? styles.statsLabeld : styles.statsNotLabeld}
                    onPress={() => handleFlipToggle()}
                >
                    <Text style={isIncome ? styles.statsTextNotLabeld : styles.statsTextLabeld}>STATS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.timeArrows}>
                <View style={styles.timeArrowsRow}>
                    <TouchableOpacity>
                        <Text style={styles.arrow}>{"<"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeText}>JUNE 2020</Text>
                    <TouchableOpacity>
                        <Text style={styles.arrow}>{">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.tableHeaders}>
                <View style={styles.tableHeadersRow}>
                    <Text style={styles.headerTitle}>Name</Text>
                    <Text style={styles.headerTitle}>Date</Text>
                    <Text style={styles.headerTitle}>Time</Text>
                    <Text style={styles.headerTitle}>Address</Text>
                    <Text style={styles.headerTitle}>Category</Text>
                    <Text style={styles.headerTitle}>Type</Text>
                    <Text style={styles.headerTitle}>Income</Text>
                </View>
            </View>
            <View style={styles.incomesTableContainer}>
                <View style={styles.incomeRowContainer}>
                    <View style={styles.incomeRow}>
                        <Text style={styles.rowInformation}>Erez Buganim</Text>
                        <Text style={styles.rowInformation}>3.6.2020</Text>
                        <Text style={styles.rowInformation}>16:00</Text>
                        <Text style={styles.rowInformation}>5th Ave, NY, NY</Text>
                        <Text style={styles.rowInformation}>Yoga</Text>
                        <Text style={styles.rowInformation}>Personal Training</Text>
                        <Text style={styles.rowInformation}>150$</Text>
                    </View>
                </View>
                <View style={styles.incomeRow2Container}>
                    <View style={styles.incomeRow}>
                        <Text style={styles.rowInformation}>Erez Buganim</Text>
                        <Text style={styles.rowInformation}>3.6.2020</Text>
                        <Text style={styles.rowInformation}>16:00</Text>
                        <Text style={styles.rowInformation}>5th Ave, NY, NY</Text>
                        <Text style={styles.rowInformation}>Yoga</Text>
                        <Text style={styles.rowInformation}>Personal Training</Text>
                        <Text style={styles.rowInformation}>150$</Text>
                    </View>
                </View>
                <View style={styles.incomeRowContainer}>
                    <View style={styles.incomeRow}>
                        <Text style={styles.rowInformation}>Erez Buganim</Text>
                        <Text style={styles.rowInformation}>3.6.2020</Text>
                        <Text style={styles.rowInformation}>16:00</Text>
                        <Text style={styles.rowInformation}>5th Ave, NY, NY</Text>
                        <Text style={styles.rowInformation}>Yoga</Text>
                        <Text style={styles.rowInformation}>Personal Training</Text>
                        <Text style={styles.rowInformation}>150$</Text>
                    </View>
                </View>
                <View style={styles.incomeRow2Container}>
                    <View style={styles.incomeRow}>
                        <Text style={styles.rowInformation}>Erez Buganim</Text>
                        <Text style={styles.rowInformation}>3.6.2020</Text>
                        <Text style={styles.rowInformation}>16:00</Text>
                        <Text style={styles.rowInformation}>5th Ave, NY, NY</Text>
                        <Text style={styles.rowInformation}>Yoga</Text>
                        <Text style={styles.rowInformation}>Personal Training</Text>
                        <Text style={styles.rowInformation}>150$</Text>
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
        fontSize: Dimensions.get('window').height * .025,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    incomeOrStatsContainer:{
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483
    },
    incomeLabeld: {
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
    incomeNotLabeld: {
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
    incomeTextLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'white',
        fontWeight: 'bold'
    },
    incomeTextNotLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    statsLabeld: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .04,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statsNotLabeld: {
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
    statsTextNotLabeld: {
        fontSize: Dimensions.get('window').height * .02,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    statsTextLabeld: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'white',
        fontWeight: 'bold'
    },
    timeArrows: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .1,
        justifyContent: 'center'
    },
    timeArrowsRow: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width * .0724,
        marginTop: Dimensions.get('window').height * .044,
        width: Dimensions.get('window').width * .45,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    arrow: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    timeText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    tableHeaders: {
        borderTopWidth: 2,
        borderTopColor: 'deepskyblue',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .065,
        justifyContent: 'center'
    },
    tableHeadersRow: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    headerTitle: {
        fontSize: Dimensions.get('window').height * .0134,
        fontWeight: 'bold',
        width: Dimensions.get('window').width * .145,
        textAlign: 'center'
    },
    incomesTableContainer: {
        borderTopWidth: 2,
        borderTopColor: 'deepskyblue',
        borderBottomWidth: 2,
        borderBottomColor: 'deepskyblue'
    },
    incomeRow2Container: {
        justifyContent: 'center',
        height: Dimensions.get('window').height * .065,
        backgroundColor: 'gainsboro'
    },
    incomeRowContainer: {
        justifyContent: 'center',
        height: Dimensions.get('window').height * .065
    },
    incomeRow: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .8,
        justifyContent: 'space-between',
    },
    rowInformation: {
        fontSize: Dimensions.get('window').height * .0134,
        width: Dimensions.get('window').width * .145,
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default StatsAndIncomes;
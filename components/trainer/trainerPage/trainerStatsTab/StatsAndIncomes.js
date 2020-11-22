import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//The trainer's order page - pennding + approved
const StatsAndIncomes = ({navigation}) => {

    const [isIncome, setIsIncome] = useState(true);

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
                <View style={ styles.pendingOrApprovedContainer}>
                <TouchableOpacity 
                    style={isIncome ? styles.pendingLabeld : styles.pendingNotLabeld}
                    onPress={() => handleFlipToggle()}
                >
                    <Text style={isIncome ? styles.pendingTextLabeld : styles.pendingTextNotLabeld}>INCOME</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={isIncome ? styles.approvedLabeld : styles.approvedNotLabeld}
                    onPress={() => handleFlipToggle()}
                >
                    <Text style={isIncome ? styles.approvedTextNotLabeld : styles.approvedTextLabeld}>STATS</Text>
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
    timeArrows: {
        width: Dimensions.get('window').width * .275,
        height: Dimensions.get('window').height * .1,
        justifyContent: 'center'
    },
    timeArrowsRow: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 40,
        width: Dimensions.get('window').width * .45,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    arrow: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    timeText: {
        fontSize: 25,
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
        fontSize: 12,
        fontWeight: 'bold',
        width: 60,
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
        fontSize: 12,
        width: 60,
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default StatsAndIncomes;
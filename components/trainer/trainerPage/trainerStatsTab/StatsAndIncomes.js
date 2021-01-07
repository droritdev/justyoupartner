import React, {useContext, useState} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

//The trainer's order page - pennding + stats
const StatsAndIncomes = ({navigation}) => {

    const [isIncome, setIsIncome] = useState(true);
    const [completedOrders, setCompletedOrders] = useState([]);
    const {trainerID, dispatchTrainerID} = useContext(IdContext);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTrainerOrders();
        });
    
        
        return unsubscribe;
      }, [navigation]);


      const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    const getMonthsArray = () => {
        var currentDate = new Date();
        var month = currentDate.getMonth();
        var allMonths = 
        ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

        if (month === 0) {
            return [allMonths[11], allMonths[0], allMonths[1]];
        } else if (month === 11) {
            return [allMonths[10], allMonths[11], allMonths[0]];
        } else {
            return [allMonths[month-1] , allMonths[month], allMonths[month+1]];
        }
    }

    //Get all orders by trainer ID sort by time created
    const getTrainerOrders = async () => {
        axios
        .get('/orders/by-trainer-id/'+trainerID, 
        config
        )
        .then((doc) => {
            var allOrders = doc.data;
            var completedOrders = [];

            for (let index = 0; index < allOrders.length; index++) {
                const singleOrder = allOrders[index];
                if (singleOrder.status === "completed") {
                    completedOrders.push(singleOrder);
                } 
            }

            //Sort completed orders by date
            completedOrders = sortOrders(completedOrders);

            setCompletedOrders(completedOrders);
            // pendingOrders = sortOrders(pendingOrders);


            // setPendingOrders(pendingOrders);
            // setApprovedOrders(approvedOrders);
        })
        .catch((err) => alert(err));
    }



    //Convert  2021-01-03 07:00:00 to 2021-01-03T07:00:00.000Z
    const getDateInFormat = (dateString) => {
        return ((dateString.replace(/ /g, 'T'))+ '.000Z');
    }



    //Sort orders by time created
    const sortOrders = (ordersArray) => {
        // Iterate Over Array From First Element
        for (let i = 0; i < ordersArray.length; i++) {
            // Iterate Over Array From Succeeding Element
            for (let j = 1; j < ordersArray.length; j++) {
                //checks the training time
                const firstOrder = new Date(getDateInFormat(ordersArray[j - 1].trainingDate.startTime));
                firstOrder.setHours(firstOrder.getHours()+firstOrder.getTimezoneOffset()/60);
                
                const secondOrder = new Date(getDateInFormat(ordersArray[j].trainingDate.startTime));
                secondOrder.setHours(secondOrder.getHours()+secondOrder.getTimezoneOffset()/60);

                if (firstOrder > secondOrder) {
                    // Swap Numbers
                    swapNumbers(ordersArray, j - 1, j);
                }
            }
        }
        return ordersArray;
    }

    const swapNumbers = (array, i, j) => {
        // Save Element Value (Because It Will Change When We Swap/Reassign)
        let temp = array[i];
        // Assign Element2 To Element1
        array[i] = array[j];
        // Assign Element1 To Element2
        array[j] = temp;
    };
    

    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        setIsIncome(!isIncome);
        getTrainerOrders();
    }

    const getCompletedOrders = () => {
        let repeats = [];
        if (completedOrders !== []) {
            for(let i = 0; i < completedOrders.length; i++) {
                var orderObject = completedOrders[i];
                repeats.push(
                    <View style={i % 2 === 0? styles.incomeRowContainer : styles.incomeRow2Container}>
                        <View style={styles.incomeRow}>
                            <Text style={styles.rowInformation}>{orderObject.client.firstName + " " + orderObject.client.lastName}</Text>
                            <Text style={styles.rowInformation}>{orderObject.trainingDate.startTime.slice(0, 10)}</Text>
                            <Text style={styles.rowInformation}>{orderObject.trainingDate.startTime.slice(11, 16)}</Text>
                            <Text style={styles.rowInformation}>{orderObject.type.charAt(0).toLowerCase() === 's'?"Single":"Couple"}</Text>
                            <Text style={styles.rowInformation}>{orderObject.cost+"$"}</Text>

                        </View>
                </View>
                )
            }
        }
        return repeats;
    };
    // <Text style={styles.rowInformation}>Erez Buganim</Text>
    // <Text style={styles.rowInformation}>3.6.2020</Text>
    // <Text style={styles.rowInformation}>16:00</Text>
    // <Text style={styles.rowInformation}>5th Ave, NY, NY</Text>
    // <Text style={styles.rowInformation}>Yoga</Text>
    // <Text style={styles.rowInformation}>Personal Training</Text>
    // <Text style={styles.rowInformation}>150$</Text>

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
            {/* <View style={styles.timeArrows}>
                <View style={styles.timeArrowsRow}>
                    <TouchableOpacity>
                        <Text style={styles.arrow}>{"<"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeText}>JUNE 2020</Text>
                    <TouchableOpacity>
                        <Text style={styles.arrow}>{">"}</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            {isIncome?
                <View>
                    <View style={styles.tableHeaders}>
                        <View style={styles.tableHeadersRow}>
                            <Text style={styles.headerTitle}>Name</Text>
                            <Text style={styles.headerTitle}>Date</Text>
                            <Text style={styles.headerTitle}>Time</Text>
                            <Text style={styles.headerTitle}>Type</Text>
                            <Text style={styles.headerTitle}>Income</Text>
                        </View>
                    </View>
                    <View style={styles.incomesTableContainer}>
                        {getCompletedOrders()}
                    </View>
                </View>
            :
                <View>
                
                    <LineChart
                    data={{
                        labels: getMonthsArray(),
                        datasets: [
                        {
                            data: [
                            12,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                            ],
                            color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
                        }
                        ]
                    }}
                    width={Dimensions.get("window").width * .95} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#fafafa",
                        backgroundGradientFrom: "#fafafa",
                        backgroundGradientTo: "#fafafa",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                        borderRadius: 16
                        },
                        propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "black"
                        }
                    }}
                    bezier
                    style={styles.graphStyle}
                    />
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
        marginTop: Dimensions.get('window').height * .03,
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
        width: Dimensions.get('window').width * .205,
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
        fontSize: Dimensions.get('window').height * .014,
        width: Dimensions.get('window').width * .205,
        textAlign: 'center',
        alignSelf: 'center'
    },
    graphStyle: {
        marginTop: Dimensions.get('window').height * .03,
        alignSelf: 'center',
        borderRadius: 16
    }
});

export default StatsAndIncomes;
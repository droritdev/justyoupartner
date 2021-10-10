import React, {useRef, useContext, useState, useEffect} from 'react';
import { Modal, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';

import {LineChart} from "react-native-chart-kit";

//The trainer's order page - pennding + stats
const StatsAndIncomes = ({navigation}) => {

    //total orders
    //orders declined
    //order average price

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isIncome, setIsIncome] = useState(true);
    const [isTotal, setIsTotal] = useState(true);
    
    //total info
    const [totalOrders, setTotalOrders] = useState([]);
    const [totalCompletedOrders, setTotalCompletedOrders] = useState([]);
    const [totalDeclinedOrders, setTotalDeclinedOrders] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);

    //monthly info
    const [monthlyOrders, setMonthlyOrders] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthlyCompletedOrders, setMonthlyCompletedOrders] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthlyDeclinedOrders, setMonthlyDeclinedOrders] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthlyIncome, setMonthlyIncome] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthlyIncomeGraph, setMonthlyIncomeGraph] = useState([0, 0, 0, 0, 0, 0]);

    //Check if loading data from database is finished
    const [isLoading, setIsLoading] = useState(true);

    //our trainer ID
    const {trainerID} = useContext(IdContext);

    //ref to show covid alert
    let dropDownAlertRef = useRef(null);

    //Modal to display for covid-19 alert tap
    const [covidModalVisible, setCovidModalVisible] = useState(false);



      const config = {
        withCredentials: true,
        baseURL: 'http://justyou.iqdesk.info:8081/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        getTrainerOrders()
    }, [navigation])

    //Update the covid alert var to false (will not display coivd alert anymore)
    const covidAlertCancel = () => {
        global.covidAlert = false;
    }


    //Show the covid information modal
    const covidAlertTap = () => {
        setCovidModalVisible(true);
    }

    //Update current date to one month before
    const handleLeftArrow = async () => {
        var newDate = currentDate;
        var newMonth = newDate.getMonth();

        if(newMonth === 0) {
            newDate.setMonth(11);
        } else {
            newDate.setMonth(newMonth-1);
        }

        setCurrentDate(newDate);
        getTrainerOrders();
    }



    //Update current date to one month after
    const handleRightArrow = async () => {
        var newDate = currentDate;
        var newMonth = newDate.getMonth();

        if(newMonth === 11) {
            newDate.setMonth(0);
        } else {
            newDate.setMonth(newMonth+1);
        }

        setCurrentDate(newDate);
        getTrainerOrders();
    }



    //Returns an array of months to display on graph
    const getMonthsArray = () => {
        var month = currentDate.getMonth();
        var allMonths = 
        ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'];

        //Caclculate what months to display (past 4 months, this month, and next month) (total of 6 months)
        switch (month) {
            case 0:
                return [allMonths[8], allMonths[9], allMonths[10], allMonths[11], allMonths[0], allMonths[1]];
            case 1:
                return [allMonths[9], allMonths[10], allMonths[11], allMonths[0], allMonths[1], allMonths[2]];
            case 2:
                return [allMonths[10], allMonths[11], allMonths[0], allMonths[1], allMonths[2], allMonths[3]];
            case 3:
                return [allMonths[11], allMonths[0], allMonths[1], allMonths[2], allMonths[3], allMonths[4]];
            case 11:
                return [allMonths[7], allMonths[8], allMonths[9], allMonths[10], allMonths[11], allMonths[0]];
            //All other cases
            default:
                var monthsToReturn = []; 
                for (let index = month-4; index < month+2; index++) {
                   monthsToReturn.push(allMonths[index]);
                    
                }
                return monthsToReturn;
                
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

            //Total info
            var completedOrders = [];
            var declinedOrders = [];
            var totalOrders = [];
            var totalIncome = 0;

            //Monthly info
            var completedByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var declinedByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var ordersByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var incomesByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            //Run through all orders.
            //Push completed orders into completedOrders array
            //Push order income by their month, into the incomesByMonth array
            for (let index = 0; index < allOrders.length; index++) {
                const singleOrder = allOrders[index];
                if (singleOrder.status === "completed") {
                    //Order full date
                    const orderDate = new Date(getDateInFormat(singleOrder.trainingDate.startTime));
                    orderDate.setHours(orderDate.getHours()+orderDate.getTimezoneOffset()/60);
                    //Order month
                    const orderMonth = orderDate.getMonth();

                    //Calculate income per month
                    var currentTotalForMonth = incomesByMonth[orderMonth];
                    incomesByMonth[orderMonth] = currentTotalForMonth + singleOrder.cost;

                    //Calculate total income
                    totalIncome = totalIncome  + singleOrder.cost;


                    //Update completed order for the month and total order for the month
                    completedByMonth[orderMonth] = completedByMonth[orderMonth] === undefined? 1 : completedByMonth[orderMonth] + 1
                    ordersByMonth[orderMonth] = ordersByMonth[orderMonth] === undefined? 1 : ordersByMonth[orderMonth] + 1

                    //Add to completed orders array and to total orders
                    completedOrders.push(singleOrder);
                    totalOrders.push(singleOrder);
                } else if (singleOrder.status === "declined") {
                    //Order full date
                    const orderDate = new Date(getDateInFormat(singleOrder.trainingDate.startTime));
                    orderDate.setHours(orderDate.getHours()+orderDate.getTimezoneOffset()/60);
                    //Order month
                    const orderMonth = orderDate.getMonth();

                    //Update declined order for the month and total order for the month
                    declinedByMonth[orderMonth] = declinedByMonth[orderMonth] === undefined? 1 : declinedByMonth[orderMonth] + 1
                    ordersByMonth[orderMonth] = ordersByMonth[orderMonth] === undefined? 1 : ordersByMonth[orderMonth] + 1
                    
                    //Add to declined orders array and to total orders
                    declinedOrders.push(singleOrder);
                    totalOrders.push(singleOrder);
                }
            }

            //Sort orders by date
            totalOrders = sortOrders(totalOrders);
            completedOrders = sortOrders(completedOrders);
            declinedOrders = sortOrders(declinedOrders);

            //Update value for all the totals
            setTotalOrders(totalOrders);
            setTotalCompletedOrders(completedOrders);
            setTotalDeclinedOrders(declinedOrders);
            setTotalIncome(totalIncome);

            //Update value for all the monthly
            setMonthlyOrders(ordersByMonth);
            setMonthlyCompletedOrders(completedByMonth);
            setMonthlyDeclinedOrders(declinedByMonth);
            setMonthlyIncome(incomesByMonth);
            updateData(incomesByMonth, "monthlyIncome");
            setIsLoading(false);

        })
        .catch((err) => {});
    }



    const updateData = (array, type) => {
        switch (type) {
            case "monthlyIncome":
                setMonthlyIncomeGraph(getUpdateData(array));
            break;
        }
    }


    //Receives an array of 12 months info, returns an array of the 6 months required info
    const getUpdateData = (array) => {
        var month = currentDate.getMonth();
        
        switch (month) {
            case 0:
                return [array[8], array[9], array[10], array[11], array[0], array[1]];
            case 1:
                return [array[9], array[10], array[11], array[0], array[1], array[2]];
            case 2:
                return [array[10], array[11], array[0], array[1], array[2], array[3]];
            case 3:
                return [array[11], array[0], array[1], array[2], array[3], array[4]];
            case 11:
                return [array[7], array[8], array[9], array[10], array[11], array[0]];
            //All other cases
            default:
                var infoToReturn = []; 
                for (let index = month-4; index < month+2; index++) {
                    infoToReturn.push(array[index]);
                    
                }
                return infoToReturn;
            }
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

                if (firstOrder < secondOrder) {
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

    //Sets the total/monthly flipToggle value
    const handleTotalToggle = () => {
        setIsTotal(!isTotal);
        getTrainerOrders();
    }


    const getCompletedOrders = () => {
        let repeats = [];
        if (totalCompletedOrders !== []) {
            for(let i = 0; i < totalCompletedOrders.length; i++) {
                var orderObject = totalCompletedOrders[i];
                repeats.push(
                    <View key={'row'+i} style={i % 2 === 0? styles.incomeRowContainer : styles.incomeRow2Container}>
                        <View style={styles.incomeRow}>
                            <Text style={styles.rowInformation}>{orderObject.client.firstName + " " + orderObject.client.lastName}</Text>
                            <Text style={styles.rowInformation}>{orderObject.trainingDate.startTime.slice(0, 10)}</Text>
                            <Text style={styles.rowInformation}>{orderObject.trainingDate.startTime.slice(16, 21)}</Text>
                            <Text style={styles.rowInformation}>{orderObject.type.charAt(0).toLowerCase() === 's'?"Single":"Couple"}</Text>
                            <Text style={styles.rowInformation}>{orderObject.cost+"$"}</Text>

                        </View>
                </View>
                )
            }
        }
        return repeats;
    };


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
                    {isLoading?
                        <View style={styles.progressView}>
                            <Progress.Circle size={Dimensions.get('window').height * .25} indeterminate={true} />
                        </View>
                    :
                        <View>
                        {totalCompletedOrders.length === 0?
                            <View> 
                                <Image
                                    source={require('../../../../images/noReceipts.png')}
                                    style={styles.noOrdersImage}
                                />
                                <Text style={styles.noOrdersTitle}>{"NO RECEIPTS FOUND"}</Text>
                                <Text style={styles.noOrdersMessage}>{"Looks like you haven't completed an order yet."}</Text>
                            </View>
                        :
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
                        }
                    </View>
                    }
                </View>

            :
                <View>
                
                    <LineChart
                    data={{
                        labels: getMonthsArray(),
                        datasets: [
                        {
                            data: monthlyIncomeGraph,
                            color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
                        }]
                    }}
                    width={Dimensions.get("window").width * .95} // from react-native
                    height={Dimensions.get("window").height * .3}
                    yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#fafafa",
                        backgroundGradientFrom: "#fafafa",
                        backgroundGradientTo: "#fafafa",
                        decimalPlaces: 1, // optional, defaults to 2dp
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


                    <View style={ styles.underGraphTitle}>
                        <View style={ styles.totalOrMonthlyContainer}>
                            <TouchableOpacity 
                                style={isTotal ? styles.totalLabled : styles.totalNotLabled}
                                onPress={() => handleTotalToggle()}
                            >
                                <Text style={isTotal ? styles.totalTextLabled : styles.totalTextNotLabled}>TOTAL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={isTotal ? styles.monthlyLabled : styles.monthlyNotLabled}
                                onPress={() => handleTotalToggle()}
                            >
                                <Text style={isTotal ? styles.monthlyTextNotLabled : styles.monthlyTextLabled}>MONTHLY</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.monthPickerContainer} display={isTotal}>
                            <TouchableOpacity 
                                    onPress={()=> handleLeftArrow()}
                            >
                                <Icon name="chevron-left" size={Dimensions.get('window').height * .035} style={styles.arrow}/>
                            </TouchableOpacity>
                            
                            <Text  style={styles.monthTitle}> {currentDate.toLocaleString('default', { month: 'short' })} </Text>
                            
                            <TouchableOpacity 
                                    onPress={()=> handleRightArrow()}
                            >
                                <Icon name="chevron-right" size={Dimensions.get('window').height * .035} style={styles.arrow} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {isTotal?
                    <View style={styles.totalContainer}>                    
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Total orders : '+totalOrders.length}</Text>
                        </View>
                        <View style={styles.InfoRow2}>
                            <Text style={styles.underGraphRowInformation} >{'Completed orders : '+totalCompletedOrders.length}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Declined orders  : '+totalDeclinedOrders.length}</Text>
                        </View>
                        <View style={styles.InfoRow2}>
                            <Text style={styles.underGraphRowInformation} >{'Income : '+totalIncome +'$'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Average order price : '+((totalIncome === 0 && totalCompletedOrders.length === 0) ? 0 : totalIncome/totalCompletedOrders.length) +'$'}</Text>
                        </View> 
                    </View>
                    :
                    <View style={styles.totalContainer}>                    
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Total orders : '+ monthlyOrders[currentDate.getMonth()]}</Text>
                        </View>
                        <View style={styles.InfoRow2}>
                            <Text style={styles.underGraphRowInformation} >{'Completed orders : '+ monthlyCompletedOrders[currentDate.getMonth()]}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Declined orders  : '+monthlyDeclinedOrders[currentDate.getMonth()]}</Text>
                        </View>
                        <View style={styles.InfoRow2}>
                            <Text style={styles.underGraphRowInformation} >{'Income : '+ monthlyIncome[currentDate.getMonth()]+'$'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.underGraphRowInformation} >{'Average order price : '+
                            ((monthlyIncome[currentDate.getMonth()] === 0 && monthlyCompletedOrders[currentDate.getMonth()] === 0)? 0 :
                             monthlyIncome[currentDate.getMonth()]/monthlyCompletedOrders[currentDate.getMonth()]).toString().slice(0,4) +'$'}</Text>
                        </View> 
                    </View>
                    }

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
        fontSize: Dimensions.get('window').height * .0278,
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
        borderRadius: 16,
    },
    underGraphTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    underGraphRowInformation: {
        fontSize: Dimensions.get('window').height * .025,
        marginLeft: Dimensions.get('window').width *.01
    },
    monthPickerContainer: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .033,
        marginRight: Dimensions.get('window').width * .1
    },
    monthTitle: {
        fontSize: Dimensions.get('window').height * .025,
    },
    totalOrMonthlyContainer:{
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .033,
        marginLeft: Dimensions.get('window').width * .0483
    },
    totalLabled: {
        width: Dimensions.get('window').width * .220,
        height: Dimensions.get('window').height * .03,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'deepskyblue',
        justifyContent: 'center'
    },
    totalNotLabled: {
        width: Dimensions.get('window').width * .220,
        height: Dimensions.get('window').height * .03,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    totalTextLabled: {
        fontSize: Dimensions.get('window').height * .015,
        color: 'white',
        fontWeight: 'bold'
    },
    totalTextNotLabled: {
        fontSize: Dimensions.get('window').height * .015,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    monthlyLabled: {
        width: Dimensions.get('window').width * .220,
        height: Dimensions.get('window').height * .03,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthlyNotLabled: {
        width: Dimensions.get('window').width * .220,
        height: Dimensions.get('window').height * .03,
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderColor: 'deepskyblue',
        backgroundColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthlyTextNotLabled: {
        fontSize: Dimensions.get('window').height * .015,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    monthlyTextLabled: {
        fontSize: Dimensions.get('window').height * .015,
        color: 'white',
        fontWeight: 'bold'
    },
    totalContainer: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .03,
    },
    infoRow: {
        backgroundColor: 'whitesmoke',
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .06,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
        
    },
    InfoRow2: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width *.85,
        height: Dimensions.get('window').height * .06,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    noOrdersTitle: {
        marginTop: Dimensions.get('window').height * .02,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .03,
        fontWeight: '600'
    },
    noOrdersMessage: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .02,
    },
    noOrdersImage: {
        marginTop: Dimensions.get('window').height * .02,
        alignSelf: 'center',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .4,
    },
    progressView: {
        marginTop: Dimensions.get('window').height * .2,
        alignSelf: 'center'
    },
    covidAlertView: {
        zIndex: 2,
        opacity: 0.9
    },
    covidAlertContainer: {
        backgroundColor: 'deepskyblue',
    },
    covidContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    covidModalContainer: {
        backgroundColor: "white",
        height: Dimensions.get('window').height * .45,
        width: Dimensions.get('window').width * .9,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    covidTitle: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold'
    },
    covidMessage: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .013,
        alignSelf: 'center',
        marginLeft: Dimensions.get('window').width * .020,
        fontSize: Dimensions.get('window').height * .02,
    },
    covidCloseIcon: {
        marginTop: Dimensions.get('window').height * .015,
        marginRight: Dimensions.get('window').width * .015,
        alignSelf: 'flex-end',
    }
});

export default StatsAndIncomes;
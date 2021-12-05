import React, {useRef, useContext, useState, useEffect} from 'react';
import {Modal, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {OrderContext} from '../../../../context/orderContexts/OrderContext';
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/Feather';
import { useIsFocused } from "@react-navigation/native";

//The trainer's order page - pennding + approved
const TrainerOrdersPage = ({navigation}) => {
    const isFocused = useIsFocused()
    //Trainer ID to get orders related to this ID
    const {trainerID} = useContext(IdContext);

    //Dispatch the order object to the next page
    const {dispatchOrderObject} = useContext(OrderContext);

    //Check if flip is on pending or approved
    const [isPending, setIsPending] = useState(true);

    //Aray with all the pending orders
    const [pendingOrders, setPendingOrders] = useState([]);

    //Aray with all the approved orders
    const [approvedOrders, setApprovedOrders] = useState([]);

    //Check if loading data from database is finished
    const [isLoading, setIsLoading] = useState(true);
    
    //Information of all pending clients
    const [pendingClientsInfo, setPendingClientsInfo] = useState([]);

    //Information of all approved clients
    const [approvedClientsInfo, setApprovedClientsInfo] = useState([]);
    
    //ref to show covid alert
    let dropDownAlertRef = useRef(null);

    //Modal to display for covid-19 alert tap
    const [covidModalVisible, setCovidModalVisible] = useState(false);

    const config = {
        withCredentials: true,
        baseURL: 'https://trainer.iqdesk.info:443/',
        headers: {
          "Content-Type": "application/json",
        },
    };
    
    useEffect(() => {
        if(isFocused){
            getTrainerOrders()
        }
    }, [navigation, isFocused])

    //Update the covid alert var to false (will not display coivd alert anymore)
    const covidAlertCancel = () => {
        global.covidAlert = false;
    }


    //Show the covid information modal
    const covidAlertTap = () => {
        setCovidModalVisible(true);
    }


    //Sets the single/couple flipToggle value
    const handleFlipToggle = () => {
        getTrainerOrders();
        setIsPending(!isPending);
    }


    //Get all orders by trainer ID, sort by time created, assaign to designated const
    const getTrainerOrders = async () => {
        console.log('in gettrainerorders')
        await axios
        .get('/orders/by-trainer-id/'+trainerID, 
        config
        )
        .then(async (doc) => {
            var allOrders = doc.data;
            var pendingOrders = [];
            var approvedOrders = [];

            for (let index = 0; index < allOrders.length; index++) {
                const singleOrder = allOrders[index];
                if (singleOrder.status === "pending") {
                    pendingOrders.push(singleOrder);
                } else if (singleOrder.status === "approved") {
                    approvedOrders.push(singleOrder);
                }
            }

            var approvedClients = await getApprovedClientsInfo(approvedOrders);
            var pendingClients = await getPendingClientsInfo(pendingOrders);

            pendingOrders = sortOrders(pendingOrders);
            approvedOrders = sortOrders(approvedOrders);
            console.log('pending orders ', pendingOrders)
            console.log('approved orders ', approvedOrders)
            setIsLoading(false);
            setPendingOrders(pendingOrders);
            setApprovedOrders(approvedOrders);
            setApprovedClientsInfo(approvedClients);
            setPendingClientsInfo(pendingClients);
        })
        .catch((err) => {console.log('error in gettrainerorders ', err)});
    }


    //Get all approved orders
    //Return an array with all the information of those clients from database
    const getApprovedClientsInfo = async (approvedOrders) => {
            //Array to to be filled with the ids of the clients that are approved
            var approvedIdArray = [];
    
            //Push into the approvedIdArray all of the approved clientID
            for (let index = 0; index < approvedOrders.length; index++) {
                const singleApprovedUserID = approvedOrders[index].client.id;
                approvedIdArray.push(singleApprovedUserID);
            }

        var info = await fetchInfoFromDB(approvedIdArray);
        return info;
    }



    //Get all pending orders
    //Return an array with all the information of those clients from database
    const getPendingClientsInfo = async (pendingOrders) => {
        //Array to to be filled with the ids of the clients that are pending
        var pendingIdArray = [];

        //Push into the pendingIdArray all of the pending clientID
        for (let index = 0; index < pendingOrders.length; index++) {
            const singlePendingUserID = pendingOrders[index].client.id;
            pendingIdArray.push(singlePendingUserID);
        }

        var info = await fetchInfoFromDB(pendingIdArray);
        return info;
    }



    //Get an array of client IDS,
    //Return an array with all the information of those clients from database
    const fetchInfoFromDB = async (idArray) => {
        var info = [];

        //fetch the  clients from mongodb using axios
        await axios
        .get('/clients/findMultipleClients/'+idArray, 
        config
        )
        .then((doc) => {
            info = doc.data;
            info.reverse();

        })
        .catch((err) => {});

        return info;
    }



    //Sort orders by time created
    const sortOrders = (ordersArray) => {
        // Iterate Over Array From First Element
        for (let i = 0; i < ordersArray.length; i++) {
            // Iterate Over Array From Succeeding Element
            for (let j = 1; j < ordersArray.length; j++) {
                //checks the time order was created at
                var first = new Date(ordersArray[j - 1].createdAt).getTime();
                var second = new Date(ordersArray[j].createdAt).getTime();
                if (first > second) {
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


    //Receive the current order userID and find this user information in the clientsInfoArray
    //Return the information
    const getCurrentClient = (userID, clientsInfoArray) => {
        var info = {};

        for (let index = 0; index < clientsInfoArray.length; index++) {
            const singleClientID = clientsInfoArray[index]._id;
            if (userID === singleClientID) {
                info = clientsInfoArray[index];
                break;
            }
        }

        return info;
    }


    const getPendingOrdersPattern = () => {
        let repeats = [];
        if (pendingOrders.length !== 0 && pendingClientsInfo.length > 0) {
            for(let i = 0; i < pendingOrders.length; i++) {
                //Get the client object that contatins all of his information
                var clientInfo = getCurrentClient(pendingOrders[i].client.id, pendingClientsInfo);

                repeats.push(
                    <View key={'pendingRow'+i} style={i % 2 === 0? styles.pendingOrder : styles.pendingOrderSecond}>
                        <TouchableOpacity 
                            style={{flexDirection: 'row'}}
                            onPress={() => handleOnArrowPendingPressed(i)}
                        >
                        <FastImage
                                    style={styles.image}
                                    source={{
                                    uri: clientInfo.image,
                                    priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={styles.nameBox}>
                            <Text style={styles.nameText}>{clientInfo.name.first + " " + clientInfo.name.last }</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateText}>{pendingOrders[i].trainingDate.startTime.slice(0, 10)}</Text>
                        </View>
                            <Icon name="chevron-right" size={18} style={styles.arrow} />
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return repeats;
    };



    const getApprovedOrdersPattern = () => {
        let repeats = [];
        console.log('approved orders ', approvedOrders)
        if (approvedOrders.length !== 0) {
            console.log('approved orders length ', approvedOrders.length)
            for(let i = 0; i < approvedOrders.length; i++) {
                //Get the client object that contatins all of his information
                var clientInfo = getCurrentClient(approvedOrders[i].client.id, approvedClientsInfo);
                console.log('clientInfo ', i, clientInfo)

                repeats.push(
                    <View key={'approvedRow'+i} style={i % 2 === 0? styles.pendingOrder : styles.pendingOrderSecond}>
                    <TouchableOpacity 
                        style={{flexDirection: 'row'}}
                        onPress={() => handleArrowApprovedPressed(i)}
                    >
                    <FastImage
                                style={styles.image}
                                source={{
                                uri: approvedOrders[i].client.profilePic,
                                priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                    />
                    <View style={styles.nameBox}>
                        {/* <Text style={styles.nameText}>{clientInfo.name.first + " " + clientInfo.name.last  }</Text> */}
                        <Text style={styles.nameText}>{approvedOrders[i].client.firstName + " " + approvedOrders[i].client.lastName }</Text>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>{approvedOrders[i].trainingDate.startTime.slice(0, 10)}</Text>
                    </View>
                            <Icon name="chevron-right" size={18} style={styles.arrow} />
                    </TouchableOpacity>
                </View>
                )
            }
        }
        return repeats;
    };


    //Dispatch the order object and navigate to pending order details papge
    const handleOnArrowPendingPressed = (index) => {
        
        dispatchOrderObject({
            type: 'SET_ORDER_OBJECT',
            orderObject: pendingOrders[index]
        });

        navigation.navigate('PendingApprovalOrder');
    }


    //Dispatch the order object and navigate to approved order details papge
    const handleArrowApprovedPressed = (index) => {

        dispatchOrderObject({
            type: 'SET_ORDER_OBJECT',
            orderObject: approvedOrders[index]
        });

        navigation.navigate('ApprovedOrder');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <Modal
                
                animationType="slide"
                transparent={true}
                cancelable={true}
                visible={covidModalVisible}
                onRequestClose={()=>{}}
            >
                <View style={styles.covidContainer}>
                    
                    <View style={styles.covidModalContainer}>
                        <Icon
                            name="x-circle" 
                            size={Dimensions.get('window').width * .05} 
                            style={styles.covidCloseIcon} 
                            onPress={()=> {setCovidModalVisible(false)}}
                        />
                        <Text style={styles.covidTitle}>COVID-19 Information</Text>
                        <Text style={styles.covidMessage}>{"We at JustYou take care to follow the changing guidelines of the Ministry of Health regarding the coronavirus. Before ordering, the personal trainer and the client will fill out a statement that they do indeed meet the requirements of the law regarding the coronavirus. \nAs Everyone knows, the guidelines may change at any time and we will make the adujstments according to the changes to be determined by the Ministry of Health. Adherence to these requirments is for all of us for your health and safety and we will know better days"}.</Text>
                    </View>
                </View>

            </Modal>

            

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
                    <View>
                        {isLoading?
                            <View style={styles.progressView}>
                                <Progress.Circle size={Dimensions.get('window').height * .25} indeterminate={true} />
                            </View>
                        :
                        <View style={styles.pendingContainer}>
                            <View style={styles.pendingOrderView}>
                                {pendingOrders.length === 0 ? 
                                <View style={{marginTop: 100}}> 
                                    <Text style={styles.noOrdersTitle}>{"NO PENDING ORDERS"}</Text>
                                    <Text style={styles.noOrdersMessage}>{"Looks like you haven't received orders yet."}</Text>
                                </View>
                                :
                                getPendingOrdersPattern()}
                            </View>
                        </View>
                        }
                    </View>
                    : 
                    <View>
                        {isLoading?
                            <View style={styles.progressView}>
                                <Progress.Circle size={Dimensions.get('window').height * .25} indeterminate={true} />
                            </View>
                        :
                        <View style={styles.pendingContainer}>
                            <View style={styles.pendingOrderView}>
                                {approvedOrders.length === 0 ? 
                                <View style={{marginTop: 100}}>
                                    <Text style={styles.noOrdersTitle}>{"NO APPROVED ORDERS"}</Text>
                                    <Text style={styles.noOrdersMessage}>{"Looks like you haven't approved orders yet."}</Text>
                                </View>
                                :
                                getApprovedOrdersPattern()}
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
    },
    pendingOrderView: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    pendingOrder: {
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    pendingOrderSecond: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    image: {
        marginTop: Dimensions.get('window').height * .010,
        marginBottom: Dimensions.get('window').height * .010,
        marginLeft: Dimensions.get('window').width * .050,
        backgroundColor: 'transparent',
        height: Dimensions.get('window').height * .066,
        width: Dimensions.get('window').height * .066,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3
    },
    nameBox: {
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
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .275
    },
    dateText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    arrow: {
        marginTop: Dimensions.get('window').height * .034,
        marginRight: Dimensions.get('window').width * .02,
        width: 25,
        height: 25,
    },
    arrowButton: {
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

export default TrainerOrdersPage;
import React, {useContext, useState, useEffect} from 'react';
import {Alert, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {OrderContext} from '../../../../context/orderContexts/OrderContext';
import FastImage from 'react-native-fast-image';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import Icon from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-dialog';
import {CalendarContext} from '../../../../context/trainerContextes/CalendarContext';


//The trainer's order page - pennding + approved
const PendingApprovalOrder = ({navigation}) => {

    const {calendar, dispatchCalendar} = useContext(CalendarContext);
    const {orderObject} = useContext(OrderContext);
    const [approveClicked, setApproveClicked] = useState(false);
    const [declineClicked, setDeclineClicked] = useState(false);
    const [clientInfo, setClientInfo] = useState([]);

    const [disableButton, setDisableButton] = useState(false)

    //Format the categories list to lower case with first letter upper case
    const textDisplayFormat = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    //Hide bottom navgation UI
    useEffect(() => {
       navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: false
       })

       getClientInfo();
    }, []);

    

    //Axios post config
    const config = {
        withCredentials: true,
        baseURL: 'https://trainer.iqdesk.info:443/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    const configPayme = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    //Retrive the client information by ID
    const getClientInfo = async () => {
        await axios
         .get('/clients/findByID/'+orderObject.client.id, 
         config
         )
         .then((doc) => {
             var clientObject = doc.data;
             setClientInfo(clientObject);
 
         })
         .catch((err) => {});
     }

    const paymeSale = (paymeToken) => {
        console.log('paymetoken ', paymeToken)
        axios
          .post(
              'https://preprod.paymeservice.com/api/generate-sale',
              {
                  "seller_payme_id": "MPL16286-62772S4F-0CPOKDFP-GIWMKI6U",
                  "sale_price": orderObject.cost * 100,
                  "currency": "USD",
                  "product_name": "Training",
                  "transaction_id": clientInfo.email,
                  "installments": 1,
                  "buyer_key": paymeToken,
                  "language": "en"
              },
              configPayme
          )
          .then(response => {
              console.log('payme_status ', response.data.payme_status)
              if(response.data.payme_status === 'success'){
                console.log('payme success')
                approveWorkout()
              } else {
                console.log('payme error')
                Alert.alert('Payment failed')
              }
          })
          .catch(err => {
              console.log('payme call error catch ', err)
          })
    }

    const getTokenForPayment = () => {
        console.log('email ', clientInfo.email)
        axios
            .get('https://justyou.iqdesk.info:443/getPaymeToken/' + clientInfo.email.toLowerCase(),
                config
            )
            .then((doc) => {
                if (doc.data.length !== 0) {
                    console.log('payme token in getpaymetoken ', doc.data[0].paymeToken)
                    const paymeToken = doc.data[0].paymeToken
                    paymeSale(paymeToken)
                } else {
                    Alert.alert('Cannot complete payment')
                }
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Cannot complete payment')
            })
    }

    //Show bottom navgation UI
    const handleArrowButton = () => {
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        })
        navigation.navigate('TrainerOrdersPage');
    }


    const handleChatPressed = () => {
        navigation.navigate('Chat', orderObject.client.id);
    }


    //Prompt approve pop-up
    const handleApproveButton = () => {
        setApproveClicked(true);
    }



    // Return an array of all occupied hours on the calendar
    const getOccupiedHours = (events) => {
        var occupiedHours = [];

        for (let index = 0; index < events.length; index++) {
            const singleEvent = events[index];            
            const startTime = singleEvent.start.slice(11);
            const endTime = singleEvent.end.slice(11);
            occupiedHours.push(startTime+'-'+endTime);
         }
        return occupiedHours;
    }


    //Get all events on a certain date
    const getEventsFromDate = (date) => {
        var events = [];
        
        for (let index = 0; index < calendar.length; index++) {
            const singleCalendarData = calendar[index];
            events.push(singleCalendarData.event);
        }

        var eventsOnDate = [];

        for (let index = 0; index < events.length; index++) {
            const singleEvent = events[index];
            const eventDate = singleEvent.start.slice(0, 10);

            if (date === eventDate) {
                eventsOnDate.push(singleEvent);
            }
        }

        return eventsOnDate;
    }



        //Return if the addAbleEvent is on occupiedHours and can't add him
        const checkIfTimeIsOccupied = (event, occupiedHours) => {
            var isOccupied = false;
            
            if (occupiedHours === []) {
                return false;
            }

            //Full date + time of the start of the addAbleEvent
            var eventStartDate = new Date((event.start.replace(/ /g, 'T'))); //2021-01-03T07:00:00.000Z
            //Full date + time of the end of the addAbleEvent
            console.log('in checkiftimeisoccupied eventstarttime ', eventStartDate)
            var eventEndDate = new Date((event.end.replace(/ /g, 'T'))); // 2021-01-03T08:00:00.000Z
            console.log('in checkiftimeisoccupied eventendtime ', eventEndDate)
            //Set time according to Timezone
            //eventStartDate.setHours(eventStartDate.getHours()+eventStartDate.getTimezoneOffset()/60);
            //eventEndDate.setHours(eventEndDate.getHours()+eventStartDate.getTimezoneOffset()/60);
            //console.log('in checkiftimeisoccupied eventstarttime 2', eventStartDate)
            //console.log('in checkiftimeisoccupied eventendtime 2', eventEndDate)
            for (let index = 0; index < occupiedHours.length; index++) {
                const hoursRange = occupiedHours[index]; //example: "05:00:00-06:00:00"
                console.log('hours range ', hoursRange)

                console.log('event start ', event.start)
                var occupiedEventStartDate = new Date(event.start.slice(0, 10));  // 2021-01-03T00:00:00.000Z
                var occupiedEventEndDate = new Date(event.start.slice(0, 10)); // 2021-01-03T00:00:00.000Z

                console.log('occupiedEventStartDate first', occupiedEventStartDate)
                console.log('occupiedEventEndDate first', occupiedEventEndDate)
                
                var startTime = hoursRange.slice(0, 5); //example: "05:00:00"
                var endTime = hoursRange.slice(6); //example: "06:00:00"
                console.log('startTime ', startTime)
                console.log('endTme ', endTime)

                //example: 2021-01-03T05:00:00.000Z
                occupiedEventStartDate.setHours(startTime.split(":")[0]);
                occupiedEventStartDate.setMinutes(startTime.split(":")[1]);
                //occupiedEventStartDate.setSeconds(startTime.split(":")[2]);

                //example: 2021-01-03T06:00:00.000Z
                occupiedEventEndDate.setHours(endTime.split(":")[0]);
                occupiedEventEndDate.setMinutes(endTime.split(":")[1]);
                //occupiedEventEndDate.setSeconds(endTime.split(":")[2]);

                console.log('occupiedEventStartDate ', occupiedEventStartDate)
                console.log('occupiedEventEndDate ', occupiedEventEndDate)

                console.log('eventStartDate.getTime ', eventStartDate.getTime())
                console.log('eventEndDate.getTime ', eventEndDate.getTime())

                console.log('occupiedEventStartDate.getTime ', occupiedEventStartDate.getTime())
                console.log('occupiedEventEndDate.getTime ', occupiedEventEndDate.getTime())

                isOccupied = (eventStartDate.getTime() >= occupiedEventStartDate.getTime() && eventEndDate.getTime() <= occupiedEventEndDate.getTime())
                || (eventStartDate.getTime() >= occupiedEventStartDate.getTime() && eventStartDate.getTime() < occupiedEventEndDate.getTime()  && eventEndDate.getTime() > occupiedEventEndDate.getTime())
                || (eventStartDate.getTime() < occupiedEventStartDate.getTime() && eventStartDate.getTime() < occupiedEventEndDate.getTime()  && eventEndDate.getTime() >= occupiedEventEndDate.getTime())
                || (eventStartDate.getTime() < occupiedEventStartDate.getTime() && eventEndDate.getTime() > occupiedEventStartDate.getTime() && eventEndDate.getTime() < occupiedEventEndDate.getTime());
                //Break loop and return answer if time is occupied (no need to continue)
                if (isOccupied) {
                    break;
                }
            }

            return isOccupied;
    }





    //Check if the time range is available on the trainer calendar
    const handleApproveClicked = () => {
        //handleDismiss()
        //Get currently occupied hours (array) from according to the training date
        console.log('handleApproveClicked training date ', orderObject.trainingDate.startTime)
        var occupiedHours = getOccupiedHours(getEventsFromDate(orderObject.trainingDate.startTime.slice(0, 10)));
        console.log('occupied hours ', occupiedHours)
        //Event to be added if time is available
        var addAbleEvent = 
        { 
            start: orderObject.trainingDate.startTime,
            end: orderObject.trainingDate.endTime,
            title: clientInfo.name.first + ' ' + clientInfo.name.last + ' - ' + textDisplayFormat(orderObject.category),
            summary: textDisplayFormat(orderObject.type) + ' - ' + orderObject.location.address,
            color: 'deepskyblue'  
        }

        console.log('ableevent ', addAbleEvent)
        //Check if the event can be added to the current time (is time occupied)
        if (checkIfTimeIsOccupied(addAbleEvent, occupiedHours) === false) {
            getTokenForPayment();
        } else {
            Alert.alert(
                'Occupied time',
                'The training date and time is currenly occupied. \n Please check your calendar.',
                [
                    {text: 'Okay', onPress: ()=> handleDismiss()},
                ],
                    { cancelable: false }
                )
        }
    }



    //Update order status to approved
    const approveWorkout = () => {
        axios  
        .post('/orders/update-status', {
            _id: orderObject._id,
            status: "approved"
        },
        config
        )
        .then((res) => {
            if (res.data.type === "success") {
                createEventForCalendar();
            }
        })
        .catch((err) =>  {
            handleDismiss();
            alert("Something went wrong, please try again later.");
        });
    }



    //Create an event object to add to the calendar
    const createEventForCalendar = () => {
        var allEvents = calendar;
        var usersInvolved = {
            trainerID: orderObject.trainer.id,
            clientID: orderObject.client.id
        }

        var event = 
        { 
            start: orderObject.trainingDate.startTime,
            end: orderObject.trainingDate.endTime,
            title: orderObject.client.firstName + ' ' + orderObject.client.lastName + ' - ' + textDisplayFormat(orderObject.category),
            summary: textDisplayFormat(orderObject.type) + ' - ' + orderObject.location.address,
            color: 'deepskyblue'  
        }

        allEvents.push({usersInvolved, event});
    
        updateTrainerCalendar(allEvents);
    }



    //Update trainer calendar with the new order 
    const updateTrainerCalendar = async (allEvents) => {
        axios  
        .post('/trainers/updateTrainerInfo', {
            _id: orderObject.trainer.id,
            calendar: allEvents
           
        },
        config
        )
        .then((res) => {
          if (res.data.type === "success") {
            handleDismiss();
            handleArrowButton();
          }
        })
        .catch((err) =>  {
            handleDismiss();
            alert("Something went wrong, please try again later.");
        });
    }



    //Prompt decline pop-up
    const handleDeclineButton = () => {
        setDeclineClicked(true);
    }




    //Update order status to declined
    const handleDeclineClicked = () => {
        axios  
        .post('/orders/update-status', {
            _id: orderObject._id, 
            status: 'declined'
        },
        config
        )
        .then((res) => {
            if (res.data.type === "success") {
                handleDismiss();
                handleArrowButton();
            }
        })
        .catch((err) =>  {
            handleDismiss();
            alert("Something went wrong, please try again later.");
        });
    }



    //Dismiss pop-up
    const handleDismiss = () => {
        setDeclineClicked(false);
        setApproveClicked(false);
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Dialog.Container visible={approveClicked}>
                    <Dialog.Title>Approve Order</Dialog.Title>
                    <Dialog.Description>Do you want to approve this order ?</Dialog.Description>
                    <Dialog.Button label="No" onPress={()=>handleDismiss()} />
                    <Dialog.Button label="Yes" disabled={disableButton} onPress={()=>{
                        setDisableButton(true)
                        handleApproveClicked()
                    }} />
                </Dialog.Container>
            </View>

            <View>
                <Dialog.Container visible={declineClicked}>
                    <Dialog.Title>Decline Order</Dialog.Title>
                    <Dialog.Description>Do you want to decline this order ?</Dialog.Description>
                    <Dialog.Button label="No" onPress={()=>handleDismiss()} />
                    <Dialog.Button label="Yes" onPress={()=>handleDeclineClicked()} />
                </Dialog.Container>
            </View>

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
                                    uri: clientInfo.image,
                                    priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={styles.nameButtonsColumContainer}>
                            <View style={styles.nameBox}>
                                {clientInfo.name!==undefined?
                                    <Text style={styles.nameText}>{clientInfo.name.first + " " + clientInfo.name.last}</Text>
                                :
                                    <Text style={styles.nameText}>{""}</Text>
                                } 
                            </View>

                            <View style={styles.buttonsRowContaier}>
                            <TouchableOpacity
                                onPress={()=>handleChatPressed()}
                                style={styles.chatButton}
                            >
                                {/* <Icon name="message-circle" size={30} style={styles.messageIcon}/> */}
                                {clientInfo.name!==undefined?
                                     <Text style={styles.approveButtonText}>{'Contact ' + clientInfo.name.first}</Text>
                                :
                                <Text style={styles.approveButtonText}>{'Contact'}</Text>
                                } 
                            </TouchableOpacity>
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
                        <View style={styles.addressView}>
                            <Text style={styles.addressText}>{orderObject.location.address}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Type of training:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{textDisplayFormat(orderObject.type)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Category:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{textDisplayFormat(orderObject.category)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Cost:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.cost + '$'}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                        onPress={()=>handleApproveButton()}
                        style={styles.approveButton}
                >
                        <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={()=>handleDeclineButton()}
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
        fontSize: Dimensions.get('window').height * .03,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    imageNameRowContainer: {
        marginTop: Dimensions.get('window').height * .04,
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
        alignItems: 'center',
        width: Dimensions.get('window').width * .85,
    },
    buttonTitle: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .011
    },  
    chatButton: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width * .020,
        marginTop: Dimensions.get('window').height * .015,
        height: Dimensions.get('window').height * .035,
        width: Dimensions.get('window').width * .65,
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    approveButton: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .15,
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
        marginTop: Dimensions.get('window').height * .040,
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width *.85,
        alignSelf: 'center'
    },
    orderRow: {
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .07,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
        paddingLeft: 10,
        paddingRight: 10        
    },
    orderRowSecond: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: Dimensions.get('window').width *.85,
        height: Dimensions.get('window').height * .07,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        marginTop: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .020,
    },
    informationView: {
        width: Dimensions.get('window').width * .4,
        marginTop: Dimensions.get('window').height * .02,
        alignItems: 'center',
        height: Dimensions.get('window').height * .05,
        borderRadius: 10
    },
    addressView: {
        width: Dimensions.get('window').width * .4,
        marginTop: Dimensions.get('window').height * .01,
        alignItems: 'center',
        height: Dimensions.get('window').height * .05,
    },
    informationText: {
        fontSize: Dimensions.get('window').height * .02,
    },
    addressText: {
        fontSize: Dimensions.get('window').height * .017,
    },
    nameBox: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .7
    },
    nameText: {
        fontSize: Dimensions.get('window').height * .03,
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
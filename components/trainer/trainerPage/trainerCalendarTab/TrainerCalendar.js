import React, {useContext, useState, useEffect} from 'react';
import {Modal, Alert, Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
// import EventCalendar from 'react-native-events-calendar';
import EventCalendar from '../../../globalComponents/calendar/EventCalendar';
import Dialog from "react-native-dialog";
import DateTimePicker from '@react-native-community/datetimepicker';
import {CalendarContext} from '../../../../context/trainerContextes/CalendarContext';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {IdContext} from '../../../../context/trainerContextes/IdContext';

// calendar [Object of type Event]
/*
[
    {
        trainerID:
        clinetID:
        start:
        end:
        title:
        summary:
        color:

    }, 
    {
        trainerID:
        clinetID:
        start:
        end:
        title:
        summary:
        color:
    }
]
*/


//Trainer calendar page
const TrainerCalendar = ({navigation}) => {

    const {trainerID, dispatchTrainerID} = useContext(IdContext);
    const {calendar, dispatchCalendar} = useContext(CalendarContext);
    const [allEvents, setAllEvents] = useState([]);
    const [makeAvailableVisible, setMakeAvailableVisible] = useState(false);
    const [makeUnavailableVisible, setMakeUnavailableVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [currentDisplayedDate, setCurrentDisplayedDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    var blockStartTime = new Date(currentDisplayedDate+'T02:00:00.00Z');
    var blockEndTime = new Date(currentDisplayedDate+'T02:00:00.00Z');
    // const forceUpdate = React.useReducer(bool => !bool)[1]; 

    
    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };

    //When window is focused. load all events.
    React.useEffect(() => {
        setCurrentDisplayedDate(getCurrentDate());
        
        const unsubscribe = navigation.addListener('focus', () => {
            getTrainerCalendar();
        });
    
        
        return unsubscribe;
      }, [navigation]);


      //Get current trainer calendar from MongoDB and update UI
      const getTrainerCalendar =  async () => { 
        axios
        .get('/trainers/email/'+auth().currentUser.email,
        config
        )
        .then(async (doc) => {
            var calendar = doc.data[0].calendar;
            var allEvents = [];
            for (let index = 0; index < calendar.length; index++) {
                const singleCalendarData = calendar[index];
                allEvents.push(singleCalendarData.event);
            }
           setAllEvents(allEvents);
    
           await dispatchCalendar({
                type: 'SET_CALENDAR',
                calendar: calendar
            });
        })
        .catch((err) => {
            Alert.alert(
                'No internet connection',
                'Please check your internet connection and try again.',
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            )
        });
      }




    //Make the event available for customers
    const handleMakeAvailableAccept = async () => {
        setMakeAvailableVisible(false);

        await getTrainerCalendar();

        var events = allEvents;
        var index = events.indexOf(selectedEvent);
        var eventToRemove = events[index];

        await removeEventFromMongoDB(eventToRemove);
    }


    //Remove a given event from the calendar object of trainer in database
    const removeEventFromMongoDB = async (eventToRemove) => {
        var tempCalendar = calendar;

        var result = await checkIfEventIsOnCalendar(eventToRemove);
        
        //Push the calendar object into our temp calendar
        if(result[0] === true) {
            tempCalendar.splice(result[1], 1);
            await updateCalendarToMongoDB(tempCalendar);
        }
    }



        //Check if a given event is on the calendar
        //Returns an array: boolean and index of event on the calendar
        const checkIfEventIsOnCalendar = async (eventToRemove) => {
            var tempCalendar = calendar;
            var isEventInCalendar = false;
            var tempIndex = -1;
    
            //Run over all the objects on the calendar object from mongo ( {usersinvolved, event})
            for (let j = 0; j < tempCalendar.length; j++) {
                const singleCalendarData = tempCalendar[j];
                //Check if the event is already inside the claendar object from mongo
                if(eventToRemove === singleCalendarData.event) {
                    tempIndex = j;
                    isEventInCalendar = true;
                    break;
                }
            }

            return [isEventInCalendar, tempIndex];
        }



    //Update calendar to mongodb
    const updateCalendarToMongoDB = async (calendar) => {
        axios  
        .post('/trainers/updateTrainerInfo', {
            _id: trainerID,
            calendar: calendar
            
        },
        config
        )
        .then((res) => {
            if (res.data.type === "success") {
                getTrainerCalendar();
            }
        })
        .catch((err) =>  {
            alert("Something went wrong, please try again later.");
        });
    }





    //Update trainer calendar with the new order 
    const updateTrainerUnavailable = async (allEvents) => {
        await getTrainerCalendar();

        var tempCalendar = calendar;
        var isEventInCalendar = false;

        var usersInvolved = {
            trainerID: trainerID,
            clientID: 'not involved'
        }

        //Run over all the events on the currently displayed calendar
        for (let index = 0; index < allEvents.length; index++) {
            const event = allEvents[index]; //single event on the app calendar
            isEventInCalendar = false;

            //Run over all the objects on the calendar object from mongo ( {usersinvolved, event})
            for (let j = 0; j < tempCalendar.length; j++) {
                const singleCalendarData = tempCalendar[j];
                //Check if the event is already inside the claendar object from mongo
                if(event === singleCalendarData.event) {
                    isEventInCalendar = true;
                    break;
                }
            }

            //Push the calendar object into our temp calendar
            if(isEventInCalendar === false) {
                tempCalendar.push({usersInvolved, event});
            }
            
        }
     
        await updateCalendarToMongoDB(tempCalendar);
    }



    //Hides the confirmation pop-up for block day
    const handleBlockDayCancel = () => {
        setMakeUnavailableVisible(false);
    };


    //Get current date
    const getCurrentDate = () => {
        var date = new Date();
        return getFullDateFormat(date);
    }


    //Format given date to our desired format
    const getFullDateFormat = (date) => {
        var day = date.getDate(); 
        var month = date.getMonth() + 1; 
        var year = date.getFullYear(); 

        day = day <10 ? "0"+day : day; 
        month = month < 9 ? "0"+(month) : (month) ; 
        return year + '-' + month + '-' + day;
    }

    
    //Event tapped - remove event for now
    const handleEventTapped = (clickedEvent) => {
        setSelectedEvent(clickedEvent);
        if(clickedEvent.color === 'lightgrey') {
            setMakeAvailableVisible(true);
        } 
    }


    //Show confirmation pop-up to block all day
    const handleBlockDay = () => {
        setMakeUnavailableVisible(true);
    }

    //Show confirmation pop-up to block specific time ranges
    const handleBlockTime = () => {
        setModalVisible(true);
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
        var events = allEvents;
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
            var eventStartDate = new Date((event.start.replace(/ /g, 'T')) + '.000Z'); //2021-01-03T07:00:00.000Z
            //Full date + time of the end of the addAbleEvent
            var eventEndDate = new Date((event.end.replace(/ /g, 'T')) + '.000Z'); // 2021-01-03T08:00:00.000Z

            //Set time according to Timezone
            eventStartDate.setHours(eventStartDate.getHours()+eventStartDate.getTimezoneOffset()/60);
            eventEndDate.setHours(eventEndDate.getHours()+eventStartDate.getTimezoneOffset()/60);

            for (let index = 0; index < occupiedHours.length; index++) {
                const hoursRange = occupiedHours[index]; //example: "05:00:00-06:00:00"

                var occupiedEventStartDate = new Date(event.start.slice(0, 10));  // 2021-01-03T00:00:00.000Z
                var occupiedEventEndDate = new Date(event.start.slice(0, 10)); // 2021-01-03T00:00:00.000Z
                
                var startTime = hoursRange.slice(0, 8); //example: "05:00:00"
                var endTime = hoursRange.slice(9); //example: "06:00:00"

                //example: 2021-01-03T05:00:00.000Z
                occupiedEventStartDate.setHours(startTime.split(":")[0]);
                occupiedEventStartDate.setMinutes(startTime.split(":")[1]);
                occupiedEventStartDate.setSeconds(startTime.split(":")[2]);

                //example: 2021-01-03T06:00:00.000Z
                occupiedEventEndDate.setHours(endTime.split(":")[0]);
                occupiedEventEndDate.setMinutes(endTime.split(":")[1]);
                occupiedEventEndDate.setSeconds(endTime.split(":")[2]);

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



    //Blocks the entire calendar for the picked date, only on available times
    const handleBlockDayConfirm = async () => {
        setMakeUnavailableVisible(false);

        await getTrainerCalendar(); 

        //Get the date that the trainer is curretly looking at on the calendar
        var fullDate = currentDisplayedDate;
        var events = [];
        //Get occupied hours (hours that have events on) on this date
        var occupiedHours = getOccupiedHours(getEventsFromDate(fullDate));
        var addAbleEvent = {};

        //Run through a 24 hour period, and check if the hours are available
        //If they are, create an unavailable event
        for (let index = 0; index < 24; index++) {
            if(index<9) {
                addAbleEvent = {start: fullDate+' 0'+index+':00:00', end: fullDate+' 0'+(index+1)+':00:00', title: 'UNAVAILABLE', color: 'lightgrey'};
                if (checkIfTimeIsOccupied(addAbleEvent, occupiedHours) === false) {
                    events.push(addAbleEvent);
                }
            } else if (index === 9) {
                addAbleEvent =  {start: fullDate+' 0'+index+':00:00', end: fullDate+' '+(index+1)+':00:00', title: 'UNAVAILABLE', color: 'lightgrey'};
                if (checkIfTimeIsOccupied(addAbleEvent, occupiedHours) === false) {
                    events.push(addAbleEvent);
                }
            } else {
                addAbleEvent =  { start: fullDate+' '+index+':00:00', end: fullDate+' '+(index+1)+':00:00', title: 'UNAVAILABLE', color: 'lightgrey'}
                if (checkIfTimeIsOccupied(addAbleEvent, occupiedHours) === false) {
                    events.push(addAbleEvent);
                }
            }
        }


        //Get all currently displayed events on this date
        var eventsOnPickedDate = getEventsFromDate(fullDate);


        //Merge the current events and our 'addable' unavailable events into an array
        var allDayEvents = [...eventsOnPickedDate, ...events];

        //Sort the events by their start time
        allDayEvents = bubbleSort(allDayEvents);


        //Get all unavailable events from the day
        var unavailableEvents = await uniteAllUnavailable(allDayEvents);

        events = [...unavailableEvents];
        
        updateTrainerUnavailable(events);
    }





    //Get all the events in a day (real events + addable event) 
    //and return an array with all the unavailable events united
    const uniteAllUnavailable = async (allDayEvents) => {

        //Create customevent for future usage
        var customEvent = {};
        var eventsToRemove = [];

        //Run through all the events on the day
        for (let index = 0; index < allDayEvents.length-1;) {
            const firstEvent = allDayEvents[index]; //00:00:00
            const secondEvent = allDayEvents[index+1]; //01:00:00
            
            //If the first event and second event are unavailable
            if(firstEvent.color === 'lightgrey' && secondEvent.color === 'lightgrey') {

                //Check if the event is on the calendar (returns array [bool, index])
                var firstResult = await checkIfEventIsOnCalendar(firstEvent);
                var secondResult = await checkIfEventIsOnCalendar(secondEvent);

                //If the event is on the calendar, add the event to the eventsToRemove
                if (firstResult[0]) {
                    eventsToRemove.push(firstEvent);
                }
                //If the event is on the calendar, add the event to the eventsToRemove
                if (secondResult[0]) {
                    eventsToRemove.push(secondEvent);
                }
                //Create custom event, from the first event start until the second event end
                customEvent = {start: firstEvent.start, end: secondEvent.end, title: 'UNAVAILABLE', color: 'lightgrey'};
                //Remove the first elemnt on the array and change the second
                allDayEvents.splice(index, 1);
                allDayEvents[index] = customEvent;
            }  else {
                index++;
            }
        }
        //Remove all the eventsToRemove array from the database
        await removeUnecessaryEvents(eventsToRemove);
      
        var unavailableEvents = removeCustomerEvents(allDayEvents);
        return unavailableEvents;
    }


    //Remove the old unavailable events
    const removeUnecessaryEvents = async (eventsToRemove) => {
        //Run over all the events needed to remove, and remove them
        for (let index = 0; index < eventsToRemove.length; index++) {
            const eventToRemove = eventsToRemove[index];
            await removeEventFromMongoDB(eventToRemove);
        }
    }


    //Remove all real events (deepskyblue events) from the array
    const removeCustomerEvents = (allDayEvents) => {
        for (let index = 0; index < allDayEvents.length; index++) {
            const singleEvent = allDayEvents[index];

            if (singleEvent.color === 'deepskyblue') {
                allDayEvents.splice(index, 1);
            }  
        }

        return allDayEvents;
    }



        // Swap Numbers
    const swapNumbers = (array, i, j) => {
        // Save Element Value (Because It Will Change When We Swap/Reassign)
        let temp = array[i];
        // Assign Element2 To Element1
        array[i] = array[j];
        // Assign Element1 To Element2
        array[j] = temp;
    };

    //Sort events array by time
    const bubbleSort = (array) => {
        // Iterate Over Array From First Element
        for (let i = 0; i < array.length; i++) {
        // Iterate Over Array From Succeeding Element
        for (let j = 1; j < array.length; j++) {
            const firstEvent = new Date(getDateInFormat(array[j - 1].start));
            firstEvent.setHours(firstEvent.getHours()+firstEvent.getTimezoneOffset()/60);
            
            const secondEvent = new Date(getDateInFormat(array[j].start));
            secondEvent.setHours(secondEvent.getHours()+secondEvent.getTimezoneOffset()/60);
            
            // Check If First Element Is Greater Proceeding Element
            if (firstEvent.getTime() > secondEvent.getTime()) {
                // Swap Numbers
                swapNumbers(array, j - 1, j);
            }
        }
        }
        // Return Array
        return array;
    };


    //Cancel make available picker
    const handleMakeAvailableCancel = () => {
        setMakeAvailableVisible(false);
    }

    

    //Convert  2021-01-03 07:00:00 to 2021-01-03T07:00:00.000Z
    const getDateInFormat = (dateString) => {
        return ((dateString.replace(/ /g, 'T'))+ '.000Z');
    }

    
    //Delete all events from calendar that are 30 days ago or more
    const deleteOldEvents = async () => {
        await getTrainerCalendar();

        var tempCalendar = calendar;
        var isEventOld = false;

        //30 days time stamp
        var timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);

        for (let index = 0; index < tempCalendar.length; index++) {
            isEventOld = false;
            const singleCalendarData = tempCalendar[index];
            const singleEventDate = new Date(getDateInFormat(singleCalendarData.event.start));
            // const singleEventDate =  new Date((singleCalendarData.event.start.replace(/ /g, 'T')) + '.000Z'); //2021-01-03T07:00:00.000Z

             ///Check if event date is older than 30 days
             if (timestamp > singleEventDate.getTime()) {
                // The selected time is more than 30 days ago
                isEventOld = true;
            }

            //Remove event from our temp calendar object 
            if(isEventOld === true) {
                tempCalendar.splice(index, 1);
            }
        }
        await updateCalendarToMongoDB(tempCalendar);
    }


    //Update current displayed date
    const handleOnDateChange = (date) => {
        setCurrentDisplayedDate(date);
    }

    

    //Save value from start time picker
    const onStartTimeChage = (event) => {
        var selectedTime = new Date(event.nativeEvent.timestamp);
        selectedTime.setHours(selectedTime.getHours()-selectedTime.getTimezoneOffset()/60);
        blockStartTime = new Date(selectedTime.toISOString());
    }

    
    //Save value from end time picker
    const onEndTimeChage = (event) => {
        var selectedTime = new Date(event.nativeEvent.timestamp);
        selectedTime.setHours(selectedTime.getHours()-selectedTime.getTimezoneOffset()/60);
        blockEndTime = new Date(selectedTime.toISOString());
    
    }

    //Check if time range is valid -> start time is before end time
    //Check if time range is occupied -> another event is in those hours
    //If all good -> add unavailable event in the selected hours range
    const handleBlockTimeSubmit = () => {
        if (blockStartTime.getTime() >= blockEndTime.getTime()) {
            //time range isn't valid
            Alert.alert(
                'Invalid times',
                'Start time must be before end time',
                [
                    {text: 'Okay'},
                  ],
                  { cancelable: false }
                )
        } else {
            //time range is valid
            var fullDate = currentDisplayedDate;
            var occupiedHours = getOccupiedHours(getEventsFromDate(fullDate));

            var startTime = blockStartTime.toISOString().slice(11, 19);
            var endTime = blockEndTime.toISOString().slice(11, 19);

            var addAbleEvent =  {start: fullDate+' '+ startTime, end: fullDate+' '+ endTime, title: 'UNAVAILABLE', color: 'lightgrey'};
            if (checkIfTimeIsOccupied(addAbleEvent, occupiedHours) === false) {
                //hours are empty of events
                var events = [...allEvents];
                events.push(addAbleEvent);
                updateTrainerUnavailable(events);
                setModalVisible(!modalVisible);
            } else {
                //the hours range collide with an event
                Alert.alert(
                    'Invalid times',
                    'The selected time is occupied',
                    [
                        {text: 'Okay'},
                      ],
                      { cancelable: false }
                    )
            }
        }
    }


    

    return(
        <SafeAreaView style={styles.pageContainer}>

            <View>
                <Dialog.Container visible={makeAvailableVisible}>
                    <Dialog.Title>Change availability</Dialog.Title>
                    <Dialog.Description>Make this hour available for customers?</Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleMakeAvailableCancel} />
                    <Dialog.Button label="Accept" onPress={handleMakeAvailableAccept} />
                </Dialog.Container>
            </View>


            <View>
                <Dialog.Container visible={makeUnavailableVisible}>
                    <Dialog.Title>Change availability</Dialog.Title>
                    <Dialog.Description>Make all remaining hours unavailable for customers ?</Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleBlockDayCancel} />
                    <Dialog.Button label="Accept" onPress={handleBlockDayConfirm} />
                </Dialog.Container>
            </View>


            <Modal
                
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Block time range</Text>

                        <Text style={styles.subtitleText}>Start time</Text>
                        <DateTimePicker
                            style={styles.pickerStyle}
                            testID="dateTimePicker"
                            minuteInterval={10}
                            value={new Date(currentDisplayedDate)}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={(time) => onStartTimeChage(time)}
                           
                        />

                        <Text style={styles.subtitleText}>End time</Text>
                        <DateTimePicker
                            style={styles.pickerStyle}
                            testID="dateTimePicker"
                            minuteInterval={10}
                            value={new Date(currentDisplayedDate)}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={(time) => onEndTimeChage(time)}
                        />
                        <View style={styles.buttonsRow}> 
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.cancelTextStyle}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                    handleBlockTimeSubmit();
                                    // setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.submitTextStyle}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

            <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Calendar</Text>
            </View>
        <View style={styles.buttonsContainer}>
            {/* <Text style={styles.calendarTitle}>My Calendar</Text> */}
            <TouchableOpacity
                style={styles.blockTimeButton}
                onPress={() => handleBlockTime()}
                >
                <Text style={styles.blockTimeText}> Block Time </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.blockDayButton}
                onPress={() => handleBlockDay()}
                >
                <Text style={styles.blockDayText}> Block Day </Text>
            </TouchableOpacity>
        </View>


             <EventCalendar
                events={allEvents}
                eventTapped={(event)=>handleEventTapped(event)}
                width={Dimensions.get('window').width}
                style ={styles.event}
                initDate={getCurrentDate()}
                dateChanged={(date)=> handleOnDateChange(date)}
                upperCaseHeader
                uppercase
                scrollToFirst
            />

            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
        pageContainer: {
            flex: 1,
            marginTop: Dimensions.get('window').height * .020,
            backgroundColor: 'white'
        }, 
        buttonsContainer: {
            marginTop: Dimensions.get('window').height * .020,
            marginBottom: Dimensions.get('window').height * .010,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        event: {
            zIndex: -1,
            opacity: 0.5
        },
        dialogStyle: {
            zIndex: 1
        },
        calendarTitle: {
            color: 'black',
            fontFamily: 'Arial',
            fontSize: Dimensions.get('window').height * .030,
            marginLeft: Dimensions.get('window').width * .010,
            fontWeight: 'bold'
        },
        blockDayText: {
            marginTop: Dimensions.get('window').width * .020,
            color: 'red',
            fontSize: Dimensions.get('window').height * .020,
            marginRight: Dimensions.get('window').width * .010,
            fontWeight: 'bold',
        },
        blockTimeText: {
            marginTop: Dimensions.get('window').width * .020,
            color: 'red',
            fontSize: Dimensions.get('window').height * .020,
            marginLeft: Dimensions.get('window').width * .010,
            fontWeight: 'bold',
        },
        headerContainer: {
            alignItems: 'center'
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
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            height: Dimensions.get('window').height * .5,
            width: Dimensions.get('window').width * .8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          },
          cancelButton: {
            marginLeft: Dimensions.get('window').width * .04,
            backgroundColor: "lightgrey",
            width: Dimensions.get('window').width * .25,
            height: Dimensions.get('window').height * .05,
            borderRadius: 20,
            justifyContent: 'center'
          },
          cancelTextStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          },
          submitButton: {
            marginRight: Dimensions.get('window').width * .04,
            backgroundColor: "deepskyblue",
            width: Dimensions.get('window').width * .25,
            height: Dimensions.get('window').height * .05,
            borderRadius: 20,
            justifyContent: 'center'
          },
          submitTextStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          },
          modalText: {
            marginTop:  Dimensions.get('window').height * .03,
            fontWeight: "bold",
            fontSize: Dimensions.get('window').height * .03,
            textAlign: "center"
          }, 
          subtitleText: {
            marginTop:  Dimensions.get('window').height * .025,
            fontWeight: "bold",
            fontSize: Dimensions.get('window').height * .02,
            textAlign: "center"
          },
          buttonsRow: {
            marginTop:  Dimensions.get('window').height * .03,
            flexDirection: 'row',
            justifyContent: 'space-between'
          },
          pickerStyle: {
            marginTop:  Dimensions.get('window').height * .025,
            alignSelf: 'center',
            width: Dimensions.get('window').width * .5,
            height: Dimensions.get('window').height * .10,
          }
          
});

export default TrainerCalendar;
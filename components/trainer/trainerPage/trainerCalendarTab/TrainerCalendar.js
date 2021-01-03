import React, {useContext, useState, useEffect} from 'react';
import {Alert, Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import EventCalendar from 'react-native-events-calendar';
import EventCalendar from '../../../globalComponents/calendar/EventCalendar';
import Dialog from "react-native-dialog";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

    const [allEvents, setAllEvents] = useState([]);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [makeAvailableVisible, setMakeAvailableVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const forceUpdate = React.useReducer(bool => !bool)[1]; 


    //Hides the Date picker when user close/confirm
    const hideDatePicker = () => {
        setDatePickerVisible(false);
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


    //Add event to the calendar
    const handleAddEvent = () => {
        // var temp = { start: '2021-01-03 02:30:00', end: '2021-01-03 03:30:00', title: 'Sunset yoga', summary: '3412 Piedmont Rd NE, GA 3032', color: 'deepskyblue' }
        // var events = allEvents;
        // events.push(temp);
        // setAllEvents(events);
        setAllEvents([]);
        forceUpdate();
    }

    
    //Show date picker
    const handleBlockDay = () => {
        setDatePickerVisible(true);
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

                //example 1609707700000 >=  1609707600000 && 1609711000000 <= 1609711200000 
                isOccupied = (eventStartDate.getTime() >= occupiedEventStartDate.getTime() && eventEndDate.getTime() <= occupiedEventEndDate.getTime())
                 || (eventStartDate.getTime() > occupiedEventStartDate.getTime() && eventStartDate.getTime() < occupiedEventEndDate.getTime())
                 || (eventEndDate.getTime() > occupiedEventStartDate.getTime() && eventEndDate.getTime() < occupiedEventEndDate.getTime());

                //Break loop and return answer if time is occupied (no need to continue)
                if (isOccupied) {
                    break;
                }
            }

            return isOccupied;
    }



    //Blocks the entire calendar for the picked date, only on available times
    const handleBlockDayConfirm = (date) => {
        setDatePickerVisible(false);

        var fullDate = getFullDateFormat(date);
        var events = allEvents;
        var occupiedHours = getOccupiedHours(getEventsFromDate(fullDate));
        var addAbleEvent = {};

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
        setAllEvents(events);
        forceUpdate();
    }



    //Cancel make available picker
    const handleMakeAvailableCancel = () => {
        setMakeAvailableVisible(false);
    }

    

    //Make the event available for customers
    const handleMakeAvailableAccept = () => {
        setMakeAvailableVisible(false);
        var events = allEvents;
        var index = events.indexOf(selectedEvent);

        if (index > -1) {
            events.splice(index, 1);
        }

        setAllEvents(events);
        forceUpdate();
    }


    
    return(
        <SafeAreaView style={styles.pageContainer}>

            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={(date) => handleBlockDayConfirm(date)}
              onCancel={hideDatePicker}
              headerTextIOS="Pick a date to block"
            />


            <View>
                <Dialog.Container visible={makeAvailableVisible}>
                    <Dialog.Title>Change availability</Dialog.Title>
                    <Dialog.Description>Make this hour available for customers?</Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleMakeAvailableCancel} />
                    <Dialog.Button label="Accept" onPress={handleMakeAvailableAccept} />
                </Dialog.Container>
            </View>


        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.addEventButton}
                onPress={() => handleAddEvent()}
                >
                <Text style={styles.addEventText}> Add Event </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.addEventButton}
                onPress={() => handleBlockDay()}
                >
                <Text style={styles.addEventText}> Block Day </Text>
            </TouchableOpacity>
        </View>

             <EventCalendar
                events={allEvents}
                eventTapped={(event)=>handleEventTapped(event)}
                width={Dimensions.get('window').width}
                style ={styles.event}
                initDate={getCurrentDate()}
                upperCaseHeader
                uppercase
                scrollToFirst
                format24h
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
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        event: {
            zIndex: -1,
            opacity: 0.5
        },
        addEventButton: {
            marginBottom: Dimensions.get('window').height * .020,
            width: Dimensions.get('window').width * .3,
            height: Dimensions.get('window').height * .065,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            borderRadius: 20
        },
        addEventText: {
            fontSize: Dimensions.get('window').height * .020,
            fontWeight: 'bold',
            color: 'deepskyblue'
        },
        dialogStyle: {
            zIndex: 1
        }
});

export default TrainerCalendar;
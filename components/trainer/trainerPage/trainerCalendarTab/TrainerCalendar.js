import React, {useContext, useState, useEffect} from 'react';
import {Alert, Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EventCalendar from 'react-native-events-calendar';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Dialog from "react-native-dialog";
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
        var date = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear(); 
        return year + '-' + month + '-' + date;
    }

    
    //Event tapped - remove event for now
    const handleEventTapped = (clickedEvent) => {
        setSelectedEvent(clickedEvent);
        if(clickedEvent.title === '🚫 UNAVAILABLE') {
            setMakeAvailableVisible(true);
        } 
    }


    //Add event to the calendar
    const handleAddEvent = () => {
        var temp = { start: '2020-12-31 02:00:00', end: '2020-12-31 03:00:00', title: '✅ Sunset yoga', summary: '3412 Piedmont Rd NE, GA 3032' }
        var events = allEvents;
        events.push(temp);
        setAllEvents(events);
        // setAllEvents([]);
        forceUpdate();
        
        // navigation.navigate("TrainerAddEvent");
        // var events = allEvents;
        // { start: '2020-12-31 03:00:00', end: '2020-12-31 04:00:00', title: 'Yoga with the hoes', summary: '3412 Piedmont Rd NE, GA 3032' }
        // setAllEvents(events);
        // forceUpdate();
    }



      // { start: '2020-12-31 03:00:00', end: '2020-12-31 04:00:00', title: 'Yoga with the hoes', summary: '3412 Piedmont Rd NE, GA 3032' }


    
    //Show date picker
    const handleBlockDay = () => {
        setDatePickerVisible(true);
    }



    //Blocks the entire calendar for the picked date
    const handleBlockDayConfirm = (date) => {
        setDatePickerVisible(false);

        var day = date.getDate()<10? "0"+date.getDate() : date.getDate(); 
        var month = date.getMonth() < 9 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) ; 
        var fullDate = date.getFullYear() + '-' + month + '-' + day;
        var events = allEvents;

        for (let index = 0; index < 24; index++) {
            if(index<9) {
                events.push({start: fullDate+' 0'+index+':00:00', end: fullDate+' 0'+(index+1)+':00:00', title: '🚫 UNAVAILABLE', color: 'red'});
            } else if (index === 9) {
                events.push({ start: fullDate+' 0'+index+':00:00', end: fullDate+' 10:00:00', title: '🚫 UNAVAILABLE', color: 'red'});
            } else {
                events.push({ start: fullDate+' '+index+':00:00', end: fullDate+' '+(index+1)+':00:00', title: '🚫 UNAVAILABLE', color: 'red'});
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
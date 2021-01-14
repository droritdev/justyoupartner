import React, {useContext, useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import { GiftedChat, Bubble, SystemMessage, InputToolbar, CustomView } from 'react-native-gifted-chat'
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {MediaContext} from '../../../../context/trainerContextes/MediaContext';
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';


// chat model

/*
    usersInvolved: {
        trainerID:
        clientID:
    },
    chat: []
*/


const Chat = ({navigation, route}) => {

    const [messages, setMessages] = useState([]);
    const [clientUser, setClientUser] = useState({});

    var isChatEmpty = false;
    var chatID = "";
    var allMessages = [];

    //Client ID from previous page
    const clientID = route.params;

    //Trainer info
    const {trainerID} = useContext(IdContext);
    const {firstName} = useContext(NameContext);
    const {lastName} = useContext(NameContext);
    const {mediaPictures} = useContext(MediaContext);


    //Chat users
    //Information of the trainer
    const trainerUser = {
        _id: trainerID,
        name: firstName + ' ' + lastName,
        avatar: mediaPictures[0],
    };


    const config = {
        withCredentials: true,
        baseURL: 'http://localhost:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };



    //Show bottom navgation UI
    const handleArrowButton = () => {
        navigation.navigate('PendingApprovalOrder');
    }



    //Render all styles for the messages
    const renderBubble = (props) => {
        const {currentMessage} = props;
        if(currentMessage.location) {
            return <LocationView location={currentMessage.location} /> 
        } 

        return (
            <Bubble
            {...props}
            wrapperStyle={{
                left: {
                backgroundColor: '#E0E0E0',
                },
                right: {
                backgroundColor: '#3399FF',
                }
            }}
            />
        );  
    }



    //Loading effect when chat window is loaded
    const renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color='#6646ee' />
            </View>
          );
    }



    //Message if chat is empty
    const renderSystemMessage = (props) => {
        return (
            <SystemMessage
              {...props}
              wrapperStyle={styles.systemMessageWrapper}
              textStyle={styles.systemMessageText}
            />
          );
    }


    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
              {...props}
            //   containerStyle={{
            //     backgroundColor: "white",
            //     borderTopColor: "#E8E8E8",
            //     borderTopWidth: 1,
            //     padding: 8
            //   }}
            />
          );
    }




    //Custom view to display location
    const LocationView = ({location}) => {
        return <MapView style={{height: 250, width: 250}}
        region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,       
            longitudeDelta: 0.01     
        }}
        scrollEnabled={false}
        zoomEnabled={true}
        >
        <Marker
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            title={'location'}
            pinColor = {'red'}
        />  
     </MapView>
    }



    //Send the user current location
    const sendCurrentPosition = () => {
        Geolocation.getCurrentPosition(info => {
            var newLocationMessage = 
            [
                {
                    _id: 'location: ' + info.coords.latitude + ', ' + info.coords.longitude,
                    text: 'My location',
                    createdAt: new Date(),
                    user: trainerUser,
                    location: {
                      latitude: info.coords.latitude,
                      longitude: info.coords.longitude,
                    }
                }
            ];

            onSend(newLocationMessage);
        });
    }



    useEffect(() => {
        getClientInfo();
    }, [])




    //Retrive all the client information by ID
    //And generate a clientUser object with id, name, avatar
    const getClientInfo = async () => {
       await axios
        .get('/clients/findByID/'+clientID, 
        config
        )
        .then((doc) => {
            var clientObject = doc.data;

            var clientInfo = {
                _id: clientObject._id,
                name: clientObject.name.first + ' ' + clientObject.name.last,
                avatar: clientObject.image,
            };

        setClientUser(clientInfo);
        
        // var lala = 
        // [
        //     {
        //         _id: 4,
        //         text: '',
        //         createdAt: new Date(),
        //         user: {
        //           _id: 2,
        //           name: 'React Native',
        //         },
        //         sent: true,
        //         received: true,
        //         location: {
        //           latitude: 31.807470216262608,
        //           longitude: 34.91016335903766,
        //         }
        //     }
        // ]
        // setMessages(lala);
        getChatMessages();

        })
        .catch((err) => {});
    }




    //Retrive all the chat messages by clientID and trainerID
    //Load all messages on the UI
    const getChatMessages = async () => {
       await axios
        .get('/chat/findByIDS/'+clientID+'@'+trainerID, 
        config
        )
        .then((doc) => {
            allMessages = doc.data[0].chat;
            chatID = doc.data[0]._id;
            isChatEmpty = false;
            setMessages(allMessages);
        })
        .catch((err) => {
            var systemMessage = {
                _id: 'system',
                text: "Start chating, it's free!",
                createdAt: new Date(),
                system: true,
                // Any additional custom parameters are passed through
              };

            setMessages([systemMessage])
            isChatEmpty=true
        });
    }


    //If chat between the client and trainer doesn't exist -> create a new chat on db
    //If chat exist -> update the new message
    //Update UI to show new message
    const onSend = useCallback(async (sentMessages = []) => {
        var newMessage = sentMessages[0];

        if (isChatEmpty) {
            // console.log('empty');
            setMessages([])
            await createChat(newMessage);
            isChatEmpty = false;
        } else {
            console.log('not empty');
            await uploadMessageToDB(newMessage);
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
        getChatMessages();
      }, [])



    //Upload the new sent message to DB
    const uploadMessageToDB = async (newMessage) => {
        var newChat = [...allMessages];
        newChat.push(newMessage);
        newChat.reverse();
        allMessages = newChat;

        await axios  
        .post('/chat/updateChat', {
            _id: chatID,
            chat: newChat
            
        },
        config
        )
        .then((res) => {
            if (res.data.status === 'success') {
                console.log('updated');
            }
        })
        .catch((err) => alert(err.data));
    }



    //Create a chat model with client and trainer
    const createChat = async (newMessage) => {
        var newChat = [];
        newChat.push(newMessage);

        await axios
        .post('/chat/createChat', {
            clientID: clientID,
            trainerID: trainerID,
            chat: newChat,
        },
        config
        )
        .then((res) => {
            if (res.data.status === 'success') {
                console.log('added');
            }
        })
        .catch((err) => alert(err.data));
    }



    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <ArrowBackButton
                    onPress={handleArrowButton}
                />
                <Text style={styles.headerText}> {clientUser.name} </Text>

                <Icon name="map-pin" size={22} style={styles.locationIcon} onPress={()=> sendCurrentPosition()} />
            </View>


            <GiftedChat
                messages={messages}
                onSend={sentMessages => onSend(sentMessages)}
                user={trainerUser}
                infiniteScroll={true}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                alwaysShowSend={true}
                scrollToBottom={true}
                renderBubble={renderBubble}
                renderLoading={renderLoading}
                renderSystemMessage={renderSystemMessage}
                renderInputToolbar={renderInputToolbar}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa'
    }, 
    headerText: {
        marginTop: Dimensions.get('window').height * .012,
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      systemMessageText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
      },
      locationIcon: {
        marginTop: Dimensions.get('window').height * .012,
        marginRight: Dimensions.get('window').width * .05,
        width: 25,
        height: 25,
      }

});

export default Chat;
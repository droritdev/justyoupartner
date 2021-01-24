import React, {useContext, useState, useEffect, useCallback} from 'react';
import {Alert, ActivityIndicator, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import { GiftedChat, Bubble, SystemMessage, InputToolbar, Actions, ActionsProps} from 'react-native-gifted-chat'
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {MediaContext} from '../../../../context/trainerContextes/MediaContext';
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid';
import Video from 'react-native-video';

const Chat = ({navigation, route}) => {

    const [messages, setMessages] = useState([]);
    const [clientUser, setClientUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //Cancel token for the watcher
    // const cancelTokenSource = axios.CancelToken.source();

    //Client ID from previous page
    const clientID = route.params;

    //Trainer info
    const {trainerID} = useContext(IdContext);
    const {firstName} = useContext(NameContext);
    const {lastName} = useContext(NameContext);
    const {mediaPictures} = useContext(MediaContext);

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



    //Go back 
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
                backgroundColor: '#FCFCFC',
                },
                right: {
                backgroundColor: '#3399FF',
                }
            }}
            />
        );  
    }

    //Render custom view to display video in the chat
    const renderMessageVideo = (props) => {
        const {currentMessage} = props;
        return (
            <Video 
                muted={true}
                resizeMode="cover"  
                controls={true}
                source={{uri: currentMessage.video}}
                style={styles.video}
                key={currentMessage._id}
            />
        );
    };



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


    //Bottom input toolbar
    const renderInputToolbar = (props) => {
        return (
                <InputToolbar
                {...props}
                containerStyle={{
                    borderTopWidth: 0,
                    borderRadius: 45
                }}
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
        if (!isLoading) {
            Geolocation.getCurrentPosition(info => {
                var newLocationMessage = 
                [
                    {
                        _id: 'Date: ' + new Date() +'  location: ' + info.coords.latitude + ', ' + info.coords.longitude,
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
    }


    //Show location sharing verification alert
    const showSendLocationAlert = () => {
        Alert.alert(
            'Share location',
            'Would you like to share your current location?',
            [
                {text: 'Cancel'},
                {text: 'Share', onPress: () => sendCurrentPosition()},
              ],
              { cancelable: false }
        )
    }


    //Open picker for user to select image/video to send
    const handleMediaPicker =  () => {
        ImagePicker.openPicker({
          }).then((file) => {
            var fileMime = file.mime.split('/')[0];
            var fileName = file.filename;
            var source = {};
            console.log(fileName);

            switch (fileMime) {
                case "image" :
                    source = {uri: "file://"+file.path};
                break;

                case "video":
                    source = {uri: file.sourceURL};
                break;
            }


            uploadMedia(fileMime, fileName, source);

        }).catch(err => {
            //user cancel the picker
        });
    }


    
    //Upload selected image/video to database
    const uploadMedia = async (fileMime, fileName, source) => {
        console.log("uploading");
        const userRef = "/trainers/" + auth().currentUser.uid + "/messagesMedia/";
        let ref = storage().ref(userRef+ fileName);

        await ref.putFile(source.uri).then((snapshot) => {
            console.log("upload done");
        })
          .catch((e) => console.log("fail"));

        await ref.getDownloadURL().then((url) => {
            console.log("download done");
            sendMediaMessage(fileMime, url);
        })
        .catch((e) => console.log("fail"));
    }



    //Send a message that contains a video/image
    const sendMediaMessage = async (fileMime, url) => {
        var newMessage = [];
            
        switch (fileMime) {
            case "image" :
                newMessage =
                [{
                    _id: uuid.v4(),
                    text: '',
                    createdAt: new Date(),
                    user: trainerUser,
                    image: url
                }];
            break;

            case "video":
                newMessage =
                [{
                    _id: uuid.v4(),
                    text: '',
                    createdAt: new Date(),
                    user: trainerUser,
                    video: url
                }];
            break;
        }

        onSend(newMessage);
    }



    useEffect(() => {
        getClientInfo();

        watchForUpdates();
    }, [])



    //Listener to mongodb to check if a new message was sent
    //Update UI and display the new message that was sent
    const watchForUpdates = async () => {
        var message = [];
        await axios
            .get('/messages/watchForUpdates/'+trainerID, config)
            .then((doc) => {
                message = doc.data;
                if (message) {
                    setTimeout(() => watchForUpdates(), 1000);
                }
            })
            .catch((err) => {}); 

        setMessages(previousMessages => GiftedChat.append(previousMessages, message));
    }



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
        getChatMessages(clientInfo);
        })
        .catch((err) => {});
    }




    //Retrive all the chat messages by clientID and trainerID
    //Load all messages on the UI
    const getChatMessages = async (clientInfo) => {
        //Sender: client, Receiver: trainer
        var firstResult = [];
        //Sender: trainer, Receiver: client
        var secondResult = [];
        //Both results combined
        var finalResult = [];

        //Get all messages by - Sender: client, Receiver: trainer  - and assign result to a var
        await axios
            .get('/messages/findMessageByIDS/'+clientID+'@'+trainerID, 
            config
            )
            .then((doc) => {
                firstResult = doc.data;
            })
            .catch((err) => {
            });

        //Get all messages by - Sender: trainer, Receiver: client  - and assign result to a var
        await axios
            .get('/messages/findMessageByIDS/'+trainerID+'@'+clientID, 
            config
            )
            .then((doc) => {
                secondResult = doc.data;
            })
            .catch((err) => {
            });


        //Check if first result is undefined
        if(firstResult !== undefined) {
            finalResult = [...finalResult, ...firstResult];
        }

        //Check if second result is undefined
        if(secondResult !== undefined) {
            finalResult = [...finalResult, ...secondResult];
        }
        
        //All messages model relaeted to both
        finalResult = sortMessages(finalResult);

        //Extract the message object from the model and insert into a messages array
        var allMessages = [];
        for (let index = 0; index < finalResult.length; index++) {
            const singleMessageObject = finalResult[index].message;
            allMessages[index] = singleMessageObject;
            
        }

        //Check if there are no messages
        if (allMessages.length===0) {
            //Show friendly system message
            var systemMessage = {
                _id: 'system',
                text: "Start chating, it's free!",
                createdAt: new Date(),
                system: true,
            };

            setMessages([systemMessage])
            setIsLoading(false);
        } else {
            //Repleace the user in the client messages to the up to date user
            for (let index = 0; index < allMessages.length; index++) {
                if(allMessages[index].user._id === clientID) {
                    allMessages[index].user = clientInfo;
                }
            }

            //Show all messages
            setMessages(allMessages);
            setIsLoading(false);
        }
    }

    


    //Sort messages by time created
    const sortMessages = (messagesArray) => {
        // Iterate Over Array From First Element
        for (let i = 0; i < messagesArray.length; i++) {
            // Iterate Over Array From Succeeding Element
            for (let j = 1; j < messagesArray.length; j++) {
                //checks the time order was created at
                var first = new Date(messagesArray[j - 1].message.createdAt).getTime();
                var second = new Date(messagesArray[j].message.createdAt).getTime();
                if (first < second) {
                    // Swap Numbers
                    swapNumbers(messagesArray, j - 1, j);
                }
            }
        }
        return messagesArray;
    }


    const swapNumbers = (array, i, j) => {
        // Save Element Value (Because It Will Change When We Swap/Reassign)
        let temp = array[i];
        // Assign Element2 To Element1
        array[i] = array[j];
        // Assign Element1 To Element2
        array[j] = temp;
    };


    //Upload new message to mongodb
    //Update UI to show new message
    const onSend = useCallback(async (sentMessages = []) => {
        var newMessage = sentMessages[0];
        var messageText = newMessage.text;

        if(checkForPhoneNumber(messageText)) {
            Alert.alert(
                'Attention',
                'The system has recognized that you have sent a phone number. \n You are able to make a phone call within the app.',
                [
                    {text: 'OK'},
                  ],
                  { cancelable: false }
                )
        } else {
            //Upload message to database
            await axios
            .post('/messages/newMessage', {
                receiver: clientID,
                sender: trainerID,
                message: newMessage,
            },
            config
            )
            .then((res) => {
                if (res.data.status === 'success') {
                    if(messages.length === 0) {
                        getChatMessages();
                    } else {
                        setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages));
                    }
                }
            })
            .catch((err) => {
                Alert.alert(
                    'Network error',
                    'Please check your internet connection.',
                    [
                        {text: 'OK'},
                      ],
                      { cancelable: false }
                    )
            });
        }
      }, [])


    //Check if the message contains a phone number
    const checkForPhoneNumber = (messageText) => {
    let phoneFormat = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    var digits = messageText.replace(/\D/g, "");

    if (digits.length >= 7) {
        if(phoneFormat.test(digits)) {
            return true;
        }
    }

        return false;
    }


    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <ArrowBackButton
                        onPress={handleArrowButton}
                    />
                    <Text style={styles.headerText}> {clientUser.name} </Text>
                        
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                         onPress={()=> handleMediaPicker()}
                        >
                            <Icon name="camera" size={24} style={styles.cameraIcon}/> 
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> showSendLocationAlert()}
                        >
                            <Icon name="map-pin" size={23} style={styles.locationIcon} />   
                        </TouchableOpacity>
                    </View>    
                </View>


                {isLoading?
                <View>
                    <View style={styles.progressView}>
                        <Progress.Circle size={Dimensions.get('window').height * .10} indeterminate={true} />
                    </View>
                </View>
            :
                <View style={{ flex: 1 }}>
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
                        renderMessageVideo={renderMessageVideo}

                    />    
                </View>
            }
            </View>
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
        width: Dimensions.get('window').width * .060,
        height: Dimensions.get('window').height * .025,
    },
    loadingTextView: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .020
    },
    progressView: {
        marginTop: Dimensions.get('window').height * .4,
        alignItems: 'center'
    },
    cameraIcon: {
        marginTop: Dimensions.get('window').height * .011,
        marginRight: Dimensions.get('window').width * .05,
        width: Dimensions.get('window').width * .070,
        height: Dimensions.get('window').height * .040,
    },
    sendIcon: {
        width: Dimensions.get('window').width * .060,
        height: Dimensions.get('window').height * .025,
        marginBottom: Dimensions.get('window').height * .012,
        marginRight: Dimensions.get('window').width * .05,
    },
    bottomIconsContainer: {     
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    video: {
        height: Dimensions.get('window').height * .12,
        width: Dimensions.get('window').width * .37,
    },

});

export default Chat;
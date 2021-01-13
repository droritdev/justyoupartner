import React, {useContext, useState, useEffect, useCallback} from 'react';
import {Container, Header, Text, View, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import {IdContext} from '../../../../context/trainerContextes/IdContext';
import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {MediaContext} from '../../../../context/trainerContextes/MediaContext';

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

    //Client ID from previous page
    const clientID = route.params;

    //Trainer info
    const {trainerID} = useContext(IdContext);
    const {firstName} = useContext(NameContext);
    const {lastName} = useContext(NameContext);
    const {mediaPictures} = useContext(MediaContext);


    //Show bottom navgation UI
    const handleArrowButton = () => {
        navigation.navigate('PendingApprovalOrder');
    }


    //Information of the trainer
    const trainerUser = {
        _id: trainerID,
        name: firstName + ' ' + lastName,
        avatar: mediaPictures[0],
        
    };


    //Render all styles for the messages
    const renderBubble = (props) => {
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



    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: clientID,
                name: 'Daniel Neeman',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])



    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])



    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <ArrowBackButton
                    onPress={handleArrowButton}
                />
                <Text style={styles.headerText}> Daniel Neeman </Text>
            </View>


            <GiftedChat
                messages={messages}
                onSend={newMessage => onSend(newMessage)}
                user={trainerUser}
                infiniteScroll={true}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                renderBubble={renderBubble}

            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        borderRadius: 17,
        flexDirection: 'row',
        backgroundColor: 'lightgrey'
    }, 
    headerText: {
        marginTop: Dimensions.get('window').height * .012,
        marginLeft: Dimensions.get('window').width * .2,
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    }

});

export default Chat;
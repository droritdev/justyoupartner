import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {Accordion, Block} from 'galio-framework';
import Icon from 'react-native-vector-icons/Feather';

//The questions and answers content
const SECTIONS = [
    {
        title: 'How long are the sessions?',
        content: 'The minimum session is 1 hour. you may extend the client session for as many full hours as the client pays.'
    },
    {
        title: 'When do I get payed?',
        content: 'At the end of each month..'
    },
    {
        title: 'If my client is late, do I still give the full session?',
        content: 'In terms of the agreement, you may terminate the training on time. We recommend that you do complete the full workout session, for the sake of good service that will likely be reflected on you.'
    },
    {
        title: 'What if I need to cancel a session?',
        content: 'The training cannot be canceled after you have confirmed. If you are still unable to perform the training, the client should be updated immediately. In addition, and in accordance with the terms of the agreement you have signed, the company may impose fines that could include suspension from the application. The whole concept of JustYou is '+'"'+'its always clients time'+'".'
    },
    {
        title: 'What if my client cancels less than 24h before the session?',
        content: 'The client will be charged in full and you will receive full payment.'
    },
    {
        title: 'What if I have an emergency during the session?',
        content: 'If you have a medical emergency, call 911 immediately.'
    }
];


//The question and answers page
const QuestionsAndAnswers = ({navigation}) => {

    //Navigates back to the profile page
    const handleOnArrowPress = () => {
        navigation.navigate('TrainerProfilePage');
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                    <TouchableOpacity
                            onPress={() => handleOnArrowPress()}
                        >
                        <Image
                            source={require('../../../../images/blackArrow.png')}
                            style={styles.arrowImage}
                        />
                    </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouTitle}>Just You Partner</Text>
                    <Text style={styles.qA}>Q & A</Text>
                </View>
                <View>
                    <Block style={styles.block}>
                        <Accordion 
                            dataArray={SECTIONS} 
                            opened={null} 
                            listStyle={{
                                width: Dimensions.get('window').width * 0.95
                            }}
                            style={{
                                width: Dimensions.get('window').width,
                                backgroundColor: 'white',
                                borderRadius: 0
                            }}
                            headerStyle={{
                                marginTop: 5
                            }}
                            contentStyle={{
                                color: 'deepskyblue'
                            }}
                            icon={<Icon name='arrow-down' size={16} />}
                            expandedIcon={<Icon name='arrow-up' size={16} />}
                        />
                    </Block>
                </View>
            </View>
        </SafeAreaView>
    )
}   

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        height: Dimensions.get('window').height,
    },
    coverImage: {
        height: Dimensions.get('window').height * .4,
        width: Dimensions.get('window').width,
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .022
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .022
    },
    justYouTitle: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
    },
    qA: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .0278
    },
    acordionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .022
    },
});

export default QuestionsAndAnswers;
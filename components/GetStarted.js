import React from 'react';
import {StyleSheet, View, Text, Image, Button, Dimensions, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SlidingUpPanel from 'rn-sliding-up-panel';
//Get started page - by press the button the user navigates to the SignUp page
const GetStarted = ({navigation}) => {

    //User nevigates to SignUp page after pressing the get started button
    const handleGetStartedButton = () => {
        navigation.navigate('SignUpAs');
    }
    return(
        <SafeAreaView style={styles.welcomePage2}>
            <View style={styles.welcomeContainer}>
                <Image source = {require('../images/welcomepic.png')} />
                <Text style={styles.welcomeToText}>Welcome to</Text>
                <Text style={styles.justYouText}>Just You</Text>
                <Text style={styles.partnerText}>Partner</Text>
                <Text style={styles.previewText}>Our unique legal system creates an optimal connection between coaches and trainers</Text>
            </View>
            <View style={styles.getStartedContainer} >
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={handleGetStartedButton}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    welcomePage2: {
        height: Dimensions.get('window').height ,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    welcomeContainer: {
        marginTop: Dimensions.get('window').height * .15,
        //height: Dimensions.get('window').height * .94,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width
    },
    welcomeToText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    justYouText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'black'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 30
    },
    previewText: {
        fontSize: 25,
        textAlign: 'center',
        width: Dimensions.get('window').width * .85,
        marginTop: 20
    },
    getStartedContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      getStartedButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
      },
      getStartedText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
      }
  });

  export default GetStarted;
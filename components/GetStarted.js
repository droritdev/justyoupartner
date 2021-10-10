import React from 'react';
import {StyleSheet, View, Text, Image, Button, Dimensions, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SlidingUpPanel from 'rn-sliding-up-panel';
//Get started page - by press the button the user navigates to the SignUp page
const GetStarted = ({navigation}) => {

    //User nevigates to SignUp page after pressing the get started button
    const handleGetStartedButton = () => {
        navigation.navigate('SignUpTrainer');
    }
    return(
        <SafeAreaView style={styles.welcomePage2}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeToText}>Welcome to</Text>
                <Text style={styles.justYouText}>Just You</Text>
                <Text style={styles.partnerText}>Partner</Text>
                <Text style={styles.previewText}>Our unique legal system creates an optimal connection between clients and trainers</Text>
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
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    welcomeContainer: {
        marginTop: Dimensions.get('window').height * .15,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        alignSelf: 'center'
    },
    welcomeToText: {
        fontSize: Dimensions.get('window').height * .033,
        fontWeight: 'bold'
    },
    justYouText: {
        fontSize: Dimensions.get('window').height * .066,
        fontWeight: 'bold',
        color: 'black'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
    },
    previewText: {
        fontSize: Dimensions.get('window').height * .0278,
        textAlign: 'center',
        width: Dimensions.get('window').width * .85,
        color: 'black'
    //    marginTop: Dimensions.get('window').height * .022
    },
    getStartedContainer: {
    //    flex: 1,
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
        fontSize: Dimensions.get('window').height * .028,
        fontWeight: 'bold',
        color: 'white'
      }
  });

  export default GetStarted;
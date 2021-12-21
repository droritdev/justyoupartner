import React, { useContext, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'

import ArrowBackButton from '../../globalComponents/ArrowBackButton'
import AppButton from '../../globalComponents/AppButton'
import {PaypalUsernameContext} from '../../../context/trainerContextes/PaypalUsernameContext'

const PaypalUsername = ({navigation}) => {
    const [paypalInput, setPaypalInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const {dispatchPaypalUsername} = useContext(PaypalUsernameContext);

    const handleChangeInput = (value) => {
        setPaypalInput(value)
        if(paypalInput.length === 0){
            setErrorMessage('This field is required')
        } else {
            setErrorMessage('')
        }
    }

    const handleNext = () => {
        if(paypalInput.length === 0){
            setErrorMessage('This field is required')
            return
        }
        dispatchPaypalUsername({
            type: 'SET_PAYPAL_USERNAME',
            paypalUsername: paypalInput
        })
        navigation.navigate('PhoneNumberVerificationTrainer')
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
            <View style={{width: '100%', alignItems: 'flex-start'}}>
                <ArrowBackButton
                onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.justYouHeader}>Just You</Text>
              <Text style={styles.partnerHeader}>Partner</Text>
            </View>
            <View style={{paddingHorizontal: 80, marginVertical: 80}}>
                <Text style={{fontSize: 18}}>Enter your paypal username. This will be used to send you your monthly payments.</Text>
            </View>
            <View>
                <TextInput
                    placeholder='paypal username'
                    style={styles.input}
                    value={paypalInput}
                    onChangeText={value => handleChangeInput(value)}
                />
                <Text style={{color: 'red'}}>{errorMessage}</Text>
            </View>
            <View style={styles.nextButtonContainer}>
                <AppButton 
                    title="Next"
                    onPress={() => handleNext()}
                />
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: 250,
        borderColor: 'deepskyblue',
        borderWidth: 1,
        borderRadius: 17,
        paddingHorizontal: 30,
        fontSize: 16
    },
    button: {
        height: 50,
        width: 200,
        backgroundColor: 'deepskyblue',
        borderRadius: 17,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      justYouHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
      },
      partnerHeader: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
      },
      nextButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').height * .066,
        alignItems: 'center',
        marginBottom: 30
      }
})

export default PaypalUsername


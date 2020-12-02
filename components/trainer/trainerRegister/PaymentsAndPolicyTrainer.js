import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipToggle from 'react-native-flip-toggle-button';
import Dialog from "react-native-dialog";

//Here the trainer adds his payment details and agrees to the app policy
const PaymentsAndPolicyTrainer = ({navigation}) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");
    const [isAccepted, setIsAccepted] = useState(true);
    const [isAllfieldsFilled, setIsAllfieldsFilled] = useState(false);
    const [paymentsErrorText, setPaymentsErrorText] = useState("");
    const [visible, setDialogVisible] = useState(false);

    //Navigates back to the ProfileDetailsPage2Trainer page
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }

    //Sets the cardNumber Object to the value
    const handleOnChangeCardNumber = (value) => {
        setPaymentsErrorText(false);
        setCardNumber(value);
    }

    //Sets the cardCvv Object to the value
    const handleOnChangeCardCvv = (value) => {
        setPaymentsErrorText(false);
        setCardCvv(value);
    }

    //Sets the cardExpiration Object to the value
    const handleOnChangeCardExpiration = (value) => {
        setPaymentsErrorText(false);
        setCardExpiration(value);
    }

    //Sets the policy flipToggle to the value
    const handleFlipToggleChange = (value) => {
        setPaymentsErrorText(false);
        setIsAccepted(value);
    }

    //When the user presses the ok button in the dialog, the dialog canceled
    const handleOk = () => {
        setDialogVisible(false);
    };

    //Handle the approve button pressed, if ok - saves the payments state and navigates to the RegisteringAccountPopUpTrainer
    const handleApprove = () => {
        if(cardNumber === "" && cardCvv === "" && cardExpiration === ""){
            setIsAllfieldsFilled(false);
            setPaymentsErrorText("Please fill all the fields");
        }
        else if(cardNumber === "" || cardCvv === "" || cardExpiration === ""){
            setIsAllfieldsFilled(false);
            setPaymentsErrorText("Please fill all the fields");
        }
        else if(!(Number(cardNumber)) || !(Number(cardCvv)) || !(Number(cardExpiration))){
            setIsAllfieldsFilled(false);
            setPaymentsErrorText("Enter digits only");
        }
        else if(!isAccepted){
            setIsAllfieldsFilled(true);
            setDialogVisible(true);
        }
        else{
            setIsAllfieldsFilled(true);
            setDialogVisible(false);
            setPaymentsErrorText(""); 
            navigation.navigate('RegisteringAccountPopUpTrainer');
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Attention</Dialog.Title>
                    <Dialog.Description style={{fontSize: 15}}>Permissions are required to continue</Dialog.Description>
                    <Dialog.Button label="OK" onPress={handleOk} />
                </Dialog.Container>
            </View>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={handleArrowButton}
              >
                <Image
                  source={require('../../../images/arrowBack.png')}
                  style={styles.arrowImage}
                />
              </TouchableOpacity>
              <Text style={styles.profileDetailesText}>Profile Details</Text>
            </View>
            <View style={styles.paymentsAndPolicyContainer}>
                <View style={styles.paymentFormContainer}>
                    <Text style={styles.paymentTitle}>
                        ADD FORM OF PAYMENT:
                    </Text>
                    <TextInput
                        style={styles.cardInput}
                        textAlign='center'
                        placeholder='ENTER YOUR CREDIT CARD INFORMATION'
                        placeholderTextColor='black'
                        onChangeText={value => handleOnChangeCardNumber(value)}
                    />
                    <TextInput
                        style={styles.cardInput}
                        textAlign='center'
                        placeholder='CVV'
                        placeholderTextColor='black'
                        onChangeText={value => handleOnChangeCardCvv(value)}
                    />
                    <TextInput
                        style={styles.cardInput}
                        textAlign='center'
                        placeholder='EXPIRATION'
                        placeholderTextColor='black'
                        onChangeText={value => handleOnChangeCardExpiration(value)}
                    />
                </View>
                { !isAllfieldsFilled ? 
                    <Text style={styles.paymentFormErrorText}>{paymentsErrorText}</Text>                
                :null}
                <View style={styles.policyContainer}>
                    <View style={styles.policyTextAndFlipToggle}>
                        <Text style={styles.policyText}>
                            I have read and agree with the user terms of service and I understand that my personal data will be processed in accordance with Just You privacy statment.
                        </Text>
                        <View style={styles.flipToggle}>
                            <FlipToggle
                                value={isAccepted}
                                buttonHeight={30}
                                buttonWidth={70}
                                buttonRadius={40}
                                sliderWidth={35}
                                sliderHeight={30}
                                sliderRadius={50}
                                sliderOffColor={'black'}
                                sliderOnColor={'white'}
                                buttonOffColor={'grey'}
                                buttonOnColor={'deepskyblue'}
                                onToggle={(newState) => handleFlipToggleChange(newState)}
                            />
                        </View>
                    </View>
                    <View style={styles.readMoreContainer}>
                        <TouchableOpacity
                            //onPress={}
                        >
                            <Image
                                source={require('../../../images/moreInformation.jpg')}
                                style={styles.moreInformationImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            //onPress={}
                        >
                            <Text style={styles.readMoreText}>
                                Read more
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleApprove}
                >
                    <Text style={styles.nextButtonText}>APPROVE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    paymentsAndPolicyContainer: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .6,
    },
    headerContainer: {

    },
    arrowImage: {
      marginTop: Dimensions.get('window').height * .022,
      marginLeft: Dimensions.get('window').width * .0483
    },
    profileDetailesText: {
      marginTop: Dimensions.get('window').height * .033,
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').height * .0425,
      marginLeft: Dimensions.get('window').width * .0483
    },
    paymentFormContainer:{
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height * .055,
        height: Dimensions.get('window').height * .275
    },
    paymentTitle: {
        fontSize: Dimensions.get('window').height * .019,
        marginLeft: Dimensions.get('window').width * .0483
    },
    cardInput: {
        width: Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height * .06,
        borderWidth: 3,
        borderColor: 'deepskyblue',
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .017
    },
    paymentFormErrorText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .022
    },
    policyContainer: {
        marginLeft: Dimensions.get('window').width * .02415,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .19,
    },
    policyTextAndFlipToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .95,
        alignSelf: 'center'
    },  
    policyText: {
        width: Dimensions.get('window').width * .77,
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    flipToggle: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    readMoreContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .325,
        marginLeft: Dimensions.get('window').width * .02415        
    },
    readMoreText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .02,
        alignSelf: 'flex-end',
        marginTop: Dimensions.get('window').height * .0022
    },
    moreInformationImage: {
        height: Dimensions.get('window').height * .0325,
        width: Dimensions.get('window').width * .075
    },
    nextButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').height * .044,
        alignItems: 'center'
    },
    nextButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
    },
    nextButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default PaymentsAndPolicyTrainer;
import React, {useContext, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {OrderContext} from '../../../../context/orderContexts/OrderContext';
import FastImage from 'react-native-fast-image';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

//The trainer's order page - pennding + approved
const ApprovedOrder = ({navigation}) => {
    const [trainingCompletedBG, setTrainingCompletedBG] = useState('deepskyblue')

    const {orderObject} = useContext(OrderContext);
    const [clientInfo, setClientInfo] = useState([]);

    const [isDisabled, setIsDisable] = useState(false)

    //Format the categories list to lower case with first letter upper case
    const textDisplayFormat = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    //Hide bottom navgation UI
    useEffect(() => {
       navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: false
       })

       getClientInfo();
    }, []);


    
    const handleChatPressed = () => {
        navigation.navigate('Chat', orderObject.client.id);
    }

    //Axios post config
    const config = {
        withCredentials: true,
        baseURL: 'https://trainer.iqdesk.info:443/',
        headers: {
            "Content-Type": "application/json",
        },
    };

    //Retrive the client information by ID
    const getClientInfo = async () => {
        await axios
         .get('/clients/findByID/'+orderObject.client.id, 
         config
         )
         .then((doc) => {
             var clientObject = doc.data;
             setClientInfo(clientObject);
 
         })
         .catch((err) => {});
     }

    //Show bottom navgation UI
    const handleArrowButton = () => {
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        })
        navigation.navigate('TrainerOrdersPage');
    }

    const handleCompleteButton = () => {
        console.log('completebutton endtime replace ', orderObject.trainingDate.endTime.replace(' ', 'T') + ':00')
        let orderEndTime = new Date(orderObject.trainingDate.endTime.replace(' ', 'T') + ':00')
        if(orderEndTime.getTime() > new Date().getTime()){
            Alert.alert('You cannot complete a training that has not occured yet')
            return
        }
        axios  
        .post('/orders/update-status', {
            _id: orderObject._id,
            status: "completed"
        },
        config
        )
        .then((res) => {
            if (res.data.type === "success") {
                setTrainingCompletedBG('lightgray')
                Alert.alert('Training has been completed')
                setIsDisable(true)
            }
        })
        .catch((err) =>  {
            console.log('error in handleCompleteButton ', err)
        });
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.justYouHeader}>Just You</Text>
                    <Text style={styles.partnerText}>Partner</Text>
                </View>
                <ArrowBackButton
                onPress={handleArrowButton}
                />
                <Text style={styles.pendingTitle}>Approved Order</Text>

                <View style={styles.imageNameRowContainer}>
                        <FastImage
                                    style={styles.profileImage}
                                    source={{
                                    uri: clientInfo.image,
                                    priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={styles.nameButtonsColumContainer}>
                            <View style={styles.nameBox}>
                                {clientInfo.name!==undefined?
                                    <Text style={styles.nameText}>{clientInfo.name.first + " " + clientInfo.name.last}</Text>
                                :
                                    <Text style={styles.nameText}>{""}</Text>
                                } 
                            </View>

                            <View style={styles.buttonsRowContaier}>
                            <TouchableOpacity
                                onPress={()=>handleChatPressed()}
                                style={styles.chatButton}
                            >
                                {/* <Icon name="message-circle" size={30} style={styles.messageIcon}/> */}
                                {clientInfo.name!==undefined?
                                     <Text style={styles.approveButtonText}>{'Contact ' + clientInfo.name.first}</Text>
                                :
                                <Text style={styles.approveButtonText}>{'Contact'}</Text>
                                } 
                            </TouchableOpacity>
                            </View>
                        </View>

                </View>






                <View style={styles.orderInformationContainer}>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Date:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.trainingDate.startTime.slice(0, 10)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Time:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.trainingDate.startTime.slice(11, 16) + ' - ' + orderObject.trainingDate.endTime.slice(11, 16)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Address:</Text>
                        <View style={styles.addressView}>
                            <Text style={styles.informationText}>{orderObject.location.address}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Type of training:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{textDisplayFormat(orderObject.type)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <Text style={styles.title}>Category:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{textDisplayFormat(orderObject.category)}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRowSecond}>
                        <Text style={styles.title}>Cost:</Text>
                        <View style={styles.informationView}>
                            <Text style={styles.informationText}>{orderObject.cost + '$'}</Text>
                        </View>
                    </View>
                </View>

                <View
                        
                        style={styles.approveButton}
                >
                        <Text style={styles.approveButtonText}>Approved</Text>
                </View>

                <TouchableOpacity
                        onPress={handleCompleteButton}
                        style={{...styles.completeButton, backgroundColor: trainingCompletedBG}}
                        disabled={isDisabled}
                >
                        <Text style={styles.approveButtonText}>Training Completed</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        alignItems: 'center',
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .027,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .018
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .025
    },
    pendingTitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: Dimensions.get('window').height * .03,
        marginLeft: Dimensions.get('window').width * .0483,
    },
    imageNameRowContainer: {
        marginTop: Dimensions.get('window').height * .04,
        flexDirection: 'row',
        width: Dimensions.get('window').width * .9,
        alignSelf: 'center',
       
    },  
    profileImage: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
        width: Dimensions.get('window').height * .09,
        height: Dimensions.get('window').height * .09,
        borderRadius: 40
    },
    nameAndButtonsContainer: {
        
    },
    nameTitle: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
    },
    buttonsRowContaier: {
        width: Dimensions.get('window').width * .35,
        alignSelf: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * .011,
        justifyContent: 'space-between'
    },
    buttonAndTitle: {
        alignItems: 'center'
    },
    buttonTitle: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .011
    },  
    chatButton: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width * .020,
        marginTop: Dimensions.get('window').height * .015,
        height: Dimensions.get('window').height * .035,
        width: Dimensions.get('window').width * .65,
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    approveButton: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .15,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    completeButton: {
        marginTop: 10,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    declineButton: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .02,
        height: Dimensions.get('window').height * .055,
        width: Dimensions.get('window').width * .85,
        alignSelf: 'center',
        backgroundColor: 'crimson',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    approveButtonText: {
        fontSize: Dimensions.get('window').height * .022,
        color: 'white',
        fontWeight: 'bold'
    },
    topBorder: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
    },
    orderInformationContainer: {
        borderTopWidth: 2,
        borderTopColor: 'lightgrey',
        marginTop: Dimensions.get('window').height * .040,
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width *.85,
        alignSelf: 'center'
    },
    orderRow: {
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .07,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
        
    },
    orderRowSecond: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: Dimensions.get('window').width *.85,
        height: Dimensions.get('window').height * .07,
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey',
    },
    title: {
        marginTop: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .020,
    },
    informationView: {
        width: Dimensions.get('window').width * .4,
        marginTop: Dimensions.get('window').height * .02,
        alignItems: 'center',
        height: Dimensions.get('window').height * .05,
        borderRadius: 10
    },
    addressView: {
        width: Dimensions.get('window').width * .4,
        marginTop: Dimensions.get('window').height * .01,
        alignItems: 'center',
        height: Dimensions.get('window').height * .05,
    },
    informationText: {
        fontSize: Dimensions.get('window').height * .02,
    },
    addressText: {
        fontSize: Dimensions.get('window').height * .02,
        marginBottom: Dimensions.get('window').height * .01,
    },
    nameBox: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .7
    },
    nameText: {
        fontSize: Dimensions.get('window').height * .03,
        fontWeight: '500'
    },
    dateBox: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .275
    },
    dateText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '500'
    },
    phoneCallIcon: {
        marginLeft: Dimensions.get('window').width * .01, 
        marginTop: Dimensions.get('window').width * .02, 
        width: Dimensions.get('window').width * .09, 
        height: Dimensions.get('window').height * .04,
        color: 'white'
    },
    messageIcon: {
        marginLeft: Dimensions.get('window').width * .015, 
        marginTop: Dimensions.get('window').width * .015, 
        width: Dimensions.get('window').width * .09, 
        height: Dimensions.get('window').height * .04,
        color: 'white'
    },
    iconBackStyle: {
        backgroundColor: 'deepskyblue',
        borderRadius: 40,
        width: Dimensions.get('window').width * .1, 
        height: Dimensions.get('window').height * .05,
    }

});

export default ApprovedOrder;
import React from 'react';
import { Button, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TrainerOrdersPage from './TrainerOrdersPage';
import PendingApprovalOrder from './PendingApprovalOrder';
import ApprovedOrder from './ApprovedOrder';
import Chat from './Chat';


const Stack = createStackNavigator();

//The orders navigation area
const TrainerOrderPageStack = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='TrainerOrdersPage' component={TrainerOrdersPage}/>
            <Stack.Screen name='PendingApprovalOrder' component={PendingApprovalOrder}/>
            <Stack.Screen name='ApprovedOrder' component={ApprovedOrder}/>
            <Stack.Screen name='Chat' component={Chat}/>
        </Stack.Navigator>
    )
}

export default TrainerOrderPageStack;
import React from 'react';
import { Button, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TrainerOrdersPage from './TrainerOrdersPage';

const Stack = createStackNavigator();

//The orders navigation area
const TrainerOrderPageStack = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='TrainerOrdersPage' component={TrainerOrdersPage}/>
        </Stack.Navigator>
    )
}

export default TrainerOrderPageStack;
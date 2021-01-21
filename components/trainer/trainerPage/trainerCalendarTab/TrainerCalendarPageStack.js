import React from 'react';
import { Button, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TrainerCalendar from './TrainerCalendar';

const Stack = createStackNavigator();

//The orders navigation area
const TrainerCalendarPageStack = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='TrainerCalendar' component={TrainerCalendar}/>
        </Stack.Navigator>
    )
}

export default TrainerCalendarPageStack;
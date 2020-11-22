import React from 'react';
import { Button, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import StatsAndIncomes from './StatsAndIncomes';

const Stack = createStackNavigator();

//The orders navigation area
const TrainerStatsPageStack = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='StatsAndIncomes' component={StatsAndIncomes}/>
        </Stack.Navigator>
    )
}

export default TrainerStatsPageStack;
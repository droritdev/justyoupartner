import React from 'react';
import { Button, Text, View, Image, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrainerProfilePageStack from '../trainerPage/trainerProfileTab/TrainerProfilePageStack';
import TrainerOrderPageStack from '../trainerPage/trainerOrdersTab/TrainerOrderPageStack';

const Tab = createBottomTabNavigator();

//The tab navigation container to handle the navigation in the trainer's area
const TrainerContainer = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 80,
                    borderTopWidth: 1.5
                },
                showLabel: false,
            }}
            initialRouteName='TrainerProfilePageStack'
        >
            <Tab.Screen 
                name="TrainerOrderPageStack" 
                component={TrainerOrderPageStack}
                options={{
                    tabBarIcon: ({ focused,tintColor }) => (
                        !focused ? <Image
                            source={require('../../../images/ordersIcon.png')}
                            style={[styles.ordersIcon, {tintColor: tintColor}]}
                          />
                          :
                          <Image
                            source={require('../../../images/ordersIconFocused.png')}
                            style={[styles.ordersIcon, {tintColor: tintColor}]}
                          />
                    ),
                }}
            />
            <Tab.Screen 
                name="TrainerProfilePageStack" 
                component={TrainerProfilePageStack}
                options={{
                    tabBarIcon: ({ focused,tintColor }) => (
                        !focused ? <Image
                            source={require('../../../images/profilePageIcon.png')}
                            style={[styles.profileIcon, {tintColor: tintColor}]}
                          />
                          :
                          <Image
                            source={require('../../../images/profilePageIconFocused.png')}
                            style={[styles.profileIcon, {tintColor: tintColor}]}
                          />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    profileIcon: {
        width: 45,
        height: 45,
        marginTop: 10
    },
    ordersIcon: {
        width: 40,
        height: 45,
        marginTop: 15
    }
}); 

export default TrainerContainer;
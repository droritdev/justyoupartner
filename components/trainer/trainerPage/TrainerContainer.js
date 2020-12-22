import React from 'react';
import { Button, Text, View, Image, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrainerProfilePageStack from './trainerProfileTab/TrainerProfilePageStack';
import TrainerOrderPageStack from './trainerOrdersTab/TrainerOrderPageStack';
import TrainerStatsPageStack from './trainerStatsTab/TrainerStatsPageStack'

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
        >
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
                            style={[styles.profileFocusedIcon, {tintColor: tintColor}]}
                          />
                    )
                }}
            />
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
                            style={[styles.ordersFocusedIcon, {tintColor: tintColor}]}
                          />
                    ),
                }}
            />
            <Tab.Screen 
                name="TrainerStatsPageStack" 
                component={TrainerStatsPageStack}
                options={{
                    tabBarIcon: ({ focused,tintColor }) => (
                        !focused ? <Image
                            source={require('../../../images/statsIcon.png')}
                            style={[styles.statsIcon, {tintColor: tintColor}]}
                          />
                          :
                          <Image
                            source={require('../../../images/statsFocusedIcon.png')}
                            style={[styles.statsFocusedIcon, {tintColor: tintColor}]}
                          />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    profileIcon: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    profileFocusedIcon: {
        width: 45,
        height: 45,
        marginTop: 10
    },
    ordersIcon: {
        width: 35,
        height: 40,
        marginTop: 15
    },
    ordersFocusedIcon: {
        width: 40,
        height: 45,
        marginTop: 15
    },
    statsIcon: {
        width: 40,
        height: 35,
        marginTop: 15    
    },
    statsFocusedIcon: {
        width: 40,
        height: 45,
        marginTop: 15   
    }
}); 

export default TrainerContainer;
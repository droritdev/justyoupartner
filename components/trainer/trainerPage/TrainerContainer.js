import React, { useEffect } from 'react';
import { Image, StyleSheet, BackHandler} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrainerProfilePageStack from './trainerProfileTab/TrainerProfilePageStack';
import TrainerOrderPageStack from './trainerOrdersTab/TrainerOrderPageStack';
import TrainerStatsPageStack from './trainerStatsTab/TrainerStatsPageStack'
import TrainerCalendarPageStack from './trainerCalendarTab/TrainerCalendarPageStack'

const Tab = createBottomTabNavigator();

//The tab navigation container to handle the navigation in the trainer's area
const TrainerContainer = () => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    return(
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 60,
                    borderTopWidth: 1,
                    paddingTop: 5
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
            <Tab.Screen 
                name="TrainerCalendarPageStack" 
                component={TrainerCalendarPageStack}
                options={{
                    tabBarIcon: ({ focused,tintColor }) => (
                        !focused ? <Image
                            source={require('../../../images/calendarIcon.jpg')}
                            style={[styles.statsIcon, {tintColor: tintColor}]}
                          />
                          :
                          <Image
                            source={require('../../../images/calendarFocusedIcon.jpeg')}
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
        width: 25,
        height: 25
    },
    profileFocusedIcon: {
        width: 30,
        height: 30,
    },
    ordersIcon: {
        width: 25,
        height: 25,
    },
    ordersFocusedIcon: {
        width: 30,
        height: 30,
    },
    statsIcon: {
        width: 25,
        height: 25,
    },
    statsFocusedIcon: {
        width: 30,
        height: 30,
    }
}); 

export default TrainerContainer;
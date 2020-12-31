import React from 'react';
import { Button, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TrainerProfilePage from './TrainerProfilePage'
import QuestionsAndAnswers from './QuestionsAndAnswers';
import WhyUS from './WhyUs';
import TrainerEditProfile from './TrainerEditProfile';
import TrainerAboutMeEditProfile from './TrainerAboutMeEditProfile';
import TrainerCertificationsEditProfile from './TrainerCertificationsEditProfile';
import TrainerPickCategoriesEditProfile from './TrainerPickCategoriesEditProfile';
import TrainerEditMedia from './TrainerEditMedia';
import TrainerEditAddress from './TrainerEditAddress';
import TrainerSettings from './TrainerSettings';
import ChangeEmailAddress from './ChangeEmailAddres';
import ChangePhoneNumber from './ChangePhoneNumber';
import CustomerService from './CustomerService';

const Stack = createStackNavigator();

//The trainer's stack navigator to handle screen navigations in the profile section
const TrainerProfilePageStack = ({navigation}) => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='TrainerProfilePage' component={TrainerProfilePage}/>
            <Stack.Screen name='QuestionsAndAnswers' component={QuestionsAndAnswers}/>
            <Stack.Screen name='WhyUS' component={WhyUS}/>
            <Stack.Screen name='TrainerEditProfile' component={TrainerEditProfile}/>
            <Stack.Screen name='TrainerPickCategoriesEditProfile' component={TrainerPickCategoriesEditProfile}/>
            <Stack.Screen name='TrainerEditMedia' component={TrainerEditMedia}/>
            <Stack.Screen name='TrainerEditAddress' component={TrainerEditAddress}/>
            <Stack.Screen name='TrainerAboutMeEditProfile' component={TrainerAboutMeEditProfile}/>
            <Stack.Screen name='TrainerCertificationsEditProfile' component={TrainerCertificationsEditProfile}/>
            <Stack.Screen name='TrainerSettings' component={TrainerSettings}/>
            <Stack.Screen name='ChangeEmailAddress' component={ChangeEmailAddress}/>
            <Stack.Screen name='ChangePhoneNumber' component={ChangePhoneNumber}/>
            <Stack.Screen name='CustomerService' component={CustomerService}/>
        </Stack.Navigator>
    )
}

export default TrainerProfilePageStack;
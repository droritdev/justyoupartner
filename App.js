import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ResetPasswordTrainer from './components/trainer/trainerRegister/ResetPasswordTrainer';

import WelcomePopUp from './components/WelcomePopUp';
import GetStarted from './components/GetStarted';
import SignUpAs from './components/SignUpAs';
import SignUpTrainer from './components/trainer/trainerRegister/SignUpTrainer';
import EmailVerificationTrainer from './components/trainer/trainerRegister/EmailVerificationTrainer';
import CreatePasswordTrainer from './components/trainer/trainerRegister/CreatePasswordTrainer';
import ProfileDetailsPage1Trainer from './components/trainer/trainerRegister/ProfileDetailsPage1Trainer';
import ProfileDetailsPage2Trainer from './components/trainer/trainerRegister/ProfileDetailsPage2Trainer';
import PickCategoryTrainer from './components/trainer/trainerRegister/PickCategoryTrainer';
import AboutMeTrainer from './components/trainer/trainerRegister/AboutMeTrainer';
import AddressTrainer from './components/trainer/trainerRegister/AddressTrainer';
import CertificationsTrainer from './components/trainer/trainerRegister/CertificationsTrainer';
import PaymentsAndPolicyTrainer from './components/trainer/trainerRegister/PaymentsAndPolicyTrainer';
import PhoneNumberVerificationTrainer from './components/trainer/trainerRegister/PhoneNumberVerificationTrainer';
import DonePopUpTrainer from './components/trainer/trainerRegister/DonePopUpTrainer';
import WelcomeTrainer from './components/trainer/trainerRegister/WelcomeTrainer';
import LogInTrainer from './components/trainer/trainerRegister/LogInTrainer';
import AddPhotosTrainer from './components/trainer/trainerRegister/AddPhotosTrainer';
import ForgotPasswordTrainer from './components/trainer/trainerRegister/ForgotPasswordTrainer';
import TermsConditionsTrainer from './components/trainer/trainerRegister/TermsConditionsTrainer';
import TrainerContainer from './components/trainer/trainerPage/TrainerContainer';

import SignUpPlace from './components/place/placeRegister/SignUpPlace';
import LogInPlace from './components/place/placeRegister/LogInPlace';
import ForgotPasswordPlace from './components/place/placeRegister/ForgotPasswordPlace';
import ResetPasswordPlace from './components/place/placeRegister/ResetPasswordPlace';
import WelcomePlace from './components/place/placeRegister/WelcomePlace';
import EmailVerificationPlace from './components/place/placeRegister/EmailVerificationPlace';
import CreatePasswordPlace from './components/place/placeRegister/CreatePasswordPlace';
import ProfileDetailsPage1Place from './components/place/placeRegister/ProfileDetailsPage1Place'; 
import ProfileDetailsPage2Place from './components/place/placeRegister/ProfileDetailsPage2Place';
import PickCategoryPlace from './components/place/placeRegister/PickCategoryPlace';
import AboutThePlace from './components/place/placeRegister/AboutThePlace';
import PaymentsAndPolicyPlace from './components/place/placeRegister/PaymentsAndPolicyPlace';
import RegisteringAccountPopUpPlace from './components/place/placeRegister/RegisteringAccountPopUpPlace';
import DetailsSuccessfullyPlace from './components/place/placeRegister/DetailsSuccessfullyPlace';
import PhoneNumberVerificationPlace from './components/place/placeRegister/PhoneNumberVerificationPlace';
import DonePopUpPlace from './components/place/placeRegister/DonePopUpPlace';


import GlobalStore from './context/GlobalStore';


        ///delete!!!
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { Platform, Alert, Linking } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { checkPermission } from './permissionService';

const Stack = createStackNavigator();

const App = () => {

  return (

    <GlobalStore>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initialRouteName='WelcomePopUp'
        >
          <Stack.Screen name='WelcomePopUp' component={WelcomePopUp} />
          <Stack.Screen name='GetStarted' component={GetStarted} />
          <Stack.Screen name='SignUpAs' component={SignUpAs} />
          <Stack.Screen name='SignUpTrainer' component={SignUpTrainer} />
          <Stack.Screen name='EmailVerificationTrainer' component={EmailVerificationTrainer} />
          <Stack.Screen name='CreatePasswordTrainer' component={CreatePasswordTrainer} />
          <Stack.Screen name='ProfileDetailsPage1Trainer' component={ProfileDetailsPage1Trainer} />
          <Stack.Screen name='ProfileDetailsPage2Trainer' component={ProfileDetailsPage2Trainer} />
          <Stack.Screen name="PickCategoryTrainer" component={PickCategoryTrainer} />
          <Stack.Screen name='AboutMeTrainer' component={AboutMeTrainer} />
          <Stack.Screen name='AddressTrainer' component={AddressTrainer} />
          <Stack.Screen name='AddPhotosTrainer' component={AddPhotosTrainer} />
          <Stack.Screen name='CertificationsTrainer' component={CertificationsTrainer} />
          <Stack.Screen name='PaymentsAndPolicyTrainer' component={PaymentsAndPolicyTrainer} />
          <Stack.Screen name='PhoneNumberVerificationTrainer' component={PhoneNumberVerificationTrainer} />
          <Stack.Screen name='DonePopUpTrainer' component={DonePopUpTrainer} />
          <Stack.Screen name='WelcomeTrainer' component={WelcomeTrainer} />
          <Stack.Screen name='LogInTrainer' component={LogInTrainer} />
          <Stack.Screen name='ForgotPasswordTrainer' component={ForgotPasswordTrainer} />
          <Stack.Screen name='ResetPasswordTrainer' component={ResetPasswordTrainer} />
          <Stack.Screen name='TermsConditionsTrainer' component={TermsConditionsTrainer} />
          <Stack.Screen name='TrainerContainer' component={TrainerContainer} />

          <Stack.Screen name='SignUpPlace' component={SignUpPlace} />
          <Stack.Screen name='LogInPlace' component={LogInPlace} />
          <Stack.Screen name='ForgotPasswordPlace' component={ForgotPasswordPlace} />
          <Stack.Screen name='ResetPasswordPlace' component={ResetPasswordPlace} />
          <Stack.Screen name='WelcomePlace' component={WelcomePlace} />
          <Stack.Screen name='EmailVerificationPlace' component={EmailVerificationPlace} />
          <Stack.Screen name='CreatePasswordPlace' component={CreatePasswordPlace} />
          <Stack.Screen name='ProfileDetailsPage1Place' component={ProfileDetailsPage1Place} />
          <Stack.Screen name='ProfileDetailsPage2Place' component={ProfileDetailsPage2Place} />
          <Stack.Screen name='AboutThePlace' component={AboutThePlace} />
          <Stack.Screen name='PickCategoryPlace' component={PickCategoryPlace} />
          <Stack.Screen name='PaymentsAndPolicyPlace' component={PaymentsAndPolicyPlace} />
          <Stack.Screen name='RegisteringAccountPopUpPlace' component={RegisteringAccountPopUpPlace} />
          <Stack.Screen name='DetailsSuccessfullyPlace' component={DetailsSuccessfullyPlace} />
          <Stack.Screen name='PhoneNumberVerificationPlace' component={PhoneNumberVerificationPlace} />
          <Stack.Screen name='DonePopUpPlace' component={DonePopUpPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStore>
  )
}

export default App;
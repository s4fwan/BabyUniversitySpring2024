import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BedRoomScreen from './screens/BedRoomScreen';
import PinEntryScreen from './screens/PinPage'
import LoginScreen from './screens/LoginScreen';
import ParentUI from '../front-end/screens/ParentUI';
import SignupScreen from './screens/SignUpScreen';
import SwipeBook from './screens/SwipeBook';
import ForgotPin from './screens/ForgotPin';
import OTPVerification from './screens/OTPVerification';
import ResetPin from './screens/ResetPin';
import SettingsScreen from './screens/SettingScreen'

// import { ReadAloudProvider } from './SettingsScreen/Storage';
import ChangePin from './screens/ChangePinScreen';
import TrackingActivity from './screens/TrackingActivity';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <ReadAloudProvider>
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Bedroom" component={BedRoomScreen} />
        <Stack.Screen options={{ headerShown: false }} name='SwipeBook' component={SwipeBook} />
        <Stack.Screen options={{ headerShown: false }} name="PinEntry" component={PinEntryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ParentUI" component={ParentUI} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePin" component={ChangePin} />
        <Stack.Screen options={{ headerShown: false }} name="TrackingActivity" component={TrackingActivity} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPin" component={ForgotPin} />
        <Stack.Screen options={{ headerShown: false }} name="OTPVerification" component={OTPVerification} />
        <Stack.Screen options={{ headerShown: false }} name="ResetPin" component={ResetPin} />
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





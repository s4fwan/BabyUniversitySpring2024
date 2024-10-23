import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BedRoomScreen from './Bedroom/BedRoomScreen';
import PinEntryScreen from './screens/PinPage'
import LoginScreen from './screens/LoginScreen';
import ParentUI from '../front-end/screens/ParentUI';
import SignupScreen from './SignUp/signup';
import SwipeBook from './screens/SwipeBook';
import LogoutSuccessful from './Logout Page';
import UsernameDisplay from './UserName'
import SettingsScreen from './SettingsScreen/settings'
import { ReadAloudProvider } from './SettingsScreen/Storage';
import ChangePin from './screens/ChangePinScreen';
import TrackingActivity from './screens/TrackingActivity';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReadAloudProvider>
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Logout" component={LogoutSuccessful} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Bedroom" component={BedRoomScreen} />
        <Stack.Screen options={{ headerShown: false }} name='SwipeBook' component={SwipeBook} />
        <Stack.Screen options={{ headerShown: false }} name="PinEntry" component={PinEntryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ParentUI" component={ParentUI} />
        <Stack.Screen options={{ headerShown: false }} name="UserName" component={UsernameDisplay} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePin" component={ChangePin} />
        <Stack.Screen options={{ headerShown: false }} name="TrackingActivity" component={TrackingActivity} />
      </Stack.Navigator>
      
    </NavigationContainer>
    </ReadAloudProvider>
    
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





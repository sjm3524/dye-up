import { StatusBar } from 'expo-status-bar';
import { Permissions, Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { enableScreens } from "react-native-screens";
import { useNavigation } from '@react-navigation/native';


enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';




import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDs5kM99F0drLWV0kczFwfBjRWXHcvz8K4",
  authDomain: "dyeup-34223.firebaseapp.com",
  databaseURL: "https://dyeup-34223-default-rtdb.firebaseio.com",
  projectId: "dyeup-34223",
  storageBucket: "dyeup-34223.appspot.com",
  messagingSenderId: "864924563527",
  appId: "1:864924563527:web:de3564b93b678da7315962",
  measurementId: "G-HL7CY7X27V"
};


import Tables from './components/Tables'
import Leaderboard from './components/Leaderboard'
import Game from './components/Game'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Router from './components/router'






export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: true,
      isAuthenticationReady: false,
      isAuthenticated: false,
    }
    if (firebase.apps.length === 0) {
      console.log("initializing firebase");
      firebase.initializeApp(firebaseConfig);
      
    }

  }


  render() {


    return (
          <NavigationContainer>
          <Router/>
          </NavigationContainer>



    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {enableScreens} from "react-native-screens";


enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {createStackNavigator} from "@react-navigation/stack";
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
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);


import Tables from '../components/Tables'
import Leaderboard from '../components/Leaderboard'
import Game from '../components/Game'
import Login from './Login'
import SignUp from './SignUp'



//const Stack = createNativeStackNavigator()
//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class Home extends React.Component{

  
    
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Tables') {
                iconName = focused ? 'table-furniture' : 'table-furniture';
              } else if (route.name === 'Game') {
                iconName = focused ? 'dice-5' : 'dice-5-outline';
              }
              else if (route.name === 'Leaderboard') {
                iconName = focused ? 'trophy-variant' : 'trophy-variant-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
              
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
        <Tab.Screen name="Tables" component={Tables} />
          <Tab.Screen name="Game" component={Game} />
          <Tab.Screen name="Leaderboard" component={Leaderboard} />
        </Tab.Navigator>
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

import React from 'react'

import * as firebase from "firebase";
import { useEffect } from "react"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Game from "./Game"
import Leaderboard from "./Leaderboard"
import Tables from "./Tables"
import Loading from "./Loading"
import NewGame from "./NewGame"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const RootStack = createStackNavigator();
const RootStackScreen = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                console.log("user is" + user);

            }
            setIsLoading(false);


        });
    }, []);

    if (isLoading) {
        return (
            <RootStack.Navigator headerMode="none">
                <RootStack.Screen name="Loading" component={Loading} />
            </RootStack.Navigator>
        );
    } else if (user != null) {
        return (
            <RootStack.Navigator headerMode="none" mode="modal">
                <RootStack.Screen name="NavScreen" component={NavScreen} />
                <RootStack.Screen name="NewGame" component={NewGame}/>
            </RootStack.Navigator>
        );
    }
    else {
        return (
            <RootStack.Navigator headerMode="none">
                <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
                
            </RootStack.Navigator>
        );
    }


}


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
)

const Tab = createBottomTabNavigator();
const NavScreen = () => (
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
)



export default () => {


    return (

       


            <RootStackScreen/>


        
    );
}
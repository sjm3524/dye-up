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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const RootStack = createStackNavigator();
const RootStackScreen = () => {
    if (firebase.apps.length === 0) {
        console.log("initializing firebase");
        firebase.initializeApp(firebaseConfig);

    }

    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        let isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                console.log("user is" + user);

            }
            if (isMounted) {
                setIsLoading(false);
            }


        });
        return () => { isMounted = false };
    }, []);
    return (
        <RootStack.Navigator headerMode="none">
            {isLoading ? (
                <RootStack.Screen name="Loading" component={Loading} />
            ) : user != null ? (
                <RootStack.Screen name="NavScreen" component={NavScreen} />

            ) : (
                <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
            )
            }
            <RootStack.Screen name="NewGame" component={NewGame} />
        </RootStack.Navigator>
    );


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
                <RootStack.Screen name="NewGame" component={NewGame} />
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
export default RootStackScreen;


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
)

//const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const NavScreen = () => (
    <Tab.Navigator
        tabBarPosition="bottom"
        lazy={true}
        showIcon={true}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color}) => {
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
                return <Ionicons name={iconName} color={color} size={25}/>;

            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            labelStyle: { fontSize: 8 },
            iconStyle: { 
                padding:0,
                margin:0,
                alignItems: "center",
             },
            inactiveTintColor: 'gray',
            showIcon: true,
            tabStyle: {
                
                
                
                minHeight: 10,
                maxHeight: 45,
              },
        }}
    >
        <Tab.Screen name="Tables" component={Tables} />
        <Tab.Screen name="Game" component={Game} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />

    </Tab.Navigator>
)



// export default () => {


//     return (<RootStackScreen />);
// }
import firebase from "firebase";
import React from "react";
import {
    View,
    Text,
    StyleSheet, Button, TextInput, Alert, TouchableOpacity
} from "react-native";
import Home from '../pages/Home'





export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticationReady: false,
            isAuthenticated: false,
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.logo}>Dye Up</Text>
                <View style={styles.inputView}>
                    
                    <TextInput placeholder="Email..." keyboardType="email-address" autoCapitalize="none"  autoCompleteType={"email"} onChangeText={(email) => {
                        this.setState({ email: email })
                    }} />
                    </View>
                    <View style={styles.inputView}>
                    <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(password) => {
                        this.setState({ password: password })
                    }} />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => {
                        firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password);
                        firebase.auth().onAuthStateChanged((user) => {
                            this.setState({ isAuthenticationReady: true })
                            this.setState({ isAuthenticated: !!user })
                        })
                    }}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                    
               
            </View>
        );
    }


}

function login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003f5c",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 10,
        paddingLeft:20,
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
    },
    loginText:{
        color:"white"
      },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,

    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#000",
    }
});
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, TextInput
} from "react-native";
import * as firebase from "firebase";
require("firebase/functions");
import functions from '@react-native-firebase/functions';







export default (props) => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player3, setPlayer3] = useState("");
    const [player4, setPlayer4] = useState("");
    console.log(props);
    var tableId = props.route.params.tableId;
    var tableName = props.route.params.tableName;
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.headerTitle}>New Game On {tableName}</Text>
            </View>
            <View style={styles.teams}>
                <View style={styles.inputView}>
                    <TextInput placeholder="Player 1" autoCapitalize="none" onChangeText={(player1) => {
                        setPlayer1(player1);
                    }} />
                </View>
                <Text style={styles.vsText}>&#38;</Text>
                <View style={styles.inputView}>
                    <TextInput placeholder="Player 2" autoCapitalize="none" onChangeText={(player2) => {
                        setPlayer2(player2);
                    }} />
                </View>
            </View>
            <View style={styles.vs}>
                <Text style={styles.vsText}>VS.</Text>
            </View>
            <View style={styles.teams}>
                <View style={styles.inputView}>
                    <TextInput placeholder="Player 3" autoCapitalize="none" onChangeText={(player3) => {
                        setPlayer3(player3);
                    }} />
                </View>
                <Text style={styles.vsText}>&#38;</Text>
                <View style={styles.inputView}>
                    <TextInput placeholder="Player 4" autoCapitalize="none" onChangeText={(player4) => {
                        setPlayer4(player4);
                    }} />
                </View>
            </View>
            <View style={styles.bodyContain}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {



                    firebase.functions().httpsCallable('createGame')({
                        players: [player1,player2,player3,player4],
                        tableId: tableId,
                    });




                }}>
                    <Text style={styles.loginText}>New Game</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    teams: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    vs: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    vsText: {
        fontSize: 20,
        fontWeight: "500",
    },
    bodyContain: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
    },
    inputView: {
        width: "40%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 40,
        marginBottom: 20,
        justifyContent: "center",
        
        paddingLeft: 20,
        padding: 0,
        margin: 0,
        borderWidth: 0,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
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
});
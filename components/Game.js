import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Dimensions, Image
} from "react-native";
import * as firebase from "firebase";

const Game = (props) => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [isGameLive, setIsGameLive] = useState(false);
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player3, setPlayer3] = useState("");
    const [player4, setPlayer4] = useState("");
    const [points, setPoints] = useState([]);
    const [t1Score, setT1Score] = useState(0);
    const [t2Score, setT2Score] = useState(0);
    const [p1Username, setP1Username] = useState("");
    const [p2Username, setP2Username] = useState("");
    const [p3Username, setP3Username] = useState("");
    const [p4Username, setP4Username] = useState("");















    useEffect(() => {
        try {
            var tableId = props.route.params.tableId;
            var tableName = props.route.params.tableName;
        } catch (error) {
            console.error(error);
            var tableId = ""
            var tableName = "No Table Selected";
        }
        firebase.database().ref('tables/' + tableId + '/games/').limitToLast(1).once('value', snapshot => {

            if (snapshot.val() == null) {
                console.log("null");
                setDataLoaded(true);
                setIsGameLive(false);
            }
            else {
                var games = snapshot.forEach(childSnapshot => {

                    var value = childSnapshot.val();
                    //gameId = childSnapshot.key;

                    if (value.isActive) {
                        console.log("Logging" + value);
                        setPlayer1(value.player1);
                        setPlayer2(value.player2);
                        setPlayer3(value.player3);
                        setPlayer4(value.player4);
                        setT1Score(value.t1Score);
                        setT2Score(value.t2Score);
                        setPoints(value.points);
                        setIsGameLive(true);
                        setDataLoaded(true);
                        firebase.database().ref('/users/' + player1).child("username").once('value').then((snapshott) => {
                            console.log(snapshott.val())
                            setP1Username(snapshott.val());
                        });

                        firebase.database().ref('/users/' + player2).child("username").once('value').then((snapshot2) => {
                            console.log(snapshot2.val())
                            setP2Username(snapshot2.val());
                        });
                        firebase.database().ref('/users/' + player3).child("username").once('value').then((snapshot3) => {
                            console.log(snapshot3.val())
                            setP3Username(snapshot3.val());
                        });
                        firebase.database().ref('/users/' + player4).child("username").once('value').then((snapshot4) => {
                            console.log(snapshot4.val())
                            setP4Username(snapshot4.val());
                        });

                    } else {
                        console.log("not active");
                        setIsGameLive(false);
                        setDataLoaded(true);
                    }

                });



                return () => firebase.database().ref('/tables/' + tableId + '/games/').off('value');


            }
        });


    }, []);



    try {
        var tableId = props.route.params.tableId;
        var tableName = props.route.params.tableName;
    } catch (error) {
        console.error(error);
        var tableId = ""
        var tableName = "No Table Selected";
    }

    if (tableId == "") {
        return (
            <View style={styles.container}>
                <Text>{tableName}</Text>
                <Text>Select a table to start hucking</Text>
            </View>
        );

    }
    else if (isGameLive) {

        return (
            <View style={styles.gameContainer}>

                <View style={styles.teamsContainer}>
                    <View style={styles.teamScores}>
                        <Text style={styles.score}>{t1Score}</Text>
                    </View>
                    <View style={styles.teamScores}>
                        <Text style={styles.score}>{t2Score}</Text>
                    </View>
                </View>

                <View style={styles.teamsContainer}>
                    <View style={styles.teamContainer}>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/default.png")}
                        />
                        <Text>{p1Username}</Text>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/default.png")}
                        />
                        <Text>{p2Username}</Text>
                    </View>

                    <View style={styles.teamContainer}>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/default.png")}
                        />
                        <Text>{p3Username}</Text>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/default.png")}
                        />
                        <Text>{p4Username}</Text>
                    </View>
                </View>

            </View>

        );



    } else {
        return (
            <View style={styles.container}>
                <Text>No Current Game</Text>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {

                    props.navigation.navigate("NewGame", { tableId: tableId, tableName: tableName });
                }}>
                    <Text style={styles.loginText}>New Game</Text>
                </TouchableOpacity>
                <Text>{tableName}</Text>
            </View>
        );
    }
}
export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    teamsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,

    },
    teamContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    teamScores: {
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width / 2,
        height: 30,
        padding: 0,
    },
    score: {
        fontSize: 50,
        fontWeight: "600",
    },
    teamScores: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').width / 2,
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
});
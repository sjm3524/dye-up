import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, TextInput
} from "react-native";
import * as firebase from "firebase";



async function createTeams(playersName, tableId){
    var gameRef = await createGame(playersName, tableId);
    
    var gameId= gameRef.key;
    await firebase.database().ref('tables/'+tableId+'/games/'+gameId).update({id:gameId});
    console.log(gameId);
    
    var playersId =[]
    for (i=0; i<4; i++){
        var snapshot = await firebase.database().ref('/names/' + playersName[i]).once('value');
        if (snapshot.val() == null){
            return alert("The user " + playersName[i] +" does not exist");
        }
        else{
            playersId.push(snapshot.val().uid);
        }
    }
    
    
    firebase.database().ref('/users/' + playersId[0]+"/games/").push(gameId);
    firebase.database().ref('users/' + playersId[1]+"/games/").push(gameId);
    firebase.database().ref('/users/' + playersId[2]+"/games/").push(gameId);
    firebase.database().ref('users/' + playersId[3]+"/games/").push(gameId);
    
    var team1 = playersId.slice(0,2);
    var team2= playersId.slice(2);
    
    team1.sort();
    team2.sort();
    
    
    
    
    
    firebase.database().ref('teams/' + team1[0]+"-"+team1[1]+"/games/").push(gameId);
    firebase.database().ref('teams/' + team2[0]+"-"+team2[1]+"/games/").push(gameId);

}



async function createGame(playersName, tableId){
				
    var playersId =[]
    var playersObj = [];

    for (i=0; i<4; i++){
        var snapshot = await firebase.database().ref('/names/' + playersName[i]).once('value');
        if (snapshot.val() == null){
            return alert("The user " + playersName[i] +" does not exist");
        }
        else{
            console.log(playersName[i]);
            console.log(snapshot.val().uid);
            playersId.push(snapshot.val().uid);
        }
    }
     console.log(playersId);
        
    /*for (i=0; i<4; i++){
    var snapshot = await firebase.database().ref('/users/' + playersId[i]).once('value');
        playersObj.push(snapshot.val());
    }
    console.log(playersObj);
    */
    
    firebase.database().ref('/users/' + playersId[0]).update({gamesPlayed: firebase.database.ServerValue.increment(1)});
    firebase.database().ref('users/' + playersId[1]).update({gamesPlayed: firebase.database.ServerValue.increment(1)});
    firebase.database().ref('/users/' + playersId[2]).update({gamesPlayed: firebase.database.ServerValue.increment(1)});
    firebase.database().ref('users/' + playersId[3]).update({gamesPlayed: firebase.database.ServerValue.increment(1)});
    
    var d = new Date();
    var startTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    
    firebase.database().ref('tables/'+tableId).update({status: "live"});
    return gameRef = firebase.database().ref('tables/'+tableId+'/games/').push({
        player1: playersId[0],
        player2: playersId[1],
        player3: playersId[2],
        player4: playersId[3],
        points: null,
        t1Score: 0,
        t2Score:0,
        isActive: true,
        id: null,
        start: startTime,
    //profile_picture : imageUrl
    });
    
    
}
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
                    <TextInput placeholder="Player 2" autoCapitalize="none" onChangeText={(email) => {
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



                    createTeams([player1,player2,player3,player4], tableId);
                    



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
    vsText:{
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
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 10,
        paddingLeft:20,
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
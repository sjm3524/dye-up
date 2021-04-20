import React from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity
} from "react-native";

const Game = (props) => {

    console.log(props);

    var tableId =props.route.params.tableId;
    var tableName =props.route.params.tableName;


    return (
        <View style={styles.container}>
            <Text>No Current Game</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                
                props.navigation.navigate("NewGame", { tableId: tableId, tableName: tableName });
            }}>
                <Text style={styles.loginText}>New Game</Text>
            </TouchableOpacity>
            <Text>{ tableId}</Text>
            <Text>{tableName}</Text>
        </View>
    );
}
export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
});
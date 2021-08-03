
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, Image,  RefreshControl, SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"
//import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as firebase from "firebase";
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const size = 100;
const width = 15;
const cropDegree = 90;
const textOffset = width;
const textWidth = size - (textOffset * 2);
const textHeight = size * (1 - cropDegree / 360) - (textOffset * 2);
var pickerVal="PPG"


const Leaderboard = (props) => {


    const [dataLoaded, setDataLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    function compareWinP(a, b) {
        return (b.wins / b.gamesPlayed) - (a.wins / a.gamesPlayed);

    }
    function comparePPG(a, b) {
        return (b.points / b.gamesPlayed) - (a.points / a.gamesPlayed);

    }
    function compareKPG(a, b) {
        return (b.plunks / b.gamesPlayed) - (a.plunks / a.gamesPlayed);

    }
    function sortPlayers(players, itemValue) {

        switch (itemValue) {
            case "PPG":
                players.sort(comparePPG);
                break;
            case "KPG":
                players.sort(compareKPG);
                break;
            case "WinPercent":
                players.sort(compareWinP);
                break;
            case "Names":
                players.sort(Names);
                break;

            default:
            // code block
        }


    }

    const [selectedValue, setSelectedValue] = useState("PPG");
    const [players, setPlayers] = useState([]);
    const [playersSorted, setPlayersSorted] = useState([]);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        var itemPlayers = [];
        console.log("running leaderboard");
        firebase.database().ref('/users').once('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(data => {
                    
                    itemPlayers.push({
                        gamesPlayed: data.val().gamesPlayed,
                        losses: data.val().losses,
                        wins: data.val().wins,
                        plunks: data.val().plunks,
                        points: data.val().points,
                        profPic: data.val().profile_picture,
                        username: data.val().username,
                        winPercent: (data.val().wins/data.val().gamesPlayed)*100,
                        id: data.key,

                    });



                });
                console.log(pickerVal);
                sortPlayers(itemPlayers, pickerVal)
                sortPlayers(itemPlayers, pickerVal)
                setPlayers(itemPlayers)
                setPlayersSorted(itemPlayers);
                setDataLoaded(true);
            }
        });
        setRefreshing(false)
        return () => firebase.database().ref('/users').off('value');

    }, []);

    renderPlayers = post => {
        const winPercent =Math.round(post.wins / post.gamesPlayed * 10000) / 100;

        return (
            <View style={styles.feedItem}>
                {/* <Image source={post.avatar} style={styles.avatar}/> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/default.png")}
                        />

                        {/* <GaugeProgress
                            size={80}
                            width={8}
                            fill={winPercent}
                            rotation={90}
                            cropDegree={90}
                            tintColor="#4682b4"
                            delay={0}
                            backgroundColor="#b0c4de"
                            stroke={[2, 2]} //For a equaly dashed line
                            strokeCap="circle" >
                            <View style={styles.textView}>
                                <Text style={styles.text}>{winPercent}</Text>
                            </View>

                        </GaugeProgress> */}



                        <View>

                            <Text style={styles.name}>Name: {post.username}</Text>
                            <Text style={styles.name}>Games Played: {post.gamesPlayed}</Text>

                            <Text style={styles.name}>Wins: {post.wins}</Text>
                            <Text style={styles.name}>Win%: {post.winPercent}</Text>
                            <Text style={styles.name}>PPG: {Math.round(post.points / post.gamesPlayed * 100) / 100}</Text>
                            <Text style={styles.name}>KPG: {Math.round(post.plunks / post.gamesPlayed * 100) / 100}</Text>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    useEffect(() => {
        var itemPlayers = [];
        console.log("running leaderboard");
        firebase.database().ref('/users').once('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(data => {

                    // if (data.val().profile_picture != "default.png"){
                    //     var downloadUrl = firebase.storage().ref("users/"+data.key+"/profilePicture/"+data.val().profile_picture).getDownloadURL();
                    //     console.log(downloadUrl);
                    // }else{
                    //     downloadUrl = "../assets/default.png";
                    // }
                    itemPlayers.push({


                        gamesPlayed: data.val().gamesPlayed,
                        losses: data.val().losses,
                        wins: data.val().wins,
                        plunks: data.val().plunks,
                        points: data.val().points,
                        profPic: data.val().profile_picture,
                        username: data.val().username,
                        winPercent: (data.val().wins/data.val().gamesPlayed)*100,
                        id: data.key,

                    });



                });
                setPlayers(itemPlayers);
                setPlayersSorted(itemPlayers);
                //setPlayersSorted(sortPlayers(currentSort))
                setDataLoaded(true);
            }
        });

        return () => firebase.database().ref('/users').off('value');

    }, []);

    if (dataLoaded) {
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Leaderboard</Text>
                </View>

                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                        sortPlayers(playersSorted, itemValue);
                        pickerVal=itemValue;
                        setSelectedValue(itemValue);
                        console.log(pickerVal);
                    }
                    }
                >
                    <Picker.Item label="PPG" value="PPG" />
                    <Picker.Item label="KPG" value="KPG" />
                    <Picker.Item label="Win%" value="WinPercent" />
                </Picker>

                <FlatList
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                    }
                    style={styles.feed}
                    data={playersSorted}
                    renderItem={({ item }) => this.renderPlayers(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />

            </View>

        )
    } else {
        return (
            <View style={styles.loading}>
                <Image
                    style={styles.logo}
                    source={require('../assets/dice.gif')}
                />
            </View>
        )
    }



}




export default Leaderboard;













const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },
    header: {
        paddingTop: 30,
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
    },
    loading: {
        flex: 1,
        backgroundColor: "#EFECF4",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    textView: {
        position: 'absolute',
        top: textOffset,
        left: textOffset,
        width: textWidth,
        height: textHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
    },
});
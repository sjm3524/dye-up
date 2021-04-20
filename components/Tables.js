import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet, Button, FlatList, TouchableWithoutFeedback, Image
} from "react-native";
import * as firebase from "firebase";
import Login from '../pages/Login'
const Tables = ({ navigation }) => {



    const [dataLoaded, setDataLoaded] = useState(false);
    const [tables, setTables] = useState([]);
    renderPost = post => {
        return (

            <TouchableWithoutFeedback onPress={() => actionOnRow(post)}>
                {/* <Image source={post.avatar} style={styles.avatar}/> */}
                <View style={styles.feedItem}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={styles.name}>Name: {post.name}</Text>
                                <Text style={styles.name}>Status: {post.status}</Text>
                                <Text style={styles.name}>Queue: {post.queue}</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    function actionOnRow(item) {
        console.log(item.key);
        navigation.navigate('Game', { tableId: item.key, tableName: item.name })
    }

    useEffect(() => {

        var items = [];
        console.log("running")

        firebase.database().ref('/tables/').on('value', snapshot => {
            if (snapshot.exists()) {


                snapshot.forEach(function (data) {


                    var queue;

                    if (data.hasChild("queue")) {
                        queue = data.child("queue").numChildren();

                    }
                    else {
                        queue = 0;
                    }
                    var val = data.val();
                    items.push({


                        key: data.key,
                        name: val.name,
                        status: val.status,
                        queue: queue,


                    });


                    setTables(items);


                });
                setDataLoaded(true);
            }
        });



    }, []);


    if (dataLoaded) {


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Tables</Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={tables}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.key}
                    showsVerticalScrollIndicator={false}
                />




                <Button
                    title="Log Out"
                    onPress={() => firebase.auth().signOut().then(() => {

                    })}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.loading}>
                <Image
                    style={styles.logo}
                    source={ require('../assets/dice.gif')}
                />
            </View>
        )
    }
};
export default Tables;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
        
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
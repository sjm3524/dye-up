import React from "react";
import { 
    View,
    Text,
    StyleSheet, Image
} from "react-native";
import { useEffect } from "react/cjs/react.development";



const Loading = (props) => {
    
    
    
    
    return(
        <View style={styles.loading}>
        <Image
            style={styles.logo}
            source={ require('../assets/dice.gif')}
        />
    </View>
    )
}
export default Loading;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8D3B72",
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
});
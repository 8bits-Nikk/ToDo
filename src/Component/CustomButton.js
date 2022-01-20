import React from "react";
import {Text, StyleSheet, Pressable,} from "react-native";


const CustomButton = (props) =>{
    return(
        <Pressable onPress={props.onPress}
        style={({pressed}) => [{backgroundColor: pressed ? '#bab2ca' : '#cbc3de'},
            {elevation: pressed ? 1 : 6},
            styles.button]}>
            <Text style={styles.buttonText}>
                {props.text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        fontFamily: 'BalsamiqSans-Bold',
        color: '#ffffff',
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        height: 58,
        borderRadius: 29,
    }
})

export default CustomButton;

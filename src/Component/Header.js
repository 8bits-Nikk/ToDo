import React from "react";
import {Text, TouchableWithoutFeedback, View,StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = (props) =>{
    return(
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <TouchableWithoutFeedback onPress={()=> props.navigation.goBack()}>
                    <MaterialCommunityIcons color={'#555'} name={'arrow-left-circle-outline'} size={32} />
                </TouchableWithoutFeedback>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#A09EFF60',
        height: 120,
        elevation: 2,
        padding: 8,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    headerContainer: {
        marginTop: 42,
        marginStart: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontFamily: 'BalsamiqSans-Bold',
        fontSize: 24,
        padding: 8,
        marginBottom: 5,
    },
})

export default Header

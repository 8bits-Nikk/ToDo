import React from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {TextInput} from "react-native-paper";
import CustomButton from "./CustomButton";


const {height, width} = Dimensions.get('window')

const AddUserModel = (props) => {
    return (
        <View style={styles.modelBody}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.labelHeader}>Add User</Text>
                </View>
                <View style={styles.textViewContainer}>
                    <TextInput mode={'outlined'}
                               label={'User Name'}
                               placeholder={'eg. Nikhil'}
                               style={styles.textInput}
                               onChangeText={props.onTextChange}/>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <CustomButton text={'Add'} onPress={props.addUserBtn}/>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modelBody: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#00000070'
    },
    container: {
        height: height * 0.5,
        width: width * 0.8,
        backgroundColor: '#a8e6cf',
        borderRadius: width*0.05,
        elevation: 12,
    },
    header:{
        backgroundColor: '#ff8b94',
        padding: 8,
        alignItems: "center",
        borderTopStartRadius: width*0.05,
        borderTopEndRadius: width*0.05,
    },
    labelHeader: {
        fontFamily: 'BalsamiqSans-Bold',
        fontSize: 26,
    },
    textViewContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
    },
    textInput: {
        margin: 8,
    },
    buttonContainer: {
        marginTop: 24,
        width: (width*0.8)-16,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
      width: (width*0.8)/2,
    },
})

export default AddUserModel

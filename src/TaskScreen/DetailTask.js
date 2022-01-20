import React from "react";
import {View, StyleSheet, Text, Alert, TouchableOpacity} from "react-native";
import Header from "../Component/Header";
import {Chip} from "react-native-paper";
import CustomButton from "../Component/CustomButton";
import {openDatabase} from "react-native-sqlite-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DetailTask = ({navigation, route}) => {

    const data = route.params.data
    const extra = route.params.extra

    const db = openDatabase(
        {
            name: 'ToDoDB',
            location: 'default'
        },
        () => {
        },
        error => {
            console.warn(error)
        }
    )

    const markComplete = () =>{
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE task_table SET task_status = 'Complete' WHERE task_id ="+ data.task_id,
                [],
                () => {
                    Alert.alert("Successful.!", "Task Completed")
                    navigation.goBack()
                },
                error => {
                    console.log(error)
                },
            )
        })
    }

    const deleteTask = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM task_table WHERE task_id = "+ data.task_id,
                [],
                () => {
                    Alert.alert("Successful.!", "Task Deleted")
                    navigation.goBack()
                },
                error => {
                    console.log(error)
                },
            )
        })
    }

    return (
        <View style={styles.body}>
            <Header title={data.task_title} navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleLabel}>{data.task_title}</Text>
                    <Text>{data.task_startDate}</Text>
                    <Text style={styles.label}>to</Text>
                    <Text>{data.task_dueDate}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleLabel}>Description</Text>
                    <Text style={styles.label}>{data.task_des}</Text>
                    <View style={styles.chipContainer}>
                        <Text>Status: </Text>
                        <Chip icon="information" style={{backgroundColor: data.task_status === "Pending" ? '#ffcc00': data.task_status === "Complete" ? '#22ff55' : '#ff3333'}}>{data.task_status}</Chip>
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <View style={styles.button}>
                        <CustomButton text={"Mark Complete"} onPress={markComplete}/>
                    </View>
                    <View style={styles.button}>
                        <CustomButton text={"Edit"} onPress={()=> navigation.navigate("EditTask", { Data : data , userData: extra})}/>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.deleteBtn} onPress={deleteTask}>
                    <MaterialCommunityIcons color={'#fff'} name={'trash-can'} size={28}/>
                    <Text style={[styles.label, {color: '#fff'}]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        margin: 16,
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    titleContainer: {
        backgroundColor: '#e9eded',
        padding: 8,
        borderRadius: 10,
        paddingStart: 16,
        paddingEnd: 16,
    },
    descriptionContainer: {
        padding: 8,
        paddingStart: 16,
        paddingEnd: 16,
    },
    titleLabel: {
        fontFamily: 'BalsamiqSans-Bold',
        fontSize: 24,
    },
    label: {
        fontSize: 16,
        fontFamily: 'BalsamiqSans-Regular',
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonGroup: {
        flexDirection: "row",
        margin: 8,
    },
    button: {
        flex: 1,
        margin: 8,
    },
    deleteBtn: {
        margin: 16,
        backgroundColor: '#ff5522',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
        padding: 8,
        borderRadius: 28,
    },

})

export default DetailTask

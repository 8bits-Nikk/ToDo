import React, {useState} from "react";
import {Alert, Platform, StyleSheet, View} from "react-native";
import Header from "../Component/Header";
import {TextInput} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../Component/CustomButton";
import {openDatabase} from "react-native-sqlite-storage";

const AddTask = ({navigation, route}) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const currentDate = new Date()
    const dateString = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

    const data = route.params.item

    const showDatepicker = () => {
        setShow(true)
    };
    const showDatepicker2 = () => {
        setShow2(true)
    };

    const onChange = (event, selectedDate) => {
        const final = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(final);

        let tempDate = new Date(final);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
        setStartDate(fDate)
    };
    const onChange2 = (event, selectedDate) => {
        const final = selectedDate || date;
        setShow2(Platform.OS === 'ios');
        setDate(final);

        let tempDate = new Date(final);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setEndDate(fDate)
    };

    const validateFields = () => {
        return !(title === '' || description === '' || startDate === '' || endDate === '');
    }

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
    const addTask = () => {
        if (validateFields()) {
            try {
                db.transaction((tx) => {
                    tx.executeSql(
                        "INSERT INTO task_table (task_title, task_des, task_startDate, task_dueDate, task_status, task_createDate, user_id) VALUES (?,?,?,?,?,?,?)",
                        [title, description, startDate, endDate, "Pending",dateString,data.user_id],
                        () => {
                            console.log('task Added')
                            navigation.goBack()
                        },
                        error => {
                            console.log(error)
                        },
                    )
                })
            } catch (e) {
                console.log(e)
            }
        } else {
            Alert.alert("Warning.!", "Enter All Details")
        }
    }


    return (
        <View style={styles.body}>
            <Header title={"Add Task"} navigation={navigation}/>
            <View style={styles.container}>
                <TextInput mode={'outlined'}
                           label={'Title'}
                           onChangeText={txt => setTitle(txt)}/>
                <TextInput mode={'outlined'}
                           label={'Description'}
                           multiline={true}
                           onChangeText={txt => setDescription(txt)}/>
                <TextInput mode={'outlined'}
                           label={'Start Date'}
                           showSoftInputOnFocus={false}
                           onPressIn={showDatepicker}
                           value={startDate}
                           right={<TextInput.Icon name="calendar" onPress={showDatepicker}/>}/>
                <TextInput mode={'outlined'}
                           label={'Due Date'}
                           showSoftInputOnFocus={false}
                           onPressIn={showDatepicker2}
                           value={endDate}
                           right={<TextInput.Icon name="calendar" onPress={showDatepicker2}/>}/>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                {show2 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange2}
                    />
                )}
                <View style={styles.btn}>
                    <CustomButton text={"Add"} onPress={addTask}/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        margin: 8,
        padding: 8,
    },
    btn: {
        margin: 8,

    },
})

export default AddTask

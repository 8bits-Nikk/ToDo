import React, {useEffect, useState} from "react";
import {View, StyleSheet, Platform, Alert} from "react-native";
import Header from "../Component/Header";
import {TextInput} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from "../Component/CustomButton";
import {openDatabase} from "react-native-sqlite-storage";

const EditTask = ({navigation, route}) => {

    const data = route.params.Data
    const userData = route.params.userData

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const currentDate = new Date()
    const dateString = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

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

    const validateFields = () => {
        return !(title === '' || description === '' || startDate === '' || endDate === '');
    }

    const editTask = () =>{
       if(validateFields()){
           db.transaction((tx) => {
               tx.executeSql(
                   "UPDATE task_table SET task_title = " + "'"+ title + "'"
                   + " ,task_des = " + "'" + description + "'"
                   + " ,task_startDate = " + "'"+ startDate + "'"
                   + " ,task_dueDate = " + "'"+ endDate + "'"
                   + " ,task_createDate = "+ "'" + dateString + "'"
                   + " WHERE task_id = " + data.task_id,
                   [],
                   () => {
                       Alert.alert("Successful.!", "Task Edited.")
                       navigation.goBack()
                       navigation.goBack()
                   },
                   error => {
                       console.log(error)
                   },
               )
           })
       }else {
           Alert.alert("Warning.!", "Enter All Details")
       }
    }

    useEffect(()=>{
        setTitle(data.task_title)
        setDescription(data.task_des)
        setStartDate(data.task_startDate)
        setEndDate(data.task_dueDate)
    },[])

    return (
        <View style={styles.body}>
            <Header title={"Edit"} navigation={navigation}/>
            <View style={styles.container}>
                <TextInput mode={'outlined'}
                           label={'Title'}
                           value={title}
                           onChangeText={txt => setTitle(txt)}/>
                <TextInput mode={'outlined'}
                           label={'Description'}
                           multiline={true}
                           value={description}
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
                    <CustomButton text={"Save"} onPress={editTask}/>
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

export default EditTask

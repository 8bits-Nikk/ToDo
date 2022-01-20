import React, {useState} from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {FAB} from "react-native-paper";
import TaskCard from "../Component/TaskCard";
import Header from "../Component/Header";
import AddTask from "./AddTask";
import {openDatabase} from "react-native-sqlite-storage"
import {useFocusEffect} from "@react-navigation/native";


const height = Dimensions.get('window').height

const TaskScreen = ({navigation, route}) => {

    const [taskList, setTaskList] = useState([])
    const data = route.params.item
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

    useFocusEffect(
        React.useCallback(() => {
            createTable()
            getTasks()
            return () => {
            }
        }, [])
    )

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS task_table ( task_id INTEGER PRIMARY KEY AUTOINCREMENT,task_title TEXT,task_des TEXT,  task_startDate TEXT, task_dueDate TEXT, task_status TEXT,task_createDate TEXT, user_id INTEGER)",
                [],
                () => {
                    console.log('task_table created Successfully.')
                },
                error => {
                    console.log(error)
                },
            )
        })
    }

    const getTasks = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM task_table WHERE user_id = " + data.user_id,
                [],
                (transaction, resultSet) => {
                    let row_nub = resultSet.rows.length
                    let temp = []

                    for (let i = 0; i < row_nub; ++i) {
                        temp.push(resultSet.rows.item(i))
                    }
                    setTaskList(temp)
                    console.log(taskList)
                },
                error => {
                    console.log(error)
                },
            )
        })
    }

    return (
        <View style={styles.body}>
            <ImageBackground source={require('../assets/images/bg.png')}
                             resizeMode="cover"
                             style={styles.imageBg}>
                <Header title={"Hi, " + data.user_name} navigation={navigation}/>
                <View style={styles.flatList}>
                    <FlatList data={taskList}
                              renderItem={({item}) =>(
                                  <TouchableOpacity onPress={() => navigation.navigate("DetailTask", {data:item , extra: data})}>
                                      <TaskCard item={item}/>
                                  </TouchableOpacity>
                              )}/>
                </View>
            </ImageBackground>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("AddTask", {item: data})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    imageBg: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#A09EFF',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    flatList: {
        height: height - 120,
    },
})

export default TaskScreen

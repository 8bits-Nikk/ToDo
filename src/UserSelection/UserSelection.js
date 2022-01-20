import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Modal,
    StatusBar, Alert,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import {TextInput} from "react-native-paper";
import CustomButton from "../Component/CustomButton";
import AddUserModel from "../Component/AddUserModel";
import {openDatabase} from "react-native-sqlite-storage"


const height = Dimensions.get('window').height

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

const UserSelection = ({navigation}) => {

    const [userName, setUserName] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [addUserName, setAddUserName] = useState('')

    useEffect(() => {
        createTable()
    }, [])

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS user_table (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT UNIQUE NOT NULL)",
                [],
                () => {

                },
                error => {
                    console.log(error)
                },
            )
        })
    }

    const gotoTasks = () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM user_table WHERE user_name= (?)",
                [userName],
                (tx, rs) => {
                    let numRow = rs.rows.length;
                    if(numRow>0){
                        let data = rs.rows.item(0)
                        console.log(data)
                        navigation.navigate("Tasks",{item:data})
                    }else {
                        Alert.alert("Warning.!","User not exist")
                    }

                }
            )
        })
    }

    const addUser = async () => {
        if (addUserName === '') {
            Alert.alert("Warning.!", 'Please Enter Name.')
            return false
        } else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql("INSERT INTO user_table (user_name) VALUES (?)",
                        [addUserName],
                        () => {
                            Alert.alert("Successful.!", 'User Added.')
                            setShowModel(false)
                            setAddUserName('')
                            console.log(addUserName + "added")
                        },
                        error => {
                            Alert.alert("Error.!", 'User Already Exist.')
                            console.log(error)
                        },
                    )
                })
            } catch (e) {
                Alert.alert("Error.!", 'User Already Exist.')
                console.log(e)
            }
        }
    }


    return (
        <KeyboardAvoidingView style={styles.body}>
            <StatusBar translucent={true}
                       backgroundColor="transparent"
                       barStyle={"dark-content"}/>

            <View style={styles.upper}>
                <AnimatedLottieView source={require('../assets/anim.json')}
                                    autoPlay
                                    loop
                                    style={styles.anime}/>
            </View>
            <View style={styles.lower}>
                <Text style={[styles.labelHeader, {marginTop: 16}]}>TODO</Text>
                <Text style={styles.labelHeader}>Keep It Organized and Scheduled</Text>
                <TextInput mode={'outlined'}
                           label={'User Name'}
                           placeholder={'eg. Nikhil'}
                           style={styles.textInput}
                           onChangeText={(txt) => setUserName(txt)}/>
                <View style={styles.button}>
                    <CustomButton text={'Go'} onPress={gotoTasks}/>
                </View>
                <View style={styles.link}>
                    <TouchableWithoutFeedback onPress={() => {
                        setShowModel(true)
                    }}>
                        <Text style={styles.linkText}>Add User</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Modal visible={showModel}
                   style={styles.model}
                   onRequestClose={() => {
                       setShowModel(false)
                       setAddUserName('')
                   }}
                   transparent={true}>
                <AddUserModel onTextChange={(txt) => setAddUserName(txt)} addUserBtn={addUser}/>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "space-evenly"
    },
    upper: {
        height: height * 0.6,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
    },
    lower: {
        height: height * 0.4,
        backgroundColor: '#a8e6cf',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        elevation: 16,
        padding: 8,
    },
    anime: {
        height: height * 0.5
    },
    labelHeader: {
        fontFamily: 'BalsamiqSans-Bold',
        fontSize: 20,
        marginStart: 16,
    },
    textInput: {
        marginStart: 16,
        marginEnd: 16,
    },
    button: {
        marginStart: 16,
        marginEnd: 16,
        marginTop: 8,
    },
    linkText: {
        color: '#2680EB',
        textDecorationLine: "underline",
        fontSize: 16,
        marginTop: 16,
        marginStart: 16,
    },
    link: {
        alignItems: "center",
        justifyContent: "center",
    },
    model: {
        alignItems: "center",
        justifyContent: "center",
    },

})

export default UserSelection

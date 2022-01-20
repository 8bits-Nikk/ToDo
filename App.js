import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "./src/splash/Splash";
import UserSelection from "./src/UserSelection/UserSelection";
import TaskScreen from "./src/TaskScreen/TaskScreen";
import DetailTask from "./src/TaskScreen/DetailTask";
import EditTask from "./src/TaskScreen/EditTask";
import AddTask from "./src/TaskScreen/AddTask";

const Stack = createNativeStackNavigator()

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Splash"}
                              component={Splash}/>
                <Stack.Screen name={"UserSelection"}
                              component={UserSelection}/>
                <Stack.Screen name={"Tasks"}
                              component={TaskScreen}/>
                <Stack.Screen name={"DetailTask"}
                              component={DetailTask}/>
                <Stack.Screen name={"EditTask"}
                              component={EditTask}/>
                <Stack.Screen name={"AddTask"}
                              component={AddTask}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App

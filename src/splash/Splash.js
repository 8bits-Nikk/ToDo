import React from "react";
import {Image, ImageBackground, StatusBar, StyleSheet, View} from "react-native";
import {ActivityIndicator, Colors} from "react-native-paper";


const Splash = ({navigation}) => {
    React.useEffect(()=>{
        setTimeout(()=> navigation.replace('UserSelection'),1500)
    },[])

    return (
        <View style={styles.body}>
            <StatusBar hidden={true}/>
            <ImageBackground source={require('../assets/images/bg.png')}
                             resizeMode="cover"
                             style={styles.imageBg}>
                <View style={styles.container}>
                    <Image source={require('../assets/images/logo.png')} style={styles.Img}/>
                    <ActivityIndicator animating={true}
                                       color={Colors.red800}
                                       size={'large'}
                                       style={styles.loading}/>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loading: {
        position: "absolute",
        bottom: 40,
    },
    Img: {
        height: 130,
        width: 130,
        resizeMode: 'contain',
    },
    imageBg: {
        flex: 1,
    },
})

export default Splash

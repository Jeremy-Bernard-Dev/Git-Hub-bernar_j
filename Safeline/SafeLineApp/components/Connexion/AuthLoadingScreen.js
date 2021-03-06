import React from 'react'
import axios from "axios";
import {AsyncStorage, View, StyleSheet} from 'react-native'

export default function AuthLoadingScreen({ navigation }) {

    const _checkToken = async () => {

        const token = await AsyncStorage.getItem('token');

        if (token == null ||token === "default") {
            navigation.navigate("Connexion");
        }
        else {
            _getAuth(token);
        }
    };

    const _getAuth = (token) => {
        axios.post(
            instance + 'user/details',
            null,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + token
                    }
            }).then((response) => {
            if (response.data.user.role_id === 3) {
                navigation.navigate("Market");
            }
            else {
                navigation.navigate("Client");
            }
        }, (error) => {
            AsyncStorage.setItem('token', "default");
            navigation.navigate("Connexion");
        });
    }

    _checkToken();

    return (
        <View style={styles.viewContainer}>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    }
})
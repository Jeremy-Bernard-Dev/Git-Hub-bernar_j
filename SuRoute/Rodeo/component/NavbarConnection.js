import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react';

export default function NavBar({navigation}) {
    const _Login = () => {
        navigation.navigate("Login");
    };

    const _Register = () => {
        navigation.navigate("Register");
    };

        return (
            <View style={styles.containerNavbar}>
                <View style={styles.viewNavbar}>
                    <TouchableOpacity onPress={_Login} style={{flex: 1,}}>
                        <Text style={styles.textNavbar}>Connexion</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'white'}}>|</Text>
                    <TouchableOpacity onPress={_Register} style={{flex: 1,}}>
                        <Text style={styles.textNavbar}>Inscription</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}


const styles = StyleSheet.create({

    containerNavbar: {
            paddingTop: 10,
            flexDirection: 'column',
            backgroundColor: '#f18030'
    },
    viewNavbar: {
        flexDirection: 'row',
    },
    textNavbar: {
        paddingBottom: 10,
            textAlign: 'center',
            fontSize: 15,
            color: 'white'
    }
});
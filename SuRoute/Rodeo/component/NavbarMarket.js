import {View, TouchableOpacity, Text, StyleSheet, AsyncStorage} from 'react-native'
import React from 'react';

export default function NavBar({navigation}) {
    const _Catalogue = () => {
        navigation.navigate("Catalogue");
    };

    const _Basket = () => {
        navigation.navigate("Basket");
    };

    const _Logout = () => {
        AsyncStorage.setItem('token', "default");
        navigation.navigate("Connection");
    };

        return (
            <View style={styles.containerNavbar}>
                <View style={styles.viewNavbar}>
                    <TouchableOpacity onPress={_Catalogue} style={{flex: 1,}}>
                        <Text style={styles.textNavbar}>Catalogue</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'white'}}>|</Text>
                    <TouchableOpacity onPress={_Basket} style={{flex: 1,}}>
                        <Text style={styles.textNavbar}>Basket</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'white'}}>|</Text>
                    <TouchableOpacity onPress={_Logout} style={{flex: 1,}}>
                        <Text style={styles.textNavbar}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}


const styles = StyleSheet.create({

    containerNavbar: {
        marginTop: 3,
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

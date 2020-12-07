import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import img_client from '../../assets/img/Menu/Connexion/client.jpg'
import img_personnel_soignant from '../../assets/img/Menu/Connexion/soignant.jpg'
import img_entreprise from '../../assets/img/Menu/Connexion/entreprise.jpg'

class MenuConnexion extends React.Component {

    _displayLoginUser = () => {
        this.props.navigation.navigate("Login_User");
    };

    _displayLoginEssential = () => {
        this.props.navigation.navigate("Login_Essential");
    };

    _displayLoginMarket = () => {
        this.props.navigation.navigate("Login_Market");
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.touchableOpacityParties} onPress={this._displayLoginEssential}>
                    <Text style={styles.textPartiesTitle}>Personnel essentiel</Text>
                    <Image source={img_personnel_soignant}  style={styles.imageParties}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacityParties} onPress={this._displayLoginUser}>
                    <Text style={styles.textPartiesTitle}>Client</Text>
                    <Image source={img_client}  style={styles.imageParties}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacityParties} onPress={this._displayLoginMarket}>
                    <Text style={styles.textPartiesTitle}>Commercant</Text>
                    <Image source={img_entreprise}  style={styles.imageParties}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageParties: {
        width:'100%',
        height:'100%',
        position:'absolute'
    },
    viewContainer: {
        width:'100%',
        height:'100%'
    },
    textPartiesTitle: {
        textAlign:'center',
        fontSize:35,
        paddingBottom:30,
        zIndex:40,
        color:'white',
        fontWeight:'bold'
    },
    touchableOpacityParties: {
        backgroundColor:'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        width:'100%'
    },
});

export default MenuConnexion;

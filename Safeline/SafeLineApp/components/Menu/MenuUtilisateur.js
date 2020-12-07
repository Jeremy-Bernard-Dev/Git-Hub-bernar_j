import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, AsyncStorage, Button} from 'react-native'
import img_trouverUnMagasin from '../../assets/img/Menu/Client/find.jpg'
import img_magasinPref from '../../assets/img/Menu/Client/shop.jpg'
import img_reservations from '../../assets/img/Menu/Client/reservation.jpg'
import Map from '../Client/Map'

export default function MenuUtilisateur({ navigation }) {

    const _Logout = () => {
        AsyncStorage.setItem('token', "default");
        AsyncStorage.setItem('user_firstname', "default");
        AsyncStorage.setItem('user_name', "default");
        AsyncStorage.setItem('user_id', "default");
        navigation.navigate("Connexion");
    };

    const _diplayMap = () => {
        navigation.navigate("Map");
    };

    const _displayListeFavorie = () => {
        navigation.navigate("ListeFavorie");
    };

    const _displayQRliste = () => {
        navigation.navigate("QRListe");
    };

    return (
        <View style={styles.viewContainer}>
            <TouchableOpacity style={styles.touchableOpacityParties} onPress={_diplayMap}>
                <Text style={styles.textPartiesTitle}>Trouver un magasin</Text>
                <Image source={img_magasinPref}  style={styles.imageParties}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacityParties} onPress={_displayListeFavorie}>
                <Text style={styles.textPartiesTitle}>Mes magasins préférés</Text>
                <Image source={img_trouverUnMagasin}  style={styles.imageParties}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacityParties} onPress={_displayQRliste}>
                <Text style={styles.textPartiesTitle}>Mes réservations</Text>
                <Image source={img_reservations}  style={styles.imageParties}/>
            </TouchableOpacity>
            <View style={styles.viewButton}>
                <Button
                    title="Deconnexion"
                    color="#4ea5f3"
                    onPress={_Logout}
                />
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    imageParties: {
        width:'100%',
        height:'100%',
        position:'absolute',
        borderRadius:10
    },
    viewContainer: {
        width:'100%',
        height:'95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:25
    },
    title: {
        textAlign:'center',
        fontSize:35,
        zIndex:40,
        color:'#20B1FF',
    },
    textPartiesTitle: {
        textAlign:'center',
        fontSize:35,
        zIndex:40,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 20
    },
    touchableOpacityParties: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:'15%',
        marginBottom:30,
        backgroundColor:'#20B1FF',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewButton: {
        width: "85%",
        marginBottom:10,
        backgroundColor: "red",
    },
});

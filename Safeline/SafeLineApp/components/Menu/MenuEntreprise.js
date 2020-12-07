import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, AsyncStorage, Button} from 'react-native'
import img_magasinPref from '../../assets/img/Menu/Entreprise/scanQR.jpg'
import img_shop from '../../assets/img/Menu/Client/shop.jpg'
import img_avis from '../../assets/img/Menu/Entreprise/avis.jpg'

export default function MenuEntreprise({ navigation }) {

    const _Logout = () => {
        AsyncStorage.setItem('token', "default");
        AsyncStorage.setItem('user_firstname', "default");
        AsyncStorage.setItem('user_name', "default");
        AsyncStorage.setItem('user_id', "default");
        AsyncStorage.setItem('market_id', "default");
        navigation.navigate("Connexion");
    };

    const _displayPannelEntreprise = () => {
        navigation.navigate("PannelEntreprise");
    };
    const _displayListeAvis = () => {
        navigation.navigate("ListeAvisClients");
    };
    const _displayQrListener = () => {
        navigation.navigate("ScanQR");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.parties} onPress={_displayPannelEntreprise}>
                <Text style={styles.parties_title}>Votre entreprise</Text>
                <Image source={img_shop}  style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parties} onPress={_displayListeAvis}>
                <Text style={styles.parties_title}>Avis des clients</Text>
                <Image source={img_avis}  style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parties} onPress={_displayQrListener}>
                <Text style={styles.parties_title}>Scanner un QR code</Text>
                <Image source={img_magasinPref}  style={styles.img}/>
            </TouchableOpacity>
            <View style={[{ width: "85%",marginBottom:10, backgroundColor: "red" }]}>
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
    img: {
        width:'100%',
        height:'100%',
        position:'absolute',
        borderRadius:10
    },
    container: {
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
    parties_title: {
        textAlign:'center',
        fontSize:35,
        zIndex:40,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 20
    },
    parties: {
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
});
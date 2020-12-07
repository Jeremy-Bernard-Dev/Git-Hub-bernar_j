import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import imgCart from '../../assets/img/Logos/cadi_bleu.png'

export default function ValidationAcceptee({ navigation }) {

    const _displayValidations = () => {
        navigation.popToTop();
        navigation.navigate("QRListe");
    };

    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewImgContainer}>
                <Image style={styles.imageCart} source={imgCart}/>
            </View>
            <View style={styles.viewMessage}>
                <Text style={styles.textValidated}>Inscription validée !</Text>
                <Text style={styles.textRegistration}>Vous pouvez consulter vos inscriptions dans</Text>
                <Button color='#4ea5f3' onPress={_displayValidations} style={styles.buttonRegistration} title='Mes inscriptions'/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    viewImgContainer: {
        width:'100%',
        height:'100%',
        alignItems:'center',
        marginTop:50
    },
    viewMessage: {
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    imageCart: {
        width:150,
        height:150,
        marginRight:18,
        resizeMode: "center",
    },
    textRegistration: {
        fontSize: 22,
        textAlign: "center",
        color:'#4ea5f3',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20
    },
    textValidated: {
        fontSize: 22,
        textAlign: "center",
        color:'#8CE729',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10
    },
    buttonRegistration: {
        textAlign: "center",
        color:'white',
    }
});

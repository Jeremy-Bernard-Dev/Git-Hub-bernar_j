import React from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import imgCart from '../../assets/img/Logos/cadi_bleu.png'

export default function ValidationRefusee({ navigation }) {

    const _displayMenu = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewImgContainer}>
                <Image style={styles.imageCart} source={imgCart}/>
            </View>
            <View style={styles.viewMessage}>
                <Text style={styles.textRefuse}>L'inscrition à échoué..</Text>
                <Text style={styles.textMessage}>Il se peut qu'il n'y ait plus de place disponible...</Text>
                <Button color='#4ea5f3' onPress={_displayMenu} style={styles.buttonReturn} title='Retour'/>
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
        alignItems:'center'
    },
    imageCart: {
        width:150,
        height:150,
        marginRight:17,
        resizeMode: "center",
    },
    textMessage: {
        fontSize: 22,
        textAlign: "center",
        color:'#4ea5f3',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20
    },
    textRefuse: {
        fontSize: 22,
        textAlign: "center",
        color:'#FF615B',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10
    },
    buttonReturn: {
        textAlign: "center",
        color:'white',
    }
});

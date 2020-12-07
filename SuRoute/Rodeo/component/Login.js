import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, AsyncStorage,Image} from 'react-native'
import axios from "axios";
import logo from "../assets/logo_SuRoute.png"
import NavBar from "./NavbarConnection";

export default function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const _storeUser = (user) => {
        AsyncStorage.setItem('token', user.token)
    };
    const _pressHandlerLogin = () => {
        if (email.length === 0 || email.length > 255) {
            setError("Veuillez saisir un email");
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("Veuillez saisir un email valide");
        }
        else if (password.length < 8 || email.length > 255) {
            setError("Veuillez saisir un mot de passe valide");
        }
        else {
            _getApi();
        }
    }
    const _getApi = () => {
        axios.post(
            instance + 'login',
            {
                'email': email,
                'password': password,
            }
        ).then((response) => {
            _storeUser(response.data.success);
            navigation.navigate("Catalogue");
            console.log(response.data);
        }, (error) => {
            setError("Connexion refusée");
        });
    }

    return (
        <View style={styles.viewContainer}>
            <Image style={styles.imageLogo} source={logo}/>
            <Text style={styles.textError}>{error}</Text>
            <View style={styles.viewMiniContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType={'email-address'}
                    onChangeText={(val) => setEmail(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}/>
                <Button color={'#f18030'} title="Connexion" onPress={_pressHandlerLogin}/>
            </View>
            <View style={styles.viewMiniContainer2}>
                <NavBar navigation={navigation}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor:'white',
        alignItems:'center',
        height:'100%',
    },
    imageLogo: {
        width:"60%",
        height:100,
        marginRight:10,
        marginTop: "auto",
    },
    textInput: {
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 2,
        marginBottom: 30,
        fontSize: 15,
        alignSelf: 'auto',
        fontWeight:'bold',
        color: '#f18030',
        width:'100%'
    },
    viewMiniContainer: {
        marginBottom:"auto",
        width:'70%',
    },
    textMiniText: {
        color:'#f18030',
        fontWeight:'bold',
        fontSize:13,
        textDecorationLine:'underline',
        textAlign:'right',
        position:'relative',
        marginTop:5,
        paddingLeft:10,
        paddingRight:10
    },
    textError: {
        color:'#FF8585',
        marginBottom:30,
        marginTop:10,
        textAlign: 'center',
        paddingLeft:10,
        paddingRight:10
    },
    viewMiniContainer2: {
        width:'100%',
    }
});
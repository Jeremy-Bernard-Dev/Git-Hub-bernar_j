import React, {useState} from 'react'
import {View, TextInput, Button, Text, Image, StyleSheet, AsyncStorage} from 'react-native'
import axios from "axios";
import logo from "../../../assets/img/Logos/cadi_bleu.png";

export default function Login_Market({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");

    const storeUser = (user) => {
        console.log(user);
        AsyncStorage.setItem('token', user.token);
        AsyncStorage.setItem('user_id', user.user_id.toString());
        AsyncStorage.setItem('user_name', user.user_name);
        AsyncStorage.setItem('user_firstname', user.user_firstname);
        AsyncStorage.setItem('market_id', user.market_id.toString());
    };
    const pressHandlerRegister = () => {
        navigation.navigate("Register_Market");
    };
    const pressHandlerLogin = () => {
        if (email.length === 0) {
            setError("Veuillez saisir un email");
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("Veuillez saisir un email valide");
        }
        else if (password.length < 8) {
            setError("Veuillez saisir un mot de passe valide");
        }
        else {
            getApi();
        }
    }
    const getApi = () => {
        axios.post(
            instance + 'login/market',
            {
                'email': email,
                'password': password,
            }
        ).then((response) => {
            storeUser(response.data.success);
            navigation.navigate("Market");
            console.log(response.data);
        }, (error) => {
            setError("Connexion refusée");
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={logo}/>
            <Text style={styles.textError}>{error}</Text>
            <View style={styles.minicontainer}>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    keyboardType={'email-address'}
                    onChangeText={(val) => setEmail(val)}/>
                <TextInput
                    style={styles.input}
                    placeholder="mot de passe"
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}/>
                <Button color={'#4fa5f3'} title="Connexion" onPress={pressHandlerLogin}/>
                <View style={styles.flexRow}>
                    <Text style={styles.miniText} onPress={pressHandlerRegister}>Créer un compte commerce</Text>
                    <Text style={{color:'#4fa5f3'}}> | </Text>
                    <Text style={styles.miniText} >Mot de passe oublié</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        alignItems:'center',
        display:'flex',
        flexDirection: 'column',
        height:'100%',
        justifyContent: 'center',
        paddingBottom:40
    },
    img: {
        width:100,
        height:100,
        marginRight:10
    },
    flexRow: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20
    },
    input: {
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 2,
        marginBottom: 30,
        fontSize: 15,
        alignSelf: 'auto',
        fontWeight:'bold',
        color: '#4fa5f3',
        width:'100%'
    },
    minicontainer: {
        width:'70%',
    },
    miniText: {
        color:'#4fa5f3',
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
    }
});

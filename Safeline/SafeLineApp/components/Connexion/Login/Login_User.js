import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, Image, AsyncStorage} from 'react-native'
import axios from "axios";
import logo from '../../../assets/img/Logos/cadi_bleu.png'

export default function Login_User({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const _storeUser = (user) => {
        AsyncStorage.setItem('token', user.token)
        AsyncStorage.setItem('user_id', user.user_id.toString())
        AsyncStorage.setItem('user_name', user.user_name)
        AsyncStorage.setItem('user_firstname', user.user_firstname)
    };
    const _pressHandlerRegister = () => {
        navigation.navigate("Register_User");
    };
    const _pressHandlerLogin = () => {
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
            _getApi();
        }
    }
    const _getApi = () => {
        axios.post(
            instance + 'login/client',
            {
                'email': email,
                'password': password,
            }
        ).then((response) => {
            _storeUser(response.data.success);
            navigation.navigate("Client");
            console.log(response.data);
        }, (error) => {
            setError("Connexion refusée");
            console.log(error);
        });
    }

    return (
        <View style={styles.viewContainer}>
            <Image style={styles.imageLogo} source={logo}/>
            <Text style={styles.textError}>{error}</Text>
            <View style={styles.viewMiniContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="email"
                    keyboardType={'email-address'}
                    onChangeText={(val) => setEmail(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="mot de passe"
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}/>
                <Button color={'#4fa5f3'} title="Connexion" onPress={_pressHandlerLogin}/>
                <View style={styles.viewFlexRow}>
                    <Text style={styles.textMiniText} onPress={_pressHandlerRegister}>Créer un compte client</Text>
                    <Text style={{color:'#4fa5f3'}}> | </Text>
                    <Text style={styles.textMiniText}>Mot de passe oublié</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor:'white',
        alignItems:'center',
        display:'flex',
        flexDirection: 'column',
        height:'100%',
        justifyContent: 'center',
        paddingBottom:40
    },
    imageLogo: {
        width:100,
        height:100,
        marginRight:10
    },
    viewFlexRow: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20
    },
    textInput: {
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 2,
        marginBottom: 30,
        fontSize: 15,
        alignSelf: 'auto',
        fontWeight:'bold',
        color: '#4fa5f3',
        width:'100%'
    },
    viewMiniContainer: {
        width:'70%',
    },
    textMiniText: {
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
    },
});

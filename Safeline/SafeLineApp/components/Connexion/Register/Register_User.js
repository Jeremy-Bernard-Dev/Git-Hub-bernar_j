import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, Image, AsyncStorage, ScrollView} from 'react-native'
import axios from 'axios';
import logo from "../../../assets/img/Logos/cadi_bleu.png";

export default function Register_User({ navigation }) {

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const _storeUser = (user) => {
        AsyncStorage.setItem('token', user.token)
        AsyncStorage.setItem('user_id', user.user_id.toString())
        AsyncStorage.setItem('user_name', user.user_name)
        AsyncStorage.setItem('user_firstname', user.user_firstname)
    };

    const _pressHandler = () => {
        if (name.length === 0) {
            setError("Veuillez saisir un nom.");
        }
        else if (firstname.length === 0) {
            setError("Veuillez saisir un prénom.");
        }
        else if (email.length === 0) {
            setError("Veuillez saisir un email.");
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("Veuillez saisir un email valide.");
        }
        else if (password.length < 8) {
            setError("Veuillez saisir un mot de passe avec minimum 8 caractères.");
        }
        else if (confirmPassword !== password) {
            setError("La confirmation du mot de passe doit être identique à ce dernier.");
        }
        else {
            _emailVerification();
        }
    };

    const _emailVerification = () => {
        axios.post(
            instance + 'emailVerification',
            {
                'email': email
            }
        ).then((response) => {
            if (response.data.success != null) {
                _getApi();
            }
            else {
                setError("Cet email est déjà utilisé");
            }
        }, (error) => {
            setError("Problème de connexion au serveur");
            console.log(error);
        });
    };

    const _getApi = () => {
        axios.post(
            instance + 'register/client',
            {
                'name': name,
                'firstname': firstname,
                'email': email,
                'password': password,
            }
        ).then((response) => {
            _storeUser(response.data.success);
            navigation.navigate("Client");
        }, (error) => {
            setError("Problème de connexion au serveur");
        });
    }

    return (
        <ScrollView style={{width:'100%',height:'100%',backgroundColor:'white'}}>
            <View style={styles.viewContainer}>
                <Image style={styles.imageLogo} source={logo}/>
                <Text style={styles.textError}>{error}</Text>
                <View style={styles.viewMiniContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nom"
                        onChangeText={(val) => setName(val)}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Prénom"
                        onChangeText={(val) => setFirstname(val)}/>
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
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder="Confirmer le mot de passe"
                        onChangeText={(val) => setConfirmPassword(val)}/>
                    <Button color={'#4fa5f3'} title="Inscription" onPress={_pressHandler}/>
                </View>
            </View>
        </ScrollView>
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
        paddingTop:80,
        paddingBottom:80
    },
    imageLogo: {
        width:100,
        height:100,
        marginRight:10
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
    textError: {
        color:'#FF8585',
        marginBottom:30,
        marginTop:10,
        textAlign: 'center',
        paddingLeft:10,
        paddingRight:10
    },
});

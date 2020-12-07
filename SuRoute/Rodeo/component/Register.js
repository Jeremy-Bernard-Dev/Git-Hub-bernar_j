import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, AsyncStorage, ScrollView} from 'react-native'
import axios from 'axios';
import NavBar from "./NavbarConnection";

export default function Register({navigation}) {

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const _storeUser = (user) => {
        AsyncStorage.setItem('token', user.token)
    };

    const _pressHandler = () => {
        if (name.length === 0 || name.length > 255) {
            setError("Veuillez saisir un nom.");
        }
        else if (firstname.length === 0 || firstname.length > 255) {
            setError("Veuillez saisir un prénom.");
        }
        else if (email.length === 0 || email.length > 255) {
            setError("Veuillez saisir un email.");
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("Veuillez saisir un email valide.");
        }
        else if (password.length < 8 || password.length > 255) {
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
        });
    };

    const _getApi = () => {
        axios.post(
            instance + 'register',
            {
                'name': name,
                'firstname': firstname,
                'email': email,
                'password': password,
            }
        ).then((response) => {
            _storeUser(response.data.success);
            navigation.navigate('Catalogue');
        }, (error) => {
            setError("Problème de connexion au serveur");
        });
    }

    return (
        <View>
        <ScrollView style={{width:'100%',height:"100%",backgroundColor:'white'}}>
            <View style={styles.viewContainer}>
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
                    <Button color={'#f18030'} title="Inscription" onPress={_pressHandler}/>
                </View>
            </View>
        </ScrollView>
    <View style={styles.nav}>
        <NavBar navigation={navigation}/>
    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer:{
        alignItems:'center',
        marginTop: "30%",
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
    nav: {
        marginTop:"auto",
    }
});
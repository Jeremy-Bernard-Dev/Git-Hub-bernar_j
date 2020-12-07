import React, {useState} from 'react'
import {View, TextInput, Button, Text, Image, StyleSheet, AsyncStorage, Picker} from 'react-native'
import axios from "axios";
import logo from "../../../assets/img/Logos/cadi_bleu.png";

export default function Register_Market({ navigation }) {

    const [marketname, setMarketname] = useState("");
    const [siret, setSiret] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [code, setCode] = useState("");
    const [town, setTown] = useState("");
    const [selectedValue, setSelectedValue] = useState("Supermarché");
    const [error, setError] = useState("");

    const _storeUser = (user) => {
        AsyncStorage.setItem('token', user.token);
        AsyncStorage.setItem('user_id', user.user_id.toString());
        AsyncStorage.setItem('user_name', user.user_name);
        AsyncStorage.setItem('user_firstname', user.user_firstname);
        AsyncStorage.setItem('market_id', user.market_id.toString());
    };

    const _pressHandler = () => {
        if (marketname.length === 0) {
            setError("Veuillez saisir le nom de votre entreprise");
        }
        else if (siret.length === 0) {
            setError("Veuillez saisir le siret de votre entreprise");
        }
        else if (street.length === 0) {
            setError("Veuillez saisir la rue de votre entreprise");
        }
        else if (code.length === 0) {
            setError("Veuillez saisir le code postal de l'entreprise");
        }
        else if (phoneNumber.length === 0) {
            setError("Veuillez saisir le numéro de téléphone de votre entreprise");
        }
        else if (town.length === 0) {
            setError("Veuillez saisir la ville dans laquelle est située l'entreprise");
        }
        else {
            _getLatAndLong(street + ' ' + town + ' ' + code);
        }
    };

    function _getLatAndLong(adresse){
        axios.get(
            'https://api-adresse.data.gouv.fr/search/?q=' + adresse)
            .then(response => {
                    const longitude = (response.data.features[0].geometry.coordinates[0].toString());
                    const latitude = (response.data.features[0].geometry.coordinates[1].toString());
                    _getApi(longitude,latitude);
                }
            );
    }

    const _getApi = (longitude,latitude) => {
        axios.post(
            instance + 'register/market',
            {
                'name': navigation.state.params.name,
                'firstname': navigation.state.params.firstname,
                'email': navigation.state.params.email,
                'password': navigation.state.params.password,
                'marketname': marketname,
                'siret': siret,
                'phoneNumber': phoneNumber,
                'longitude': longitude,
                'latitude': latitude,
                'street': street,
                'code': code,
                'town': town,
                'type': selectedValue,
            }
        ).then((response) => {
            _storeUser(response.data.success);
            navigation.navigate("Market");
        }, (error) => {
            setError("Problème de connexion au serveur");
        });
    };

    return (
        <View style={styles.viewContainer}>
            <Image style={styles.imageLogo} source={logo}/>
            <Text style={styles.textError}>{error}</Text>
            <View style={styles.viewMiniContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="nom d'entreprise"
                    onChangeText={(val) => setMarketname(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="numéro de siret"
                    keyboardType={'numeric'}
                    onChangeText={(val) => setSiret(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="rue"
                    onChangeText={(val) => setStreet(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="code postal"
                    keyboardType={'numeric'}
                    onChangeText={(val) => setCode(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="numéro de téléphone entreprise"
                    keyboardType={'numeric'}
                    onChangeText={(val) => setPhoneNumber(val)}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="ville"
                    onChangeText={(val) => setTown(val)}/>
                <Picker
                    selectedValue={selectedValue}
                    style={[styles.textInput,{marginLeft:'2.5%',fontWeight: 'bold'}]}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    <Picker.Item label="Supermarché" value="Supermarché" />
                    <Picker.Item label="Boutique" value="Boutique" />
                    <Picker.Item label="Santé" value="Santé" />
                    <Picker.Item label="Coiffeur" value="Coiffeur" />
                    <Picker.Item label="Bricolage" value="Bricolage" />
                    <Picker.Item label="Multimédia" value="Multimédia" />
                    <Picker.Item label="Librairie" value="Librairie" />
                    <Picker.Item label="Divertissement" value="Divertissement" />
                </Picker>
                <Button color={'#4fa5f3'} title="Inscription" onPress={_pressHandler}/>
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
        paddingBottom:60
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

import React from 'react'
import axios from 'axios'
import {View, Text, ScrollView, Button, StyleSheet, TextInput, AsyncStorage} from 'react-native'

export default class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            name: null,
            firstname: null,
            email:null,
            new_name:null,
            new_firstname:null,
            new_email:null,
            old_password:0,
            new_password:0,
            new_password_verif:0,
            message:null,
        };
    }

    componentDidMount() {
        this._getUser();
    };

    _getUser = async() =>{
        try {
            let user = await AsyncStorage.getItem('user_id');
            let token = await AsyncStorage.getItem('token');
            this.setState({user_id:user});
            this._getInfosUser(token);
        }
        catch (error) {
            alert(error);
        }
    };

    _getInfosUser = (token) => {
        axios.post(
            instance + 'user/details',
            null,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then((response) => {
            let result = response.data.user;
            this.setState({email:result.email,name:result.name,firstname:result.firstname})
        }, (error) => {
            console.log(error);
        });
    };


    _putClient = () => {
        if (this.state.new_name == null)
            this.state.new_name=this.state.name;
        if (this.state.new_firstname == null)
            this.state.new_firstname = this.state.firstname;
        if (this.state.new_email == null)
            this.state.new_email = this.state.email;
        if (this.state.new_password.length < 8) {
            this.setState({message: 'Veuillez entrer un mot de passe de plus de 8 caractères.'});
            return
        }
        if (this.state.old_password === 0 && this.state.new_password !== 0) {
            this.setState({message:'Veuillez entrer votre ancien mot de passe.'});
            return;
        } else if (this.state.old_password !== 0 && this.state.new_password === 0) {
            this.setState({message:'Vous entrez votre ancien mot de passe mais pas votre nouveau.'})
            return;
        }
        if (this.state.new_password !== this.state.new_password_verif) {
            this.setState({message:'Mot de passe non identique.'});
            return;
        }
        axios.put(
            instance + 'modifier/client/' + this.state.user_id,
            {
                'name': this.state.new_name,
                'firstname': this.state.new_firstname,
                'email': this.state.new_email,
                'old_password' : this.state.old_password,
                'password' : this.state.new_password
            }
        ).then((response) => {
            this.setState({message:'Vos informations ont été modifiées.'})
        }, (error) => {
            this.setState({message:error.response.data.error});
            console.log(error.response.data.error);
        });
    };


    render() {
        let msg_style = {marginTop:10,marginBottom:10,color:'red',textAlign:'center'};
        if (this.state.message === 'Vos informations ont été modifiées.')
            msg_style = {marginTop:10,marginBottom:10,color:'green',textAlign:'center'};

        return (
            <View style={styles.viewContainer}>
                <Text style={msg_style}>{this.state.message}</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.viewMiniContainer}>
                        <Text style={styles.textTitle}>Informations personnelles</Text>
                        <View style={styles.viewCard}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.name}
                                onChangeText={(val) => this.setState({new_name:val})}/>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.firstname}
                                onChangeText={(val) => this.setState({new_firstname:val})}/>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.state.email}
                                keyboardType={'email-address'}
                                onChangeText={(val) => this.setState({new_email:val})}/>
                        </View>
                        <Text style={styles.textTitle}>Sécurité</Text>
                        <View style={styles.viewCard}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry
                                placeholder='ancien mot de passe'
                                onChangeText={(val) => this.setState({old_password:val})}/>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry
                                placeholder='nouveau mot de passe'
                                onChangeText={(val) => this.setState({new_password:val})}/>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry
                                placeholder='nouveau mot de passe'
                                onChangeText={(val) => this.setState({new_password_verif:val})}/>
                        </View>
                        <Button color={'#4fa5f3'} title="Valider" onPress={this._putClient}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        width:'100%',
        height:'100%',
    },
    textTitle: {
        fontSize:18,
        color:'#4fa5f3',
        fontWeight: 'bold'
    },
    viewCard: {
        width:'100%',
        padding:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        height:'auto',
        marginBottom:20,
        marginTop:20
    },
    viewContainer:{
        alignItems:'center',
        height:'100%',
    },
    textInput: {
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 2,
        marginBottom: 30,
        fontSize: 15,
        alignSelf: 'auto',
        fontWeight:'bold',
        color: '#4fa5f3',
        width:'100%',
    },
    viewMiniContainer: {
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:35,
    },
});

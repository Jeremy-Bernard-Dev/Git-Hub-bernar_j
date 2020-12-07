import React, { useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert} from 'react-native'
import axios from "axios";
import {NavigationEvents} from 'react-navigation'
import * as ImagePicker from 'expo-image-picker';
import imagedefault from '../../assets/img/defaultpic.png'
import icon_calendar from '../../assets/img/icon/calendar-icon2.png'
import FormData from 'form-data'

class PannelEntreprise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:[{}],
            market_id:null,
            image: null,
            market_image:null,
        };
    }

    componentDidMount() {
        this._getMarketID();
    }

    _getMarketID = async() =>{
        try {
            let market = await AsyncStorage.getItem('market_id');
            this.setState({market_id:market});
            this._getHoraires();
            this._getImage();
        }
        catch (error) {
            alert(error);
        }
    };

    _getHoraires = () => {
        axios.get(
            instance + 'creneaux/' + this.state.market_id,
        ).then(response => {
            this.setState({hours:response.data.data});
        }, (error) => {
            console.log(error);
        });
    };

    _openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        this.setState({image:{ localUri: pickerResult.uri }});
        this._postImage();
    };

    _postImage = () => {
        const data = new FormData();
        data.append('file', {
            uri: this.state.image.localUri,
            type: 'image/jpeg',
            name: 'image.jpeg'
        });
        axios.post(
            instance + 'newForm/' + this.state.market_id,data,
            {
                headers:
                    {
                        'Content-Type': 'multipart/form-data'
                    }
            }
        ).then(response => {
            console.log(response.data);
            this._getImage();
        }, (error) => {
            console.log(error.response.data);
        });
    };

    _alert = (item) => {
        Alert.alert(
            "Voulez-vous apporter une modification à ce créaneau ?",
            "",
            [
                { text: "supprimer", onPress: this._deleteHoraires.bind(this, item) },
                { text: "annuler" },
                { text: "modifier", onPress: this._putHoraires.bind(this, item) }
            ],
            { cancelable: true }
        );
    }

    _addHoraires = () => {
        this.props.navigation.navigate("AjouterHoraires");
    };

    _putHoraires = (item) => {
        this.props.navigation.navigate("ModifierHoraires", {item: item});
    };

    _deleteHoraires = (item) => {
        axios.delete(
            instance + 'delCreneaux/' + item.id
        ).then(response => {
            this._getMarketID();
        }, (error) => {
            console.log(error);
        });
    };

    _getImage =() => {
        axios.get(
            instance + 'image/' + this.state.market_id
        ).then(response => {
            console.log(response.data);
            if (response.data === 0) {
                this.setState({
                    market_image: imagedefault
                })
            } else {
                this.setState({
                    market_image: {uri: "http://" + instance.split("/")[2] + '/' + response.data}
                })
            }
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        return(
            <View style={styles.viewContainer}>
                <NavigationEvents
                    onDidFocus={() => this._getHoraires()}
                />
                <View style={styles.viewSousContainer}>
                    <TouchableOpacity
                        style={styles.touchableOpacityImageEntreprise}
                        onPress={this._openImagePickerAsync}>
                        <Image source={this.state.market_image}  style={styles.imageEntreprise}/>
                        <Text style={styles.textImageChange}>Cliquez sur l'image pour changer</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSlot}>Vos créneaux</Text>
                    <ScrollView style={styles.listHoraires}>
                        <TouchableOpacity onPress={this._addHoraires} style={styles.buttonConfirm}>
                            <Text style={styles.textAjouter}>Ajouter</Text>
                        </TouchableOpacity>
                        { this.state.hours.map((item)  => {
                            return (
                                <TouchableOpacity key={item.horaire} style={styles.touchableOpacityHoraires} onPress={this._alert.bind(this, item)}>
                                    <Text style={{color:'white'}}>{item.heure_debut}h{item.minute_debut} : {item.heure_fin}h{item.minute_fin}</Text>
                                    <Text style={styles.textItemSlot}>{item.slots} slot(s) disponible(s)</Text>
                                    <Image source={icon_calendar} style={styles.imageIconCalendar}/>
                                </TouchableOpacity>)
                        })}
                    </ScrollView>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    viewSousContainer: {
        width:'95%',
        height:'auto',
        marginLeft:'2.5%',
        marginTop:'2.5%',
        alignItems:'center',
    },
    touchableOpacityImageEntreprise: {
        width:'100%',
        height:150,
        borderRadius:7
    },
    imageEntreprise: {
        width:'100%',
        height:'100%',
        borderRadius:7
    },
    listHoraires: {
        width:'90%',
        height:'60%',
        position:'relative',
    },
    touchableOpacityHoraires: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        width:'95%',
        height:45,
        borderRadius:6,
        borderWidth:2,
        backgroundColor:'#1A73E8',
        borderColor:'#0151BB',
        marginTop:5,
        marginBottom:5,
        paddingTop:10,
    },
    textItemSlot: {
        marginLeft:20,
        color:'white'
    },
    textSlot: {
        width:'90%',
        marginTop: 40,
        textAlign:'left',
        fontSize:20,
        paddingBottom:10,
        color:'#20B1FF',
    },
    buttonConfirm: {
        backgroundColor:'#4ea5f3',
        marginTop:5,
        marginBottom:10,
        width:200,
        height:40,
        borderRadius:4,
        justifyContent:'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    textImageChange: {
        textAlign:'center',
        textDecorationLine:'underline',
        fontSize:12,
    },
    imageIconCalendar: {
        width:20,
        height:25,
        marginBottom:30,
        marginLeft:15,
        marginRight:10,
    },
    textAjouter: {
        color:'white',
        fontSize:20,
    },
});

export default PannelEntreprise;

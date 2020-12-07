import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

export default class QRliste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            qrcodes: [{}]
        };
    }

    componentDidMount() {
        this._getUserID();
    }

    _getQRCodes() {
        axios.get(
            instance + 'qrcodes/' + this.state.userId,
        ).then(response => {
            let tab = [];
            for (let i=0;i<response.data.data.length;i++) {
                if(response.data.data[i].expired === false) {
                    tab.push(response.data.data[i]);
                }
            }
            this.setState({qrcodes:tab});
        }, (error) => {
            console.log(error);
        });
    };

    _getUserID = async() =>{
        try {
            let user = await AsyncStorage.getItem('user_id');
            this.setState({userId:user});
            this._getQRCodes();
        }
        catch (error) {
            alert(error);
        }
    };

    _getMoreQRcode(qr_code) {
        this.props.navigation.navigate('QRcode',{qrcode:qr_code});
    };


    render() {
        return (
            <View style={{
                width:'100%',
                height:'100%',
            }}>
                <NavigationEvents
                    onDidFocus={() => this._getQRCodes()}
                />
                <ScrollView style={styles.ScrollviewContainer}>
                    { this.state.qrcodes.reverse().map(item => {
                        let isPersonnel = 'Non';
                        if (item.isPersonnel) {
                            isPersonnel = 'Oui'
                        }
                        return (
                            <View key={item.userId} style={{justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity style={styles.touchableOpacityList} onPress={this._getMoreQRcode.bind(this,item)}>
                                    <View style={styles.viewInfos}>
                                        <Text style={[styles.textInfo,{fontSize: 11}]}>expiration : {item.date_expiration}</Text>
                                        <Text style={styles.textInfo}>{item.marketname}</Text>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'white'}}>
                                        <QRCode
                                            style={{borderWidth:10,borderColor:'white'}}
                                            value={item.marketname + "\n\nNom : " + item.nom + "\nPersonnel essentiel : " + isPersonnel + '\nHoraires : ' + item.heure_debut + 'h' + item.minute_debut + ' - ' + item.heure_fin + 'h' + item.minute_fin}
                                            size={65}
                                            color={"#2C8DDB"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ScrollviewContainer: {
        width:'100%',
        height:'100%',
    },
    touchableOpacityList : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        width:'95%',
        height:80,
        backgroundColor:'#4ea5f3',
        borderRadius:7,
        marginTop:10,
        marginBottom:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingTop:6,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewInfos : {
        paddingLeft:10,
        paddingRight:10,
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        width:'78%',
    },
    textInfo : {
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        width:'100%',
        flexWrap: 'wrap'
    }
})
import React from 'react'
import QRCode from "react-native-qrcode-svg";
import {StyleSheet, View, Text, ScrollView,Button,Alert} from 'react-native';
import axios from "axios";

export default class QRcode extends React.Component {

    constructor() {
        super();
        this.state = {
            qrId: (1).toString(),
            name: '',
            market:  '',
            marketId: '',
            timeSlot:  '',
            essentialStaff: '',
            expiry: '',
        }
    }

    componentDidMount() {
        this.setState({
            qrId: this.props.navigation.state.params.qrcode.qr_id,
            name:this.props.navigation.state.params.qrcode.nom,
            market:  this.props.navigation.state.params.qrcode.marketname,
            marketId: this.props.navigation.state.params.qrcode.marquet_id,
            timeSlot:  this.props.navigation.state.params.qrcode.heure_debut + 'h' + this.props.navigation.state.params.qrcode.minute_debut + ' - ' +  this.props.navigation.state.params.qrcode.heure_fin + 'h' + this.props.navigation.state.params.qrcode.minute_fin,
            essentialStaff: this.props.navigation.state.params.qrcode.isPersonnel,
            expiry: this.props.navigation.state.params.qrcode.date_expiration,
        })
    }

    _alertCancel(qrcode, market) {
        Alert.alert(
            "Voulez-vous vraiment annuler cette réservation ?",
            "Toute annulation sera définitive.",
            [
                { text: "Oui", onPress: this._deleteQrcode.bind(this, qrcode, market) },
                { text: "Non", onPress: () => console.log("Canceled") }
            ],
            { cancelable: true }
        );
    }

    _deleteQrcode(qrcode, market) {
        axios.delete(
            instance + 'qrcode/' + qrcode + '/' + market,
        ).then(response => {
            this.props.navigation.goBack();
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        let Logo = require('../../assets/img/Logos/logo.png');
        let isPersonnel;
        if (this.state.essentialStaff) {
            isPersonnel = "Oui";
        } else {
            isPersonnel = "Non";
        }
        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.viewQrcode}>
                    <QRCode
                        style={styles.qrcode}
                        value={ this.state.market + "\n\nNom : " + this.state.name + "\nPersonnel essentiel : " + isPersonnel + '\nHoraires : ' + this.state.timeSlot}
                        size={250}
                        logo={Logo}
                        logosize={50}
                        color={"#2C8DDB"}
                    />
                </View>
                <View style={styles.viewContainer}>
                    <Text style={styles.textMarket}>{this.state.market}</Text>
                    <View style={styles.viewInfo}>
                        <Text style={styles.textInfo}>Nom</Text>
                        <Text style={styles.textResult}>{this.state.name}</Text>
                        <Text style={styles.textInfo}>Personnel Essentiel</Text>
                        <Text style={styles.textResult}>{isPersonnel}</Text>
                        <Text style={styles.textInfo}>Plage Horraires</Text>
                        <Text style={styles.textResult}>{this.state.timeSlot}</Text>
                        <Text style={styles.textInfo}>Expiration</Text>
                        <Text style={styles.textResult}>{this.state.expiry}</Text>
                    </View>
                    <Button style={{marginBottom:20}} color={'orange'} title={'Annuler'}  onPress={this._alertCancel.bind(this,this.state.qrId, this.state.marketId)}/>

                </View>

            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    viewQrcode: {
        marginTop:20,
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%',
    },
    viewContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
    textMarket: {
        textAlign:'center',
        color:'#0479B8',
        fontWeight:'bold',
        fontSize:25,
    },
    viewInfo: {
        width:'80%',
        overflow:'scroll',
        paddingBottom:15
    },
    textInfo: {
        height:30,
        textAlign:'center',
        backgroundColor:'#0479B8',
        color:'white',
        fontSize:18,
        marginTop:20,
        paddingLeft:10,
        paddingRight:10
    },
    textResult: {
        textAlign:'center',
        paddingTop:5
    }
});
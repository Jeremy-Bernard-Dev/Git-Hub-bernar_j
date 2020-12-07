import { createStackNavigator } from 'react-navigation-stack'
import PannelEntreprise from "../components/Entreprise/PannelEntreprise";
import AjouterHoraires from "../components/Entreprise/AjouterHoraires";
import ModifierHoraires from "../components/Entreprise/ModifierHoraires";
import MenuEntreprise from "../components/Menu/MenuEntreprise";
import ScanQrCode from "../components/ScanQrCode";
import ListeAvisClients from '../components/Entreprise/ListeAvisClients'
import {Image, TouchableOpacity} from "react-native";
import React from 'react'
import icon_profil from "../assets/img/icon/profil.png";
import Profil from '../components/Connexion/Profil';

export const StackNavigatorMarket = createStackNavigator({
    MenuEntreprise: {
        screen: MenuEntreprise,
        navigationOptions: ({ navigation }) => ({
            title: "Menu Entreprise",
            headerRight :() =>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profil')}
                    style={{
                        borderWidth:2,
                        borderColor:'#4ea5f3',
                        alignItems:'center',
                        justifyContent:'center',
                        width:30,
                        height:30,
                        backgroundColor:'#4ea5f3',
                        borderRadius:30,
                        marginRight:15
                    }}>
                    <Image style={{resizeMode:'cover',width:25,height:25,borderRadius:30}} source={icon_profil}/>
                </TouchableOpacity>
        })
    },
    PannelEntreprise: {
        screen: PannelEntreprise,
        navigationOptions: {
            title: "Pannel Entreprise"
        }
    },
    ListeAvisClients : {
        screen:ListeAvisClients,
        navigationOptions: {
            title: 'Avis clients'
        }
    },
    AjouterHoraires: {
        screen: AjouterHoraires,
        navigationOptions: {
            title: "Nouveaux horaires"
        }
    },
    ModifierHoraires: {
        screen: ModifierHoraires,
        navigationOptions: {
            title: "Modifier horaires"
        }
    },
    ScanQR: {
        screen:ScanQrCode,
        navigationOptions: {
            title: "Scannez un QR code"
        }
    }
});
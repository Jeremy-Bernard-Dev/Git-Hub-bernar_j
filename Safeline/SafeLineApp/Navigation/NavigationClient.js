import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import {TouchableOpacity,Button,Image} from 'react-native'
import MenuUtilisateur from "../components/Menu/MenuUtilisateur";
import Map from "../components/Client/Map";
import DetailCommerce from "../components/Client/DetailCommerce";
import LaisserAvis from "../components/Client/LaisserAvis";
import ValidationRefusee from "../components/Client/ValidationRefusee";
import ValidationAcceptee from "../components/Client/ValidationAcceptee";
import QRcode from "../components/Client/QRcode";
import QRliste from "../components/Client/QRliste";
import ListeFavorie from "../components/Client/ListeFavorie";
import ListeAvis from "../components/Client/ListeAvis";
import icon_profil from "../assets/img/icon/profil.png";
import Profil from '../components/Connexion/Profil'
import test from '../components/test'

export const StackNavigatorClient = createStackNavigator({
    MenuUtilisateur: {
        screen: MenuUtilisateur,
        navigationOptions: ({ navigation }) => ({
            title: "Menu",
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
    Profil: {
        screen: Profil,
        navigationOptions: {
            title: "Profil"
        }
    },
    Map: {
        screen: Map,
        navigationOptions: {
            title: "Map"
        }
    },
    DetailCommerce: {
        screen: DetailCommerce,
        navigationOptions: {
            title: 'Détails'
        }
    },
    LaisserAvis: {
        screen: LaisserAvis,
        navigationOptions: {
            title: 'Laissez un avis'
        }
    },
    ListeFavorie: {
        screen: ListeFavorie,
        navigationOptions: {
            title: 'Vos favories'
        }
    },
    ValidationRefusee: {
        screen: ValidationRefusee,
        navigationOptions: {
            title: 'Validation refusée'
        }
    },
    ValidationAcceptee: {
        screen: ValidationAcceptee,
        navigationOptions: {
            title: 'Validation accéptée'
        }
    },
    QRListe: {
        screen: QRliste,
        navigationOptions: {
            title: 'Vos QR codes'
        }
    },
    QRcode: {
        screen: QRcode,
        navigationOptions: {
            title: 'QR code'
        }
    },
    ListeAvis: {
        screen: ListeAvis,
        navigationOptions: {
            title: 'Avis'
        }
    },
});

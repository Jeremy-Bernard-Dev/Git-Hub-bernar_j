import { createStackNavigator } from 'react-navigation-stack'

import MenuConnexion from '../components/Menu/MenuConnexion'
import Login_User from '../components/Connexion/Login/Login_User'
import Login_Essential from '../components/Connexion/Login/Login_Essential'
import Login_Market from '../components/Connexion/Login/Login_Market'
import Register_User from '../components/Connexion/Register/Register_User'
import Register_Essential from '../components/Connexion/Register/Register_Essential'
import Register_Market from '../components/Connexion/Register/Register_Market'
import Register_Market2 from '../components/Connexion/Register/Register_Market2'
import ValidationRefusee from '../components/Client/QRliste'


export const StackNavigatorConnexion = createStackNavigator({
    MenuConnexion: {
        screen: MenuConnexion,
        navigationOptions: {
            title: "SafeLine"
        }
    },
    Validation: {
        screen:ValidationRefusee,
        navigationOptions: {
            title: "ok"
        }
    },
    Login_User: {
        screen: Login_User,
        navigationOptions: {
            title: "Login - Client"
        }
    },
    Login_Essential: {
        screen: Login_Essential,
        navigationOptions: {
            title: "Login - Personnel essentiel"
        }
    },
    Login_Market: {
        screen: Login_Market,
        navigationOptions: {
            title: "Login - Commerçant"
        }
    },
    Register_User: {
        screen: Register_User,
        navigationOptions: {
            title: "Inscription - Client",
        }
    },
    Register_Essential: {
        screen: Register_Essential,
        navigationOptions: {
            title: "Inscription - Personnel essentiel"
        }
    },
    Register_Market: {
        screen: Register_Market,
        navigationOptions: {
            title: "Inscription - Commerçant"
        }
    },
    Register_Market2: {
        screen: Register_Market2,
        navigationOptions: {
            title: "Inscription - Entreprise"
        }
    }
});

//export default createAppContainer(StackNavigatorConnexion)
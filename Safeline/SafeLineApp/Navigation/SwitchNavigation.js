import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";

import AuthLoadingScreen from "../components/Connexion/AuthLoadingScreen";
import { StackNavigatorConnexion } from "./NavigationConnexion"
import { StackNavigatorClient } from "./NavigationClient"
import { StackNavigatorMarket } from "./NavigationMarket"

const Connexion = createStackNavigator({ StackNavigatorConnexion }, {headerMode: null});
const Client = createStackNavigator({ StackNavigatorClient }, {headerMode: null});
const Market = createStackNavigator({ StackNavigatorMarket }, {headerMode: null});

const SwitchNavigator = createSwitchNavigator({
    Start: AuthLoadingScreen,
    Connexion: Connexion,
    Client: Client,
    Market: Market
},
{
    initialRouteName: 'Start',

})
export default createAppContainer(SwitchNavigator)
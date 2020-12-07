import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";

import AuthLoadingScreen from "./AuthLoadingScreen";
import { StackNavigatorConnection } from "./NavigationConnection"
import { StackNavigatorMarket } from "./NavigationMarket"

const Connection = createStackNavigator({ StackNavigatorConnection }, {headerMode: null});
const Market = createStackNavigator({ StackNavigatorMarket }, {headerMode: null});

const SwitchNavigator = createSwitchNavigator({
    Start: AuthLoadingScreen,
    Connection: Connection,
    Market: Market
},
{
    initialRouteName: 'Start',
})
export default createAppContainer(SwitchNavigator)
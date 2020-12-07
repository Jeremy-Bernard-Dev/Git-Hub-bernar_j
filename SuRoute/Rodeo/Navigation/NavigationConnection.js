import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import Login from "../component/Login";
import Register from "../component/Register";

export const StackNavigatorConnection = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login"
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: "Register"
        }
    },
});

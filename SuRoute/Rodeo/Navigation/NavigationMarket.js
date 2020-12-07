import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import Catalogue from "../component/Catalogue";
import NavBarre from "../component/NavbarMarket";
import ProductsList from "../component/ProductsList";
import ProductPage from "../component/ProductPage";
import Basket from "../component/Basket";
import Map from "../component/Map";

export const StackNavigatorMarket = createStackNavigator({
    Catalogue: {
        screen: Catalogue,
        navigationOptions: {
            headerShown: null,
        },
    },
    ProductsList: {
        screen: ProductsList,
        navigationOptions: {
            headerShown: null,
        },
    },
    ProductPage: {
        screen: ProductPage,
        navigationOptions: {
            headerShown: null,
        },
    },
    Basket: {
        screen: Basket,
        navigationOptions: {
            headerShown: null,

        },
    },
    Map: {
        screen: Map,
        navigationOptions: {
            headerShown: null,
        },
    },

    NavBar: {
        screen: NavBarre,
        navigationOptions: {
            headerShown: null,
        },
    },
});

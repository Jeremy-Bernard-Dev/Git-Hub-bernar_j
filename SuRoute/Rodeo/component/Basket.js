import axios from 'axios';
import {View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity,Image, FlatList, AsyncStorage} from 'react-native'
import React from "react";
import tire_icon from '../assets/tire.png'
import oils_icon from '../assets/oils.png'
import breaks_icon from '../assets/breaks.png'
import plus_icon from '../assets/plus.png'
import minus_icon from '../assets/minus.png'
import panier_icon from "../assets/panier.png";
import Constants from 'expo-constants';
import NavBar from "./NavbarMarket";


export default class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: [{}],
            user_id: null,
            total: 0,
        };
    }

    componentDidMount() {
        this._getBasket();
    }

    _pressHandlerMap = () => {
        this.props.navigation.navigate("Map");
    };

    _putProductQuantity = async (quantity, product_id) => {
        await axios.post(
            instance + 'putBasket/' + this.state.user_id + '/' + product_id,
            {
                'quantity': quantity,
            }
        ).then(response => {
            this._getBasket();
        }, (error) => {
            console.log(error);
        });
    }

    _getBasket = async () => {
        const token = await AsyncStorage.getItem('token');
        this._getAuth(token);
    }

    _getAuth = (token) => {
        axios.post(
            instance + 'details',
            null,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + token
                    }
            }).then((response) => {
                this._createBasket(response.data.user.id);
                this.setState({user_id: response.data.user.id});
        }, (error) => {
            console.log(error);
        });
    }

    _createBasket = async (user_id) => {
        await axios.get(
            instance + 'Basket/' + user_id,
        ).then(response => {
            this.setState({basket:response.data.basket});
            this.setState({total: response.data.total});
        }, (error) => {
            console.log(error);
        });
    }

    _getProduct = async (product_id) => {
        var result = null;
        await axios.get(
            instance + 'Product/' + product_id,
        ).then(response => {
            result = response.data;
        }, (error) => {
            console.log(error);
        });
        console.log(result);
    }

    render() {
        return(
            <View style={{width: '100%', height: '100%',}}>
                <FlatList
                    style={styles.flatListContainer}
                    data={this.state.basket}
                    renderItem={({ item }) => {
                        var price = item.price * item.quantity;
                        var product_icon;
                        if (item.type == "Pneus") {
                            product_icon = tire_icon;
                        }
                        else if (item.type == "Huiles et fluides") {
                            product_icon = oils_icon;
                        }
                        else {
                            product_icon = breaks_icon;
                        }
                        return (
                            <View style={{flexDirection:"row", paddingTop: 17, backgroundColor: '#FFF9F9', height: 160}}>
                                <View style={{flex:0.5}}>
                                    <Image style={styles.images_product} source={product_icon}/>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.textTitreMarket}>{item.name}</Text>
                                    <Text style={styles.textTitreMarket}>{item.info}</Text>

                                </View>
                                <View style={{flex:0.5}}>
                                    <Text style={styles.priceMarket}>{price + "€"}</Text>
                                    <View style={styles.rightContainer}>
                                        <TouchableOpacity onPress={() => this._putProductQuantity(-1, item.product_id)}>
                                            <Image style={styles.images_icone_minus} source={minus_icon}/>
                                        </TouchableOpacity>
                                        <Text style={styles.numberChoiceMarket}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => this._putProductQuantity(1, item.product_id)}>
                                            <Image style={styles.images_icone_plus} source={plus_icon}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity style={styles.boutton} onPress={() => this._pressHandlerMap()}>
                    <Text style={styles.TextBouton}>{"Paiement " + this.state.total +"€"}</Text>
                </TouchableOpacity>
                <NavBar navigation={this.props.navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    images_product:{
        width:100,
        height:100,
        resizeMode:'contain',
        marginLeft: 20,
    },
    images_icone_minus:{
        width:30,
        height:30,
    },
    images_icone_plus:{
        width:30,
        height:30,
    },
    textTitreMarket : {
        fontWeight: 'bold',
        fontSize:20,
        color: "black",
        textAlign: 'left',
        marginLeft: 20,
    },
    numberChoiceMarket : {
        fontWeight: 'bold',
        fontSize:35,
        color: "black",
        marginTop:-10,
        marginLeft: 15,
        marginRight:15,


    },
    priceMarket : {
        fontWeight: 'bold',
        fontSize:35,
        color: "black",
        textAlign: 'right',
        marginRight: 15,
        marginTop:-10,

    },
    stockMarket : {
        fontWeight: 'bold',
        fontSize:20,
        color: "green",
        marginTop: 10,
        textAlign: 'left',
        marginLeft: 20,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
      },
    scrollView: {
        marginTop:"10%",
    },
    flatListContainer: {
        width:'100%',
        height:'auto',
    },
    boutton: {
        flexDirection: 'row',
        marginTop:"1%",
        marginBottom:"1%",
        width:"80%",
        height:"5%",
        backgroundColor: "#f18030",
        marginLeft:"10%",
    },
    TextBouton:{
        fontSize: 25,
        textAlign: 'right',
        marginTop:"auto",
        marginBottom:"auto",
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
    },
})

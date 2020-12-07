import React from 'react'
import {View, Text, StyleSheet, Image ,TouchableOpacity, AsyncStorage} from 'react-native'
import tire_icon from '../assets/tire.png'
import oils_icon from '../assets/oils.png'
import breaks_icon from '../assets/breaks.png'
import plus_icon from '../assets/plus.png'
import minus_icon from '../assets/minus.png'
import panier_icon from '../assets/panier.png'
import NavBar from "./NavbarMarket";
import axios from "axios";

export default class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.navigation.state.params.item,
            product_icon: null,
            quantity: 0,
        };
    }

    componentDidMount() {
        if (this.state.product.type == "Pneus") {
            this.setState({product_icon: tire_icon});
        }
        else if (this.state.product.type == "Huiles et fluides") {
            this.setState({product_icon: oils_icon});
        }
        else {
            this.setState({product_icon: breaks_icon});
        }
    }

    _increaseQuantity = () => {
        if (this.state.quantity < this.state.product.quantity)
        this.setState({quantity: this.state.quantity+1});
    }

    _decreaseQuantity = () => {
        if (this.state.quantity > 0) {
            this.setState({quantity: this.state.quantity-1});
        }
    }

    _pressHandlerBasket = async () => {
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
                this._addProductToBasket(response.data.user.id);
        }, (error) => {
            console.log(error);
        });
    }

    _addProductToBasket = async (user_id) => {
        await axios.post(
            instance + 'addBasket/' + user_id + '/' + this.state.product.id,
            {
                'quantity': this.state.quantity,
            }
        ).then(response => {
            this.props.navigation.navigate('Basket');
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%', backgroundColor: '#F1F3F5'}}>
                <View style={styles.viewProduct}>
                    <Image source={this.state.product_icon} style={styles.imagePneu}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.textNameProduct}>{this.state.product.name}</Text>
                        <Text style={styles.textNameProduct1}>{this.state.product.info}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textPrice}>{this.state.product.price}€</Text>
                            <Text style={styles.textDetailPrice}>/ Prix par pièce</Text>
                        </View>
                        <Text style={styles.textNameProduct1}>20% TVA comprise</Text>
                    </View>
                </View>
                <View style={styles.viewProduct2}>
                    <Text style={this.state.product.quantity == 0 ? styles.textRuptureProduct : styles.textStockProduct}>{this.state.product.quantity == 0 ? "Rupture" : "En stock"}</Text>
                    <Text style={styles.textDetailProduct}>Détail:</Text>
                    <Text style={styles.textDetailProduct}>{this.state.product.description}</Text>
                </View>
                <View style={{backgroundColor:"white",height:80,flexDirection: 'row', marginTop: 'auto'}}>
                    <TouchableOpacity style={styles.images_icone} onPress={()=> this._decreaseQuantity()}>
                        <Image style={styles.images_icone} source={minus_icon}/>
                    </TouchableOpacity>
                    <Text style={styles.lebouton}>{this.state.quantity}</Text>
                    <TouchableOpacity style={styles.images_icone} onPress={()=> this._increaseQuantity()}>
                        <Image style={styles.images_icone} source={plus_icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boutton} onPress={()=> this._pressHandlerBasket()}>
                        <Image style={styles.panier} source={panier_icon}/>
                        <Text style={{fontSize: 30,textAlign: 'right',marginTop:"auto", marginBottom: 'auto', marginLeft: "auto", marginRight: 'auto',color: "white"}}>Acheter</Text>
                    </TouchableOpacity>
                </View>
                <NavBar navigation={this.props.navigation}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    viewProduct: {
        flex: 0.3,
        flexDirection: 'row',
        width:'100%',
        backgroundColor: 'white',
        marginTop: 50
    },
    viewProduct2: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 2
    },
    viewDescription: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F1F3F5',
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%",
    },
    textNameProduct: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 20
    },
    textNameProduct1: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 17
    },
    textStockProduct: {
        color: '#6ca332',
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 18
    },
    textRuptureProduct: {
        color: 'red',
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 18
    },
    textDetailProduct: {
        color: 'black',
        paddingTop: 5,
        paddingLeft: 10,
        lineHeight: 27,
        fontSize: 18
    },
    imagePneu: {
        width:96,
        height:96,
        borderRadius:7
    },
    textPrice: {
        paddingLeft: 10,
        fontSize: 30
    },
    textDetailPrice: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 15
    },
    desc: {
        flexDirection: 'row',
        height: '10%',
        backgroundColor: "#C4C4C4",
    },
    desc2: {
        flexDirection: 'row',
        height: '10%',
        backgroundColor: "white",
    },
    tex1: {
        fontSize: 20,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft:"3%"
    },
    tex2: {
        marginRight:"3%",
        textAlign: 'right',
        flex:2,
        fontSize: 20,
        marginTop: "auto",
        marginBottom: "auto",
    },
    lebouton: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft:"8%",
        fontSize: 50,
        width:"10%",
    },
    boutton: {
        flexDirection: 'row',
        marginTop:"auto",
        marginBottom:"auto",
        marginRight:20,
        marginLeft: 20,
        width:"40%",
        height:50,
        backgroundColor: "#f18030",
        textAlign: 'right',
        flex: 1,
    },
    images_icone: {
        marginLeft:"4%",
        marginTop: 'auto',
        marginBottom: 'auto',
        width:30,
        height:30,
    },
    panier: {
        marginTop:"3%",
        marginLeft: "auto",
        marginRight: 'auto',
        width:40,
        height:40,
    }
});

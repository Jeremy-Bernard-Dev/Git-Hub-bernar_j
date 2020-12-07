import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity,ScrollView, TextInput, AsyncStorage, Button, FlatListn, Image, FlatList} from 'react-native'
import tire_icon from '../assets/tire.png'
import oils_icon from '../assets/oils.png'
import breaks_icon from '../assets/breaks.png'
import search_icon from "../assets/search_icon.png";
import NavBar from "./NavbarMarket";
import axios from "axios";


export default class ProductsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.state.params.type,
            market: [{}],
            product_icon: null,
        };
    }

    componentDidMount() {
        if (this.state.type == "Pneus") {
            this.setState({product_icon: tire_icon});
        }
        else if (this.state.type == "Huiles et fluides") {
            this.setState({product_icon: oils_icon});
        }
        else {
            this.setState({product_icon: breaks_icon});
        }
        this._getProducts();
    }

    _pressHandlerProductPage = (item) => {
        this.props.navigation.navigate("ProductPage", {item: item});
    };

    _getProducts = async() => {
        await axios.get(
            instance + 'Products/' + this.state.type,
        ).then(response => {
            this.setState({market:response.data});
            this.setState({dataSource:response.data});
        }, (error) => {
            console.log(error);
        });
    }

    SearchFilterFunction(text) {
        const newData = this.state.market.filter(function(item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
        });
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%',}}>
                <View style={styles.viewTopContainer}>
                    <TextInput
                        style={styles.textInputSearchBar}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Rechercher"
                    />
                    <View style={styles.viewIconLoop}>
                        <Image style={{width:40, height:40, resizeMode:'contain', marginLeft: 'auto', marginRight: 'auto'}} source={search_icon}/>
                    </View>
                </View>

                <FlatList
                    style={styles.flatListContainer}
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=> this._pressHandlerProductPage(item)}>
                            <View>
                                <View style={{flexDirection:"row", paddingTop: 17, backgroundColor: '#FFF9F9', height: 160}}>
                                    <View style={{flex:0.5}}>
                                        <Image style={styles.images_product} source={this.state.product_icon}/>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={styles.textTitreMarket}>{item.name}</Text>
                                        <Text style={styles.textTitreMarket}>{item.info}</Text>
                                        <Text style={item.quantity == 0 ? styles.ruptureMarket : styles.stockMarket}>{item.quantity == 0 ? "RUPTURE" : "EN STOCK"}</Text>
                                    </View>
                                    <View style={{flex:0.5}}>
                                        <Text style={styles.priceMarket}>{item.price + "€"}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />
                <NavBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewListeContainer: {
        width:'100%',
        height:'100%',
    },
    viewTopContainer: {
        width:'100%',
        height:120,
        backgroundColor:'#494949',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    viewInformationsMarket: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    viewIconLoop: {
        width:45,
        height:45,
        backgroundColor:'#f18030',
        justifyContent: 'center',
        alignItems:'center',

    },
    viewItemFavori: {
        display:'flex',
        flexDirection:'row',
    },
    textInputSearchBar: {
        fontWeight:'bold',
        width: '75%',
        height: 45,
        color:'#f18030',
        backgroundColor: 'white',
        borderBottomLeftRadius:9,
        borderTopLeftRadius:9,
        paddingLeft:17,
        paddingRight:17,
        shadowColor: "#FFE6E1",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    touchableOpacityItemFavori: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        width:'100%',
        height:'auto',
        backgroundColor:'white',
        paddingLeft:8,
        paddingTop:10,
        paddingBottom:12,
        borderBottomWidth:2,
        borderBottomColor:'#61cfff'
    },
    flatListContainer: {
        width:'100%',
        height:'auto',
    },
    textVilleMarket : {
        fontSize:16,
        marginBottom:20
    },
    textTypeMarket: {
        fontStyle: 'italic',
        color:'#9c9c9c'
    },
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
    ruptureMarket : {
        fontWeight: 'bold',
        fontSize:20,
        color: "red",
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
});

import React from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity,ScrollView, TextInput, AsyncStorage, Button, FlatList} from 'react-native'
import axios from "axios";
import tire_icon from '../assets/tire.png'
import oils_icon from '../assets/oils.png'
import breaks_icon from '../assets/breaks.png'
import search_icon from "../assets/search_icon.png";
import NavBar from "./NavbarMarket"


export default class Catalogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type1: "Pneus",
            type2: "Huiles et fluides",
            type3: "Freinage",
        };
    }

    componentDidMount() {
    }

    _pressHandlerProductsList = (type) => {
        this.props.navigation.navigate("ProductsList", {type: type});
    };

    render() {
        return (
            <View style={{width: '100%', height: '100%',}}>
                <ScrollView>
                    <TouchableOpacity onPress={()=> this._pressHandlerProductsList(this.state.type1)}>
                        <View>
                            <View style={{flexDirection:"row", paddingTop: 17, backgroundColor: '#FFF9F9', height: 160}}>
                                <View style={{flex:0.5}}>
                                    <Image style={styles.images_product} source={tire_icon}/>
                                </View>
                                <View style={{flex:1, marginTop: '8%'}}>
                                    <Text style={styles.textTitreMarket}>{this.state.type1}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this._pressHandlerProductsList(this.state.type2)}>
                        <View>
                            <View style={{flexDirection:"row", paddingTop: 17, backgroundColor: '#FFF9F9', height: 160}}>
                                <View style={{flex:0.5}}>
                                    <Image style={styles.images_product} source={oils_icon}/>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.textTitreMarket}>{this.state.type2}</Text>

                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this._pressHandlerProductsList(this.state.type3)}>
                        <View>
                            <View style={{flexDirection:"row", paddingTop: 17, backgroundColor: '#FFF9F9', height: 160}}>
                                <View style={{flex:0.5}}>
                                    <Image style={styles.images_product} source={breaks_icon}/>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.textTitreMarket}>{this.state.type3}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <NavBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewListeContainer: {
        width:'100%',
        height:'10%',
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
        shadowColor: "#FFE6E1",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        fontSize: 25,
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
        marginLeft: "20%",
        color: "white",
    },
});

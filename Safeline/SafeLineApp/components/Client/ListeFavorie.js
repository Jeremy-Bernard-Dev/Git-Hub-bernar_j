import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, AsyncStorage, Button, FlatList} from 'react-native'
import axios from "axios";
import {NavigationEvents} from 'react-navigation'
import icon_loop from '../../assets/img/icon/icon_loop.png'
import icon_croix from '../../assets/img/icon/icon_croix.png'

export default class ListeFavorie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            market: [{}],
        };
    }

    componentDidMount() {
        this._getUserID();
    }

    SearchFilterFunction(text) {
        const newData = this.state.market.filter(function(item) {
            const itemData = item.marketname ? item.marketname.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
        });
    }

    _getUserID = async() =>{
        try {
            let user = await AsyncStorage.getItem('user_id');
            this.setState({user_id:user});
            this._getFavori();
        }
        catch (error) {
            console.log(error);
        }
    };

    _getFavori = () => {
        axios.get(
            instance + 'Favoris/' + this.state.user_id,
        ).then(response => {
            this.setState({market:response.data.data});
            this.setState({dataSource:response.data.data});
        }, (error) => {
            console.log(error);
        });
    }

    _deleteFavori(item) {
        axios.delete(
            instance + 'delFavori/' + this.state.user_id + '/' + item.id,
        ).then(response => {
            this._getFavori();
        }, (error) => {
            console.log(error.response.data);
        });
    }

    _pressHandler = (item) => {
        this.props.navigation.push("DetailCommerce", {item: item});
    };

    render() {
        return (
            <View style={{width: '100%', height: '100%',}}>
                <NavigationEvents onDidFocus={() => this._getFavori()}/>
                <View style={styles.viewTopContainer}>
                    <TextInput
                        style={styles.textInputSearchBar}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Chercher sur Safeline..."
                    />
                    <View style={styles.viewIconLoop}>
                        <Image style={{width:25,height:25,sizeMode:'contain'}} source={icon_loop}/>
                    </View>
                </View>
                    <View style={styles.viewListeContainer}>
                        <FlatList
                            style={styles.flatListContainer}
                            data={this.state.dataSource}
                            renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.touchableOpacityItemFavori} onPress={this._pressHandler.bind(this, item)}>
                                        <View style={styles.viewInformationsMarket}>
                                            <View style={{display:'flex',flexDirection:'column',backgroundColor:'white',width:'75%',flexWrap:'wrap',marginLeft:20}}>
                                                <Text style={styles.textTitreMarket}>{item.marketname}</Text>
                                                <Text style={styles.textVilleMarket}>{item.town}</Text>
                                                <Text style={styles.textTypeMarket}>{item.type}</Text>
                                            </View>
                                            <TouchableOpacity onPress={this._deleteFavori.bind(this, item)}>
                                                <Image style={{width:60,height:60}} source={icon_croix}/>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                            )}
                            enableEmptySections={true}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
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
        backgroundColor:'#edf8fb',
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
        backgroundColor:'#a5efff',
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
        color:'#59c0f8',
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
    textTitreMarket : {
        fontWeight: 'bold',
        fontSize:20
    },
    textVilleMarket : {
        fontSize:16,
        marginBottom:20
    },
    textTypeMarket: {
        fontStyle: 'italic',
        color:'#9c9c9c'
    }
});

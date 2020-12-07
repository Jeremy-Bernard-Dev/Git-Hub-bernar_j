import React from 'react'
import axios from 'axios'
import { NavigationEvents } from 'react-navigation'
import {View, Text, ScrollView, Button, StyleSheet, AsyncStorage} from 'react-native'
import StarRating from "react-native-star-rating";

class ListeAvis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            liste: [{}],
            market_id:null,
        };
    }

    componentDidMount() {
        this._getMarketID();
    }

    _getMarketID = async() =>{
        try {
            let market = await AsyncStorage.getItem('market_id');
            this.setState({market_id:market});
            this.getAvis();
        }
        catch (error) {
            alert(error);
        }
    };


    getAvis = () => {
        axios.get(
            instance + 'Avis/' + this.state.market_id
        ).then((response) => {
            this.setState({liste: response.data});
        }, (error) => {
            console.log("Problème de connexion au serveur");
        });
    };

    render() {
        return (
            <View>
                <NavigationEvents
                    onDidFocus={() => this.getAvis()}
                />
                <ScrollView style={styles.scrollview}>
                    {this.state.liste.reverse().map(object => {
                        return (
                            <View style={styles.divAvis}>
                                <View>
                                    <Text style={{fontSize:18,fontWeight:'bold'}}>{object.users_firstname + " " + object.users_name}</Text>
                                    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                                        <Text style={{width:200,marginTop:20}}>Pas trop de personnes :</Text>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={object.customer}
                                            fullStarColor={'#ffda00'}
                                            starSize={15}
                                        />
                                    </View>

                                    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                                        <Text style={{width:200}}>Respect sécurité:</Text>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={object.security}
                                            fullStarColor={'#ffda00'}
                                            starSize={15}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.commentaire}>{object.comment}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    scrollview : {
        width:'100%',
        height:'95%',
    },
    divAvis: {
        width:'95%',
        marginLeft:'2.5%',
        marginTop:10,
        marginBottom:10,
        backgroundColor:'#F7F7F7',
        borderRadius:6,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    commentaire : {
        marginTop:15,
        borderTopColor: '#C5C5C5',
        borderTopWidth: 2,
        paddingTop: 10,
    }
});
export default ListeAvis;
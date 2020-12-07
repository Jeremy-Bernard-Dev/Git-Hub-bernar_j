import React from 'react'
import axios from 'axios'
import { NavigationEvents } from 'react-navigation'
import { View, Text, ScrollView, Button, StyleSheet} from 'react-native'
import StarRating from "react-native-star-rating";

export default class ListeAvis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
            listAvis: [{}],
        };
    }

    componentDidMount() {
        this._getAvis();
    }

    _pressHandler = () => {
        this.props.navigation.navigate("LaisserAvis", {item: this.state.item});
    };

    _getAvis = () => {
        axios.get(
            instance + 'Avis/' + this.state.item.id
        ).then((response) => {
            this.setState({listAvis: response.data});
        }, (error) => {
            console.log("Problème de connexion au serveur");
        });
    };

    render() {
        return (
            <View>
                <NavigationEvents
                    onDidFocus={() => this._getAvis()}
                />
                <Button title="ajouter un avis" onPress={this._pressHandler}/>
                <ScrollView style={styles.scrollviewContainer}>
                    {this.state.listAvis.reverse().map(object => {
                        return (
                            <View style={styles.viewAvis}>
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
                                        <Text style={styles.textComment}>{object.comment}</Text>
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
    scrollviewContainer : {
        width:'100%',
        height:'95%',
    },
    viewAvis: {
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
    textComment : {
        marginTop:15,
        borderTopColor: '#C5C5C5',
        borderTopWidth: 2,
        paddingTop: 10,
    }
});
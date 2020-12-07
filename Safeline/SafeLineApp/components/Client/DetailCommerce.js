import React from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Alert , TouchableOpacity, AsyncStorage, Linking} from 'react-native';
import {NavigationEvents} from 'react-navigation'
import StarRating from 'react-native-star-rating';
import icon_calendar from '../../assets/img/icon/calendar-icon.png'
import icon_itineraire from '../../assets/img/icon/icon_itineraire.png'
import icon_favorie from '../../assets/img/icon/icon_fav.png'
import icon_star from '../../assets/img/icon/icon_star.png'
import axios from "axios";
import * as Location from "expo-location";
import imagedefault from "../../assets/img/defaultpic.png";

class DetailCommerce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            market: this.props.navigation.state.params.item,
            creneaux:[{}],
            user_id: null,
            moyenne: 0,
            nb_avis:0,
            market_image:null,
        };
    }

    componentDidMount() {
        this._getCreneaux();
        this._getUserID();
        this._getAvisInfos();
        this._getImage();
    }

     _getUserID = async() =>{
         try {
            let user = await AsyncStorage.getItem('user_id');
            this.setState({user_id:user});
        }
        catch (error) {
            alert(error);
        }
    };

    _getAvisInfos = () =>{
        axios.get(
            instance + 'moyenne/' + this.state.market.id,
        ).then(response => {
            this.setState({moyenne:response.data.moyenne,nb_avis:response.data.total_comment});
        }, (error) => {
            console.log(error.response.data);
        });
    };

     _pressHandler = () => {
        this.props.navigation.navigate("ListeAvis", {item: this.state.market});
    };

     _getCreneaux = () => {
         axios.get(
            instance + 'creneaux/' + this.state.market.id,
        ).then(response => {
            this.setState({creneaux:response.data.data});
        }, (error) => {
            console.log(error.response.data);
        });
    };

     _alert(creneaux_id) {
         Alert.alert(
             "Valider cette réservation ?",
             "", // empty string
             [
                 { text: "Oui", onPress: () => this._TakeHoraire(creneaux_id) },
                 { text: "Non", onPress: () => console.log("Canceled") }
             ],
             { cancelable: true }
         );
     }

    _refresh() {
        this._getCreneaux();
        this._getAvisInfos();
        this. _getImage();
    }

    _getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        /*const object= {
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
        };*/
        // Pour avoir des exemples modifier ici :
       const object= {
             latitude:48.996203,
             longitude:1.643899,
         };
        this._getGouv(object.latitude, object.longitude);
    };

    _getGouv = (user_lat, user_lon) => {
        axios.get(
            "https://api-adresse.data.gouv.fr/reverse/?lon=" + user_lon + '&lat=' + user_lat,
        ).then(response => {
            Linking.openURL('https://www.google.fr/maps/dir/' + response.data.features[0].properties.housenumber + '+' + response.data.features[0].properties.street + ',+' + response.data.features[0].properties.citycode + '+' + response.data.features[0].properties.city + '/' + this.state.market.latitude + ',' + this.state.market.longitude + '/');
        }, (error) => {
            console.log(error.response.data);
        });
    };

     _TakeHoraire(creneaux_id) {
        axios.post(
            instance + 'takeCreneaux/',
            {
                user_id: this.state.user_id,
                market_id: this.state.market.id,
                creneaux_id: creneaux_id,
            }
        ).then(response => {
            this.props.navigation.navigate('ValidationAcceptee');
            this.setState({user_id:this.state.user_id});
        }, (error) => {
            this.props.navigation.navigate('ValidationRefusee');
        });
    };

    _addFavori(user_id) {
        axios.post(
            instance + 'addFavori',
            {
                user_id: user_id,
                market_id: this.state.market.id,
            }
        ).then(response => {
            if (response.data.message === "favori was created") {
                alert('Ce magasin a bien été ajouter à vos favoris');
            } else {
                alert('Ce magasin est déjà dans vos favoris');
            }
        }, (error) => {
            console.log(error.response.data);
        });
    }

    _getImage =() => {
        axios.get(
            instance + 'image/' + this.state.market.id
        ).then(response => {
            console.log(response.data);
            if (response.data === 0) {
                this.setState({
                    market_image: imagedefault
                })
            } else {
                this.setState({
                    market_image: {uri: "http://" + instance.split("/")[2] + '/' + response.data}
                })
            }
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <NavigationEvents
                    onDidFocus={() => this._refresh()}
                />
                <ScrollView style={styles.scrollviewPageContainer} persistentScrollbar={true}>
                    <Image source={this.state.market_image} style={styles.imageMarket}/>
                    <Text style={styles.textMarket}>{this.state.market.marketname}</Text>
                    <View style={styles.viewAvisContainer}>
                        <Text style={styles.textMoyenne}>{this.state.moyenne}</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.state.moyenne}
                            selectedStar={(rating) => setStar(rating)}
                            fullStarColor={'#ffda00'}
                            starSize={15}
                        />
                        <Text style={styles.textNombreAvis}>({this.state.nb_avis})</Text>
                    </View>
                    <Text>{this.state.market.type}</Text>
                    <View style={styles.viewMiniButtonsContainer}>
                        <View style={styles.viewMiniButtons}>
                            <TouchableOpacity
                                onPress={this._getLocation}
                                style={{
                                    borderWidth:2,
                                    borderColor:'#1A73E8',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:45,
                                    height:45,
                                    backgroundColor:'#1A73E8',
                                    borderRadius:45,
                                    marginLeft:3
                                }}>
                                <Image style={{resizeMode:'cover',width:40,height:40,borderRadius:45}} source={icon_itineraire}/>
                            </TouchableOpacity>
                            <Text>Itinéraire</Text>
                        </View>

                        <View style={styles.viewMiniButtons}>
                            <TouchableOpacity
                                onPress={this._addFavori.bind(this, this.state.user_id)}
                                style={{
                                    borderWidth:4,
                                    borderColor:'#1A73E8',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:45,
                                    height:45,
                                    backgroundColor:'#1A73E8',
                                    borderRadius:45,
                                    marginLeft:20
                                }}
                            >
                                <Image style={{resizeMode:'cover',width:40,height:40,borderRadius:45}} source={icon_favorie}/>
                            </TouchableOpacity>
                            <Text style={{marginLeft:21}}>Favori</Text>
                        </View>
                        <View style={styles.viewMiniButtons}>
                            <TouchableOpacity
                                style={{
                                    borderWidth:4,
                                    borderColor:'#1A73E8',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:45,
                                    height:45,
                                    backgroundColor:'#1A73E8',
                                    borderRadius:45,
                                    marginLeft:20
                                }}
                                onPress={this._pressHandler}
                            >
                                <Image style={{resizeMode:'cover',width:40,height:40,borderRadius:45}} source={icon_star}/>
                            </TouchableOpacity>
                            <Text style={{marginLeft:30}}>Avis</Text>
                        </View>
                    </View>
                    <View style={styles.viewListeCreneaux}>
                        { this.state.creneaux.map((item)  => {
                            return (
                                <TouchableOpacity style={styles.itemCreneaux} onPress={this._alert.bind(this,item.id)}>
                                    <Text key={item.horaire} style={{ color:'white'}}>{item.heure_debut}h{item.minute_debut} - {item.heure_fin}h{item.minute_fin} : </Text>
                                    <Text key={item.slots} style={styles.textNbSlotDisponible}>{item.slots} slot(s) disponible(s)</Text>
                                    <Image source={icon_calendar} style={{width:20,height:25,marginBottom:30,marginLeft:20}}/>
                                </TouchableOpacity>)
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    viewMiniButtonsContainer: {
        width:'100%',
        height:100,
        borderTopColor: '#C3C3C3',
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop:15,
        paddingLeft:15,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    viewMiniButtons: {
        display:'flex',
        flexDirection:'column'
    },
    textMoyenne : {
        paddingRight:10
    },
    textNombreAvis : {
        paddingLeft:5
    },
    viewAvisContainer : {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems: 'center'
    },
    scrollviewPageContainer: {
        width:'95%',
        height:'100%',
        marginLeft:'2.5%',
        marginTop:'2.5%',
    },
    imageMarket: {
        borderRadius: 7,
        borderColor: 'black',
        width:'100%',
        height:150,
    },
    textMarket: {
        fontSize: 26,
        color:'#20B1FF',
        fontWeight:'bold',
        marginTop:5
    },
    viewListeCreneaux: {
        alignItems:'center'
    },
    itemCreneaux: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        width:'95%',
        height:45,
        borderRadius:6,
        borderWidth:2,
        backgroundColor:'#1A73E8',
        borderColor:'#0151BB',
        marginTop:5,
        marginBottom:5,
        paddingTop:10,
    },
    textNbSlotDisponible: {
        marginLeft:45,
        color:'white'
    },
});
export default DetailCommerce;

import React from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Icon, TouchableOpacity, AsyncStorage} from 'react-native';
import img_entreprise from '../assets/img/Menu/Connexion/entreprise.jpg'
import StarRating from 'react-native-star-rating';
import icon_calendar from '../assets/img/icon/calendar-icon.png'
import icon_itineraire from '../assets/img/icon/icon_itineraire.png'
import icon_favorie from '../assets/img/icon/icon_fav.png'
import axios from "axios";


class DetailCommerce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            horaires:[{}],
            market_id:null
        };
    }

    componentDidMount() {
        this._getMarketID();
        this._getHoraires();
    }

    _getMarketID = async() =>{
        try {
            let market = await AsyncStorage.getItem('market_id');
            this.setState({market_id:market});
        }
        catch (error) {
            alert(error);
        }
    };

    _getHoraires = () => {
        axios.get(
            instance + 'creneaux/' + this.state.market_id,
        ).then(response => {
            this.setState({horaires:response.data.data});
            console.log(this.state.horaires);
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <ScrollView style={styles.mainContain} persistentScrollbar={true}>
                    <Image source={img_entreprise} style={styles.img}/>
                    <Text style={styles.text}>Nom de L'entreprise</Text>
                    <View style={styles.notation}>
                        <Text style={styles.txt}>3.5</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={star}
                            selectedStar={(rating) => setStar(rating)}
                            fullStarColor={'#ffda00'}
                            starSize={15}
                        />
                        <Text style={styles.txt2}>(80)</Text>
                    </View>
                    <Text>Supermarché</Text>
                    <View style={styles.DIV_btn}>
                        <View style={styles.DIV_btn_txt}>
                            <TouchableOpacity
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

                        <View style={styles.DIV_btn_txt}>
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
                            >
                                <Image style={{resizeMode:'cover',width:40,height:40,borderRadius:45}} source={icon_favorie}/>
                            </TouchableOpacity>
                            <Text style={{marginLeft:22}}>Favorie</Text>
                        </View>
                    </View>
                    <View style={styles.listHoraires}>
                        { horaire.map((item)  => {
                            return (
                                <TouchableOpacity style={styles.horaires}>
                                    <Text key={item.horaire} style={{ color:'white'}}>{item.horaire} : </Text>
                                    <Text key={item.slots} style={styles.slot}>{item.slots} slot(s) disponible(s)</Text>
                                    <Image source={icon_calendar} style={{width:20,height:25,marginBottom:30,marginLeft:20}}/>
                                </TouchableOpacity>)
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    DIV_btn_txt: {
        display:'flex',
        flexDirection:'column'
    },
    DIV_btn: {
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
    txt : {
        paddingRight:10
    },
    txt2 : {
        paddingLeft:5
    },
    notation : {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems: 'center'
    },
    mainContain: {
        width:'95%',
        height:'100%',
        marginLeft:'2.5%',
        marginTop:'2.5%',
    },
    img: {
        borderRadius: 7,
        borderColor: 'black',
        width:'100%',
        height:150,
    },
    text: {
        fontSize: 26,
        color:'#20B1FF',
        fontWeight:'bold',
        marginTop:5
    },
    text2: {
        fontSize: 16
    },
    listHoraires: {
        alignItems:'center'
    },
    horaires: {
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
    slot: {
        marginLeft:45,
        color:'white'
    },
    item2: {
        marginTop: 14,
        padding: 15,
        fontSize: 14,
        textAlign: "left",
        backgroundColor: 'steelblue',
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7
    }
});

export default PageMagasin;

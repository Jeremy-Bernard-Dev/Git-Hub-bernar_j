import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity,Image } from 'react-native';
import MapView, {Marker, Callout, ProviderPropType} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from "axios";
import icon_position from '../../assets/img/icon/position.png'
import icon_person from '../../assets/img/icon/icon_person.png'
import icon_shop from '../../assets/img/icon/icon_shop.png'
import icon from '../../assets/img/icon/delete.png'

/* /!\ Warning disabled /!\ */

/* Les warnings ont été enlevé car le fait que this.state.region.latitude soit définie sur
null, cela créer un warning. Hors nous avons été obligé de l'initialiser à null pour la
géocalisation.*/
import {YellowBox} from 'react-native';
import img_entreprise from "../../assets/img/Menu/Connexion/entreprise.jpg";
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
console.error = (error) => error.apply;
/* /!\ Warning disabled /!\ */

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Callouts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            tab:[{}],
            user_lat: null,
            user_lon: null,
        };
    }

    componentDidMount() {
        this._getLocation();
        this._getShops();
    }

    _pressHandler(item) {
        this.props.navigation.navigate("DetailCommerce", {item: item});
    }

    _pressRecenter = () => {
        const {latitude, longitude, latitudeDelta, longitudeDelta} = this.state.region;
        this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })
    };

    _getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        /*const object= {
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        };*/
        // Pour avoir des exemples modifier ici :
       const object= {
            latitude:48.996203,
            longitude:1.643899,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        };
        this.setState({user_lat:object.latitude});
        this.setState({user_lon:object.longitude});
        this.setState({region:object});
    };

    _getShops(){
        axios.get(
            instance + 'markets')
            .then(response => {
                    this.setState({tab:response.data});
                }
            );
    }

    render() {
        const {region, markers} = this.state;
        const lat = this.state.region.latitude;
        const long = this.state.region.longitude;

        if (lat !== null && long !== null) {
        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={region}
                    zoomTapEnabled={false}>

                    <Marker
                        title={'Votre position'}
                        image={icon_person}
                        coordinate={this.state.region}
                    />

                    {this.state.tab.map((item) => {
                        let lat = 0;
                        let long = 0;
                        if (item.latitude != null && item.longitude != null) {
                            lat = Number(item.latitude);
                            long = Number(item.longitude);
                        }
                        return (
                            <Marker
                                key={item.marketname + 5}
                                coordinate={{
                                    latitude: lat,
                                    longitude: long
                                }}>
                                <Callout onPress={this._pressHandler.bind(this, item)} style={styles.plainView} key={item.siret}>
                                    <View key={item.code}>
                                        <Text key={item.country} style={{fontWeight:'bold',fontSize:18}}>{item.marketname}</Text>
                                        <Text key={item.country}>tel : {item.phoneNumber}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}
                </MapView>
                <TouchableOpacity style={styles.btn_recentrer} onPress={this._pressRecenter}>
                    <Image style={{width:23,height:23,borderRadius:6}} source={icon_position}/>
                </TouchableOpacity>
            </View>
        );
    } else {
            return(
                <View style={styles.container}>
                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        initialRegion={region}
                        zoomTapEnabled={false}/>
                </View>
            )
        }
    }
}

Callouts.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    btn_recentrer: {
        width:40,
        height:40,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:0,
        bottom:0,
        margin:10,
        borderRadius:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
    norendering: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:'white'
    },
    customView: {
        width: 140,
        height: 140,
    },
    plainView: {
        width: 150,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    calloutButton: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
});

export default Callouts;
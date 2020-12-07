import React from 'react'
import {View, Text, StyleSheet, Image ,TouchableOpacity, AsyncStorage, RecyclerViewBackedScrollView} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import NavBar from "./NavbarMarket";

export default ({navigation}) => (
<View style={{height: '100%'}}>
    
    <View style={styles.container}>

        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
                latitude: 48.813945,
                longitude: 2.392459,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            }}
        >

        <Marker
            coordinate={{latitude: 48.813945, longitude: 2.392459}}
            title={"Votre position"}
            description={"7 rue Maurice Grandcoing"}
        />
        <Marker
        coordinate={{
            latitude: 48.803945,
            longitude: 2.402459,
        }}
        title={"Votre commande"}
        description={"Temp restant : 5 minutes"}
        >

        <Image source={require('../assets/logo_SuRoute1.png')} style={{height: 35, width:35 }} />

        </Marker>
        </MapView>
            
    </View>
    <View style={styles.divup}>
        <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Text style={{marginLeft:'auto', marginRight:'auto', marginTop: 10, fontSize: 18}}>Votre commande est en cours de livraison</Text>
            <Text style={{marginLeft:'auto', marginRight:'auto', marginTop: 10, fontSize: 18}}>Temps restant : 5 minutes</Text>
            <Text style={{marginLeft:'auto', marginRight:'auto', marginTop: 10, fontSize: 18}}>Soyez prêts !</Text>
        </View>
        
    </View>
    <View style={styles.nav}>
        <NavBar navigation={navigation}/>
    </View>

</View>
   
);
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: '100%',
      
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    nav: {
        marginTop: 'auto',
    },
    divup: {
        backgroundColor: '#e07020',
        height: 140,
        marginBottom: 'auto',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        
        opacity: 0.95,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        borderRadius: 15,
    },
   });
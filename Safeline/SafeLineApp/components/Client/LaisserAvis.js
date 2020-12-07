import React, {useState} from 'react'
import axios from 'axios'
import { View, Text, Image, StyleSheet, TextInput, ScrollView, Button, AsyncStorage  } from 'react-native'
import StarRating from 'react-native-star-rating';
import illustrationShop from '../../assets/img/Illustrations/shop.png'

export default function LaisserAvis({ navigation }) {
    const [item, setItem] = useState(navigation.state.params.item);
    const [text, setText] = React.useState('');
    const [customer, setCustomer] = React.useState(0);
    const [security, setSecurity] = React.useState(0);
    const [user_id, setUser_id] = React.useState("");

    const _getUserID = async () =>{
        try {
            const id = await AsyncStorage.getItem('user_id');
            const name = await AsyncStorage.getItem('user_name');
            const firstname = await AsyncStorage.getItem('user_firstname');
            console.log("vise un peu ca: " + name + firstname + id);
            _getApi(id, name, firstname);
        }
        catch (error) {
            console.log("problème de lecture des sauvegardes local");
        }
    };

    const _getApi = (id, name, firstname) => {
        axios.post(
            instance + 'newAvis',
            {
                'security': security,
                'customer': customer,
                'comment': text,
                'users_id': id,
                'users_name': name,
                'users_firstname': firstname,
                'market_id': item.id,
            }
        ).then((response) => {
            navigation.goBack();
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.viewContainer}>
                <Image style={styles.iamgeIllustration} source={illustrationShop}/>
                <Text style={styles.TextMarket}>{item.marketname}</Text>
                <Text style={styles.textPart}>Le nombre de personnes dans le magasin est-il convenable?</Text>
                <View style={styles.starsGrading}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={customer}
                        selectedStar={(rating) => setCustomer(rating)}
                        fullStarColor={'#ffda00'}
                        emptyStarColor='#005593'
                        starSize={30}
                        ratingBackgroundColor='white'
                    />
                </View>

                <Text style={styles.textPart}>Respect des règles de sécurité</Text>
                <View style={styles.starsGrading}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={security}
                        selectedStar={(rating) => setSecurity(rating)}
                        fullStarColor={'#ffda00'}
                        emptyStarColor='#005593'
                        starSize={30}
                    />
                </View>
                <Text style={styles.textPart}>Laisser un commentaire</Text>
                <TextInput
                    style={styles.textInputComment}
                    onChangeText={value => setText(value)}
                    multiline={true}
                    numberOfLines={4}
                    value={text}
                />
                <Button title='Envoyer' onPress={_getUserID}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    textPart: {
        width:'100%',
        backgroundColor:'#4e9be2',
        height:'auto',
        paddingBottom:3,
        color:'white',
        textAlign:'center',
        fontSize:20,
    },
    iamgeIllustration: {
        width: '50%',
        height:150,
        resizeMode:'contain',
        marginTop:30
    },
    viewContainer: {
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        alignItems:'center',
        paddingBottom:30
    },
    TextMarket: {
        fontSize: 30,
        textAlign: "center",
        paddingLeft:30,
        paddingRight:30,
        color:'#4e9be2',
        paddingBottom:30,
        fontWeight: 'bold'
    },
    starsGrading: {
        marginTop:10,
        marginBottom:20,
        marginLeft: 10,
    },
    textInputComment: {
        marginTop:15,
        width: '90%',
        height: 100,
        borderColor: '#005593',
        borderWidth: 1,
        textAlignVertical: 'top',
        color:'#005593',
        fontWeight:'bold',
        padding:10,
        marginBottom:20
    }
});
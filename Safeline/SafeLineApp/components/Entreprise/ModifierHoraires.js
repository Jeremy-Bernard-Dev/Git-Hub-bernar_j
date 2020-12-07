import React, {useState} from 'react';
import {View, TextInput, Button, AsyncStorage, StyleSheet, Text, Picker} from 'react-native';
import axios from "axios";

export default function ModifierHoraires({ navigation }) {
    const [startTime, setStartTime] = useState(navigation.state.params.item.heure_debut);
    const [startMinute, setStartMinute] = useState(navigation.state.params.item.minute_debut);
    const [endTime, setEndTime] = useState(navigation.state.params.item.heure_fin);
    const [endMinute, setEndMinute] = useState(navigation.state.params.item.minute_fin);
    const [slots, setSlots] = useState(navigation.state.params.item.slots);
    const [error, setError] = useState("");

    const _pressHandlerCreneaux = () => {
        if (slots.length === 0 ) {
            setError("veuillez saisir un nombre de place disponible");
        }
        else {
            _getMarketID();
        }
    }

    const _getMarketID = async() =>{
        try {
            let market_id = await AsyncStorage.getItem('market_id');
            _editHoraire(market_id);
        }
        catch (error) {
            console.log(error);
        }
    };

    const _editHoraire = (market_id) => {
        axios.put(
            instance + 'editCreneaux/' + navigation.state.params.item.id,
            {
                'heure_de_debut': startTime,
                'minute_de_debut': startMinute,
                'heure_de_fin': endTime,
                'minute_de_fin': endMinute,
                'slots': slots,
                'market_id': market_id,
            }
        ).then(response => {
            navigation.goBack();
        }, (error) => {
            console.log(error);
        });
    };


    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewSubContainer}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent: 'space-between',width:110}}>
                    <Text style={{width:150}}>Heure de début:</Text>
                    <Picker
                        selectedValue={startTime}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => setStartTime(itemValue)}>
                        <Picker.Item label="00" value="00" />
                        <Picker.Item label="01" value="01" />
                        <Picker.Item label="02" value="02" />
                        <Picker.Item label="03" value="03" />
                        <Picker.Item label="04" value="04" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="13" value="13" />
                        <Picker.Item label="14" value="14" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="16" value="16" />
                        <Picker.Item label="17" value="17" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="19" value="19" />
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                    </Picker>
                    <Text>h</Text>
                    <Picker
                        selectedValue={startMinute}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => setStartMinute(itemValue)}>
                        <Picker.Item label="00" value="00" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="30" value="30" />
                        <Picker.Item label="45" value="45" />
                    </Picker>
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent: 'space-between',width:110}}>
                    <Text style={{width:150}}>Heure de fin:</Text>
                    <Picker
                        selectedValue={endTime}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => setEndTime(itemValue)}>
                        <Picker.Item label="00" value="00" />
                        <Picker.Item label="01" value="01" />
                        <Picker.Item label="02" value="02" />
                        <Picker.Item label="03" value="03" />
                        <Picker.Item label="04" value="04" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="13" value="13" />
                        <Picker.Item label="14" value="14" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="16" value="16" />
                        <Picker.Item label="17" value="17" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="19" value="19" />
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                    </Picker>
                    <Text>h</Text>
                    <Picker
                        selectedValue={endMinute}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => setEndMinute(itemValue)}>
                        <Picker.Item label="00" value="00" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="30" value="30" />
                        <Picker.Item label="45" value="45" />
                    </Picker>
                </View>
                <TextInput
                    style={{marginBottom:30,marginTop:10,borderBottomWidth:2,borderBottomColor:'#4ea5f3',paddingTop:5,fontSize:20}}
                    value={slots.toString()}
                    placeholder="nombre de places disponibles"
                    keyboardType={'numeric'}
                    onChangeText={(val) => setSlots(val)}/>
                <Button color={'#4ea5f3'} title="Modifier" onPress={_pressHandlerCreneaux}/>
                <Text>{error}</Text>
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    viewContainer: {
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        justifyContent:'center',
        paddingBottom:100
    },
    viewSubContainer : {
        width:'95%',
        marginLeft:'2.5%',
        backgroundColor:'#F5F5F5',
        padding:10,
        borderRadius:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

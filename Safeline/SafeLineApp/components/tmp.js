import React, { useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

export default function QRliste({navigation}){
    let qrcodes = [{}];
    const [userid, setUserID] = useState ('');

    useEffect(() => {
        getQRCodes();
    });

    const getQRCodes = () => {
        axios.get(
            instance + 'qrcodes/1',
        ).then(response => {
            qrcodes = response.data;
            console.log(qrcodes);
        }, (error) => {
            console.log(error);
        });
    };

    const _getUserID = async() =>{
        try {
            let user = await AsyncStorage.getItem('user_id');
            setUserID(user);
        }
        catch (error) {
            alert(error);
        }
    };
    _getUserID();

    return (
        <View style={{
            width:'100%',
            height:'100%',
        }}>
            <Text>Nice</Text>
        </View>
    );

}





/*

 */

const styles = StyleSheet.create({
    qrcode_div: {
        borderColor: "white",
        borderWidth: 1,
        marginBottom:15,
    },
    tout: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'95%',
        borderRadius: 4,
        backgroundColor:'#4ea5f3',
        margin:'2.5%',
        height:75,
        shadowColor: "#FFE6E1",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    scroll: {
        width : '100%',
        backgroundColor: 'white',
    },
    item: {
        fontSize:18,
        color: 'white',
        marginBottom:15,
        paddingRight:30,
        fontWeight:'bold'
    },
    divText: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        width:'78%',
        marginRight:10,
        paddingLeft:10
    }
});
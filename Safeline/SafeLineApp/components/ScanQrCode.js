import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanBorder from '../assets/img/scan.png'

export default function ScanQrCode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const Scan = ({ type, data }) => {
        setScanned(true);
        Alert.alert(
            "Personne",
            `${data}`,
            [
                { text: "Ok", onPress: () =>  setScanned(false) },
            ],
            { cancelable: false }
        );
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor:'white'
            }}>
            <BarCodeScanner style={styles.barcodescannerScanner}  onBarCodeScanned={scanned ? undefined : Scan}>
                <View style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Image source={ScanBorder} style={styles.imageBorder}/>
                </View>
            </BarCodeScanner>
        </View>
    );
}

const styles = StyleSheet.create({
    barcodescannerScanner: {
        width: '100%',
        height:'100%',
        borderWidth:10,
        borderColor:'black',
        marginBottom:20
    },
    imageBorder: {
        width:200,
        height:200,
        resizeMode:'contain'
    },
});
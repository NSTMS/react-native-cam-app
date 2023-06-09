import { SafeAreaView, Text, Image, Alert, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import { BackgroudColors, FontAlignments, Fonts, FontSizes, Styles } from '../static/styles/styles';
import Clickable from './Clickable';
import { Components } from '../static/styles/styles'
import * as SecureStore from 'expo-secure-store';
;
export default function ImageView({ navigation, route }) {
    const { data, width } = route.params
    const [ip, setip] = useState('')
    const [port, setport] = useState('')

    const getItem = async (key) => {
        return await SecureStore.getItemAsync(key);
    }

    useEffect(() => {
        (async () => {
            setip(await getItem('IP'))
            setport(await getItem('PORT'))
        })()
    }, [])
    const handleShareClick = async () => {
        Sharing.isAvailableAsync().then(yes => {
            if (yes) {
                // ogólnie to działa ale na moim telefonie nie działa (approved)
                Sharing.shareAsync(data.uri)
            }
            else {
                Alert.alert("nie możesz udostępnić pliku")
            }
        });
    }
    const handleDelteClick = async () => {
        await MediaLibrary.deleteAssetsAsync(data)
        navigation.navigate("gallery")
    }
    const handleUploadClick = () => {
        const form = new FormData();

        form.append('photo', {
            uri: data.uri,
            type: 'image/*',
            name: data.filename
        });
        fetch(`http://${ip}:${port}/upload`, {
            method: 'POST',
            body: form
        }).then(() => {
            ToastAndroid.showWithGravity(
                "uploaded",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 7 }}>
                <Image source={{
                    uri: data.uri,
                    width: width,
                    height: 600
                }} />
            </View>
            <Text style={[FontSizes.MediumFontSize, FontAlignments.Center]}>{data.width}x{data.height}</Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <Clickable text={"[share]"} handlePress={handleShareClick} styles={[Components.Button]} />
                <Clickable text={"[delete]"} handlePress={handleDelteClick} styles={[Components.Button]} />
                <Clickable text={"[upload]"} handlePress={handleUploadClick} styles={[Components.Button]} />
            </View>
        </SafeAreaView>
    )
}
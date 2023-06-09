import { SafeAreaView, Text, TextInput, ToastAndroid, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles, Fonts, FontSizes, Components } from "../static/styles/styles"
import * as SecureStore from 'expo-secure-store';
import Clickable from './Clickable';
export default function SettingsView({ navigation }) {
    const [ip, changeIp] = useState("")
    const [port, changePort] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            setLoading(true)
            changeIp(await getItem('IP'))
            changePort(await getItem('PORT'))
            setLoading(false)
        })()
    }, [])
    const getItem = async (key) => {
        return await SecureStore.getItemAsync(key);
    }
    const saveItem = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }


    const deleteItem = async (key) => {
        await SecureStore.deleteItemAsync("key");
    }
    const handleSubmit = async () => {
        await saveItem('IP', ip)
        await saveItem('PORT', port)
        ToastAndroid.showWithGravity(
            'Zapisano',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
        )
    }

    return (
        <>
            {
                (loading) ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <SafeAreaView style={Styles.CenteredView}>
                        <View style={[Styles.Row]}>
                            <Text style={[FontSizes.SmallFontSize, Fonts.bold]}>IP: </Text>
                            <TextInput
                                onChangeText={changeIp}
                                value={ip}
                            ></TextInput>
                        </View>
                        <View style={[Styles.Row]}>
                            <Text style={[FontSizes.SmallFontSize, Fonts.bold]}>PORT: </Text>
                            <TextInput
                                onChangeText={changePort}
                                value={port}
                            ></TextInput>
                        </View>
                        <Clickable text={"[save]"} handlePress={handleSubmit} styles={[Components.Button]} />
                    </SafeAreaView>
            }
        </>
    )
}

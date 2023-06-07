import { Alert, SafeAreaView, Text, ActivityIndicator, Dimensions, FlatList, View, StatusBar, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles, Fonts, GalleryViewStyles } from "../static/styles/styles"
import * as MediaLibrary from "expo-media-library";
import ImageListItem from "./ImageListItem"
import Clickable from "./Clickable"
import * as SecureStore from 'expo-secure-store';
const dimentions = Dimensions.get('screen')
import { useIsFocused } from '@react-navigation/native';
import {Components} from "../static/styles/styles"
export default function GalleryView({ navigation }) {
    const [ip, setip] = useState("192.168.0.0")
    const [PORT, setPORT] = useState("3000")
    const [photos, setPhotos] = useState([])
    const isFocused = useIsFocused();
    const [columns, setColumns] = useState(4)
    const [visibility, setVisibility] = useState(false)
    const loadData = async() =>
    {
        setVisibility(false)
        let data = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        data.assets.map((el,i)=>{
            el.selected = false;
        })
        // data.assets = data.assets.sort((a,b)=> b.modificationTime - a.modificationTime)
        setPhotos(data.assets)
        setVisibility(true)
    }
    const getItem = async(key) =>{
        await SecureStore.getItemAsync(key);
     }
     const saveItem = async (key, value) =>{
        await SecureStore.setItemAsync(key, value);
     }
  
    useEffect(() => {
        (async () => {
            let { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('brak uprawnień do czytania image-ów z galerii')
            }
            else {
                if(isFocused) loadData()
            }
            console.log(ip, PORT)

            if(await getItem('ip') == undefined || await getItem('PORT') == undefined)
            {
                await saveItem('ip', ip)
                await saveItem('PORT', PORT)
                setip(await getItem('ip'))
                setPORT(await getItem('PORT'))
                console.log(ip,PORT)
            }
        })()
    }, [isFocused])
    const changeNumberOfColumns = () => setColumns((columns == 1)? 4 : 1)
    const deleteSelectedImages = async () =>{
        setVisibility(false)
        await MediaLibrary.deleteAssetsAsync(photos.filter(p => p.selected))
        await loadData()
    }
    const uploadSelectedImages = () =>{

        //photos.filter(p => p.selected)
        ToastAndroid.showWithGravity(
            'Photos uploaded',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );        
    }

    const showBigPhoto = (item) =>{
        navigation.navigate("image",{data: item, ip, PORT})
    }
    return (
        <>
            {
                !visibility ?
                    <SafeAreaView>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </SafeAreaView>
                    :
                    <SafeAreaView>
                        <StatusBar />
                        <View style={{flexDirection:"row", justifyContent:"center", gap:10, marginBottom:10, marginTop:10}}>
                            <Clickable text={"[cols]"} handlePress={changeNumberOfColumns} styles={[Components.Button]} />
                            <Clickable text={"[camera]"} handlePress={() => navigation.navigate("camera")}  styles={[Components.Button]} />
                            <Clickable text={"[delete]"} handlePress={deleteSelectedImages}  styles={[Components.Button]} />
                            <Clickable text={"[upload]"} handlePress={uploadSelectedImages}  styles={[Components.Button]} />
                            <Clickable text={"[sett]"} handlePress={()=>navigation.navigate("settings")}  styles={[Components.Button]} />
                        </View>
                        <FlatList
                            data={photos}
                            numColumns={columns}
                            key={columns}
                            keyExtractor={item=>item.id}
                            renderItem={({ item,index }) => <ImageListItem navigation={navigation} item={{ ...item, elements: columns, dimentions:dimentions}} setPhotos={setPhotos} photos={photos} showBigPhoto={showBigPhoto} index={index} />}
                            style={{marginBottom:90}}
                       ></FlatList>
                    </SafeAreaView>
            }
        </>
    )
}
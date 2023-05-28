import { Alert, SafeAreaView, Text, ActivityIndicator, Dimensions, FlatList, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Font from "expo-font";
import { Styles, Fonts, GalleryViewStyles } from "../static/styles/styles"
import * as MediaLibrary from "expo-media-library";
import ImageListItem from "./ImageListItem"
import Clickable from "./Clickable"
const dimentions = Dimensions.get('screen')
import { useIsFocused } from '@react-navigation/native';
import {Components} from "../static/styles/styles"
export default function GalleryView({ navigation }) {
    const [photos, setPhotos] = useState([])
    const isFocused = useIsFocused();
    const [columns, setColumns] = useState(4)
    const [visibility, setVisibility] = useState(false)
    const loadData = async() =>
    {
        setVisibility(false)
        let data = await MediaLibrary.getAssetsAsync({
            first: 200,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        data.assets.map((el,i)=>{
            el.selected = false;
        })
        data.assets = data.assets.sort((a,b)=> b.modificationTime - a.modificationTime)
        setPhotos(data.assets)
        setVisibility(true)
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
        })()
    }, [isFocused])
    const changeNumberOfColumns = () => setColumns((columns == 1)? 4 : 1)
    const deleteSelectedImages = async () =>{
        setVisibility(false)
        await MediaLibrary.deleteAssetsAsync(photos.filter(p => p.selected))
        await loadData()
    }
    const showBigPhoto = (item) =>{
        navigation.navigate("image",{data: item})
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
                        <View style={{flexDirection:"row", gap:20, justifyContent:"center"}}>
                        <Clickable text={"[columns]"} handlePress={changeNumberOfColumns} styles={[Components.Button]} />
                        <Clickable text={"[camera]"} handlePress={() => navigation.navigate("camera")}  styles={[Components.Button]} />
                        <Clickable text={"[delete]"} handlePress={deleteSelectedImages}  styles={[Components.Button]} />
                        </View>
                        <FlatList
                            data={photos}
                            numColumns={columns}
                            key={columns}
                            keyExtractor={item=>item.id}
                            renderItem={({ item,index }) => <ImageListItem navigation={navigation} item={{ ...item, elements: columns, dimentions:dimentions}} setPhotos={setPhotos} showBigPhoto={showBigPhoto} index={index} />}
                            style={{marginBottom:90}}
                       ></FlatList>
                    </SafeAreaView>
            }
        </>
    )
}
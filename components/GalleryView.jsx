import { Alert, SafeAreaView, Text, ActivityIndicator, Dimensions, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Font from "expo-font";
import { Styles, Fonts, GalleryViewStyles } from "../static/styles/styles"
import * as MediaLibrary from "expo-media-library";
import ImageListItem from "./ImageListItem"
import Clickable from "./Clickable"
const dimentions = Dimensions.get('screen')

export default function GalleryView({ navigation }) {
    const [photos, setPhotos] = useState([])
    const [columns, setColumns] = useState(4)
    useEffect(() => {
        (async () => {
            let { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('brak uprawnień do czytania image-ów z galerii')
            }
            else {
                let data = await MediaLibrary.getAssetsAsync({
                    first: 100,           // ilość pobranych assetów
                    mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
                })
                data.assets.map(el=>{
                    el.selected = false;
                })
                setPhotos(data.assets)
            }
        })()
    }, [])
    const changeNumberOfColumns = () => setColumns((columns == 1)? 4 : 1)
    const deleteSelectedImages = () =>{}
    const showBigPhoto = (item) =>{
        navigation.navigate("image",{data: item})
    }
    return (
        <>
            {
                (photos.length == 0) ?
                    <SafeAreaView>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </SafeAreaView>
                    :
                    <SafeAreaView>
                        <Clickable text={"[columns]"} handlePress={changeNumberOfColumns} />
                        <Clickable text={"[camera]"} handlePress={() => navigation.navigate("camera")} />
                        <Clickable text={"[delete]"} handlePress={deleteSelectedImages} />
                        <FlatList
                            data={photos}
                            numColumns={columns}
                            key={columns}
                            keyExtractor={item=>item.id}
                            renderItem={({ item,index }) => <ImageListItem navigation={navigation} item={{ ...item, elements: columns, dimentions:dimentions}} setPhotos={setPhotos} showBigPhoto={showBigPhoto} index={index} />}
                        ></FlatList>
                    </SafeAreaView>
            }
        </>
    )
}
import { SafeAreaView, Text,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Sharing from 'expo-sharing';
import Clickable from './Clickable';
export default function ImageView({navigation, route}){
    const {data} = route.params

    const handleShareClick = async () =>
    {
        Sharing.isAvailableAsync().then(yes=>{
            if(yes)
            {
                // ogólnie to działa ale na moim telefonie nie działa (approved)
                Sharing.shareAsync(data.uri)
            }
            else{
                Alert.alert("nie możesz udostępnić pliku")
            }
        });
    }
    
    return (
        <SafeAreaView>
              <Image source={{
                uri: data.uri,
                width: data.dimentions.width/data.elements,
                height:data.dimentions.width/data.elements
            }} />
            <Clickable text={"[share]"} handlePress={handleShareClick} />
            
        </SafeAreaView>
    )
}
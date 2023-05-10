import { SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import {Styles,Fonts,GalleryViewStyles} from "../static/styles/styles" 

export default function GalleryView({navigation}){
    return (
        <SafeAreaView>
            <Text style={Fonts.light}>Gallery</Text>
        </SafeAreaView>
    )
}
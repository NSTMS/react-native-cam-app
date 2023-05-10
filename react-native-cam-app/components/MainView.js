import { SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Font from "expo-font";
import {Styles,Fonts,FontSizes,FontAlignments} from "../static/styles/styles" 

export default function MainView({navigation}){
    return (
        <SafeAreaView style={Styles.CenteredView}>
            <Text style={[Fonts.bold, FontSizes.XLargeFontSize, FontAlignments.Center]} onPress={() => navigation.navigate("gallery")}>CAMERA APP</Text>
            <Text style={[Fonts.medium,  FontSizes.LargeFontSize]}>MEDIUM medium</Text>
            <Text style={[Fonts.regular, FontSizes.MediumFontSize]}>regular REGULAR</Text>
            <Text style={[Fonts.regularItalic, FontSizes.SmallFontSize]}>REGULAR italic</Text>
            <Text style={[Fonts.light, FontSizes.XSmallFontSize]}>LIGHT light</Text>
        </SafeAreaView>
    )
}

import { SafeAreaView, Text ,Image,StyleSheet,View} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'

import * as Font from "expo-font";
import { FontColors, FontSizes, Fonts } from '../static/styles/styles';

export default function ImageListItem({navigation, item,index, setPhotos, showBigPhoto}){

    const timing = useRef(-1);

    return (
        <View 
           onTouchStart={()=>{
            timing.current = 1;
            setTimeout(()=>{
                if(timing.current == 1){
                    setPhotos(dat=>{
                        dat[index].selected = !dat[index].selected
                        return [...dat]
                    })
                    console.log("siema")
                }
                else if(timing.current == 0) showBigPhoto(item)
            },100)
        }}
        onTouchEnd={()=>{
            timing.current = 0;
        }}
        onTouchCancel={()=>{
            timing.current = -1;
        }}
        >
            <Image source={{
                uri: item.uri,
                width: item.dimentions.width/item.elements,
                height:item.dimentions.width/item.elements
            }} 
            style={styles.image}
            />
             {
                item.selected?
                <View style={styles.selected}>
                    <Text style={[FontColors.Light, Fonts.bold, FontSizes.LargeFontSize]}>+</Text>
                </View>
                :
                <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    selected:{
        backgroundColor: 'black',
        position: 'absolute',
        opacity: 0.6,
        height: '100%',
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image:{
        borderRadius: 20,
    }

})
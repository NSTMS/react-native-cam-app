import React from 'react'
import { TouchableOpacity,Text } from 'react-native'

export default function Clickable({text, handlePress,styles,dark}){
  return (
    <TouchableOpacity onPress={handlePress} style={[styles]}>
        <Text style={{color: (dark)? "#343a40": "#fcfcfc"}}>{text}</Text>
    </TouchableOpacity>
  )
}
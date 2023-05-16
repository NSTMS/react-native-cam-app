import React from 'react'
import { TouchableOpacity,Text } from 'react-native'

export default function Clickable({text, handlePress,styles}){
  return (
    <TouchableOpacity onPress={handlePress} style={styles}>
        <Text>{text}</Text>
    </TouchableOpacity>
  )
}
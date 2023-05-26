import { TouchableOpacity,Image } from 'react-native'
import React from 'react'

const ClickableImage = ({uri, handlePress,styles}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles}>
        <Image source={{uri: uri}} style={{width:60, height:60}}></Image>
    </TouchableOpacity>
  )
}

export default ClickableImage
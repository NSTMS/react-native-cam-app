import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { BackgroudColors, Components ,FontColors} from '../static/styles/styles'
const RadioButton = ({press,text}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginRight:20, marginTop:20, gap:10}}>
        <TouchableOpacity onPress={press} style={[Components.CricleButton, BackgroudColors.LightSlate]}></TouchableOpacity>
      <Text style={[FontColors.White]}>{text}</Text>
    </View>
  )
}

export default RadioButton

const styles = StyleSheet.create({})
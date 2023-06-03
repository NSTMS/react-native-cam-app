import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RadioButton from './RadioButton'
import { BackgroudColors, Components, FontColors, Fonts, FontSizes, Styles } from '../static/styles/styles';

const RadioButtonGroup = ({buttons, valueChange,header}) => {
    const onValueChange = (value) => {
        valueChange(value)
    }
  return (
    <View>
        <Text style={[FontSizes.SmallFontSize, Fonts.bold, FontColors.Light]}>{header}</Text>
        <View style={{marginBottom:10}}>
            {
                buttons.map((button, index) =>
                {
                    return <RadioButton key={index} text={button} press={()=>onValueChange(button)}/>
                })
            }
        </View>
    </View>
  )
}

export default RadioButtonGroup

const styles = StyleSheet.create({})
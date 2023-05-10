import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    CenteredView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})

const Fonts = StyleSheet.create({
    bold:{
        fontFamily:"bold"
    },
    medium:{
        fontFamily:"medium"
    },
    regular:{
        fontFamily:"regular"
    },
    regularItalic:{
        fontFamily:"regularItalic",
        fontStyle:"italic"
    },
    light:{
        fontFamily:"light"
    },
})

const FontSizes = StyleSheet.create({
    XLargeFontSize:{
        fontSize:60,
    },
    LargeFontSize:{
        fontSize:40,
    },
    MediumFontSize:{
        fontSize:25,
    },
    SmallFontSize:{
        fontSize:15,
    },
    XSmallFontSize:{
        fontSize:10,
    }
})
const FontAlignments = StyleSheet.create({
    Center:{
        textAlign:"center",
        textAlignVertical:"center"
    },
    Right:{
        textAlign:"right",
        textAlignVertical:"center"
    },
    Left:{
        textAlign:"left",
        textAlignVertical:"center"
    },
})
const FontColors = StyleSheet.create({
    White:{
        color:"#f4f3ee"
    },
    Black:{
        color:"#000000"        
    },
    Light:{
        color:"#fcfcfc"
    },
    Dark:{
        color:"#343a40"
    },
    DarkBlue:{
        color:"#1b263b"
    },
    DarkSlateBlue:{
        color:"#415a77"
    },
    LightSlate:{
        color:"#778da9"
    },
    Blue:{
        color:"#3a86ff"
    },
    Violet:{
        color:"#6a4c93"
    },
    Red:{
        color:"#c1121f"
    },
    Yellow:{
        color:"#ffbe0b"
    },
    Green:{
        color:"#6a994e"
    }

})

const Components= StyleSheet.create({
    Card:{
        
    },
    Button:{

    },
    Circle:{
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    Border:{
        borderColor:"#FF6347",
        borderStyle:"dashed",
        padding:5,
        borderWidth:7,
    }

})



export {Styles,Fonts, FontAlignments,FontSizes,FontColors, Components}
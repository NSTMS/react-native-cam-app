import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

const Fonts = StyleSheet.create({
    bold: {
        fontFamily: "bold"
    },
    medium: {
        fontFamily: "medium"
    },
    regular: {
        fontFamily: "regular"
    },
    regularItalic: {
        fontFamily: "regularItalic",
        fontStyle: "italic"
    },
    light: {
        fontFamily: "light"
    },
})

const FontSizes = StyleSheet.create({
    XLargeFontSize: {
        fontSize: 60,
    },
    LargeFontSize: {
        fontSize: 40,
    },
    MediumFontSize: {
        fontSize: 25,
    },
    SmallFontSize: {
        fontSize: 15,
    },
    MediumSmallFontSize :{
        fontSize : 12
    },
    XSmallFontSize: {
        fontSize: 10,
    }
})
const FontAlignments = StyleSheet.create({
    Center: {
        textAlign: "center",
        textAlignVertical: "center"
    },
    Right: {
        textAlign: "right",
        textAlignVertical: "center"
    },
    Left: {
        textAlign: "left",
        textAlignVertical: "center"
    },
})
const BackgroudColors = StyleSheet.create({
    White: {
        backgroundColor: "#f4f3ee"
    },
    Black: {
        backgroundColor: "#000000"
    },
    Light: {
        backgroundColor: "#fcfcfc"
    },
    Dark: {
        backgroundColor: "#343a40"
    },
    DarkBlue: {
        backgroundColor: "#1b263b"
    },
    DarkSlateBlue: {
        backgroundColor: "#415a77"
    },
    LightSlate: {
        backgroundColor: "#778da9"
    },
    Blue: {
        backgroundColor: "#3a86ff"
    },
    Violet: {
        backgroundColor: "#6a4c93"
    },
    Red: {
        backgroundColor: "#c1121f"
    },
    Yellow: {
        backgroundColor: "#ffbe0b"
    },
    Green: {
        backgroundColor: "#6a994e"
    }

})

const FontColors = StyleSheet.create({
    White: {
        color: "#f4f3ee"
    },
    Black: {
        color: "#000000"
    },
    Light: {
        color: "#fcfcfc"
    },
    Dark: {
        color: "#343a40"
    },
    DarkBlue: {
        color: "#1b263b"
    },
    DarkSlateBlue: {
        color: "#415a77"
    },
    LightSlate: {
        color: "#778da9"
    },
    Blue: {
        color: "#3a86ff"
    },
    Violet: {
        color: "#6a4c93"
    },
    Red: {
        color: "#c1121f"
    },
    Yellow: {
        color: "#ffbe0b"
    },
    Green: {
        color: "#6a994e"
    }

})

const Components = StyleSheet.create({
    Card: {

    },
    Button: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor:"#415a77",
        color:"#fcfcfc",
        padding:10,
        margin:20,
        borderRadius:10,

    },
    CricleButton:{
        maxWidth:100,
        maxHeight:100,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // borderColor: "#FF6347",
        // borderWidth: 2,
        borderRadius: 999,
        padding:10,
    },
    Circle: {
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    Border: {
        borderColor: "#FF6347",
        borderStyle: "dashed",
        padding: 5,
        borderWidth: 7,
    }

})



export { Styles, Fonts, FontAlignments, FontSizes, FontColors, Components, BackgroudColors }
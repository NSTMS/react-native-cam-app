import { Text ,Image,StyleSheet,View} from 'react-native'
import React, { useRef } from 'react'
import { FontAlignments, FontColors, FontSizes, Fonts } from '../static/styles/styles';

export default function ImageListItem({navigation, item,index,photos,setPhotos, showBigPhoto}){

    const timing = useRef(-1);
    return (
        <View 
        style={{flex:1,gap:10, justifyContent:"center", alignItems:"center"}}
           onTouchStart={()=>{
            timing.current = 1;
            setTimeout(()=>{
                if(timing.current == 1){
                    const copy = [...photos]
                    copy[index].selected = !copy[index].selected
                    setPhotos(copy)
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
                width: (item.dimentions.width/item.elements)-10,
                height:(item.dimentions.width/item.elements)-10
            }} 
            style={styles.image}
            />
            <View style={styles.text}>
             <Text style={[FontColors.Light,FontSizes.XSmallFontSize, FontAlignments.Center]}>{item.filename}</Text>

            </View>
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
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.6,
        height: '90%',
        width: '90%',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
     position: "absolute",
     backgroundColor: 'black',
     opacity: 0.6,
     borderBottomRightRadius:20,
     borderBottomLeftRadius:20,
     right:0,
     left:0,
     bottom: 0,
     margin:5
    },
    image:{
        borderRadius: 20,
    }

})
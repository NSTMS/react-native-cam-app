import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, Alert ,StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import Clickable from './Clickable';
import * as MediaLibrary from "expo-media-library";
import { BackgroudColors, Components, FontSizes, Styles } from '../static/styles/styles';
import ClickableImage from './ClickableImage';
export default function CameraView({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef()
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    const takePicture = async () => {
      if (cameraRef.current) {
        const options = { quality: 1, base64: true };
        const foto = await cameraRef.current.takePictureAsync(options);
        let asset = await MediaLibrary.createAssetAsync(foto.uri); 
        Alert.alert(JSON.stringify(asset, null, 4))

    }
    };
    const changeCameraFrontBack = () =>{
        setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
    }
    return (
      <View style={{ flex: 4 }}>
        <Camera style={{ flex: 7 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
          </View>
        </Camera>
        <View style={{ flex:3, flexDirection:"row",alignItems:"center", justifyContent:"center",gap:20 }}>
          <ClickableImage uri={"https://icons.veryicon.com/png/o/miscellaneous/icon-8/another-change-4.png"} handlePress={changeCameraFrontBack} styles={ [Styles.CenteredView,Components.CricleButton]}/>
           <ClickableImage uri={"https://cdn-icons-png.flaticon.com/512/32/32339.png?w=360"}  handlePress={takePicture} styles={ [Styles.CenteredView,Components.CricleButton]}/>
        </View>


      </View>
    );
  }
  

   const styles = StyleSheet.create({
    button: {
      
    }
   })

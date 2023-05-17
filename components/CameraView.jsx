import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import Clickable from './Clickable';
import * as MediaLibrary from "expo-media-library";

export default function CameraView() {
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
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 7 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
          </View>
        </Camera>
        <View style={{ flex: 1 }}></View>

        <Clickable text={"[change camera]"} handlePress={changeCameraFrontBack}/>
        <Clickable text={"[take picture]"} handlePress={takePicture}/>

      </View>
    );
  }
  
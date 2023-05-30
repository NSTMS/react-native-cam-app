import React, { useState, useEffect,useRef } from 'react';
import { View, Text, ScrollView , Alert ,StyleSheet,Animated,Dimensions,StatusBar} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { BackgroudColors, Components, Fonts, FontSizes, Styles } from '../static/styles/styles';
import ClickableImage from './ClickableImage';
const screenHeight =  Dimensions.get('window').height 
export default function CameraView({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [animatedPos, setAnimatedPos] = useState(new Animated.Value(screenHeight))
    const [hidden, setHidden] = useState(true)
    const [cameraSettings, setCameraSettings] = useState({
      whiteBalances: {},
      ratios :[],
      flashMode: {}
    })
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
    const getSizes = async () =>{
      let availableRatios = []
      const ratios = await cameraRef.current.getSupportedRatiosAsync()
      for(const ratio of ratios)
      {
        const sizes = await cameraRef.current.getAvailablePictureSizesAsync(ratio);
        availableRatios.push(...sizes)
      }
      setCameraSettings({
        // ratios: [...availableRatios],
        ratios: [...ratios],
        whiteBalances : Camera.Constants.WhiteBalance,
        flashMode : Camera.Constants.FlashMode
      })
    }
    const changeCameraFrontBack = () =>{
        setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
    }
    const toggleAnimatedView = () =>{
      const toPos = (hidden)? 0 :screenHeight
      Animated.spring(
        animatedPos,{
          toValue:toPos, 
          velocity:1,
          tension:0,
          friction:10,
          useNativeDriver:true
        }
      ).start()
      setHidden(!hidden)

    }
    return (
      <View style={{ flex: 4 }}>
        <StatusBar />
        <Camera 
          style={{ flex: 7 }} 
          type={type} 
          ref={cameraRef}
          onCameraReady={() => getSizes()}
          >
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
           <ClickableImage uri={"https://cdn-icons-png.flaticon.com/512/3524/3524659.png"}  handlePress={toggleAnimatedView} styles={ [Styles.CenteredView,Components.CricleButton]}/>
        </View>
        <Animated.View
                    style={[styles.animatedView,
                        {
                            transform: [
                                { translateY: animatedPos}
                            ]
                        }]} >
                      <ScrollView>
                      <View>
                        <Text style={[FontSizes.SmallFontSize, Fonts.bold]}>WhiteBalance</Text>
                        {
                          Object.keys(cameraSettings.whiteBalances).map(key=>{return <Text>{key}</Text>})
                        }
                      </View>
                      <View>
                        <Text style={[FontSizes.SmallFontSize, Fonts.bold]}>FlashMode</Text>
                        {
                          Object.keys(cameraSettings.flashMode).map(key=>{return <Text>{key}</Text>})
                        }
                      </View>
                      <View>
                        <Text style={[FontSizes.SmallFontSize, Fonts.bold]}>Ratios</Text>
                        {
                          cameraSettings.ratios.map(r=> {return <Text>{r}</Text>})
                        }
                      </View>
                      </ScrollView>
                    
        </Animated.View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00ff00",
        height: screenHeight,
        width:160,
        textAlign:"center",
        padding:10,
        paddingTop:100,
    }
});
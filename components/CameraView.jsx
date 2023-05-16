import { SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import { Camera } from "expo-camera";

export default function CameraView({navigation}){
    const [hasCameraPermission, changeCameraPermission] = useState(false)
    const [camera, setCamera] = useState({})
    useEffect(()=>{
        (async ()=>{
            let { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('brak uprawnień do kamery')
                changeCameraPermission(false)
            }
            else {
                changeCameraPermission(true)
                setCamera({type:Camera.Constants.Type.back})
            }
            // this.setState({ hasCameraPermission: status == 'granted' });

        })()
    },[])

    const changeFrontBackCamera = () =>{
        setCamera({...camera,
            type: (camera.type == Camera.Constants.Type.back)? Camera.Constants.Type.front:Camera.Constants.Type.back,
            
        })
    }
    const takePicture = () =>{

    }
    return (
        <SafeAreaView>
            {
                (hasCameraPermission)?
                <Text>Nie masz zezwolenia do korzystania z kamery telefonu</Text>
                :
                <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => {
                        this.camera = ref; // Uwaga: referencja do kamery używana później
                    }}
                    style={{ flex: 1 }}
                    type={this.state.type}>
                    <View style={{ flex: 1 }}>
                        {/* tutaj wstaw buttony do obsługi kamery */}
                    </View>
                </Camera>
            </View>
        
            }
        </SafeAreaView>
    )
}
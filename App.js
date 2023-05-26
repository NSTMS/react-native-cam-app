import React, { useEffect, useState } from 'react'
import { NavigationContainer,s } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native'
import { ActivityIndicator } from 'react-native';
import {Styles} from "./static/styles/styles" 
import * as Font from "expo-font";
const Stack = createNativeStackNavigator();
import MainView from './components/MainView';
import GalleryView from './components/GalleryView';
import CameraView from './components/CameraView';
import ImageView from './components/ImageView';

export default function App() {
  const [visibility, setVislibility] = useState(false)
  useEffect(() => {
    async function load() {
      await Font.loadAsync({
        'bold': require('./static/fonts/bold.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        'light': require('./static/fonts/light.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter        
        'medium': require('./static/fonts/medium.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter        
        'regular': require('./static/fonts/regular.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter        
        'regularItalic': require('./static/fonts/regularItalic.otf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter        
      })
      setVislibility(true)
    }
    load()
  }, [])

  return (
    <>
      {
        (visibility) ?
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="main" component={MainView} />
              <Stack.Screen name="gallery" component={GalleryView} />
              <Stack.Screen name="camera" component={CameraView} />
              <Stack.Screen name="image" component={ImageView} />
            </Stack.Navigator>
          </NavigationContainer>
          :
          <SafeAreaView style={Styles.CenteredView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </SafeAreaView>
      }
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
// import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import ThemeManager from "./themes/ThemeManager";

// const fetchFonts = () => {
//   return Font.loadAsync({
//   'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
//   'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
//   });
// };

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    zocial: require("./assets/fonts/zocial.ttf"),
  });
  // console.disableYellowBox = true; // Para deshabilitar los warnings

  // else {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text style={{ fontFamily: 'Inter-Black', fontSize: 40 }}>Inter Black</Text>
  //       <Text style={{ fontSize: 40 }}>Platform Default</Text>
  //     </View>
  //   );
  // }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeManager>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </ThemeManager>
    );
  }
}

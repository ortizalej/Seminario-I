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
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// const fetchFonts = () => {
//   return Font.loadAsync({
//   'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
//   'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
//   });
// };

export default function App() {
  // GoogleSignin.configure({
  //   scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId: "<FROM DEVELOPER CONSOLE>", // client ID of type WEB for your server (needed to verify user ID and offline access)
  //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   hostedDomain: "", // specifies a hosted domain restriction
  //   loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  //   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //   accountName: "", // [Android] specifies an account name on the device that should be used
  //   iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //   googleServicePlistPath: "", // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // });
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    zocial: require("./assets/fonts/zocial.ttf"),
  });
  console.disableYellowBox = true; // Para deshabilitar los warnings

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

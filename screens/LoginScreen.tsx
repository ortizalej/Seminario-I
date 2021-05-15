import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Text } from "react-native";
import { View } from "../components/Themed";
import { Button, Form, Item, Input, Spinner } from "native-base";
// import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../styles/global";
import * as Google from "expo-google-app-auth";

const AND_CLIENT_ID = "MT0Mi4mMZ36VOT7dM136dEeo";
async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      behavior: "web",
      // iosClientId: IOS_CLIENT_ID,
      androidClientId: AND_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const signInWithGoogle = () => {
    signInWithGoogleAsync();
  };
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Home");
    }, 2000);
  };

  return (
    <View style={[styles.container]}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <EditScreenInfo path='/screens/LoginScreen.tsx' /> */}
      <View style={[styles.content, { backgroundColor: "transparent" }]}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 280, height: 200, marginBottom: -20 }}
        />
        <Text style={styles.title}>Ingresá tus datos</Text>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "blue",
        }}
      >
        <View
          style={{
            flex: 6,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "blue",
          }}
        >
          <Form>
            <Item
              inlineLabel
              last
              style={[globalStyles.input, { width: "80%" }]}
            >
              <Input
                placeholder="Email"
                style={{ width: "100%" }}
                onChangeText={(texto) => setEmail(texto)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                secureTextEntry={true}
                placeholder="Contraseña"
                onChangeText={(texto) => setPassword(texto)}
              />
            </Item>
          </Form>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            flex: 1,
            // backgroundColor: "red",
            marginBottom: 60,
          }}
        >
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Recordarme</Text>
          </View>
          <Text style={{ color: "#656771" }}>¿Olvidaste tu contraseña?</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.buttonContainer}>
          <Button
            block
            primary
            style={[globalStyles.button]}
            onPress={() => handleLogin()}
          >
            <Text style={globalStyles.buttonText}>Acceder</Text>
          </Button>
          <Button
            block
            onPress={() => signInWithGoogle()}
            style={[globalStyles.button, { backgroundColor: "#2d3748" }]}
          >
            <Image
              source={require("../assets/images/googleIcon.png")}
              style={{ width: 34, height: 34, marginRight: 20 }}
            />
            <Text style={globalStyles.buttonText}>Continúa con Google</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.title]}>¿Aún no tienes cuenta?</Text>
          <Text
            style={[styles.title, { color: "#2b6cb0", marginLeft: 3 }]}
            onPress={() => navigation.navigate("Register")}
          >
            Regístrate
          </Text>
        </View>
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#5985EB" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#656771",
    marginBottom: 12,
    marginTop: 0,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    width: "80%",
  },
  button: {
    width: "90%",
    backgroundColor: "#5985EB",
    textAlign: "center",
  },
  buttonText: {
    width: "100%",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  checkboxContainer: {
    flexDirection: "row",
    // marginBottom: 20,
  },
  checkbox: {
    // alignSelf: "center",
  },
  checkboxLabel: {
    margin: 8,
    color: "#656771",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

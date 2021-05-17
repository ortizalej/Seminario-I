import React, { useEffect, useState } from "react";
import { Image, StyleSheet, ToastAndroid } from "react-native";

import { TextInput } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input } from "native-base";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import * as Google from "expo-google-app-auth";
import Spinner from "../../components/Spinner";
import PropTypes from "prop-types";
import { CustomContainer, ButtonContainer, Title } from "./login.styles";
import { authUserService } from "../../services/userService";

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
  const [msg, setMsg] = useState<string>("");

  // const [userGoogle, setUserGoogle] = useState<GoogleUser>();
  const navigation = useNavigation();

  useEffect(() => {
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  }, [msg]);

  const signInWithGoogle = () => {
    signInWithGoogleAsync();
  };

  const login = async () => {
    const resp = await authUserService(email, password);
    if (resp.isSuccess) {
      setLoading(false);
      console.log("Iniciando sesión");
      navigation.navigate("Home");
    } else {
      setMsg(resp.msg);
      setLoading(false);
    }
  };

  // Cuando el usuario presiona en iniciar sesión.
  const handleSubmit = async () => {
    //validar
    if (email === "" || password === "") {
      // Mostrar un error
      setMsg("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      // autenticar el usuario
      login();
    } catch (error) {
      setMsg(`Error: ${error}`);
      setLoading(false);
      setMsg(error.message);
    }
  };

  // Somewhere in your code
  const signIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // console.log("GoogleUser", userInfo);
      // setUserGoogle(userInfo);
    } catch (error) {
      console.log("errorrrrr", error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  return (
    <CustomContainer>
      <View style={[styles.content, { backgroundColor: "transparent" }]}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 280, height: 200, marginBottom: -20 }}
        />
        <Title style={styles.title}>Iniciar Sesión</Title>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 6,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
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
            marginBottom: 60,
          }}
        >
          <View style={styles.checkboxContainer}>
            {/* <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              style={styles.checkbox}
            /> */}
            <Checkbox
              status={rememberMe ? "checked" : "unchecked"}
              color="#5985EB"
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
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
        <ButtonContainer>
          <Button
            block
            primary
            style={[globalStyles.button]}
            onPress={() => handleSubmit()}
          >
            <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
          </Button>
          <Button
            block
            onPress={() => signIn()}
            style={[globalStyles.button, { backgroundColor: "#2d3748" }]}
          >
            <Image
              source={require("../../assets/images/googleIcon.png")}
              style={{ width: 34, height: 34, marginRight: 20 }}
            />
            <Text style={globalStyles.buttonText}>Continúa con Google</Text>
          </Button>
        </ButtonContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.text]}>¿Aún no tienes cuenta?</Text>
          <Text
            style={[styles.text, { color: "#2b6cb0", marginLeft: 3 }]}
            onPress={() => navigation.navigate("Register")}
          >
            Regístrate
          </Text>
        </View>
      </View>
      {loading && <Spinner />}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#656771",
    marginBottom: 12,
    marginTop: 0,
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
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {},
  checkboxLabel: {
    margin: 8,
    color: "#656771",
  },
});

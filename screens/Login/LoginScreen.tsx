import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  Text,
  BackHandler,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input, Label, Icon } from "native-base";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import * as Google from "expo-google-app-auth";
import Spinner from "../../components/Spinner";
import { CustomContainer, ButtonContainer, Title } from "./login.styles";
import {
  authGoogleUserService,
  authUserService,
} from "../../services/userService";
import * as GoogleSignIn from "expo-google-sign-in";
import { User, USERLOGGED } from "../../types";
import { getItem, saveItem } from "../../utils/storage";

const AND_CLIENT_ID =
  "697141169536-dmouqiibccemb1q1c1fee1pk9erp9dao.apps.googleusercontent.com";
async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: AND_CLIENT_ID,
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      return result.user;
    } else {
      return null;
    }
    // if (result.type === "success") {
    //   return result.user;
    //   // return result.accessToken;
    // } else {
    //   console.log("cancelled");
    //   return null;
    // }
  } catch (e) {
    console.log("e", e);
    return { error: true };
  }
}

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  // const [loginGoogleLoaded, setLoginGoogleLoaded] = useState<boolean>(false);
  // const [userGoogleInfo, setUserGoogleInfo] = useState<GoogleUser>();

  const [userGoogle, setUserGoogle] =
    useState<GoogleSignIn.GoogleUser | null>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // initAsync();
    if (isFocused) {
      isUserCatched();
    }
    // GoogleSignin.configure({
    //   webClientId: WEB_CLIENT_ID,
    //   offlineAccess: true,
    // });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, [isFocused]);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setLoginGoogleLoaded(true);
  //     setUserGoogleInfo(userInfo);
  //   } catch (error) {
  //     console.log("errorrrr", error.message);
  //   }
  // };

  useEffect(() => {
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      setMsg("");
    }
  }, [msg]);

  // const initAsync = async () => {
  //   await GoogleSignIn.initAsync({
  //     // You may ommit the clientId when the firebase `googleServicesFile` is configured
  //     clientId: AND_CLIENT_ID,
  //     webClientId: WEB_CLIENT_ID,
  //   });
  //   _syncUserWithStateAsync();
  // };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUserGoogle(user);
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUserGoogle(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      console.log(message);
      // alert("login: Error:" + message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const googleUsr: Google.GoogleUser | any = await signInWithGoogleAsync();
      console.log("googleUsr", googleUsr);
      if (!googleUsr) {
        setMsg("Ocurrio un error al loguearse con Google");
      } else {
        const newUser: User = {
          email: googleUsr.email,
          password: "123456",
          fromGoogle: true,
          name: googleUsr.givenName,
          surname: googleUsr.familyName,
          image: googleUsr.photoUrl,
          phoneNumber: "",
          prefix: "",
          remembered: true,
        };
        loginFromGoogle(newUser);
      }
    } catch (error) {
      setMsg("Ocurrio un error al loguearse con Google");
    } finally {
      setLoading(false);
    }
  };

  const onPress = () => {
    if (userGoogle) {
      signOutAsync();
    } else {
      signInAsync();
    }
  };

  const isUserCatched = async () => {
    const user = await getItem(USERLOGGED);
    if (user && user.remembered) {
      // console.log("usuario cacheado", user);
      navigation.navigate("Menu");
    }
  };

  const login = async () => {
    const resp = await authUserService(email, password);
    console.log("resppp", resp);
    if (resp.isSuccess) {
      await saveItem(USERLOGGED, {
        id: resp.msg._id,
        email: resp.msg.email,
        name: resp.msg.name,
        surname: resp.msg.surname,
        phoneNumber: resp.msg.phoneNumber,
        prefix: resp.msg.prefix,
        image: resp.msg.image,
        password: password,
        remembered: rememberMe,
        fromGoogle: false,
      });
      setLoading(false);
      navigation.navigate("Menu");
    } else {
      setMsg(resp.msg);
      setLoading(false);
    }
  };

  const loginFromGoogle = async (newUser) => {
    console.log("loginFromGoogle", newUser);
    const resp = await authGoogleUserService(newUser);
    console.log("resppp", resp);
    if (resp.isSuccess) {
      await saveItem(USERLOGGED, {
        id: resp.msg._id,
        email: resp.msg.email,
        name: resp.msg.name,
        surname: resp.msg.surname,
        phoneNumber: resp.msg.phoneNumber,
        prefix: resp.msg.prefix,
        image: resp.msg.image,
        password: password,
        remembered: true,
        fromGoogle: true,
      });
      setLoading(false);
      navigation.navigate("Menu");
    } else {
      setMsg(resp.msg);
      setLoading(false);
    }
  };

  // Cuando el usuario presiona en iniciar sesi??n.
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
  // const signIn = async () => {
  //   try {
  //     // await GoogleSignin.hasPlayServices();
  //     // const userInfo = await GoogleSignin.signIn();
  //     // setUserGoogle(userInfo);
  //   } catch (error) {
  //     // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     //   // user cancelled the login flow
  //     // } else if (error.code === statusCodes.IN_PROGRESS) {
  //     //   // operation (e.g. sign in) is in progress already
  //     // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     //   // play services not available or outdated
  //     // } else {
  //     //   // some other error happened
  //     // }
  //   }
  // };

  return (
    <CustomContainer>
      <View style={[styles.content, { backgroundColor: "transparent" }]}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 280, height: 200, marginBottom: -20 }}
        />
        <Title>Iniciar Sesi??n</Title>
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
          <Form style={{ marginTop: 10 }}>
            <Item
              floatingLabel
              last
              style={[globalStyles.input, { width: "80%", marginBottom: 0 }]}
            >
              <Label>Email</Label>
              <Input
                placeholder="Email"
                style={{ width: "100%" }}
                onChangeText={(texto) => setEmail(texto)}
              />
            </Item>
            <Item floatingLabel last style={globalStyles.input}>
              <Label>Contrase??a</Label>
              <Input
                secureTextEntry={!showPassword}
                placeholder="Contrase??a"
                onChangeText={(texto) => setPassword(texto)}
              />
              <Icon
                style={{ fontSize: 22 }}
                name={!showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword((pass) => !pass)}
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
            marginBottom: 25,
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
          <Text style={{ color: "#656771" }}>??Olvidaste tu contrase??a?</Text>
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
            <Text style={globalStyles.buttonText}>Iniciar sesi??n</Text>
          </Button>
          <Button
            block
            // onPress={() => signIn()}
            onPress={() => signInWithGoogle()}
            // onPress={() => onPress()}
            style={[globalStyles.button, { backgroundColor: "#2d3748" }]}
          >
            <Image
              source={require("../../assets/images/googleIcon.png")}
              style={{ width: 34, height: 34, marginRight: 20 }}
            />
            <Text style={globalStyles.buttonText}>Continuar con Google</Text>
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
          <Text style={[styles.text]}>??A??n no tienes cuenta?</Text>
          <Text
            style={[styles.text, { color: "#2b6cb0", marginLeft: 3 }]}
            onPress={() => navigation.navigate("Register")}
          >
            Reg??strate
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
    // fontFamily: "Roboto",
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

import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
// import CheckBox from "@react-native-community/checkbox";
import { Checkbox } from "react-native-paper";
import { Text, Button as NativeButton } from "react-native";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input, Label, Icon } from "native-base";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import RNPhoneCodeSelect from "react-native-phone-code-select";
import {
  CustomContainer,
  InputContainer,
  ContainerInput,
  ButtonContainer,
  Title,
} from "./user.styles";
import { updateUserService } from "../../services/userService";
import * as Permissions from "expo-permissions";
import { ServiceResult, User, USERLOGGED } from "../../types";
import Modal from "../../components/Modal";
// import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import useUserLogged from "../../hooks/useUserLogged";
import { saveItem } from "../../utils/storage";
import ImagePicker from "../../components/ImagePicker";

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
const getUser = async () => {
  const user = await useUserLogged();
  return user;
};

export default function UserScreen() {
  // const phone = useRef("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const [user, setUser] = useState<User>();

  const navigation = useNavigation();

  const IMAGE_NOT_AVAILABLE = "../../assets/images/noImageAvailable.png";
  useEffect(() => {
    const getUser = async () => {
      const usr = await useUserLogged();
      setUser(usr);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setPassword(user.password);
      setPrefix(user.prefix);
      setPhoneNumber(user.phoneNumber);
      user.image && setImage(user.image);
    }
  }, [user]);

  useEffect(() => {
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      setMsg("");
    }
  }, [msg]);

  useEffect(() => {
    if (selectedCountry) {
      setPrefix(selectedCountry.dial_code);
    }
  }, [selectedCountry]);

  const handleSubmit = async () => {
    setLoading(true);
    // setTimeout(() => {
    //validar
    if (
      name === "" ||
      surname === "" ||
      prefix === "" ||
      phoneNumber === "" ||
      email === "" ||
      password === ""
    ) {
      // Mostrar un error
      setLoading(false);
      setMsg("Todos los campos son obligatorios");
      return;
    }

    //password al menos 6 caracteres
    if (password.length < 6) {
      setLoading(false);
      setMsg("El password debe ser de al menos 6 caracteres");
      return;
    }
    //actualizar el usuario/cuenta
    try {
      updateUser();
    } catch (error) {
      setMsg(error.message.replace("Error:", ""));
      console.log("errorr", error);
    } finally {
      setLoading(false);
    }
    // }, 1000);
  };

  const updateUser = async () => {
    setLoading(true);
    const userToUpdate: User = {
      id: user ? user.id : "",
      name,
      surname,
      phoneNumber,
      prefix,
      email,
      image,
      password,
      remembered: user ? user.remembered : false,
    };
    const resp = await updateUserService(userToUpdate);
    if (resp.isSuccess) {
      setMsg(resp.msg);
      setMsg(`${name} ha actualizado sus datos correctamente`);
      // Actualizamos usuario cacheado
      await saveItem(USERLOGGED, userToUpdate);
    } else {
      setMsg(resp.msg);
    }
    setLoading(false);
  };

  const goPickImage = () => {
    // navigation.navigate("ImagePicker");
    setShowImagePicker(true);
  };

  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
        {showImagePicker ? (
          <ImagePicker
            setImage={setImage}
            onClose={() => setShowImagePicker(false)}
            key={0}
          />
        ) : (
          <ScrollView>
            <Title>Información del Usuario</Title>
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Form
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "flex-end",
                  }}
                >
                  <Image
                    source={
                      image
                        ? {
                            uri: image,
                          }
                        : require(IMAGE_NOT_AVAILABLE)
                    }
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 150 / 2,
                      borderWidth: 1,
                    }}
                  />
                  <Feather
                    name="edit"
                    size={24}
                    color="grey"
                    style={{ marginLeft: -15 }}
                    onPress={() => goPickImage()}
                  />
                  {/* <Button
                    block
                    primary
                    style={[
                      {
                        backgroundColor: "#5985EB",
                        marginTop: 3,
                        marginLeft: 3,
                        borderRadius: 5,
                        height: 32,
                        width: 140,
                        alignSelf: "center",
                      },
                    ]}
                    onPress={() => goPickImage()}
                  >
                    <Text style={{ fontSize: 20, color: "#ffffff" }}>
                      {image ? "Actualizar imagen" : "Agregar Imagen"}
                    </Text>
                  </Button> */}
                </View>
                <Item
                  floatingLabel
                  style={[
                    globalStyles.input,
                    { width: "90%", marginBottom: 0 },
                  ]}
                >
                  <Label>Nombre</Label>
                  <Input
                    autoFocus
                    placeholder="Nombre"
                    value={name}
                    style={{ width: "100%" }}
                    onChangeText={(texto) => setName(texto)}
                  />
                </Item>
                <Item
                  floatingLabel
                  style={[
                    globalStyles.input,
                    { width: "90%", marginBottom: 0 },
                  ]}
                >
                  <Label>Apellido</Label>
                  <Input
                    autoFocus
                    placeholder="Apellido"
                    value={surname}
                    style={{ width: "100%" }}
                    onChangeText={(texto) => setSurname(texto)}
                  />
                </Item>
                <InputContainer style={{ marginBottom: 0 }}>
                  <ContainerInput floatingLabel style={{ flex: 1 }}>
                    <Label>Prefijo</Label>
                    <Input
                      autoFocus
                      placeholder="Prefijo"
                      onFocus={() => setVisible(true)}
                      value={prefix ? prefix : selectedCountry?.dial_code}
                    />
                    <PrefixPicker
                      visible={visible}
                      setVisible={setVisible}
                      setSelectedCountry={setSelectedCountry}
                    />
                  </ContainerInput>
                  <ContainerInput floatingLabel style={{ width: "70%" }}>
                    <Label>Teléfono</Label>
                    <Input
                      keyboardType="numeric"
                      placeholder="Teléfono"
                      value={String(phoneNumber)}
                      onChangeText={(val) => setPhoneNumber(val)}
                    />
                  </ContainerInput>
                </InputContainer>
                <Item
                  floatingLabel
                  style={[
                    globalStyles.input,
                    { width: "90%", marginBottom: 0 },
                  ]}
                >
                  <Label>Email</Label>
                  <Input
                    autoFocus
                    placeholder="Email"
                    value={email}
                    style={{ width: "90%" }}
                    onChangeText={(texto) => setEmail(texto)}
                  />
                </Item>
                <Item
                  floatingLabel
                  style={
                    (globalStyles.input, { width: "90%", marginBottom: 0 })
                  }
                >
                  <Label>Contraseña</Label>
                  <Input
                    autoFocus
                    secureTextEntry={!showPassword}
                    value={password}
                    placeholder="Contraseña"
                    onChangeText={(texto) => setPassword(texto)}
                  />
                  <Icon
                    style={{ fontSize: 22 }}
                    name={!showPassword ? "eye" : "eye-off"}
                    onPress={() => setShowPassword((pass) => !pass)}
                  />
                </Item>
              </Form>
              <ButtonContainer style={{}}>
                <Button
                  block
                  primary
                  style={[globalStyles.button, {}]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={globalStyles.buttonText}>Guardar</Text>
                </Button>
              </ButtonContainer>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      {loading ? <Spinner /> : null}
    </CustomContainer>
  );
}

const PrefixPicker = ({ visible, setVisible, setSelectedCountry }) => (
  <RNPhoneCodeSelect
    visible={visible}
    onDismiss={() => setVisible(false)}
    onCountryPress={(country) => setSelectedCountry(country)}
    primaryColor="#5985EB"
    secondaryColor="#E8E8E8"
    buttonText="Ok"
  />
);

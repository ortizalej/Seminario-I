import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import CheckBox from "@react-native-community/checkbox";
import { Checkbox } from "react-native-paper";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input, Label } from "native-base";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import RNPhoneCodeSelect from "react-native-phone-code-select";
import {
  Content,
  CustomContainer,
  InputContainer,
  ButtonContainer,
  Title,
  QuestionText,
  LoginText,
  ContainerInput,
} from "./register.styles";
import { createUserService } from "../../services/userService";
import { ServiceResult, User } from "../../types";
import Modal from "../../components/Modal";

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
export default function RegisterScreen() {
  // const phone = useRef("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showTerms, setShowTerms] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const createUser = async () => {
    setLoading(true);
    const user: User = {
      name,
      surname,
      phoneNumber,
      prefix,
      email,
      password,
      remembered: false,
    };
    const resp = await createUserService(user);
    if (resp.isSuccess) {
      setMsg(resp.msg);
      setMsg(`${name} registrado correctamente`);
      navigation.navigate("Login");
    } else {
      setMsg(resp.msg);
    }
    setLoading(false);
  };

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
      password === "" ||
      !acceptTerms
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

    //guardar el usuario
    try {
      createUser();
    } catch (error) {
      setMsg(error.message.replace("Error:", ""));
      console.log("errorr", error);
    } finally {
      setLoading(false);
    }
    // }, 1000);
  };

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

  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
        <ScrollView>
          <Content>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 280, height: 200 }}
            />
            <Title>Crear cuenta</Title>
          </Content>
          <View
            testID="formLogin"
            style={{
              flex: 4,
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Form style={{ width: "90%" }}>
              <InputContainer>
                <ContainerInput floatingLabel style={{ flex: 1 }}>
                  <Label>Nombre</Label>
                  <Input
                    placeholder="Nombre"
                    onChangeText={(val) => setName(val)}
                  />
                </ContainerInput>
                <ContainerInput floatingLabel style={{ flex: 1 }}>
                  <Label>Apellido</Label>
                  <Input
                    placeholder="Apellido"
                    onChangeText={(val) => setSurname(val)}
                  />
                </ContainerInput>
              </InputContainer>

              <InputContainer>
                <ContainerInput style={{ flex: 1 }}>
                  <Input
                    placeholder="Prefijo"
                    onFocus={() => setVisible(true)}
                    value={selectedCountry?.dial_code}
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
                    onChangeText={(val) => setPhoneNumber(val)}
                  />
                </ContainerInput>
              </InputContainer>
              <InputContainer>
                <ContainerInput floatingLabel style={{ width: "97%" }}>
                  <Label>Email</Label>
                  <Input
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(val) => setEmail(val)}
                  />
                </ContainerInput>
              </InputContainer>
              <InputContainer>
                <ContainerInput floatingLabel style={{ width: "97%" }}>
                  <Label>Contraseña</Label>
                  <Input
                    secureTextEntry={true}
                    placeholder="Contraseña"
                    onChangeText={(val) => setPassword(val)}
                  />
                </ContainerInput>
              </InputContainer>
              <View style={styles.checkboxContainer}>
                {/* <CheckBox
                  value={acceptTerms}
                  onValueChange={setAcceptTerms}
                  style={styles.checkbox}
                /> */}
                <Checkbox
                  status={acceptTerms ? "checked" : "unchecked"}
                  color="#5985EB"
                  onPress={() => {
                    setAcceptTerms(!acceptTerms);
                  }}
                />
                <Text style={styles.checkboxLabel}>
                  Estoy de acuerdo y acepto los{" "}
                  <Text
                    style={{
                      color: "#5985EB",
                      textDecorationLine: "underline",
                    }}
                    onPress={() => setShowTerms(!showTerms)}
                  >
                    términos y condiciones
                  </Text>
                </Text>
              </View>
            </Form>
            {/* </ScrollView>
        </SafeAreaView> */}
          </View>
          {/* <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
        <ScrollView> */}
          <View
            testID="button-Container"
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <ButtonContainer>
              <Button
                block
                primary
                style={[globalStyles.button]}
                onPress={() => handleSubmit()}
              >
                <Text style={globalStyles.buttonText}>Registrarme</Text>
              </Button>
            </ButtonContainer>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // marginBottom: -100
              }}
            >
              <QuestionText>¿Ya estás registrado?</QuestionText>
              <LoginText onPress={() => navigation.navigate("Login")}>
                Ingresá
              </LoginText>
            </View>
          </View>
        </ScrollView>
        <Modal
          text="Los presentes términos y condiciones (en lo sucesivo los 'Términos y Condiciones de la Aplicación')
          contienen los acuerdos que rigen (i) la relación entre Passenger, S.A. de C.V., o sus filiales o
          subsidiarias (en lo sucesivo la “Sociedad”), con las personas (en lo sucesivo el o los “Usuario(s)”) que
          descarguen cualesquier aplicación desarrollada por la Sociedad (en lo sucesivo la o las “Aplicación(es)”), (ii)
          así como las marcas, los productos y los servicios que preste la Sociedad (en lo sucesivo los “Servicios”). Al
          descargar la Aplicación, el Usuario deberá manifestar su aceptación de los presentes Términos y Condiciones
          de la Aplicación a efecto de poder usar la Aplicación, y en caso de que no los acepte, el Usuario deberá de
          abstenerse de usar la Aplicación.
          Cualesquier término no definido en los presentes Términos y Condiciones de la Aplicación se entenderán
          definidos en los Términos y Condiciones del Sitio. Cualquier cuestión no prevista por los Términos y
          Condiciones de la Aplicación, los Términos y Condiciones del Sitio se aplicarán de forma supletoria. En caso
          de interpretación o controversia con entre los Términos y Condiciones de la Aplicación y los Términos y
          Condiciones del Sitio, prevalecerán los últimos sobre los primeros."
          visible={showTerms}
          onClose={() => setShowTerms(false)}
        />
      </SafeAreaView>

      {loading && <Spinner />}
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

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxLabel: {
    margin: 8,
    color: "#656771",
    fontSize: 15,
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input } from "native-base";
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

  const [msg, setMsg] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const createAccount = async () => {
    setLoading(true);
    // const resp = await createAccountService(nombre, email, password);

    // if (resp.isSuccess) {
    //   setMsg(resp.data);
    setMsg(`${name} registrado correctamente`);
    navigation.navigate("Login");
    // } else {
    //   setMsg(resp.data);
    // }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
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
        setMsg("creando cuenta");
        createAccount();
      } catch (error) {
        setMsg(error.message.replace("Error:", ""));
        console.log("erroreee", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  }, [msg]);

  useEffect(() => {
    if (selectedCountry) {
      setPrefix(selectedCountry.dial_code);
    }
  }, [selectedCountry]);

  return (
    <CustomContainer>
      {/* <SafeAreaView style={{ flex: 1 }}>
        <ScrollView> */}
      <Content>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 280, height: 200, marginBottom: -50 }}
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
            <ContainerInput regular style={{ flex: 1 }}>
              <Input
                placeholder="Nombre"
                onChangeText={(val) => setName(val)}
              />
            </ContainerInput>
            <ContainerInput regular style={{ flex: 1 }}>
              <Input
                placeholder="Apellido"
                onChangeText={(val) => setSurname(val)}
              />
            </ContainerInput>
          </InputContainer>

          <InputContainer>
            <ContainerInput regular style={{ flex: 1 }}>
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
            <ContainerInput regular style={{ width: "70%" }}>
              <Input
                keyboardType="numeric"
                placeholder="Telefono"
                onChangeText={(val) => setPhoneNumber(val)}
              />
            </ContainerInput>
          </InputContainer>

          <ContainerInput regular last style={{ width: "97%" }}>
            <Input
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={(val) => setEmail(val)}
            />
          </ContainerInput>
          <ContainerInput regular last style={{ width: "97%" }}>
            <Input
              secureTextEntry={true}
              placeholder="Contraseña"
              onChangeText={(val) => setPassword(val)}
            />
          </ContainerInput>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={acceptTerms}
              onValueChange={setAcceptTerms}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Estoy de acuerdo y acepto los terminos y condiciones
            </Text>
          </View>
        </Form>
      </View>

      <View
        testID="button-Container"
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
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
          }}
        >
          <QuestionText>¿Ya estás registrado?</QuestionText>
          <LoginText onPress={() => navigation.navigate("Register")}>
            Ingresá
          </LoginText>
        </View>
      </View>
      {loading && <Spinner />}
      {/* </ScrollView>
      </SafeAreaView> */}
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
    fontFamily: "Roboto",
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
  },
});

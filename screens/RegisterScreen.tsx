import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Button as NativeButtom,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Text } from "react-native";
import { View } from "../components/Themed";
import { Button, Form, Item, Input } from "native-base";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../styles/global";
import styled from "styled-components/native";
import Spinner from "../components/Spinner";
import RNPhoneCodeSelect from "react-native-phone-code-select";

const Content = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const ButtonContainer = styled.View`
  margin-bottom: 40px;
  background-color: ${(props) => props.theme.backgroundColor};
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-bottom: 12px;
  margin-top: 0px;
  text-align: left;
  width: 100%;
`;

const QuestionText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-bottom: 12px;
  margin-top: 0px;
`;

const LoginText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.darkBlue};
  margin-bottom: 12px;
  margin-top: 0px;
  margin-left: 3px;
`;

const ContainerInput = styled(Item)`
  color: ${(props) => props.theme.lightGreyTextColor};
  margin-bottom: 20px;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
`;

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

  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Login");
    }, 1000);
  };
  return (
    <CustomContainer>
      <Content>
        <Image
          source={require("../assets/images/logo.png")}
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
                secureTextEntry={true}
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
              {/* <PhoneInput style={{ height: 40 }} /> */}
              <PrefixPicker
                visible={visible}
                setVisible={setVisible}
                setSelectedCountry={setSelectedCountry}
              />
            </ContainerInput>
            <ContainerInput regular style={{ width: "70%" }}>
              <Input
                secureTextEntry={true}
                keyboardType="numeric"
                placeholder="Telefono"
                onChangeText={(val) => setPhoneNumber(val)}
              />
            </ContainerInput>
          </InputContainer>

          <ContainerInput regular last style={{ width: "97%" }}>
            <Input
              secureTextEntry={true}
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
          // marginTop: -30,
          marginBottom: 30,
        }}
      >
        <ButtonContainer>
          <Button
            block
            primary
            style={[globalStyles.button]}
            onPress={() => handleRegister()}
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
    </CustomContainer>
  );
}

const PrefixPicker = ({ visible, setVisible, setSelectedCountry }) => (
  <RNPhoneCodeSelect
    visible={visible}
    onDismiss={() => setVisible(false)}
    onCountryPress={(country) => setSelectedCountry(country)}
    primaryColor="#f04a4a"
    secondaryColor="#000000"
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

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
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { Button, Form, Item, Input } from "native-base";
import { useNavigation } from "@react-navigation/core";
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
import { createAccountService } from "../../services/userService";
import { ServiceResult, User } from "../../types";
import Modal from "../../components/Modal";
import * as ImagePicker from "expo-image-picker";

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
export default function UserScreen() {
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
  const [image, setImage] = useState(null);

  const [msg, setMsg] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      alert(result.uri);
      // setImage(result.uri);
    }
  };

  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
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
                marginTop: 50,
              }}
            >
              <Image
                source={require("../../assets/images/logo.png")}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  backgroundColor: "red",
                }}
              />
              {/* <Item
                inlineLabel
                last
                style={[globalStyles.input, { width: "80%" }]}
              >
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{ width: 280, height: 200 }}
                />
              </Item> */}
              <Item
                inlineLabel
                last
                style={[globalStyles.input, { width: "90%" }]}
              >
                <Input
                  placeholder="Nombre"
                  style={{ width: "100%" }}
                  onChangeText={(texto) => setName(texto)}
                />
              </Item>
              <Item
                inlineLabel
                last
                style={[globalStyles.input, { width: "90%" }]}
              >
                <Input
                  placeholder="Apellido"
                  style={{ width: "100%" }}
                  onChangeText={(texto) => setSurname(texto)}
                />
              </Item>
              <InputContainer>
                <ContainerInput inlineLabel style={{ flex: 1 }}>
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
                <ContainerInput inlineLabel style={{ width: "70%" }}>
                  <Input
                    keyboardType="numeric"
                    placeholder="Teléfono"
                    onChangeText={(val) => setPhoneNumber(val)}
                  />
                </ContainerInput>
              </InputContainer>
              <Item
                inlineLabel
                last
                style={[globalStyles.input, { width: "90%" }]}
              >
                <Input
                  placeholder="Email"
                  style={{ width: "90%" }}
                  onChangeText={(texto) => setEmail(texto)}
                />
              </Item>
              <Item
                inlineLabel
                last
                style={(globalStyles.input, { width: "90%" })}
              >
                <Input
                  secureTextEntry={true}
                  placeholder="Contraseña"
                  onChangeText={(texto) => setPassword(texto)}
                />
              </Item>
            </Form>
            <ButtonContainer style={{}}>
              <Button
                block
                primary
                style={[globalStyles.button, {}]}
                onPress={() => console.log("sarasa")}
              >
                <Text style={globalStyles.buttonText}>Guardar</Text>
              </Button>
            </ButtonContainer>
          </View>
        </ScrollView>
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

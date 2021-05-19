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
import { Button, Form, Item, Input } from "native-base";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import RNPhoneCodeSelect from "react-native-phone-code-select";
import { CustomContainer } from "./travel.styles";
import { createAccountService } from "../../services/userService";
import { ServiceResult, User } from "../../types";
import Modal from "../../components/Modal";

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
export default function TravelsScreen() {
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
          <Text>Mis viajes</Text>
        </ScrollView>
      </SafeAreaView>
      {loading && <Spinner />}
    </CustomContainer>
  );
}

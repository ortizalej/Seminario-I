import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import RNPhoneCodeSelect from "react-native-phone-code-select";
import { CustomContainer } from "./travel.styles";
// import { createAccountService } from "../../services/userService";
import { ServiceResult, Travel, User } from "../../types";
import Modal from "../../components/Modal";
import TravelCard from "../../components/TravelCard";

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
          {travels &&
            travels.map((travel) => (
              <TravelCard key={travel.id} travel={travel} />
            ))}
        </ScrollView>
      </SafeAreaView>
      {loading && <Spinner />}
    </CustomContainer>
  );
}

const travels: Travel[] = [
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
];

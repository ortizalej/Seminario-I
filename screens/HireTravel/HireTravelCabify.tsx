import React, { useState, FC } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import { Button, Badge, CardItem } from "native-base";
import {
  CustomContainer,
  ButtonContainer,
  AvailabilityText,
  AvailabilitySubText,
  PriceBadge,
  CustomText,
  TextContent,
  HeaderContainer,
  DirectionTextContainer,
  DirectionLabel,
  DirectionText,
  TextContainer,
  AmountContainer,
} from "./styles";

import { CabifyEstimateItemResponse, Travel } from "../../types";
import { convertCurrencyToSymbol } from "../../utils";
import {
  FontAwesome5,
  MaterialIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import moment from "moment";
import {
  getEnterpriseImage,
  getStatusColor,
  DATE_FORMAT,
} from "../../components/TravelCard";
import { createTravelService } from "../../services/travelService";

const HireTravelCabifyScreen: FC = ({ route }: any | undefined) => {
  const {
    coordsOrigen,
    coordsDestino,
    info,
    company,
    origenDirectionText,
    destinoDirectionText,
  } = route?.params;
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleSubmitCabify = async () => {
    const url = `cabify:///journey?json=%7B%22vehicle_type%22:%22c52ce29f50438491f8d6e55d5259dd40%22,%22stops%22:%5B%7B%22loc%22:%7B%22latitude%22:${coordsOrigen.latitude},%22longitude%22:${coordsOrigen.longitude}%7D,%20%22name%22:%22Goiko%20Grill%22%7D,%7B%22loc%22:%7B%22latitude%22:${coordsDestino.latitude},%22longitude%22:${coordsDestino.longitude}%7D%7D%5D%7D`;
    Linking.openURL(url);
  };

  const handleSubmitUber = async () => {
    const CLIENT_ID_UBER = "0vNYiF4VdcZkm6F2E9UclodnYfHx38L8";
    const url = `https://m.uber.com/ul/?client_id=<${CLIENT_ID_UBER}>&action=setPickup&pickup[latitude]=${coordsOrigen.latitude}&pickup[longitude]=${coordsOrigen.longitude}&pickup[nickname]=${origenDirectionText}&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${coordsDestino.latitude},%22longitude%22:${coordsDestino.longitude}%7D,%20%22name%22:%22Goiko%20Grill%22%7D,%7B%22loc%22:%7B%22latitude%22:${coordsDestino.latitude}&dropoff[longitude]=${coordsDestino.longitude}&dropoff[nickname]=${destinoDirectionText}&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`;
    Linking.openURL(url);
  };

  const handleSubmit = async () => {
    const newTravel: Travel = {
      amount: info.total.amount,
      date: new Date(),
      originAddress: origenDirectionText,
      destinationAddress: destinoDirectionText,
      enterprise: company,
      status: "Finalizado",
    };

    console.log("new travel", newTravel);
    const resp = await createTravelService(newTravel);
    ToastAndroid.show(resp.msg, ToastAndroid.SHORT);
    switch (company) {
      case "Uber":
        handleSubmitUber();
        break;
      case "Cabify":
      default:
        handleSubmitCabify();
        break;
    }
  };

  const travelDuration =
    info && info.duration ? Math.floor(info?.duration / 60) : 0;
  const travelArriveTime = moment()
    .add(travelDuration, "minutes")
    .format("hh:mm A");
  // console.log("travelArriveTime", travelArriveTime);
  return (
    <CustomContainer>
      <HeaderContainer>
        <AntDesign
          name="arrowleft"
          size={28}
          color="#5985EB"
          onPress={() => navigation.goBack()}
        />
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 210, height: 110, marginLeft: 40 }}
        />
      </HeaderContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30, width: "90%" }}>
        {info ? (
          <>
            <ScrollView>
              <AvailabilityText>
                Demanda actual:{" "}
                <AvailabilitySubText
                  lowAvailability={info.eta ? info.eta.lowAvailability : false}
                >
                  {info.eta && info.eta.lowAvailability ? "ALTA" : "BAJA"}
                </AvailabilitySubText>
              </AvailabilityText>
              <Badge
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  height: 140,
                  borderRadius: 30,
                }}
              >
                <View
                  style={{
                    flex: 5,
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                  }}
                >
                  <View style={{ flex: 2, backgroundColor: "transparent" }}>
                    <Image
                      source={getEnterpriseImage(company)}
                      style={{ width: 65, height: 65, borderRadius: 15 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 7,
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      height: 90,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons
                        name="location-on"
                        size={26}
                        color="#919aa3"
                        style={{ marginRight: 10, marginTop: 5 }}
                      />
                      <DirectionTextContainer>
                        <DirectionLabel>Lugar de Origen:</DirectionLabel>
                        <DirectionText>{origenDirectionText}</DirectionText>
                      </DirectionTextContainer>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <MaterialIcons
                        name="location-on"
                        size={26}
                        color="#5985eb"
                        style={{ marginRight: 10, marginTop: 5 }}
                      />
                      <DirectionTextContainer>
                        <DirectionLabel>Lugar de Destino:</DirectionLabel>
                        <DirectionText>{destinoDirectionText}</DirectionText>
                      </DirectionTextContainer>
                    </View>
                  </View>
                </View>
              </Badge>
              <TextContainer>
                <TextContent>
                  <FontAwesome5
                    name="car-alt"
                    size={26}
                    color="#5985EB"
                    style={{ marginRight: 6 }}
                  />
                  <CustomText>
                    El coche llegara en{"  "}
                    {info?.eta?.formatted?.replace("min", "minutos") ||
                      "0 minutos"}
                  </CustomText>
                </TextContent>
                <TextContent>
                  <AntDesign
                    name="clockcircleo"
                    size={26}
                    color="#5985EB"
                    style={{ marginRight: 6 }}
                  />
                  <CustomText>
                    El viaje durará{"  "}
                    {travelDuration} minutos aproximadamente
                  </CustomText>
                </TextContent>
                <TextContent>
                  <MaterialIcons
                    name="location-on"
                    size={26}
                    color="#5985EB"
                    style={{ marginRight: 6 }}
                  />
                  <CustomText>
                    Llegaras a las{"  "}
                    {travelArriveTime}
                  </CustomText>
                </TextContent>
                <TextContent>
                  <FontAwesome5
                    name="route"
                    size={26}
                    color="#5985EB"
                    style={{ marginRight: 6 }}
                  />
                  <CustomText>
                    Distancia del viaje:{"  "}
                    {info.distance
                      ? (info.distance / 1000).toFixed(1) + " km"
                      : "-"}
                  </CustomText>
                </TextContent>
              </TextContainer>
              <AmountContainer>
                <PriceBadge>
                  <Text style={{ fontSize: 18, padding: 2 }}>Precio Base</Text>
                  <Text
                    style={{ fontSize: 18, padding: 2, fontWeight: "bold" }}
                  >
                    {convertCurrencyToSymbol(info?.total?.currency)}{" "}
                    {(info?.total?.amount || 0)?.toFixed(2)}
                  </Text>
                </PriceBadge>
              </AmountContainer>
            </ScrollView>
          </>
        ) : (
          <Text>Ocurrio un error al obtener la información</Text>
        )}
      </SafeAreaView>
      <ButtonContainer style={{}}>
        <Button
          block
          primary
          style={[globalStyles.button, {}]}
          onPress={() => handleSubmit()}
        >
          <Text style={globalStyles.buttonText}>Ir a {company}</Text>
        </Button>
      </ButtonContainer>
      {/* </View> */}
      {loading && <Spinner />}
    </CustomContainer>
  );
};

export default HireTravelCabifyScreen;

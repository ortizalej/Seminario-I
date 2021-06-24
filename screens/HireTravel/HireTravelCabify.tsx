import React, { useState, FC } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
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

import { CabifyEstimateItemResponse } from "../../types";
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

// const info: CabifyEstimateItemResponse = {
//   distance: 12911,
//   duration: 1440,
//   eta: {
//     formatted: "6 min",
//     lowAvailability: true,
//     max: 999999,
//     min: 0,
//   },
//   priceBase: {
//     amount: 1391,
//     currency: "ARS",
//   },
//   product: {
//     description: {
//       en: "The standard option, with all the usual perks",
//       es: null,
//       pt: null,
//     },
//     icon: "lite",
//     id: "75dd566797369d1f0927102e535ecac4",
//     name: {
//       ca: null,
//       en: "Cabify Lite",
//       es: "Cabify Lite",
//       pt: null,
//     },
//   },
//   route: [
//     "gzrEt|kcJlAR??^{E??~Ex@??B]Fu@wDk@iD@gBMaHFmFF[?uCBsCD_@B_B?{CD]?yE@mERoACyEHcABU?IAOAQEyBu@gDgAmDiAgDcAyDoAaCy@k@QkD_AGCe@QoEyAuDcAgEmAe@O}@Y_Ac@e@MaD}@iBy@eBi@Bi@QEiAa@wCq@sDkAaBc@kEyAa@QuGqByB}@{Bq@kBu@kBs@k@U_A@}Ac@A[gFyAoF}@uE_AwAc@iEw@qBc@iAOeEgAg@O@KsDy@QMiBgAgC}AeBkAeBeAcDoBeAo@aF}CwD}B}A_AoAw@eAq@{DeCmA_AgCuBk@a@e@]IMKSI]ESYaBO{@Kc@Ka@Yw@Qa@KUMYk@qAMYKSISIWI[K[K[GOEKGIIKOMMIIEQIUEOCO?M?M@KBG@KDIBIFKFMJIHIJABINU\\MRKLMNSRKLIHIJWLQFUHk@Lk@NcB^??oAXi@Li@LcCl@iBd@??yBb@@JoB`@]F[F@Ja@Ni@PYJ_@PYJg@Ra@PWLc@Rg@TOHQHwAp@wAp@WHUJaA^oAd@s@TUHUFyAd@o@NiAX}@Pm@L_B^eANOBO@u@HuANQBS@gBRoANI@G@KBK@qCZwC\\cALuANa@Fc@DcBRoCZy@JO@[D]Dc@De@FeBRuARSBQBw@Lg@H}@NYDu@PiATSFSDgA\\{@Z_AVQDg@Pe@NYJIBKDMDKBQB]Hc@F]B_@D]@U@U@u@?c@AK?KAK?KAg@Ai@CK?KAC?E?OAO?K?QA]?O@K@[@q@Bs@H]D_@Fe@HWHyD@SFUDqAZiAXeAX[FQFKBk@LyA`@oA^oBp@aCr@o@P_@HYFm@Jm@Fg@Ba@@W?OC??g@Kk@Ec@Au@A]AUCQAuBOu@?y@Ba@F??SYOIUKQIIEQKkABc@@E@kDD??E`A?v@AV@PJlA?XBtCD|BH~FLvHH~HPjHPpGLvE?T?@@^??c@Aa@?yDE??KoD?IAEEaA??tDCb@A",
//   ],
//   supplements: [],
//   total: {
//     amount: 1391,
//     currency: "ARS",
//   },
// };

const HireTravelCabifyScreen: FC = ({ route }: any | undefined) => {
  const {
    coordsOrigen,
    coordsDestino,
    info,
    company,
    origenDirectionText,
    destinoDirectionText,
  } = route?.params;
  // const coordsOrigen = { latitude: 1, longitude: 1 };
  // const coordsDestino = { latitude: 1, longitude: 1 };
  // const company = "Cabify";
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

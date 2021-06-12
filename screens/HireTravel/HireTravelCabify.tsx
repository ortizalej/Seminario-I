import React, { useEffect, useRef, useState, FC } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../../styles/global";
import Spinner from "../../components/Spinner";
import { Badge, CardItem, Button } from "native-base";
import {
  CustomContainer,
  ButtonContainer,
  AvailabilityText,
  AvailabilitySubText,
  DistanceText,
  DistanceSubText,
  CustomBadge,
  InfoContainer,
  FirstInfoContent,
  SecondInfoContent,
  FirstInfoLeftContent,
  FirstInfoRightContent,
  CabifyTypeText,
  ArriveCarText,
  ArriveCarContainer,
  TimeArriveCarContainer,
  TimeArriveCarText,
  TotalPriceText,
} from "./styles";
// import { createAccountService } from "../../services/userService";
import {
  CabifyEstimateItemResponse,
  ServiceResult,
  Travel,
  User,
} from "../../types";
import Modal from "../../components/Modal";
import TravelCard from "../../components/TravelCard";
import { convertCurrencyToSymbol } from "../../utils";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

// const data: CabifyEstimateItemResponse = {
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

// const uberData: CabifyEstimateItemResponse = {
//   distance: 12911,
//   duration: 1440,
//   eta: {
//     formatted: "7 min",
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
//       en: "Uber Lite",
//       es: "Uber Lite",
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
  // const phone = useRef("");
  const { coordsOrigen, coordsDestino, info, company } = route?.params;
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  // const handleOptionSelected = () => {
  //   // setOptionSelected()
  //   handleSubmitCabify();
  // };
  const handleSubmitCabify = async () => {
    const url = `cabify:///journey?json=%7B%22vehicle_type%22:%22c52ce29f50438491f8d6e55d5259dd40%22,%22stops%22:%5B%7B%22loc%22:%7B%22latitude%22:${coordsOrigen.latitude},%22longitude%22:${coordsOrigen.longitude}%7D,%20%22name%22:%22Goiko%20Grill%22%7D,%7B%22loc%22:%7B%22latitude%22:${coordsDestino.latitude},%22longitude%22:${coordsDestino.longitude}%7D%7D%5D%7D`;
    Linking.openURL(url);
  };

  const handleSubmitUber = async () => {
    const CLIENT_ID_UBER = "0vNYiF4VdcZkm6F2E9UclodnYfHx38L8";
    const url = `https://m.uber.com/ul/?client_id=<${CLIENT_ID_UBER}>&action=setPickup&pickup[latitude]=${coordsOrigen.latitude}&pickup[longitude]=${coordsOrigen.longitude}&pickup[nickname]=Tu%20Origen&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${coordsDestino.latitude},%22longitude%22:${coordsDestino.longitude}%7D,%20%22name%22:%22Goiko%20Grill%22%7D,%7B%22loc%22:%7B%22latitude%22:${coordsDestino.latitude}&dropoff[longitude]=${coordsDestino.longitude}&dropoff[nickname]=Tu%20Destino&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`;
    Linking.openURL(url);
  };

  const handleSubmit = async () => {
    console.log("company", company);
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
  return (
    <CustomContainer>
      <ButtonContainer>
        <Button
          transparent
          block
          onPress={() => navigation.goBack()}
          style={[{ height: 40, marginTop: 50 }]}
        >
          <Text style={[globalStyles.buttonText, { color: "#5985EB" }]}>
            Volver
          </Text>
        </Button>
      </ButtonContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30, width: "90%" }}>
        {info ? (
          <ScrollView>
            <AvailabilityText>
              Demanda actual:{" "}
              <AvailabilitySubText lowAvailability>
                {info.eta && info.eta.lowAvailability ? "ALTA" : "BAJA"}
              </AvailabilitySubText>
            </AvailabilityText>
            <DistanceText>
              Distancia:
              <DistanceSubText>
                {info.distance
                  ? (info.distance / 1000).toFixed(1) + " km"
                  : "-"}
              </DistanceSubText>
            </DistanceText>

            {/* <TouchableHighlight onPress={() => handleOptionSelected()}> */}
            <CustomBadge>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  source={require("../../assets/images/cabify-lite.png")}
                  style={{ width: 45, height: 45, flex: 1 }}
                />
                <InfoContainer>
                  <FirstInfoContent>
                    <FirstInfoLeftContent>
                      {info.product && info.product.icon && (
                        <CabifyTypeText>
                          {info.product.icon.toUpperCase()}
                        </CabifyTypeText>
                      )}
                      <ArriveCarContainer>
                        <FontAwesome5
                          name="car-alt"
                          size={22}
                          color="#5985EB"
                        />
                        <ArriveCarText>
                          {info?.eta?.formatted?.replace("min", "minutos") ||
                            "0 minutos"}
                        </ArriveCarText>
                      </ArriveCarContainer>
                      <TimeArriveCarContainer>
                        <MaterialIcons
                          name="location-on"
                          size={24}
                          color="#5985EB"
                        />
                        <TimeArriveCarText>Llegada: {}</TimeArriveCarText>
                      </TimeArriveCarContainer>
                    </FirstInfoLeftContent>
                    <FirstInfoRightContent>
                      <TotalPriceText>
                        {convertCurrencyToSymbol(info?.total?.currency)}{" "}
                        {(info?.total?.amount || 0)?.toFixed(2)}
                      </TotalPriceText>
                    </FirstInfoRightContent>
                  </FirstInfoContent>
                  <SecondInfoContent>
                    <Text style={{ fontSize: 16 }}>
                      Duración estimada del viaje:{" "}
                      {info.duration ? (
                        <Text>{Math.floor(info?.duration / 60) || 0}</Text>
                      ) : (
                        <Text>0</Text>
                      )}{" "}
                      minutos
                    </Text>
                  </SecondInfoContent>
                </InfoContainer>
              </View>
            </CustomBadge>
            {/* </TouchableHighlight> */}
          </ScrollView>
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
          <Text style={globalStyles.buttonText}>Pedir ahora</Text>
        </Button>
      </ButtonContainer>
      {/* </View> */}
      {loading && <Spinner />}
    </CustomContainer>
  );
};

export default HireTravelCabifyScreen;

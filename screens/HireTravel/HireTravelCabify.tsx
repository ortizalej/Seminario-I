import React, { useEffect, useRef, useState, FC } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  View,
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

interface SelectedCountry {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

const data: CabifyEstimateItemResponse = {
  distance: 12911,
  duration: 1440,
  eta: {
    formatted: "6 min",
    lowAvailability: true,
    max: 999999,
    min: 0,
  },
  priceBase: {
    amount: 1391,
    currency: "ARS",
  },
  product: {
    description: {
      en: "The standard option, with all the usual perks",
      es: null,
      pt: null,
    },
    icon: "lite",
    id: "75dd566797369d1f0927102e535ecac4",
    name: {
      ca: null,
      en: "Cabify Lite",
      es: "Cabify Lite",
      pt: null,
    },
  },
  route: [
    "gzrEt|kcJlAR??^{E??~Ex@??B]Fu@wDk@iD@gBMaHFmFF[?uCBsCD_@B_B?{CD]?yE@mERoACyEHcABU?IAOAQEyBu@gDgAmDiAgDcAyDoAaCy@k@QkD_AGCe@QoEyAuDcAgEmAe@O}@Y_Ac@e@MaD}@iBy@eBi@Bi@QEiAa@wCq@sDkAaBc@kEyAa@QuGqByB}@{Bq@kBu@kBs@k@U_A@}Ac@A[gFyAoF}@uE_AwAc@iEw@qBc@iAOeEgAg@O@KsDy@QMiBgAgC}AeBkAeBeAcDoBeAo@aF}CwD}B}A_AoAw@eAq@{DeCmA_AgCuBk@a@e@]IMKSI]ESYaBO{@Kc@Ka@Yw@Qa@KUMYk@qAMYKSISIWI[K[K[GOEKGIIKOMMIIEQIUEOCO?M?M@KBG@KDIBIFKFMJIHIJABINU\\MRKLMNSRKLIHIJWLQFUHk@Lk@NcB^??oAXi@Li@LcCl@iBd@??yBb@@JoB`@]F[F@Ja@Ni@PYJ_@PYJg@Ra@PWLc@Rg@TOHQHwAp@wAp@WHUJaA^oAd@s@TUHUFyAd@o@NiAX}@Pm@L_B^eANOBO@u@HuANQBS@gBRoANI@G@KBK@qCZwC\\cALuANa@Fc@DcBRoCZy@JO@[D]Dc@De@FeBRuARSBQBw@Lg@H}@NYDu@PiATSFSDgA\\{@Z_AVQDg@Pe@NYJIBKDMDKBQB]Hc@F]B_@D]@U@U@u@?c@AK?KAK?KAg@Ai@CK?KAC?E?OAO?K?QA]?O@K@[@q@Bs@H]D_@Fe@HWHyD@SFUDqAZiAXeAX[FQFKBk@LyA`@oA^oBp@aCr@o@P_@HYFm@Jm@Fg@Ba@@W?OC??g@Kk@Ec@Au@A]AUCQAuBOu@?y@Ba@F??SYOIUKQIIEQKkABc@@E@kDD??E`A?v@AV@PJlA?XBtCD|BH~FLvHH~HPjHPpGLvE?T?@@^??c@Aa@?yDE??KoD?IAEEaA??tDCb@A",
  ],
  supplements: [],
  total: {
    amount: 1391,
    currency: "ARS",
  },
};

const HireTravelCabifyScreen: FC = () => {
  // const phone = useRef("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showTerms, setShowTerms] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();
  //   useEffect(() => {
  //     if (msg) {
  //       ToastAndroid.show(msg, ToastAndroid.SHORT);
  //       setMsg("ASD");
  //     }
  //   }, [msg]);

  //   useEffect(() => {
  //     if (selectedCountry) {
  //       setPrefix(selectedCountry.dial_code);
  //     }
  //   }, [selectedCountry]);

  const handleSubmit = async () => {};
  return (
    <CustomContainer>
      {/* <View style={{ width: "90%" }}> */}
      <SafeAreaView style={{ flex: 1, marginBottom: 30, width: "90%" }}>
        {data ? (
          <ScrollView>
            <AvailabilityText>
              Demanda actual:{" "}
              <AvailabilitySubText lowAvailability>
                {data.eta && data.eta.lowAvailability ? "ALTA" : "BAJA"}
              </AvailabilitySubText>
            </AvailabilityText>
            <DistanceText>
              Distancia:
              <DistanceSubText>
                {data.distance
                  ? (data.distance / 1000).toFixed(1) + " km"
                  : "-"}
              </DistanceSubText>
            </DistanceText>
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
                      {data.product && data.product.icon && (
                        <CabifyTypeText>
                          {data.product.icon.toUpperCase()}
                        </CabifyTypeText>
                      )}
                      <ArriveCarContainer>
                        <FontAwesome5
                          name="car-alt"
                          size={22}
                          color="#5985EB"
                        />
                        <ArriveCarText>
                          {" "}
                          {data?.eta?.formatted?.replace("min", "minutos") ||
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
                        {convertCurrencyToSymbol(data?.total?.currency)}{" "}
                        {(data?.total?.amount || 0)?.toFixed(2)}
                      </TotalPriceText>
                    </FirstInfoRightContent>
                  </FirstInfoContent>
                  <SecondInfoContent>
                    <Text style={{ fontSize: 16 }}>
                      Duración estimada del viaje:{" "}
                      {data.duration ? (
                        <Text>{Math.floor(data?.duration / 60) || 0}</Text>
                      ) : (
                        <Text>0</Text>
                      )}{" "}
                      minutos
                    </Text>
                  </SecondInfoContent>
                </InfoContainer>
              </View>
            </CustomBadge>
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

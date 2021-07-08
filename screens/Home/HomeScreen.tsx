import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  StyleSheet,
  BackHandler,
  Platform,
  Dimensions,
  View as NativeView,
} from "react-native";
import { View } from "../../components/Themed";
// import { withSafeAreaInsets } from "react-native-safe-area-context";
import {
  GooglePlacesAutocomplete,
  Place as IPredefinedPlace,
} from "react-native-google-places-autocomplete";
import { Item, Card, Text, Button, Icon, Input, Picker } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import OptionTravelCard from "../../components/OptionTravelCard";
import SwipeUpDown from "react-native-swipe-up-down";
import useUserLogged from "../../hooks/useUserLogged";
import {
  CabifyEstimateItemResponse,
  UberEstimateItemResponse,
  User,
} from "../../types";
import * as Location from "expo-location";
import globalStyles from "../../styles/global";
import { authCabify, estimateTravel } from "../../services/cabify";
import Spinner from "../../components/Spinner";
import { convertCurrencyToSymbol, randomInteger } from "../../utils";
import { useNavigation } from "@react-navigation/core";
import { hireTravelCabifyStack } from "../Menu/MenuDrawer";
import { getPlacesService } from "../../services/placesService";

const GOOGLE_MAPS_API_KEY = "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4";
const OBELISC_LATITUDE = -34.6037389;
const OBELISC_LONGITUDE = -58.38157;
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const FILTER_LESS_COST = "Menor Precio";
const FILTER_LESS_WAITING_TIME = "Menor tiempo de espera";

interface ISwideRef {
  showMini: () => void;
  showFull: () => void;
}
export default function HomeScreen() {
  const swideUpRef = useRef<ISwideRef>();
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();
  const [currentAddress, setCurrentAddress] =
    useState<Location.LocationGeocodedAddress[]>();
  const [geolocalizationOrigen, setgeolocalizationOrigen] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [cabifyInfo, setCabifyInfo] = useState<CabifyEstimateItemResponse>();
  const [uberInfo, setUberInfo] = useState<UberEstimateItemResponse>();

  const [geolocalizationDestino, setgeolocalizationDestino] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [searchTravels, setSearchTravels] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [haveRoute, setHaveRoute] = useState<String>("none");
  const [loading, setLoading] = useState<boolean>(false);
  const [origenDirectionText, setOrigenDirectionText] = useState<string>("");
  const [destinoDirectionText, setDestinoDirectionText] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const usr = await useUserLogged();
      setUser(usr);
    };
    getUser();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   () => true
    // );

    // return () => backHandler.remove();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    // console.log("geolocalizationOrigen", geolocalizationOrigen);
    // console.log("geolocalizationDestino", geolocalizationDestino);
    if (
      geolocalizationOrigen &&
      geolocalizationDestino &&
      geolocalizationOrigen.latitude !== 0 &&
      geolocalizationOrigen.longitude !== 0 &&
      geolocalizationDestino.latitude !== 0 &&
      geolocalizationDestino.latitude !== 0
    ) {
      const cabifyResponse: CabifyEstimateItemResponse[] = await estimateTravel(
        [geolocalizationOrigen.latitude, geolocalizationOrigen.longitude],
        [geolocalizationDestino.latitude, geolocalizationDestino.longitude]
      );
      console.log("cabifyResponse 1", cabifyResponse);
      if (cabifyResponse && cabifyResponse.length) {
        const cabifyItemResp = cabifyResponse[0];
        console.log("cabifyItemResp", cabifyResponse);
        setCabifyInfo(cabifyItemResp);
        const uberResponse: UberEstimateItemResponse = {
          distance: cabifyResponse[0].distance,
          duration:
            cabifyItemResp && cabifyItemResp.duration
              ? randomInteger(
                  cabifyItemResp.duration * 0.8,
                  cabifyItemResp.duration * 1.2
                )
              : 0,
          total: {
            amount:
              cabifyItemResp &&
              cabifyItemResp.total &&
              cabifyItemResp.total.amount
                ? randomInteger(
                    cabifyItemResp.total.amount * 0.8,
                    cabifyItemResp.total.amount * 1.2
                  )
                : 0,
            currency: cabifyItemResp?.total?.currency,
          },
          eta: cabifyItemResp?.eta,
        };
        setUberInfo(uberResponse);

        setSearchTravels(true);
        if (swideUpRef && swideUpRef.current) {
          swideUpRef.current.showMini();
        } else {
          setSearchTravels(false);
        }
      } else {
        alert("Ocurrió un error al obtener los valores del viaje");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentLocation && currentLocation.coords) {
      setgeolocalizationOrigen({
        latitude: Number(currentLocation.coords.latitude),
        longitude: Number(currentLocation.coords.longitude),
      });
      (async () => {
        const address = await Location.reverseGeocodeAsync({
          latitude: Number(currentLocation.coords.latitude),
          longitude: Number(currentLocation.coords.longitude),
        });
        setCurrentAddress(address);
      })();
    }
  }, [currentLocation]);

  useEffect(() => {
    if (
      mapRef &&
      mapRef.current &&
      geolocalizationDestino &&
      geolocalizationOrigen
    ) {
      onMapReadyHandler();
    }
  }, [geolocalizationOrigen, geolocalizationDestino]);

  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === "ios") {
      mapRef?.current?.fitToElements(false);
    } else {
      //filtramos para que cuando cargue la app no haga zoom, hasta q consiga la currentDirection
      const coordinates = [
        currentLocation
          ? {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }
          : geolocalizationOrigen,
      ];
      if (geolocalizationDestino.latitude !== 0) {
        coordinates.push(geolocalizationDestino);
      }
      // console.log("coordinates", coordinates);
      mapRef?.current?.fitToCoordinates(coordinates, {
        animated: true,
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 1000,
          left: 100,
        },
      });
    }
  }, [mapRef, currentLocation, geolocalizationDestino]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // onMapReady={onMapReadyHandler}
        showsUserLocation
        showsMyLocationButton
        style={styles.map}
        initialRegion={{
          latitude:
            currentLocation && currentLocation.coords
              ? currentLocation.coords.latitude
              : OBELISC_LATITUDE,
          longitude:
            currentLocation && currentLocation.coords
              ? currentLocation.coords.longitude
              : OBELISC_LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        minZoomLevel={5}
        maxZoomLevel={17}
      >
        <Marker
          coordinate={geolocalizationOrigen}
          title={"Origen"}
          description={origenDirectionText}
        />
        {currentLocation && (
          <Marker
            coordinate={geolocalizationDestino}
            title={"Destino"}
            description={destinoDirectionText}
          />
        )}
        <MapViewDirections
          origin={geolocalizationOrigen}
          destination={geolocalizationDestino}
          apikey={GOOGLE_MAPS_API_KEY}
          onReady={(result) => {
            setHaveRoute("flex");
          }}
          strokeWidth={3}
          strokeColor="#5985EB"
        />
      </MapView>
      <SwipeUpDown
        ref={swideUpRef}
        itemMini={
          <ItemMini
            searchTravels={searchTravels}
            user={user}
            swideUpRef={swideUpRef}
            cabifyInfo={cabifyInfo}
            uberInfo={uberInfo}
            geolocalizationOrigen={geolocalizationOrigen}
            geolocalizationDestino={geolocalizationDestino}
            origenDirectionText={origenDirectionText}
            destinoDirectionText={destinoDirectionText}
          />
        }
        itemFull={
          <ItemFull
            geolocalizationOrigen={geolocalizationOrigen}
            geolocalizationDestino={geolocalizationDestino}
            setgeolocalizationOrigen={setgeolocalizationOrigen}
            setgeolocalizationDestino={setgeolocalizationDestino}
            handleSearch={handleSearch}
            currentLocation={currentLocation}
            address={currentAddress?.[0]}
            setOrigenDirectionText={setOrigenDirectionText}
            setDestinoDirectionText={setDestinoDirectionText}
            setLoading={setLoading}
          />
        }
        animation="easeInEaseOut"
        swipeHeight={350} // Default 60
        // onShowMini={() => console.log("mini")}
        // onShowFull={() =>
        //   console.log("full", geolocalizationOrigen, geolocalizationDestino)
        // }
        disablePressToShow={true}
        style={{ backgroundColor: "#eeeeee" }}
      />
      {loading && <Spinner />}
    </View>
  );
}

const ItemMini = ({
  searchTravels,
  user,
  swideUpRef,
  cabifyInfo,
  uberInfo,
  geolocalizationOrigen,
  geolocalizationDestino,
  origenDirectionText,
  destinoDirectionText,
}) => {
  const [selectedFilter, setSelectedFilter] =
    useState<string>(FILTER_LESS_COST);
  const [isUberFirst, setIsUberFirst] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("cargo itemmini");
    handleSorting(FILTER_LESS_COST);
  }, []);

  const handleSorting = (itemValue) => {
    setSelectedFilter(itemValue);
    if (!cabifyInfo || !uberInfo) return;
    if (itemValue === FILTER_LESS_COST) {
      if (cabifyInfo?.total?.amount > uberInfo.total.amount) {
        setIsUberFirst(true);
      } else {
        setIsUberFirst(false);
      }
    } else if (itemValue === FILTER_LESS_WAITING_TIME) {
      if (cabifyInfo?.duration > uberInfo?.duration) {
        setIsUberFirst(true);
      } else {
        setIsUberFirst(false);
      }
    }
  };

  return (
    <View style={{ backgroundColor: "#eeeeee" }}>
      {!searchTravels && (
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={{ fontSize: 20, color: "#656771" }}>
            {user ? `Hola, ${user.name}` : "!Hola!"}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            ¿A donde te dirigís?
          </Text>
        </View>
      )}

      {!searchTravels ? (
        <Item
          regular
          style={{
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: "#FFFFFF",
          }}
          // onPress={() => swideUpRef.current.showFull()}
        >
          <Input
            placeholder="Introduce tu destino"
            style={{ padding: 5 }}
            onFocus={() => swideUpRef.current.showFull()}
          />
          <Icon name="search" />
        </Item>
      ) : (
        <Card style={{ backgroundColor: "#EDEDED" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#EDEDED",
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                width: "100%",
                height: 50,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* <Picker
                selectedValue={selectedFilter}
                mode="dropdown"
                style={{
                  height: 40,
                  width: "100%",
                  color: "#000000",
                  borderWidth: 1,
                  borderColor: "#000000",
                }}
                textStyle={{ color: "blue" }}
                onValueChange={(itemValue, itemIndex) =>
                  handleSorting(itemValue)
                }
              >
                <Picker.Item
                  label={FILTER_LESS_COST}
                  value={FILTER_LESS_COST}
                />
                <Picker.Item
                  label={FILTER_LESS_WAITING_TIME}
                  value={FILTER_LESS_WAITING_TIME}
                />
              </Picker> */}
              <Button
                bordered={selectedFilter !== FILTER_LESS_COST}
                onPress={() => handleSorting(FILTER_LESS_COST)}
                style={{
                  marginTop: 10,
                  height: 32,
                  width: 160,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textAlign: "center",
                    marginLeft: 25,
                  }}
                >
                  {FILTER_LESS_COST}
                </Text>
              </Button>
              <Button
                bordered={selectedFilter !== FILTER_LESS_WAITING_TIME}
                onPress={() => handleSorting(FILTER_LESS_WAITING_TIME)}
                style={{
                  marginTop: 10,
                  height: 32,
                  width: 160,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {FILTER_LESS_WAITING_TIME}
                </Text>
              </Button>
            </View>
            {/* <Button
              bordered
              onPress={() => handleSorting()}
              style={{ marginTop: 10, height: 30 }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>Aplicar</Text>
            </Button> */}
          </View>
          {isUberFirst ? (
            <>
              <OptionTravelCard
                title="Uber"
                imgUri={require("../../assets/images/uber.png")}
                frequenceMinutes={Math.floor(uberInfo?.duration / 60) || 0}
                price={uberInfo?.total?.amount || 0}
                currency={convertCurrencyToSymbol(uberInfo?.total?.currency)}
                onPressCard={() =>
                  navigation.navigate("HireTravelCabify", {
                    coordsOrigen: geolocalizationOrigen,
                    coordsDestino: geolocalizationDestino,
                    info: uberInfo,
                    company: "Uber",
                    origenDirectionText: origenDirectionText,
                    destinoDirectionText: destinoDirectionText,
                  })
                }
              />
              <OptionTravelCard
                title="Cabify"
                imgUri={require("../../assets/images/cabify.png")}
                frequenceMinutes={Math.floor(cabifyInfo?.duration / 60) || 0}
                price={cabifyInfo?.total?.amount || 0}
                currency={convertCurrencyToSymbol(cabifyInfo?.total?.currency)}
                onPressCard={() =>
                  navigation.navigate("HireTravelCabify", {
                    coordsOrigen: geolocalizationOrigen,
                    coordsDestino: geolocalizationDestino,
                    info: cabifyInfo,
                    company: "Cabify",
                    origenDirectionText: origenDirectionText,
                    destinoDirectionText: destinoDirectionText,
                  })
                }
              />
            </>
          ) : (
            <>
              <OptionTravelCard
                title="Cabify"
                imgUri={require("../../assets/images/cabify.png")}
                frequenceMinutes={Math.floor(cabifyInfo?.duration / 60) || 0}
                price={cabifyInfo?.total?.amount || 0}
                currency={convertCurrencyToSymbol(cabifyInfo?.total?.currency)}
                onPressCard={() =>
                  navigation.navigate("HireTravelCabify", {
                    coordsOrigen: geolocalizationOrigen,
                    coordsDestino: geolocalizationDestino,
                    info: cabifyInfo,
                    company: "Cabify",
                    origenDirectionText: origenDirectionText,
                    destinoDirectionText: destinoDirectionText,
                  })
                }
              />
              <OptionTravelCard
                title="Uber"
                imgUri={require("../../assets/images/uber.png")}
                frequenceMinutes={Math.floor(uberInfo?.duration / 60) || 0}
                price={uberInfo?.total?.amount || 0}
                currency={convertCurrencyToSymbol(uberInfo?.total?.currency)}
                onPressCard={() =>
                  navigation.navigate("HireTravelCabify", {
                    coordsOrigen: geolocalizationOrigen,
                    coordsDestino: geolocalizationDestino,
                    info: uberInfo,
                    company: "Uber",
                    origenDirectionText: origenDirectionText,
                    destinoDirectionText: destinoDirectionText,
                  })
                }
              />
            </>
          )}
        </Card>
      )}
    </View>
  );
};
const ItemFull = ({
  geolocalizationOrigen,
  geolocalizationDestino,
  setgeolocalizationOrigen,
  setgeolocalizationDestino,
  handleSearch,
  currentLocation,
  address,
  setOrigenDirectionText,
  setDestinoDirectionText,
  setLoading,
}) => {
  const originRef = useRef(null);
  const destinoRef = useRef(null);
  const [predefinedPlaces, setPredefinedPlaces] = useState<IPredefinedPlace[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    console.log("cargo itemfull");
    handlePredefinedPlaces();
    if (destinoRef && destinoRef.current) {
      (destinoRef as any).current.focus();
    }
    setLoading(false);
  }, []);

  const handlePredefinedPlaces = async () => {
    const pps: IPredefinedPlace[] = [];
    const resp = await getPlacesService();
    if (resp.isSuccess && resp.msg) console.log(resp.msg);
    resp?.msg?.forEach((place) =>
      pps.push({
        description: `${place.name} (${place.address})`,
        geometry: {
          location: {
            lat: place.latitude,
            lng: place.longitude,
          },
        },
      })
    );
    setPredefinedPlaces(pps);
  };
  // [
  //   {
  //     description: address
  //       ? `Ubicación Actual (${address.street}, ${address.city} - ${address.country})`
  //       : "Ubicación Actual",
  //     geometry: {
  //       location: {
  //         lat: currentLocation?.coords?.latitude,
  //         lng: currentLocation?.coords?.longitude,
  //       },
  //     },
  //   },
  // ]

  const handleLocalSearch = () => {
    if (originRef && originRef.current) {
      setOrigenDirectionText((originRef as any).current.getAddressText());
    }

    if (destinoRef && destinoRef.current) {
      setDestinoDirectionText((destinoRef as any).current.getAddressText());
    }
    handleSearch();
  };

  return (
    <View style={[styles.contentContainer, { backgroundColor: "#eeeeee" }]}>
      <Item
        regular
        style={{
          marginTop: 20,
          width: "90%",
          borderColor: "transparent",
          marginBottom: -7,
        }}
      >
        <GooglePlacesAutocomplete
          ref={originRef}
          placeholder="Origen"
          onPress={(data, details = null) => {
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            setgeolocalizationOrigen({
              latitude: Number(latitude),
              longitude: Number(longitude),
            });
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={searchInputStyles}
          predefinedPlacesAlwaysVisible
          predefinedPlaces={[
            {
              description: address
                ? `Ubicación Actual (${address.street}, ${address.city} - ${address.country})`
                : "Ubicación Actual",
              geometry: {
                location: {
                  lat: currentLocation?.coords?.latitude,
                  lng: currentLocation?.coords?.longitude,
                },
              },
            },
            ...predefinedPlaces,
          ]}
        />
      </Item>
      <Item
        regular
        style={{
          width: "90%",
          borderColor: "transparent",
          marginBottom: 40,
        }}
      >
        <GooglePlacesAutocomplete
          ref={destinoRef}
          placeholder="Destino"
          onPress={(data, details = null) => {
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            setgeolocalizationDestino({
              latitude: Number(latitude),
              longitude: Number(longitude),
            });
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "es",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={searchInputStyles2}
          predefinedPlaces={predefinedPlaces}
        />
      </Item>
      <Button
        bordered
        block
        disabled={
          !geolocalizationOrigen ||
          !geolocalizationDestino ||
          geolocalizationDestino.latitude === 0
        }
        onPress={() => handleLocalSearch()}
        style={[globalStyles.button, { height: 40 }]}
      >
        <Text style={globalStyles.buttonText}>Buscar Viaje</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  swideUp: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const searchInputStyles = StyleSheet.create({
  textInputContainer: {
    justifyContent: "center",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: "100%",
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 0,
  },
  textInput: {
    borderRadius: 0,
    borderBottomColor: "#000000",
    borderColor: "transparent",
    width: "90%",
    marginLeft: 0,
    marginRight: 0,
    height: 50,
    backgroundColor: "#ffffff",
    color: "#000000",
    // fontWeight: "bold",
    fontSize: 16,
    borderWidth: 1,
    zIndex: 999,
    paddingTop: 0,
  },
});

const searchInputStyles2 = StyleSheet.create({
  textInputContainer: {
    justifyContent: "center",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: "100%",
    paddingTop: 0,
    paddingBottom: 0,
  },
  textInput: {
    borderRadius: 0,
    borderColor: "transparent",
    borderTopColor: "#000000",
    width: "90%",
    marginLeft: 0,
    marginRight: 0,
    height: 50,
    backgroundColor: "#ffffff",
    color: "#000000",
    // fontWeight: "bold",
    fontSize: 16,
    borderWidth: 1,
    zIndex: 999,
    paddingTop: 0,
  },
});

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
} from "react-native";
import { View } from "../../components/Themed";
// import { withSafeAreaInsets } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Item, Card, Text, Button, Icon, Input, Picker } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import OptionTravelCard from "../../components/OptionTravelCard";
import SwipeUpDown from "react-native-swipe-up-down";
import useUserLogged from "../../hooks/useUserLogged";
import { User } from "../../types";
import * as Location from "expo-location";
import globalStyles from "../../styles/global";
import { authCabify, estimateTravel } from "../../services/cabify";

const GOOGLE_MAPS_API_KEY = "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4";
const OBELISC_LATITUDE = -34.6037389;
const OBELISC_LONGITUDE = -58.38157;
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
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
  const [cabifyPrice, setCabifyPrice] = useState(0);

  const [geolocalizationDestino, setgeolocalizationDestino] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [searchTravels, setSearchTravels] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [haveRoute, setHaveRoute] = useState<String>("none");

  // const handleCurrentLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     return;
  //   }
  //   console.log("seteando current location");
  //   let location = await Location.getCurrentPositionAsync({});
  //   setCurrentLocation(location);
  // };

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

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

  // useEffect(() => {
  //   // if (
  //   //   geolocalizationOrigen &&
  //   //   geolocalizationDestino &&
  //   //   geolocalizationOrigen.latitude !== 0 &&
  //   //   geolocalizationOrigen.longitude !== 0 &&
  //   //   geolocalizationDestino.latitude !== 0 &&
  //   //   geolocalizationDestino.latitude !== 0
  //   // ) {
  //   //   setSearchTravels(true);
  //   //   if (swideUpRef && swideUpRef.current) {
  //   //     swideUpRef.current.showMini();
  //   //   }
  //   // } else {
  //   //   setSearchTravels(false);
  //   // }
  // }, [geolocalizationOrigen, geolocalizationDestino]);

  const handleSearch = () => {
    if (
      geolocalizationOrigen &&
      geolocalizationDestino &&
      geolocalizationOrigen.latitude !== 0 &&
      geolocalizationOrigen.longitude !== 0 &&
      geolocalizationDestino.latitude !== 0 &&
      geolocalizationDestino.latitude !== 0
    ) {
      setSearchTravels(true);
      if (swideUpRef && swideUpRef.current) {
        swideUpRef.current.showMini();
      }
    } else {
      setSearchTravels(false);
    }
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
  const estimateCabify = async () => {
    const resp = await authCabify();
    console.log('resp', resp);
  };
  const onMapReadyHandler = useCallback(() => {
    console.log("entre a onMapReadyHandler", currentLocation);
    // console.log("geolocalizationOrigen", geolocalizationOrigen);
    // console.log("geolocalizationDestino", geolocalizationDestino);
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
      console.log("coordinates", coordinates);
      estimateCabify();
      //METER LLAMADO AQUI
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

  // useEffect(() => {
  //   if (currentLocation !== null && currentLocation !== undefined) {
  //     console.log("entramo por aquiii", currentLocation);
  //     onMapReadyHandler();
  //   }
  // }, [currentLocation]);

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
          description={"Origen"}
        />
        {currentLocation && (
          <Marker
            coordinate={geolocalizationDestino}
            title={"Destino"}
            description={"Destino"}
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
          />
        }
        animation="easeInEaseOut"
        swipeHeight={350} // Default 60
        // onShowMini={() => console.log("mini")}
        onShowFull={() =>
          console.log("full", geolocalizationOrigen, geolocalizationDestino)
        }
        disablePressToShow={true}
        style={{ backgroundColor: "#eeeeee" }}
      />
    </View>
  );
}

const ItemMini = ({ searchTravels, user, swideUpRef }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Menor Precio");
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
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#EDEDED",
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                width: 220,
                height: 40,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={selectedFilter}
                mode="dropdown"
                style={{
                  height: 40,
                  width: 220,
                  color: "#000000",
                  borderWidth: 1,
                  borderColor: "#000000",
                }}
                textStyle={{ color: "blue" }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedFilter(itemValue)
                }
              >
                <Picker.Item label="Menor Precio" value="Menor Precio" />
                <Picker.Item
                  label="Menor tiempo de espera"
                  value="Menor tiempo de espera"
                />
              </Picker>
            </View>
            <Button
              bordered
              onPress={() => console.log("filtrando")}
              style={{ marginTop: 10, height: 30 }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>Aplicar</Text>
            </Button>
          </View>
          <OptionTravelCard
            title="Cabify"
            imgUri={require("../../assets/images/cabify.png")}
            frequenceMinutes={20}
            price={123}
          />
          <OptionTravelCard
            title="Uber"
            imgUri={require("../../assets/images/uber.png")}
            frequenceMinutes={18}
            price={984.34}
          />
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
}) => {
  const originRef = useRef(null);
  const destinoRef = useRef(null);

  useEffect(() => {
    if (destinoRef && destinoRef.current) {
      (destinoRef as any).current.focus();
    }
  }, []);
  // useEffect(() => {
  //   if (address && originRef && originRef.current) {
  //     (originRef as any).current.setAddressText(
  //       `${address.street}, ${address.city} - ${address.country}`
  //     );
  //   }
  // }, [address]);
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
            key: "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4",
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
                  lat: currentLocation.coords.latitude,
                  lng: currentLocation.coords.longitude,
                },
              },
            },
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
            console.log("details", details);
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            setgeolocalizationDestino({
              latitude: Number(latitude),
              longitude: Number(longitude),
            });
          }}
          query={{
            key: "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4",
            language: "es",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={searchInputStyles2}
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
        onPress={() => handleSearch()}
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

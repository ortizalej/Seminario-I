import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, BackHandler } from "react-native";
import { View } from "../../components/Themed";
// import { withSafeAreaInsets } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  Item,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Badge,
  Button,
  Icon,
  Input,
  Picker,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

// import TopBar from "../../components/TopBar";
import OptionTravelCard from "../../components/OptionTravelCard";
// import BottomSheet from "@gorhom/bottom-sheet";
import SwipeUpDown from "react-native-swipe-up-down";
import useUserLogged from "../../hooks/useUserLogged";
import { User } from "../../types";
import * as Location from "expo-location";
import globalStyles from "../../styles/global";

interface ISwideRef {
  showMini: () => void;
  showFull: () => void;
}
export default function HomeScreen() {
  const swideUpRef = useRef<ISwideRef>();
  // const originRef = useRef();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [currentAddress, setCurrentAddress] =
    useState<Location.LocationGeocodedAddress[]>();
  const [geolocalizationOrigen, setgeolocalizationOrigen] = useState({
    latitude: location && location.coords ? location.coords.latitude : 0,
    longitude: location && location.coords ? location.coords.longitude : 0,
  });
  const [geolocalizationDestino, setgeolocalizationDestino] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [searchTravels, setSearchTravels] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [haveRoute, setHaveRoute] = useState<String>("none");
  const [latitudeDeltaOrigen, setLatitudeDeltaOrigen] =
    useState<number>(0.0922);
  const [longitudeDeltaOrigen, setLongitudeDeltaOrigen] =
    useState<number>(0.0421);

  // const bottomSheetRef = useRef<BottomSheet>(null);
  // const snapPoints = useMemo(() => ["25%", "50%"], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

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
      setLocation(location);
    })();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
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
  }, [geolocalizationOrigen, geolocalizationDestino]);

  useEffect(() => {
    if (location && location.coords) {
      setgeolocalizationOrigen({
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
      });
      (async () => {
        const address = await Location.reverseGeocodeAsync({
          latitude: Number(location.coords.latitude),
          longitude: Number(location.coords.longitude),
        });
        setCurrentAddress(address);
      })();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:
            location && location.coords
              ? location.coords.latitude
              : -34.6037389,
          longitude:
            location && location.coords
              ? location.coords.longitude
              : -58.3815704,
          latitudeDelta: latitudeDeltaOrigen,
          longitudeDelta: longitudeDeltaOrigen,
        }}
      >
        <Marker
          coordinate={geolocalizationOrigen}
          title={"Origen"}
          description={"Origen"}
        />
        <Marker
          coordinate={geolocalizationDestino}
          title={"Destino"}
          description={"Destino"}
        />
        <MapViewDirections
          origin={geolocalizationOrigen}
          destination={geolocalizationDestino}
          apikey="AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4"
          onReady={(result) => {
            setHaveRoute("flex");
          }}
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
            setgeolocalizationOrigen={setgeolocalizationOrigen}
            setgeolocalizationDestino={setgeolocalizationDestino}
            location={location}
            address={currentAddress?.[0]}
          />
        }
        animation="easeInEaseOut"
        swipeHeight={350} // Default 60
        onShowMini={() => console.log("mini")}
        onShowFull={() => console.log("full")}
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
            price={927.02}
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
  setgeolocalizationOrigen,
  setgeolocalizationDestino,
  location,
  address,
}) => {
  const originRef = useRef(null);
  const destinoRef = useRef(null);

  useEffect(() => {
    if (destinoRef && destinoRef.current) {
      (destinoRef as any).current.focus();
    }
  }, []);
  useEffect(() => {
    if (address && originRef && originRef.current) {
      (originRef as any).current.setAddressText(
        `${address.street}, ${address.city} - ${address.country}`
      );
    }
  }, [address]);
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
            console.log({
              latitude: Number(latitude),
              longitude: Number(longitude),
            });
            setgeolocalizationOrigen({
              latitude: Number(
                location && location.coords
                  ? location.coords.latitude
                  : latitude
              ),
              longitude: Number(
                location && location.coords
                  ? location.coords.longitude
                  : longitude
              ),
            });
          }}
          query={{
            key: "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={searchInputStyles}
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
            console.log("DATASS", details?.geometry.location);
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            console.log({
              latitude: Number(
                location && location.coords
                  ? location.coords.latitude
                  : latitude
              ),
              longitude: Number(
                location && location.coords
                  ? location.coords.longitude
                  : longitude
              ),
            });
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
          // renderRightButton={() => (
          //   <Icon style={{ paddingRight: 200 }} active name="swap" />
          // )}
        />
      </Item>
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

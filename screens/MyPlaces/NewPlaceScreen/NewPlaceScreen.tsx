import {
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  Alert,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { Button, Form, Item, Input, Label } from "native-base";
import { View } from "../../../components/Themed";
import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  CustomContainer,
  Title,
  ButtonContainer,
  Header,
} from "./newPlace.styles";
import globalStyles from "../../../styles/global";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "../../../components/Spinner";
import {
  createPlaceService,
  deletePlaceService,
  updatePlaceService,
} from "../../../services/placesService";
import { IPlace } from "../../../types";

export interface NewPlaceScreenProps {}
const GOOGLE_MAPS_API_KEY = "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4";
const OBELISC_LATITUDE = -34.6037389;
const OBELISC_LONGITUDE = -58.38157;
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const NewPlaceScreen: FC = ({ route }: any | undefined) => {
  const { place } = route?.params;
  const navigation = useNavigation();
  const addressRef = useRef(null);
  const mapRef = useRef<MapView>(null);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [geoLocationAddress, setGeoLocationAddress] = useState({
    latitude: place ? place.latitude : OBELISC_LATITUDE,
    longitude: place ? place.longitude : OBELISC_LONGITUDE,
  });
  //   const [currentLocation, setCurrentLocation] =
  //     useState<Location.LocationObject>();
  //   const [latitudeDeltaOrigen, setLatitudeDeltaOrigen] =
  //     useState<number>(0.0922);
  //   const [longitudeDeltaOrigen, setLongitudeDeltaOrigen] =
  //     useState<number>(0.0421);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const newPlace: IPlace = {
        id: place ? place.id : null,
        name,
        address,
        latitude: geoLocationAddress.latitude,
        longitude: geoLocationAddress.longitude,
      };
      console.log("isAddMode", isAddMode);
      if (isAddMode) {
        onAdd(newPlace);
      } else {
        onUpdate(newPlace);
      }

      setLoading(false);
    }, 1000);
  };

  const handleDeleteAddress = async () => {
    Alert.alert("Eliminando Lugar", "¿Estás seguro/a de eliminar este lugar?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Si", onPress: () => onDelete() },
    ]);
  };

  const onAdd = async (req: IPlace) => {
    const resp = await createPlaceService(req);
    if (resp.isSuccess) {
      navigation.goBack();
    } else {
      alert(resp.msg);
    }
  };

  const onUpdate = async (req: IPlace) => {
    const resp = await updatePlaceService(req);
    if (resp.isSuccess) {
      navigation.goBack();
    } else {
      alert(resp.msg);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    setTimeout(async () => {
      const resp = await deletePlaceService(place);
      if (resp.isSuccess) {
        navigation.goBack();
      } else {
        alert(resp.msg);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      //   let location = await Location.getCurrentPositionAsync({});
      //   setCurrentLocation(location);
    })();
  }, []);

  useEffect(() => {
    console.log("place", place);
    if (place) {
      setIsAddMode(false);
    } else {
      setIsAddMode(true);
    }
  }, [place]);

  useEffect(() => {
    if (!isAddMode && place) {
      setName(place.name);
      setAddress(place.address);
      if (addressRef && addressRef.current) {
        (addressRef as any).current.setAddressText(place.address);
      }
    }
  }, [isAddMode]);

  //   useEffect(() => {
  //     if (currentLocation && currentLocation.coords) {
  //       setGeoLocationAddress({
  //         latitude: Number(currentLocation.coords.latitude),
  //         longitude: Number(currentLocation.coords.longitude),
  //       });
  //       (async () => {
  //         const address = await Location.reverseGeocodeAsync({
  //           latitude: Number(currentLocation.coords.latitude),
  //           longitude: Number(currentLocation.coords.longitude),
  //         });
  //         console.log("address", address);
  //         // setCurrentAddress(address);
  //       })();
  //     }
  //   }, [currentLocation]);

  //   console.log("geoLocationAddressD", geoLocationAddress);

  //   console.log("currentLocation", currentLocation);

  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === "ios") {
      mapRef?.current?.fitToElements(false);
    } else {
      //filtramos para que cuando cargue la app no haga zoom, hasta q consiga la currentDirection
      const coordinates = [
        geoLocationAddress
          ? {
              latitude: geoLocationAddress.latitude,
              longitude: geoLocationAddress.longitude,
            }
          : {
              latitude: OBELISC_LATITUDE,
              longitude: OBELISC_LONGITUDE,
            },
      ];
      if (geoLocationAddress.latitude !== 0) {
        coordinates.push(geoLocationAddress);
      }
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
  }, [mapRef, geoLocationAddress]);

  useEffect(() => {
    setIsMapReady(true);
    if (mapRef && mapRef.current && geoLocationAddress) {
      onMapReadyHandler();
    }
  }, [geoLocationAddress]);

  return (
    <>
      <CustomContainer>
        <SafeAreaView
          style={{
            flex: 1,
            marginBottom: 30,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 600,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 60,
              position: "relative",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="arrowleft"
                size={28}
                color="#5985EB"
                onPress={() => navigation.goBack()}
                style={{ marginRight: 40, marginLeft: -50, marginBottom: 15 }}
              />
              <Title>Guardar Dirección</Title>
            </View>
            <Form
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                //   marginTop: 20,
                flex: 6,
              }}
            >
              <Item
                regular
                style={[
                  globalStyles.input,
                  {
                    width: "100%",
                    borderRadius: 2,
                    height: 50,
                  },
                ]}
              >
                {/* <Label>Nombre</Label> */}
                <Input
                  autoFocus
                  placeholder="Nombre"
                  value={name}
                  style={{ width: "100%", marginTop: 10 }}
                  onChangeText={(texto) => setName(texto)}
                />
              </Item>
              <Item regular>
                {/* <Label style={{ marginTop: -10 }}>Dirección</Label> */}
                <GooglePlacesAutocomplete
                  ref={addressRef}
                  placeholder="Dirección"
                  onPress={(data, details = null) => {
                    let latitude = details?.geometry.location.lat;
                    let longitude = details?.geometry.location.lng;
                    console.log(
                      "coordenadas lugar:",
                      details?.geometry.location
                    );
                    setGeoLocationAddress({
                      latitude: Number(latitude),
                      longitude: Number(longitude),
                    });
                    setAddress(data.description);
                  }}
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "es",
                  }}
                  enablePoweredByContainer={false}
                  fetchDetails={true}
                  styles={{ searchAddressStyles }}
                />
              </Item>
            </Form>
            <View
              style={{
                flex: 5,
                backgroundColor: "transparent",
                ...StyleSheet.absoluteFillObject,
                height: 300,
                marginTop: 340,
              }}
            >
              {geoLocationAddress && address !== "" && (
                <MapView
                  ref={mapRef}
                  onMapReady={onMapReadyHandler}
                  showsMyLocationButton
                  style={{ flex: 2 }}
                  initialRegion={{
                    latitude: -34.6037389,
                    longitude: -58.38157,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  minZoomLevel={5}
                  maxZoomLevel={17}
                  // onMapReady={() => setIsMapReady(true)}
                >
                  {isMapReady && (
                    <Marker
                      coordinate={geoLocationAddress}
                      title={"Origen"}
                      description={"Origen"}
                    />
                  )}
                </MapView>
              )}
            </View>
          </View>
          <ButtonContainer style={{ flex: 1 }}>
            <Button
              block
              primary
              disabled={!name || !address}
              style={[
                globalStyles.button,
                {
                  marginTop: 20,
                  backgroundColor: !name || !address ? "grey" : "#5985EB",
                },
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={globalStyles.buttonText}>
                {isAddMode ? "Guardar " : "Modificar "}Ubicación
              </Text>
            </Button>
            {!isAddMode && (
              <Button
                block
                primary
                style={[
                  globalStyles.button,
                  { marginTop: 10, backgroundColor: "#fe6464" },
                ]}
                onPress={() => handleDeleteAddress()}
              >
                <Text style={globalStyles.buttonText}>Eliminar Ubicación</Text>
              </Button>
            )}
          </ButtonContainer>
          {/* </ScrollView> */}
        </SafeAreaView>
      </CustomContainer>
      {loading ? <Spinner /> : null}
    </>
  );
};

// const stylesMap = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

const searchAddressStyles = StyleSheet.create({
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
export default NewPlaceScreen;

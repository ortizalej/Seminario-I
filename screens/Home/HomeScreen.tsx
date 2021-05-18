import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Item } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import TopBar from "../../components/TopBar";

export default function HomeScreen() {
  const [geolocalizationOrigen, setgeolocalizationOrigen] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [geolocalizationDestino, setgeolocalizationDestino] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [latitudeDeltaOrigen, setLatitudeDeltaOrigen] =
    useState<number>(0.0922);
  const [longitudeDeltaOrigen, setLongitudeDeltaOrigen] =
    useState<number>(0.0421);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.6037389,
          longitude: -58.3815704,
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
        />
      </MapView>
      <Item regular>
        <GooglePlacesAutocomplete
          placeholder="Origen"
          onPress={(data, details = null) => {
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            console.log({
              latitude: Number(latitude),
              longitude: Number(longitude),
            });
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
          styles={{ listView: { height: 100 } }}
        />
      </Item>
      <Item regular>
        <GooglePlacesAutocomplete
          placeholder="Destino"
          onPress={(data, details = null) => {
            console.log("DATASS", details?.geometry.location);
            let latitude = details?.geometry.location.lat;
            let longitude = details?.geometry.location.lng;
            console.log({
              latitude: Number(latitude),
              longitude: Number(longitude),
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
          styles={{ listView: { height: 100 } }}
        />
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

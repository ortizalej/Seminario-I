import React, { useState } from "react";
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from '../components/Themed';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Item } from 'native-base';
import MapView, {Marker} from 'react-native-maps';

export default function HomeScreen() {
  const [latitude, setLatitude] = useState<number>(-34.6037389);
  const [longitude, setLongitude] = useState<number>(-58.3815704);
  const [latitudeDelta, setLatitudeDelta] = useState<number>(0.0922);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0.0421);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
      />
      <Item regular>
        <GooglePlacesAutocomplete
          placeholder='Origen'
          onPress={(data, details = null) => {
            console.log('DATASS', details?.geometry.location)
          }}
          query={{
            key: "AIzaSyCDPgtw3NWuo5MMzVWs90_HF3X4WFzq4r4",
            language: 'es',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

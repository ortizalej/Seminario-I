import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Spinner, Badge, CardItem } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { View } from "../../components/Themed";
import React, { FC, useState } from "react";
import {
  CustomContainer,
  Title,
  ButtonContainer,
  Header,
} from "./myPlaces.styles";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/core";
import { IPlace } from "../../types";

export interface MyPlacesScreenProps {}

const places: IPlace[] = [
  {
    name: "Mi trabajo",
    address: "Uspallata 1882, Buenos Aires, Argentina",
    latitude: -34.6363908,
    longitude: -58.3891649,
  },
  {
    name: "Casa Mama",
    address:
      "General Riego y Núñez 574, Turdera, Provincia de Buenos Aires, Argentina",
    latitude: -34.7893084,
    longitude: -58.40094430000001,
  },
];
const MyPlacesScreen: FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    // setLoading(true);
    // setTimeout(() => {
    //   //validar
    //   setLoading(false);
    navigation.navigate("NewPlaceScreen", { place: null });
    // }, 1000);
  };

  const handlePressCard = (place: IPlace) => {
    navigation.navigate("NewPlaceScreen", {
      place: place,
    });
  };
  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30, width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: 650,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header>
            <Title>Mis Lugares</Title>
            <Text style={{ color: "#909090" }}>
              Guarda tus lugares favoritos
            </Text>
          </Header>
          <ScrollView style={{ marginBottom: 100 }}>
            {places.map((place: IPlace, index: number) => (
              <PlaceCard
                place={place}
                key={index}
                handlePress={() => handlePressCard(place)}
              />
            ))}
          </ScrollView>
          <ButtonContainer style={{}}>
            <Button
              block
              primary
              style={[globalStyles.button, {}]}
              onPress={() => handleSubmit()}
            >
              <Text style={globalStyles.buttonText}>Añadir Favorito</Text>
            </Button>
          </ButtonContainer>
        </View>
      </SafeAreaView>
      {loading ? <Spinner /> : null}
    </CustomContainer>
  );
};

export default MyPlacesScreen;

interface IPlaceCardProps {
  place: IPlace;
  handlePress: any;
}
const PlaceCard: FC<IPlaceCardProps> = ({ place, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <CardItem style={{ paddingBottom: 10, backgroundColor: "transparent" }}>
        <Badge
          style={{
            backgroundColor: "#EDEDED",
            width: "100%",
            height: 80,
            borderRadius: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={"home"}
            size={28}
            color={"#5985EB"}
            style={{ flex: 1, marginLeft: 20 }}
          />
          <View
            style={{
              flex: 6,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                maxWidth: 180,
                color: "black",
                fontWeight: "bold",
              }}
            >
              {place.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                maxWidth: 180,
                color: "#909090",
              }}
            >
              {place.address}
            </Text>
          </View>
        </Badge>
      </CardItem>
    </TouchableOpacity>
  );
};

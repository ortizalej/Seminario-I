import {
  Image,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Badge, CardItem } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { View } from "../../components/Themed";
import React, { FC, useState, useEffect } from "react";
import {
  CustomContainer,
  Title,
  ButtonContainer,
  Header,
} from "./myPlaces.styles";
import globalStyles from "../../styles/global";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { IPlace } from "../../types";
import { getPlacesService } from "../../services/placesService";
import Spinner from "../../components/Spinner";

export interface MyPlacesScreenProps {}

const MyPlacesScreen: FC = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const getPlaces = async () => {
          return await getPlacesService();
        };
        const resp = await getPlaces();
        setPlaces(resp.msg);
      })();
      console.log("cargo myplaces");
    }
    return () => {};
  }, [isFocused]);

  const handleSubmit = async () => {
    navigation.navigate("NewPlaceScreen", { place: null });
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
          <ScrollView style={{ height: 450, maxHeight: 450 }}>
            {places?.map((place: IPlace, index: number) => (
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
                maxWidth: 250,
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

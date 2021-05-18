import React, { useEffect } from "react";
import { View } from "react-native";
import { Container, Spinner, H1 } from "native-base";
import globalStyles from "../../styles/global";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { removeItem, USERLOGGED } from "../../utils/storage";

const CloseSessionScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const clearAllStorage = async () => {
      return await removeItem(USERLOGGED);
    };
    console.log("Cerrando sesión");
    clearAllStorage();
    navigation.navigate("Login");
  }, []);

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <Spinner />
      </View>
    </Container>
  );
};

export default CloseSessionScreen;

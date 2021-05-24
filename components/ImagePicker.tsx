import React, { FC, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "./Themed";
import { useNavigation } from "@react-navigation/core";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-top: 0;
  text-align: center;
  margin-top: 20px;
`;

const _textStyle = {
  color: "white",
};
const _buttonStyle = {
  backgroundColor: "black",
  borderRadius: 18,
};

interface ImagePickerProps {
  setImage: any;
  onClose: any;
}
const ImagePicker: FC<ImagePickerProps> = ({ setImage, onClose }) => {
  //   const navigation = useNavigation();

  const goBack = () => {
    onClose();
  };

  const onDone = (data: any) => {
    console.log("data", data);
    if (data && data.length) {
      setImage(data[0].uri);
    }
    goBack();
  };

  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
        <ScrollView>
          <Title style={{ marginTop: 30, fontSize: 22 }}>
            Seleccione su foto de perfil
          </Title>
          <AssetsSelector
            options={{
              assetsType: ["photo", "video"],
              maxSelections: 5,
              margin: 3,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              // selectedBgColor: mainColor,
              spinnerColor: "black",
              videoIcon: {
                Component: Ionicons,
                iconName: "ios-videocam",
                color: "white",
                size: 20,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "white",
                size: 20,
              },
              defaultTopNavigator: {
                selectedText: "Seleccionadas",
                continueText: "Finalizar",
                goBackText: "Volver",
                midTextColor: "red",
                buttonStyle: _buttonStyle,
                // textStyle: _textStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: (data) => onDone(data),
              },
              noAssets: () => (
                <View>
                  <Text>No se encontraron imagenes</Text>
                </View>
              ),
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </CustomContainer>
  );
};

export default React.memo(ImagePicker);

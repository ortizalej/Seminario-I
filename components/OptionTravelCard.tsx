import { Badge, CardItem } from "native-base";
import React, { FC } from "react";
import { Image, ImageSourcePropType, Text } from "react-native";
import { View } from "./Themed";
import { FontAwesome5 } from "@expo/vector-icons";

export interface OptionTravelCardProps {
  title: string;
  frequenceMinutes: number;
  imgUri: ImageSourcePropType;
  price: number;
  props?: any;
}

const OptionTravelCard: FC<OptionTravelCardProps> = ({
  imgUri,
  title,
  frequenceMinutes,
  price,
  props,
}) => {
  return (
    <CardItem
      style={{ paddingBottom: 10, backgroundColor: "#EDEDED" }}
      {...props}
    >
      <Badge
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: 70,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            borderColor: "#EDEDED",
            // borderWidth: 2,
            // borderRadius: 10,
            // padding: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Image
              source={imgUri}
              style={{ width: 50, height: 50, borderRadius: 15 }}
            />
            <View style={{ backgroundColor: "transparent" }}>
              <Text
                style={{ color: "#000000", fontWeight: "bold", fontSize: 20 }}
              >
                {title}
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="car" size={18} color="#5985EB" />
                <Text style={{ marginLeft: 2 }}>
                  {frequenceMinutes} minutos
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "transparent",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                backgroundColor: "#f6f6f6",
                borderRadius: 10,
                margin: 10,
                padding: 6,
              }}
            >
              $ {price}
            </Text>
          </View>
        </View>
      </Badge>
    </CardItem>
  );
};

export default OptionTravelCard;

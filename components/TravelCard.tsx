import { Badge, CardItem } from "native-base";
import React, { FC } from "react";
import { Image, ImageSourcePropType, Text } from "react-native";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import { Travel } from "../types";
import { View } from "./Themed";
import moment from "moment";
// import UberImage from "../assets/images/uber.png";
// import CabifyImage from "../assets/images/cabify.png";

interface Props {
  travel: Travel;
  props?: any;
}

const getEnterpriseImage = (enterprise: string) => {
  let image: ImageSourcePropType;
  switch (enterprise.toLowerCase()) {
    case "uber":
      image = require("../assets/images/uber.png");
      break;
    case "cabify":
    default:
      image = require("../assets/images/cabify.png");
      break;
  }
  return image;
};

const getStatusColor = (status: string) => {
  let color;
  switch (status.toLowerCase()) {
    case "finalizado":
      color = "#9dde92";
      break;
    case "cancelado":
      color = "#de9292";
      break;
    case "en curso":
    default:
      color = "#f5d279";
      break;
  }
  return color;
};

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";
const TravelCard: FC<Props> = ({ travel, props }) => {
  return (
    <CardItem
      style={{ paddingBottom: 10, backgroundColor: "#FFFFFF" }}
      {...props}
    >
      <Badge
        style={{
          backgroundColor: "#EDEDED",
          width: "100%",
          height: 120,
          borderRadius: 30,
        }}
      >
        {travel && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 120,
              //   paddingVertical: 5,
              padding: 10,
              backgroundColor: "#EDEDED",
              borderRadius: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#5e5c5c" }}>
                {moment(travel.date.toString()).format(DATE_FORMAT)}
              </Text>
              <Badge
                style={{
                  backgroundColor: getStatusColor(travel.status),
                  height: 16,
                  margin: 3,
                }}
              >
                <Text style={{ fontSize: 12 }}>{travel.status}</Text>
              </Badge>
            </View>
            <View
              style={{
                flex: 5,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "transparent",
              }}
            >
              <View style={{ flex: 2, backgroundColor: "transparent" }}>
                <Image
                  source={getEnterpriseImage(travel.enterprise)}
                  style={{ width: 50, height: 50, borderRadius: 15 }}
                />
              </View>
              <View
                style={{
                  flex: 7,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#EDEDED",
                  }}
                >
                  <MaterialIcons name="location-on" size={24} color="#919aa3" />
                  <Text
                    style={{
                      fontSize: 14,
                      maxWidth: 180,
                    }}
                  >
                    {travel.originAddress}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#EDEDED",
                    marginTop: 10,
                  }}
                >
                  <MaterialIcons name="location-on" size={24} color="#5985eb" />
                  <Text style={{ fontSize: 14, maxWidth: 180 }}>
                    {travel.destinationAddress}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "transparent",
                  maxWidth: 100,
                  marginRight: 10,
                }}
              >
                <Badge
                  style={{
                    backgroundColor: "#f6f6f6",
                    height: 35,
                  }}
                >
                  <Text style={{ fontSize: 12, padding: 2 }}>
                    $ {travel.amount}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  flex: 1,
                  marginRight: -10,
                  backgroundColor: "transparent",
                }}
              >
                <Octicons name="chevron-right" size={30} color="#5985EB" />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                backgroundColor: "transparent",
              }}
            >
              <Text>Distancia Total: 1,4 km</Text>
            </View>
          </View>
        )}
      </Badge>
    </CardItem>
  );
};

export default TravelCard;

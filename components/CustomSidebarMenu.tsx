// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import useUserLogged from "../hooks/useUserLogged";
import { User } from "../types";

const IMAGE_NOT_AVAILABLE = "../../assets/images/noImageAvailable.png";
const CustomSidebarMenu = (props) => {
  //   const BASE_PATH =
  //     "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  //   const proileImage = "react_logo.png";

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const usr = await useUserLogged();
      setUser(usr);
    };
    getUser();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Image
          source={{
            uri: user && user.image ? user.image : IMAGE_NOT_AVAILABLE,
          }}
          style={styles.sideMenuProfileIcon}
        />
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <AntDesign
          name="instagram"
          size={30}
          color="#5985EB"
          style={{ marginRight: 15 }}
          onPress={() =>
            Linking.openURL("instagram://user?username=passenger_argentina")
          }
        />
        <Entypo
          name="facebook-with-circle"
          size={30}
          color="#5985EB"
          style={{ marginRight: 15 }}
          onPress={() => Linking.openURL("fb://page/104006838563129")}
        />
        <MaterialCommunityIcons
          name="web"
          size={30}
          color="#5985EB"
          style={{ marginRight: 15 }}
          onPress={() =>
            Linking.openURL("https://guidorusso95.wixsite.com/passenger")
          }
        />
      </View>
      {/* <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
        }}
        onPress={() =>
          Linking.openURL("instagram://user?username=passenger_argentina")
        }
      >
        Seguinos en instagram
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: "#5985EB",
    alignSelf: "center",
    marginTop: 40,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
});

export default CustomSidebarMenu;

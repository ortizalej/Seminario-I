import * as React from "react";
import { Image, Text } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  StackHeaderTitleProps,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import NavigationDrawerStructure from "./NavigationDrawerStructure";
import HomeScreen from "../Home/HomeScreen";
import CloseSessionScreen from "../CloseSession/CloseSession";

const MenuScreen = () => {
  const Drawer = createDrawerNavigator();
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        style: { backgroundColor: "#ffffff" },
        activeTintColor: "blue",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        options={{
          drawerLabel: "Inicio",
          drawerIcon: () => (
            <AntDesign name={"home"} size={25} color={"#5985EB"} />
          ),
        }}
        component={HomeStack}
      />
      <Drawer.Screen
        // style={{ marginTop: 20 }}
        name="Cerrar Sesión"
        options={{
          drawerLabel: "Cerrar Sesión",
          drawerIcon: () => (
            <Ionicons name="md-exit" size={25} color={"#5985EB"} />
          ),
          headerTitleStyle: { marginTop: 20 },
        }}
        component={closeSessionStack}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

const HomeStack = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="Passenger"
        component={HomeTabsStack}
        options={({ route }) => ({
          headerTitle: () => (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: 220,
                height: 70,
                marginLeft: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const closeSessionStack = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="CloseSessionScreen">
      <Stack.Screen
        name="CloseSessionScreen"
        component={CloseSessionScreen}
        options={{
          title: "",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#5985EB",
            display: "none",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

function HomeTabsStack() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#F8F8F8",
        style: {
          backgroundColor: "#5985EB",
          display: "none",
        },
        labelStyle: {
          textAlign: "center",
        },
        indicatorStyle: {
          borderBottomColor: "#eee",
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Passenger",
        }}
      />
    </Tab.Navigator>
  );
}

export default MenuScreen;

import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require("../../assets/images/burger.png")}
          style={{
            width: 35,
            height: 35,
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawerStructure;

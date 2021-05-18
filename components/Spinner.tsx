import React, { FC } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";

const Spinner: FC = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color="#5985EB" />
  </View>
);

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;

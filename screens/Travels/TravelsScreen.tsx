import React, { useEffect, useState } from "react";
import { ToastAndroid, SafeAreaView, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Spinner from "../../components/Spinner";
import { CustomContainer } from "./travel.styles";
import { Travel } from "../../types";
import TravelCard from "../../components/TravelCard";
import { getTravelsService } from "../../services/travelService";
import { Text, StyleSheet } from "react-native";

export default function TravelsScreen() {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [travels, setTravels] = useState<Travel[]>([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setLoading(true);
        const getTravels = async () => {
          return await getTravelsService();
        };
        const resp = await getTravels();
        console.log("travels", resp);
        setTravels(resp.msg);
        setLoading(false);
      })();
      console.log("cargo travelsScreen");
    }
    return () => {};
  }, [isFocused]);

  useEffect(() => {
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      setMsg("");
    }
  }, [msg]);

  return (
    <CustomContainer>
      <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
        <ScrollView>
          {travels && travels.length ? (
            travels?.map((travel) => (
              <TravelCard key={travel.id} travel={travel} />
            ))
          ) : (
            <Text style={[styles.text]}>Aún no realizó viajes</Text>
          )}
        </ScrollView>
      </SafeAreaView>
      {loading && <Spinner />}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#656771",
    marginBottom: 12,
    marginTop: 200,
  },
});

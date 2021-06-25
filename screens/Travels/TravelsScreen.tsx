import React, { useEffect, useState } from "react";
import { ToastAndroid, SafeAreaView, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Spinner from "../../components/Spinner";
import { CustomContainer } from "./travel.styles";
import { Travel } from "../../types";
import TravelCard from "../../components/TravelCard";
import { getTravelsService } from "../../services/travelService";

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
          {travels &&
            travels.map((travel) => (
              <TravelCard key={travel.id} travel={travel} />
            ))}
        </ScrollView>
      </SafeAreaView>
      {loading && <Spinner />}
    </CustomContainer>
  );
}

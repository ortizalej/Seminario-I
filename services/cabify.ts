import React from "react";
import clientAxios from "../config/axios";
import { getResult } from "../utils";

export const authCabify = async () => {
  try {
    const resp = await clientAxios.post(`cabify/authorization`, {});
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener la Información`, false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const estimateTravel = async (start, finish) => {
  try {
    const token = await authCabify();
    if (token && token.isSuccess) {
      console.log("request", {
        start,
        finish,
        token: token.msg.token,
      });
      const resp = await clientAxios.post(`cabify/estimate`, {
        start,
        finish,
        token: token.msg.token,
      });
      if (resp && resp.data && resp.data.data) {
        return resp.data.data;
      } else {
        throw "Problemas al obtener info de cabify";
      }
    } else {
      throw "Problemas al obtener token";
    }
  } catch (error) {
    console.log("error", error);
  }
};

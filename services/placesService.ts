import React from "react";
import clientAxios from "../config/axios";
import useUserLogged from "../hooks/useUserLogged";
import { User, ServiceResult, IPlace, Travel } from "../types";
import { getResult } from "../utils";

let places: IPlace[] = [
  {
    id: "1",
    name: "Mi trabajo",
    address: "Uspallata 1882, Buenos Aires, Argentina",
    latitude: -34.6363908,
    longitude: -58.3891649,
  },
  {
    id: "2",
    name: "Casa Mama",
    address:
      "General Riego y Núñez 574, Turdera, Provincia de Buenos Aires, Argentina",
    latitude: -34.7893084,
    longitude: -58.40094430000001,
  },
];

export const getPlacesService = async () => {
  try {
    const { email } = await useUserLogged();

    // return getResult(places, true);

    const resp = await clientAxios.get(`users/places/${email}`);
    console.log("resp lugares", resp?.data);
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener los lugares`, false);
    }
  } catch (error) {
    return getResult(`Error al Obtener los lugares`, false);
  }
};

export const createPlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    const { email } = await useUserLogged();
    // console.log("crear lugar", place);
    const resp = await clientAxios.post(`users/places/${email}`, place);
    console.log("resp crear lugar", resp?.data);
    if (resp && resp.data) {
      return getResult(`Lugar almacenado correctamente!`, true);
    } else {
      return getResult("");
    }
    // place.id = (places.length + 1).toString();
    // places.push(place);
    // return getResult(`Lugar almacenado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const updatePlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    const { email } = await useUserLogged();
    const resp = await clientAxios.post(`users/places/${email}`, place);
    console.log("resp actualizar lugar", resp?.data);
    if (resp && resp.data) {
      return getResult(`Lugar actualizado correctamente!`, true);
    } else {
      return getResult("");
    }
    // console.log(place);
    // places = places.filter((p) => p.id !== place.id);
    // places.push(place);
    // return getResult(`Lugar actualizado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const deletePlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    const { email } = await useUserLogged();
    const req = {
      data: { place },
    };
    console.log("req", req);
    const resp = await clientAxios.delete(`users/places/${email}`, req);
    console.log("resp eliminar lugar", resp?.data);
    if (resp && resp.data) {
      return getResult(`Lugar eliminado correctamente!`, true);
    } else {
      return getResult("");
    }
    // places = places.filter((p) => p.id !== place.id);
    // return getResult(`Lugar eliminado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

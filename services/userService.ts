import React from "react";
import clientAxios from "../config/axios";
import useUserLogged from "../hooks/useUserLogged";
import { User, ServiceResult, IPlace, Travel } from "../types";
import { getResult } from "../utils";
import { saveItem, USERLOGGED } from "../utils/storage";

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

export const getAllDataService = async () => {
  try {
    const { email } = await useUserLogged();
    const resp = await clientAxios.get(`/users/getAllData/${email}`);
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener la Información`, false);
    }
  } catch (error) {
    return getResult(`Error al Obtener la Información`, false);
  }
};

export const authUserService = async (email, password) => {
  try {
    const resp = await clientAxios.post(`/auth/`, {
      email,
      password,
    });
    if (resp.data.user) {
      return getResult(resp.data.user, true);
    } else {
      return getResult(`El usuario indicado no se encuentra registrado`, false);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      return getResult(error.response.data.msg, false);
    } else {
      return getResult(
        "Error al intentar loguearse, revise su conexión",
        false
      );
    }
  }
};

export const createUserService = async (
  user: User
): Promise<ServiceResult<any>> => {
  try {
    const resp = await clientAxios.post(`/users/`, user);
    if (resp && resp.data) {
      return getResult(
        `Usuario creado correctamente, !Bienvenido ${user.name}!`,
        true
      );
    } else {
      return getResult("");
    }
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const updateUserService = async (
  user: User
): Promise<ServiceResult<any>> => {
  try {
    const resp = await clientAxios.put(`/users/${user.id}`, user);
    if (resp && resp.data) {
      return getResult(`Datos actualizados correctamente!`, true);
    } else {
      return getResult("");
    }
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const getTravelsService = async () => {
  try {
    const { email } = await useUserLogged();
    alert(email);
    const resp = await clientAxios.get(`/users/getAllTravels/${email}`);
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener los lugares`, false);
    }
  } catch (error) {
    return getResult(`Error al Obtener los lugares`, false);
  }
};

export const createTravelService = async (
  travel: Travel
): Promise<ServiceResult<any>> => {
  try {
    const resp = await clientAxios.post(`/travels/`, travel);
    if (resp && resp.data) {
      return getResult(`Viaje almacenado correctamente!`, true);
    } else {
      return getResult("");
    }
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const getPlacesService = async () => {
  try {
    const { email } = await useUserLogged();
    return getResult(places, true);
    // const resp = await clientAxios.get(`/places/${email}`);
    // if (resp.data) {
    //   return getResult(resp.data, true);
    // } else {
    //   return getResult(`Error al Obtener los lugares`, false);
    // }
  } catch (error) {
    return getResult(`Error al Obtener los lugares`, false);
  }
};

export const createPlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    // const resp = await clientAxios.post(`/places/`, place);
    // if (resp && resp.data) {
    //   return getResult(`Lugar almacenado correctamente!`, true);
    // } else {
    //   return getResult("");
    // }
    place.id = places.length.toString();
    places.push(place);
    return getResult(`Lugar almacenado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const updatePlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    // const resp = await clientAxios.put(`/places`, place);
    // if (resp && resp.data) {
    //   return getResult(`Lugar actualizado correctamente!`, true);
    // } else {
    //   return getResult("");
    // }
    places = places.filter((p) => p.id !== place.id);
    places.push(place);
    return getResult(`Lugar actualizado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

export const deletePlaceService = async (
  place: IPlace
): Promise<ServiceResult<any>> => {
  try {
    const { email } = await useUserLogged();
    // const resp = await clientAxios.delete(`/places/`, {
    //   data: { userEmail: email, idPlace: place.id },
    // });
    // if (resp && resp.data) {
    //   return getResult(`Lugar eliminado correctamente!`, true);
    // } else {
    //   return getResult("");
    // }
    places = places.filter((p) => p.id !== place.id);
    return getResult(`Lugar eliminado correctamente!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

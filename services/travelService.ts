import React from "react";
import clientAxios from "../config/axios";
import useUserLogged from "../hooks/useUserLogged";
import { ServiceResult, Travel } from "../types";
import { getResult } from "../utils";
import { saveItem, USERLOGGED } from "../utils/storage";

const travels: Travel[] = [
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
  {
    amount: 784.66,
    date: new Date(),
    originAddress: "Iberlucea 3155, Lanus",
    destinationAddress: "Solis 793, Montserrat",
    enterprise: "Cabify",
    status: "Finalizado",
    paidMethod: "Efectivo",
    totalDistance: 20.4,
  },
  {
    amount: 345.99,
    date: new Date(),
    originAddress: "Riego Nuñez 574, Lomas de Zamora",
    destinationAddress: "Lopez y Planes 1882, Avellaneda",
    enterprise: "Uber",
    status: "En Curso",
    paidMethod: "Tarjeta  Crédito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 10.2,
  },
  {
    amount: 1040,
    date: new Date(),
    originAddress: "Hipolito Yrigoyen 10453, Lomas de Zamora",
    destinationAddress: "Maximo Páz 432, Burzaco",
    enterprise: "Uber",
    status: "Cancelado",
    paidMethod: "Tarjeta Débito",
    cardNumber: "4224 4392 1284 1023",
    totalDistance: 30.1,
  },
];

export const getTravelsService = async () => {
  try {
    const { email } = await useUserLogged();
    const resp = await clientAxios.get(`users/travel/${email}`);
    console.log("resp obtener viajes", resp?.data);
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener los lugares`, false);
    }

    // return getResult(travels, true);
  } catch (error) {
    return getResult(`Error al Obtener los lugares`, false);
  }
};

export const createTravelService = async (
  travel: Travel
): Promise<ServiceResult<any>> => {
  try {
    const { email } = await useUserLogged();
    const resp = await clientAxios.post(`users/travels/${email}`, travel);
    if (resp && resp.data) {
      return getResult(`!Que disfrutes tu viaje!`, true);
    } else {
      return getResult("");
    }
    // travels.push(travel);
    // return getResult(`!Que disfrutes tu viaje!`, true);
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

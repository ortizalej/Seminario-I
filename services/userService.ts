import React from "react";
import clientAxios from "../config/axios";
import useUserLogged from "../hooks/useUserLogged";
import { getResult } from "../utils";
import { saveItem, USERLOGGED } from "../utils/storage";
// import { saveItem, USERLOGGED } from "../utils/storage";

export const getAllDataService = async () => {
  try {
    const {
      user: { email },
    } = await useUserLogged();
    console.log(email);
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
      await saveItem(USERLOGGED, {
        id: resp.data.user._id,
        email: resp.data.user.email,
        name: resp.data.user.name,
        password: resp.data.user.password,
      });
      return getResult(``, true);
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

export const createAccountService = async (name, email, password) => {
  try {
    const resp = await clientAxios.post(`/users/`, {
      name,
      email,
      password,
    });

    if (resp) {
      return getResult(
        `Usuario creado correctamente, !Bienvenido ${name}!`,
        true
      );
    }
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};

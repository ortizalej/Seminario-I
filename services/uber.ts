import React from "react";
import clientAxios from "../config/axios";
import { getResult } from "../utils";


export const authUber = async () => {
    try {
        const resp = await clientAxios.post(`uber/authorization`, {});
        console.log(resp.data)
        if (resp.data) {
            return getResult(resp.data, true);
        } else {
            return getResult(`Error al Obtener la Información`, false);
        }
    } catch (error) {
        console.log(error)
    }

};

export const estimateTravel = async (start, finish, token) => {
    try {
        const resp = await clientAxios.post(`uber/estimate`, {
            "start": start,
            "finish": finish,
            "token": token
        });
        console.log(resp)
        if (resp) {
        } else {
        }
    } catch (error) {
        console.log('error')
    }

};

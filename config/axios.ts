import axios from "axios"; //npm i axios

const clientAxios = axios.create({
  baseURL: "https://passenger-semi.herokuapp.com/", //"http://192.168.0.43:4000/api/", //
});

export default clientAxios;

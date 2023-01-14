import axios from "axios";
const request = axios.create({
  baseURL: "https://product-list-expnode.glitch.me/api/v1/",
});

export default request;

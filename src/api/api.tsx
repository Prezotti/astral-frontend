import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-3-145-213-8.us-east-2.compute.amazonaws.com:8080",
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ecowebfeira.com",
});

export default api;

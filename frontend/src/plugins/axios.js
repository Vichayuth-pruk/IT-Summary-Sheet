import axios from "axios";
import router from "../router";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("intercepted 2");
    console.log(error.response);
    if (error.response.status === 401) {
      alert("Please login again");
      localStorage.removeItem("token");
      router.push("/signin");
    }
    return Promise.reject(error);
  }
);

export default instance;

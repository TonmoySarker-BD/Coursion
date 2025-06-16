import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [user?.accessToken]);

  return api;
};

export default useAxiosSecure;

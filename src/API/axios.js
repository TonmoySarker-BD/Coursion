import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

const api = axios.create({
  baseURL: "https://coursion-server-eight.vercel.app",
  timeout: 10000,
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

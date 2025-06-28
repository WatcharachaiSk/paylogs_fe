import { getCookie } from "cookies-next";
import { AxiosRequestConfig } from "axios";

const configAxios = (
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: object
): AxiosRequestConfig => {
  const token = getCookie("token");

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      Authorization: token ? `Bearer ${token}` : "Bearer ",
    },
    timeout: 15000,
    data,
  };

  return config;
};

export default configAxios;

import {
  keysToCamelCase,
  serializeKeysToSnakeCase,
} from "@bigbinary/neeto-cist";
import axios from "axios";
import { evolve } from "ramda";

import { AXIOS_BASE_URL } from "../constants";

const transformKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformKeysToCamelCase(response);

    return response.data;
  });
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
};

const initializeAxios = () => {
  axios.defaults.baseURL = AXIOS_BASE_URL;
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
};

export default initializeAxios;

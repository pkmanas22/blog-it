import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";

import { AXIOS_BASE_URL, DEFAULT_ERROR_NOTIFICATION } from "./constants";

const setHttpHeaders = () => {
  axios.defaults.headers.common = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
};

const handleSuccessResponse = ({ data: responseData }) => {
  if (responseData) {
    responseData = keysToCamelCase(responseData);

    if (responseData?.notice) {
      Toastr.success(responseData.notice);
    }
  }

  return responseData;
};

const handleErrorResponse = error => {
  if (error.message === t("errors.axios.network")) {
    Toastr.error(t("errors.noInternetConnection"));

    return Promise.reject(error);
  }

  const {
    status,
    data: { error: errorMessage },
  } = error.response;

  if (status === 401) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    setTimeout(() => (window.location.href = routes.root), 2000);
  }

  Toastr.error(errorMessage || DEFAULT_ERROR_NOTIFICATION);

  if (status === 423) window.location.href = routes.root;

  return Promise.reject(error);
};

const registerIntercepts = () => {
  axios.interceptors.request.use(config => {
    const { authToken = null, email = null } = useAuthStore.getState().authUser;

    if (authToken && email) {
      config.headers["X-Auth-Email"] = email;
      config.headers["X-Auth-Token"] = authToken;
    }

    return config;
  });

  axios.interceptors.request.use(
    evolve({
      data: serializeKeysToSnakeCase,
      params: serializeKeysToSnakeCase,
    })
  );

  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

const initializeAxios = () => {
  axios.defaults.baseURL = AXIOS_BASE_URL;
  setHttpHeaders();
  registerIntercepts();
};

export const resetAuthTokens = () => {
  delete axios.defaults.headers.common["X-Auth-Email"];
  delete axios.defaults.headers.common["X-Auth-Token"];
};

export default initializeAxios;

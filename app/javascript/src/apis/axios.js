import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

import { AXIOS_BASE_URL, DEFAULT_ERROR_NOTIFICATION } from "./constants";

import routes from "../routes";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };

  // TODO: Set email & token to localstorage
};

const handleSuccessResponse = response => {
  if (response?.data) {
    response.data = keysToCamelCase(response.data);

    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }
  response.success = response.status === 200;

  return response.data;
};

const handleErrorResponse = error => {
  const status = error.response?.status;
  if (error.message === t("errors.axiosNetwork")) {
    Toastr.error(t("errors.noInternetConnection"));

    return Promise.reject(error);
  }

  if (status === 401) {
    // TODO: Check for authorization response
  }

  Toastr.error(error.response?.data?.error || DEFAULT_ERROR_NOTIFICATION);

  if (status === 423) window.location.href = routes.root;

  return Promise.reject(error);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);

  axios.interceptors.request.use(
    evolve({
      data: serializeKeysToSnakeCase,
      params: serializeKeysToSnakeCase,
    })
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = AXIOS_BASE_URL;
  setHttpHeaders();
  registerIntercepts();
};

export default initializeAxios;

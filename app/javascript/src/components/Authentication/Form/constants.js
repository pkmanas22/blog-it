import { t } from "i18next";
import * as yup from "yup";

export const SIGNUP_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(t("validation.required", { field: t("form.name") }))
    .min(2, t("validation.min", { field: t("form.name"), length: 2 }))
    .max(25, t("validation.max", { field: t("form.name"), length: 25 })),

  email: yup
    .string()
    .required(t("validation.required", { field: t("form.email") }))
    .email(t("validation.invalidEmail")),

  password: yup
    .string()
    .required(t("validation.required", { field: t("form.password") }))
    .min(6, t("validation.min", { field: t("form.password"), length: 6 })),

  passwordConfirmation: yup
    .string()
    .required(t("validation.required", { field: t("form.confirmPassword") }))
    .oneOf([yup.ref("password")], t("validation.passwordsMismatch")),
});

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required(t("validation.required", { field: t("form.email") }))
    .email(t("validation.invalidEmail")),

  password: yup
    .string()
    .required(t("validation.required", { field: t("form.password") }))
    .min(6, t("validation.min", { field: t("form.password"), length: 6 })),
});

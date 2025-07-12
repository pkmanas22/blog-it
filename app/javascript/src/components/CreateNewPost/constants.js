import { t } from "i18next";
import * as yup from "yup";

export const NEW_POST_INITIAL_VALUES = {
  title: "",
  description: "",
};

export const NEW_POST_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validation.title.required"))
    .min(5, t("validation.title.min", { min: 5 }))
    .max(150, t("validation.title.max", { max: 150 })),
  description: yup
    .string()
    .trim()
    .required(t("validation.description.required"))
    .min(20, t("validation.description.min", { min: 20 }))
    .max(5000, t("validation.description.max", { max: 5000 })),
});

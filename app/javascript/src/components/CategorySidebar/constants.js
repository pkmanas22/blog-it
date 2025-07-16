import { t } from "i18next";
import * as yup from "yup";

export const NEW_CATEGORY_INITIAL_VALUES = {
  title: "",
};

export const NEW_CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validation.title.required"))
    .min(2, t("validation.title.min", { min: 2 }))
    .max(25, t("validation.title.max", { max: 25 })),
});

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
    .required(t("validation.required", { field: t("form.title") }))
    .min(5, t("validation.min", { field: t("form.title"), length: 5 }))
    .max(150, t("validation.max", { field: t("form.title"), length: 150 })),
  description: yup
    .string()
    .trim()
    .required(t("validation.required", { field: t("form.description") }))
    .min(20, t("validation.min", { field: t("form.description"), length: 20 })),
  categories: yup.array().required(t("validation.categoriesRequired")),
});

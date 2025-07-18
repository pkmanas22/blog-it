import { t } from "i18next";
import * as yup from "yup";

export const NEW_CATEGORY_INITIAL_VALUES = {
  title: "",
};

export const NEW_CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validation.required", { field: t("form.title") }))
    .min(2, t("validation.min", { field: t("form.title"), length: 2 }))
    .max(25, t("validation.max", { field: t("form.title"), length: 25 })),
});

import { t } from "i18next";
import * as yup from "yup";

export const DEFAULT_PAGE_INDEX = 1;

export const DEFAULT_PAGE_SIZE = 5;

export const NEW_POST_INITIAL_VALUES = {
  title: "",
  description: "",
};

export const POST_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validation.required", { field: t("form.title") }))
    .min(5, t("validation.min", { field: t("form.title"), length: 5 }))
    .max(125, t("validation.max", { field: t("form.title"), length: 125 })),
  description: yup
    .string()
    .trim()
    .required(t("validation.required", { field: t("form.description") }))
    .min(20, t("validation.min", { field: t("form.description"), length: 20 }))
    .max(
      10000,
      t("validation.max", { field: t("form.description"), length: 10000 })
    ),
  categories: yup
    .array()
    .required(t("validation.categoriesRequired"))
    .min(1, t("validation.categoriesRequired")),
});

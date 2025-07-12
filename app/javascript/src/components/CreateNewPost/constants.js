import * as yup from "yup";

export const NEW_POST_INITIAL_VALUES = {
  title: "",
  description: "",
};

export const NEW_POST_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description must be at most 5000 characters"),
});

import React from "react";

import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Button as FormikButton,
  Textarea as FormikTextarea,
} from "neetoui/formik";
import withT from "utils/withT";

import {
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";

const Form = ({ t }) => (
  <NeetoUIForm
    className="container space-y-4 rounded-md border p-3 shadow-sm md:p-12"
    formikProps={{
      initialValues: NEW_POST_INITIAL_VALUES,
      validationSchema: NEW_POST_VALIDATION_SCHEMA,
      onSubmit: () => {},
    }}
  >
    <FormikInput
      required
      className="w-full"
      label={t("form.title")}
      name="title"
      placeholder={t("form.placeholders.title")}
    />
    <FormikTextarea
      required
      className="max-h-40 w-full"
      label={t("form.description")}
      name="description"
      placeholder={t("form.placeholders.description")}
    />
    <FormikButton className="w-20" label={t("form.submit")} type="submit" />
  </NeetoUIForm>
);

export default withT(Form);

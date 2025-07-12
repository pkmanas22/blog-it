import React from "react";

import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Button as FormikButton,
  Textarea as FormikTextarea,
} from "neetoui/formik";

import {
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";

const Form = () => (
  <NeetoUIForm
    className="container space-y-4 rounded-md border p-3 shadow-sm md:p-12"
    formikProps={{
      initialValues: NEW_POST_INITIAL_VALUES,
      validationSchema: NEW_POST_VALIDATION_SCHEMA,
      onSubmit: () => {},
    }}
  >
    <FormikInput required className="w-full" label="Title" name="title" />
    <FormikTextarea
      required
      className="max-h-40 w-full"
      label="Description"
      name="description"
    />
    <FormikButton className="w-20" label="Submit" type="submit" />
  </NeetoUIForm>
);

export default Form;

import React from "react";

import { Typography } from "neetoui";
import { Button, Input, Form as NeetoUIForm } from "neetoui/formik";
import { Link } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from "./constants";

const Login = ({ t, handleFormSubmit }) => (
  <NeetoUIForm
    className="space-y-4 text-center"
    formikProps={{
      initialValues: LOGIN_INITIAL_VALUES,
      validationSchema: LOGIN_VALIDATION_SCHEMA,
      onSubmit: handleFormSubmit,
    }}
  >
    <Typography style="h1" weight="bold">
      {t("auth.login")}
    </Typography>
    <Input
      required
      label={t("form.email")}
      name="email"
      placeholder={t("form.placeholders.email")}
      type="email"
    />
    <Input
      required
      label={t("form.password")}
      name="password"
      placeholder={t("form.placeholders.password")}
      type="password"
    />
    <Button
      className="w-full justify-center"
      label={t("auth.login")}
      type="submit"
    />
    <Typography>
      {t("auth.doNotHaveAccount")}
      <Link
        className="ml-2 text-blue-800 hover:text-blue-500 hover:underline"
        to={routes.auth.signup}
      >
        {t("auth.signup")}
      </Link>
    </Typography>
  </NeetoUIForm>
);

export default withT(Login);

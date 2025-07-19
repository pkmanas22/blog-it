import React from "react";

import { Typography } from "neetoui";
import { Button, Input, Form as NeetoUIForm } from "neetoui/formik";
import { Link } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

import { SIGNUP_INITIAL_VALUES, SIGNUP_VALIDATION_SCHEMA } from "./constants";

const Signup = ({ t, handleFormSubmit, isLoading }) => (
  <NeetoUIForm
    className="space-y-4 text-center"
    formikProps={{
      initialValues: SIGNUP_INITIAL_VALUES,
      validationSchema: SIGNUP_VALIDATION_SCHEMA,
      onSubmit: handleFormSubmit,
    }}
  >
    <Typography style="h1" weight="bold">
      {t("auth.signup")}
    </Typography>
    <Input
      required
      label={t("form.name")}
      name="name"
      placeholder={t("form.placeholders.name")}
      type="text"
    />
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
    <Input
      required
      label={t("form.confirmPassword")}
      name="passwordConfirmation"
      placeholder={t("form.placeholders.password")}
      type="password"
    />
    <Button
      className="w-full justify-center"
      disabled={isLoading}
      label={t("auth.signup")}
      loading={isLoading}
      type="submit"
    />
    <Typography>
      {t("auth.alreadyHaveAccount")}
      <Link
        className="ml-2 text-blue-800 hover:text-blue-500 hover:underline"
        to={routes.auth.login}
      >
        {t("auth.login")}
      </Link>
    </Typography>
  </NeetoUIForm>
);

export default withT(Signup);

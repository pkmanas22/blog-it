import React from "react";

import LoginForm from "components/Authentication/Form/Login";

const Login = () => {
  const handleFormSubmit = () => {};

  return (
    <div className="flex h-full items-center justify-center">
      <div className="m-auto w-1/3">
        <LoginForm {...{ handleFormSubmit }} />
      </div>
    </div>
  );
};

export default Login;

import React from "react";

import LoginForm from "components/Authentication/Form/Login";
import { useAuthLogin } from "hooks/reactQuery/useAuthApi";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";

const Login = () => {
  const history = useHistory();

  const { mutate: loginUser, isLoading } = useAuthLogin();

  const setAuth = useAuthStore(state => state.setAuth);

  const handleFormSubmit = formData => {
    loginUser(formData, {
      onSuccess: ({
        id: userId,
        name: userName,
        authenticationToken: authToken,
        email,
      }) => {
        setAuth({ authToken, userId, userName, email });

        history.push(routes.blogs.index);
      },
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <LoginForm {...{ handleFormSubmit, isLoading }} />
      </div>
    </div>
  );
};

export default Login;

import React from "react";

import SignupForm from "components/Authentication/Form/Signup";
import { useAuthSignup } from "hooks/reactQuery/useAuthApi";
import { useHistory } from "react-router-dom";
import routes from "routes";

const Signup = () => {
  const history = useHistory();

  const { mutate: signupUser, isLoading } = useAuthSignup();

  const handleFormSubmit = formData => {
    signupUser(formData, {
      onSuccess: () => {
        history.push(routes.posts.index);
      },
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <SignupForm {...{ isLoading, handleFormSubmit }} />
      </div>
    </div>
  );
};

export default Signup;

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
        history.push(routes.blogs.index);
      },
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="m-auto w-1/3">
        <SignupForm {...{ isLoading, handleFormSubmit }} />
      </div>
    </div>
  );
};

export default Signup;

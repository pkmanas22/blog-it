import React from "react";

import SignupForm from "components/Authentication/Form/Signup";
import { useAuthSignup } from "hooks/reactQuery/useAuthApi";

const Signup = () => {
  const { mutate: signupUser, isLoading } = useAuthSignup();

  const handleFormSubmit = formData => {
    signupUser({
      ...formData,
      organizationId: 1,
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

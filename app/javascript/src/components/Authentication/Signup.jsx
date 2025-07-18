import React from "react";

import SignupForm from "components/Authentication/Form/Signup";

const Signup = () => {
  const handleFormSubmit = () => {};

  return (
    <div className="flex h-full items-center justify-center">
      <div className="m-auto w-1/3">
        <SignupForm {...{ handleFormSubmit }} />
      </div>
    </div>
  );
};

export default Signup;

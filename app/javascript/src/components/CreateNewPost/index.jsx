import React from "react";

import { PageHeader } from "components/common";

import Form from "./Form";

const CreateNewPost = () => (
  <div className="h-full py-12 pl-12">
    <PageHeader label="New blog post" />
    <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
      <Form />
    </div>
  </div>
);

export default CreateNewPost;

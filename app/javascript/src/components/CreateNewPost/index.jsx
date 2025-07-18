import React from "react";

import { PageHeader } from "components/common";
import withT from "utils/withT";

import Form from "./Form";

const CreateNewPost = ({ t }) => (
  <div className="h-full py-12 pl-12">
    <PageHeader label={t("blog.newPost")} />
    <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
      <Form />
    </div>
  </div>
);

export default withT(CreateNewPost);

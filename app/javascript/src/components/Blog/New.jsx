import React from "react";

import { PageHeader } from "components/common";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { NEW_POST_INITIAL_VALUES } from "./constants";
import NewPostForm from "./Form";
import { getCategoryIds } from "./utils";

const New = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { isLoading: isSubmissionLoading, mutate: createPost } =
    useCreatePost();

  const handleFormSubmit = data => {
    const { title, description, categories = [] } = data;

    const categoryIds = getCategoryIds(categories);

    createPost(
      { title, description, categoryIds },
      {
        onSuccess: () => {
          history.push(routes.blogs.index);
        },
      }
    );
  };

  return (
    <div className="h-full py-12 pl-12">
      <PageHeader label={t("blog.newPost")} />
      <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
        <NewPostForm
          initialValues={NEW_POST_INITIAL_VALUES}
          {...{ handleFormSubmit, isSubmissionLoading }}
        />
      </div>
    </div>
  );
};

export default New;

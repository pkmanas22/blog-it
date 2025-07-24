import React, { useRef, useState } from "react";

import { ActionBlock, PageHeader } from "components/common";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { NEW_POST_INITIAL_VALUES } from "./constants";
import NewPostForm from "./Form";
import { getCategoryIds } from "./utils";

const New = () => {
  const [isPublishButtonActive, setIsPublishButtonActive] = useState(false);

  const formikRef = useRef(null);

  const { t } = useTranslation();

  const history = useHistory();

  const { isLoading: isSubmissionLoading, mutate: createPost } =
    useCreatePost();

  const handleFormSubmit = data => {
    const { title, description, categories = [] } = data;

    const params = {
      title,
      description,
      categoryIds: getCategoryIds(categories),
      status: isPublishButtonActive ? "published" : "draft",
    };

    createPost(params, {
      onSuccess: () => {
        history.push(routes.myBlogs);
      },
    });
  };

  const handleActionSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <div className="h-full py-12 pl-12">
      <PageHeader label={t("blog.newPost")}>
        <ActionBlock
          {...{
            isPublishButtonActive,
            setIsPublishButtonActive,
            handleActionSubmit,
          }}
        />
      </PageHeader>
      <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
        <NewPostForm
          initialValues={NEW_POST_INITIAL_VALUES}
          {...{ handleFormSubmit, isSubmissionLoading, formikRef }}
        />
      </div>
    </div>
  );
};

export default New;

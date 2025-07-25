import React, { useRef, useState } from "react";

import { PageLoader, PageNotFound } from "components/common";
import { useEditPost } from "hooks/reactQuery/usePostsApi";
import useFetchPostWithStatus from "hooks/useFetchPostWithStatus";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import Header from "./Header";

import EditPostForm from "../Form";
import { formatCategoriesForSelectInput, getCategoryIds } from "../utils";

const Edit = () => {
  const [isPublishButtonActive, setIsPublishButtonActive] = useState(true);

  const history = useHistory();

  const { post, isPostLoading, isPostNotFound } = useFetchPostWithStatus();

  const formikRef = useRef(null);

  const { mutate: editPost, isLoading: isSubmissionLoading } = useEditPost(
    post?.slug
  );

  const handleFormSubmit = data => {
    const { title, description, slug, categories = [] } = data;

    const params = {
      title,
      description,
      categoryIds: getCategoryIds(categories),
      status: isPublishButtonActive ? "published" : "draft",
    };

    editPost(params, {
      onSuccess: () => {
        history.push(buildUrl(routes.blogs.show, { slug }));
      },
    });
  };

  const handleActionSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const initialValues = {
    ...post,
    categories: formatCategoriesForSelectInput(post.categories),
  };

  if (isPostLoading) {
    return <PageLoader />;
  }

  if (isPostNotFound) {
    return <PageNotFound />;
  }

  return (
    <div className="h-full py-12 pl-12">
      <Header
        {...{
          slug: post?.slug,
          isPublishButtonActive,
          setIsPublishButtonActive,
          handleActionSubmit,
        }}
      />
      <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
        <EditPostForm
          {...{
            handleFormSubmit,
            isSubmissionLoading,
            initialValues,
            formikRef,
          }}
        />
      </div>
    </div>
  );
};

export default Edit;

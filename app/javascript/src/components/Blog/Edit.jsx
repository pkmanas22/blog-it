import React from "react";

import { PageHeader, PageLoader } from "components/common";
import { useEditPost, useShowPost } from "hooks/reactQuery/usePostsApi";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import EditPostForm from "./Form";
import { formatCategoriesForSelectInput, getCategoryIds } from "./utils";

const Edit = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { slug } = useParams();

  const { data: post = {}, isLoading: isPostLoading } = useShowPost(slug);

  const { mutate: editPost, isLoading: isSubmissionLoading } =
    useEditPost(slug);

  const handleFormSubmit = data => {
    const { title, description, categories = [] } = data;

    const categoryIds = getCategoryIds(categories);

    editPost(
      { title, description, categoryIds },
      {
        onSuccess: () => {
          history.push(buildUrl(routes.blogs.show, { slug }));
        },
      }
    );
  };

  const initialValues = {
    ...post,
    categories: formatCategoriesForSelectInput(post.categories),
  };

  if (isPostLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-full py-12 pl-12">
      <PageHeader label={t("blog.editPost")} />
      <div className="h-11/12 container w-11/12 overflow-y-auto rounded-md border p-3 shadow-sm md:p-12">
        <EditPostForm
          {...{ handleFormSubmit, isSubmissionLoading, initialValues }}
        />
      </div>
    </div>
  );
};

export default Edit;

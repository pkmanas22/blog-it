import React, { useRef, useState } from "react";

import { ActionBlock, PageHeader, PageLoader } from "components/common";
import { useEditPost, useShowPost } from "hooks/reactQuery/usePostsApi";
import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import EditPostForm from "./Form";
import { formatCategoriesForSelectInput, getCategoryIds } from "./utils";

const Edit = () => {
  const [isPublishButtonActive, setIsPublishButtonActive] = useState(true);

  const { t } = useTranslation();

  const history = useHistory();

  const { slug } = useParams();

  const { data: post = {}, isLoading: isPostLoading } = useShowPost(slug);

  const formikRef = useRef(null);

  const { mutate: editPost, isLoading: isSubmissionLoading } =
    useEditPost(slug);

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

  return (
    <div className="h-full py-12 pl-12">
      <PageHeader label={t("blog.editPost")}>
        <div className="flex items-center gap-3">
          <Button
            icon={ExternalLink}
            style="text"
            to={buildUrl(routes.blogs.show, { slug })}
            tooltipProps={{ content: "Preview", position: "top" }}
          />
          <ActionBlock
            {...{
              isPublishButtonActive,
              setIsPublishButtonActive,
              handleActionSubmit,
            }}
            shouldShowMenubar
          />
        </div>
      </PageHeader>
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

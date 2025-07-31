import React from "react";

import classNames from "classnames";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull, isNotPresent, isPresent } from "neetocist";
import { Tag, Typography } from "neetoui";
import { any } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import { getCategoryParams, getUpdatedParams } from "./utils";

const Message = ({ totalPostsCount }) => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { title, category, status } = queryParams;

  const categoryParams = getCategoryParams(category);

  const shouldShowFilteredMessage = any(isPresent)([title, category, status]);

  const handleTagClose = (key, value) => {
    const updatedParams = getUpdatedParams({
      key,
      value,
      queryParams,
    });

    history.replace(buildUrl(routes.myPosts, filterNonNull(updatedParams)));
  };

  if (shouldShowFilteredMessage) {
    return (
      <div className="flex items-center gap-2">
        <Typography hidden={isNotPresent(title)} style="h3" weight="semibold">
          {t("myPosts.searchTitle", { count: totalPostsCount, title })}
        </Typography>
        {categoryParams?.map(category => (
          <Tag
            key={category}
            label={category}
            style="secondary"
            className={classNames("capitalize", {
              hidden: !category,
            })}
            onClose={() => handleTagClose("category", category)}
          />
        ))}
        <Tag
          label={status}
          style="danger"
          className={classNames("capitalize", {
            hidden: !status,
          })}
          onClose={() => handleTagClose("status")}
        />
      </div>
    );
  }

  return (
    <Typography style="h3" weight="semibold">
      {t("myPosts.postCount", { count: totalPostsCount })}
    </Typography>
  );
};

export default Message;

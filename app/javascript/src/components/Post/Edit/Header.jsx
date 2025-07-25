import React from "react";

import { ActionBlock, ActionMenubar, PageHeader } from "components/common";
import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import routes from "routes";
import buildUrl from "utils/buildUrl";
import withT from "utils/withT";

const Header = ({
  t,
  slug,
  isPublishButtonActive,
  setIsPublishButtonActive,
  handleActionSubmit,
}) => (
  <PageHeader label={t("post.editPost")}>
    <div className="flex items-center gap-3">
      <Button
        icon={ExternalLink}
        style="text"
        to={buildUrl(routes.posts.show, { slug })}
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
      <ActionMenubar {...{ slug }} />
    </div>
  </PageHeader>
);

export default withT(Header);

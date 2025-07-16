import React from "react";

import { Avatar } from "neetoui";

import { DEFAULT_AVATAR_URL } from "./constants";

const AvatarProfile = ({ imageUrl = "" }) => (
  <Avatar
    size="large"
    user={{
      imageUrl: imageUrl || DEFAULT_AVATAR_URL,
      name: "User",
    }}
  />
);

export default AvatarProfile;

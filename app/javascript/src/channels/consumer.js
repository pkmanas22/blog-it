// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable";
import useAuthStore from "stores/useAuthStore";

const buildWebsocketURL = () => {
  const { authToken, email } = useAuthStore.getState().authUser;

  return encodeURI(`/cable?auth_token=${authToken}&email=${email}`);
};

export default () => createConsumer(buildWebsocketURL());

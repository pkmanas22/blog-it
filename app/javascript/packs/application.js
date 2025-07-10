import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import App from "../src/App";

import { initializeLogger } from "common/logger";
import initializeAxios from "../src/apis/axios";

initializeLogger();
initializeAxios();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};

import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, omit, pipe, isEmpty } from "ramda";

const buildUrl = (route, params) => {
  const placeholders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeholders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(omit(placeholders), keysToSnakeCase, params =>
    stringify(params, { arrayFormat: "repeat" })
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};

export default buildUrl;

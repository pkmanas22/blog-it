import { QUERY_KEYS } from "constants/query";

import { useQuery } from "react-query";
import categoriesApi from "src/apis/categories";

export const useFetchCategories = () =>
  useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => categoriesApi.fetch(),
  });

import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

export const useFetchCategories = () =>
  useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => categoriesApi.fetch(),
    select: prop("categories"),
  });

export const useCreateCategory = () => useMutation(categoriesApi.create);

import { format } from "date-fns";
import { capitalize } from "neetocist";
import { join, map, pipe } from "ramda";

export const formatPublishedDate = dateString => {
  const date = new Date(dateString);

  if (!dateString || isNaN(date)) return "---";

  return format(date, "PPpp");
};

export const formatCategories = pipe(map(capitalize), join(", "));

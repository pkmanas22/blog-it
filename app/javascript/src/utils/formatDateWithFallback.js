import { format } from "date-fns";

const formatDateWithFallback = (dateString, formatString = "P") => {
  const date = new Date(dateString);

  if (!dateString || isNaN(date)) return "---";

  return format(date, formatString);
};

export default formatDateWithFallback;

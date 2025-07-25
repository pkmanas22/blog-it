import { format } from "date-fns";

const formatDateWithFallback = (
  dateString,
  formatString = "P",
  fallbackString = "-"
) => {
  const date = new Date(dateString);

  if (!dateString || isNaN(date)) return fallbackString;

  return format(date, formatString);
};

export default formatDateWithFallback;

export const formatCategoriesForSelectInput = (categories = []) =>
  categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

export const getCategoryIds = (categories = []) =>
  categories.map(({ value }) => value);

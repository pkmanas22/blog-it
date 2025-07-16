import { create } from "zustand";

const useCategoriesStore = create(set => ({
  isCategorySidebarOpen: false,

  toggleCategorySidebarOpen: () =>
    set(({ isCategorySidebarOpen }) => ({
      isCategorySidebarOpen: !isCategorySidebarOpen,
    })),
}));

export default useCategoriesStore;

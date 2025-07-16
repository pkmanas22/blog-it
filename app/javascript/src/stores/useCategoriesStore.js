import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoriesStore = create(
  persist(
    set => ({
      isCategorySidebarOpen: false,

      toggleCategorySidebarOpen: () =>
        set(({ isCategorySidebarOpen }) => ({
          isCategorySidebarOpen: !isCategorySidebarOpen,
        })),

      openCategorySidebar: () =>
        set(() => ({
          isCategorySidebarOpen: true,
        })),
    }),
    {
      name: "category-sidebar",
    }
  )
);

export default useCategoriesStore;

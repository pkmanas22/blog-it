import { EMPTY_AUTH_USER } from "stores/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    set => ({
      authUser: { ...EMPTY_AUTH_USER },
      isAuthenticated: false,

      setAuth: ({ authToken, userId, userName, email }) =>
        set({
          authUser: { authToken, userId, userName, email },
          isAuthenticated: !!(authToken && email),
        }),

      clearAuth: () =>
        set({ authUser: { ...EMPTY_AUTH_USER }, isAuthenticated: false }),
    }),
    { name: "x-auth-store" }
  )
);

export default useAuthStore;

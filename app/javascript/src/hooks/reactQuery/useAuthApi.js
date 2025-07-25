import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { useMutation } from "react-query";
import useAuthStore from "stores/useAuthStore";
import queryClient from "utils/queryClient";

export const useAuthSignup = () => useMutation(authApi.signup);

export const useAuthLogin = () => {
  const setAuth = useAuthStore.pickFrom();

  return useMutation(authApi.login, {
    onSuccess: ({
      id: userId,
      name: userName,
      authenticationToken: authToken,
      email,
    }) => {
      setAuth({ authToken, userId, userName, email });
      queryClient.clear();
    },
  });
};

export const useAuthLogout = () => {
  const clearAuth = useAuthStore.pickFrom();

  return useMutation(authApi.logout, {
    onSuccess: () => {
      clearAuth();
      resetAuthTokens();
      queryClient.clear();
    },
  });
};

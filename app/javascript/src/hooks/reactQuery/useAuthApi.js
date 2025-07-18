import authApi from "apis/auth";
import { useMutation } from "react-query";

export const useAuthSignup = () => useMutation(authApi.signup);

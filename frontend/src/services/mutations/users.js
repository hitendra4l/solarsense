import { useMutation } from "@tanstack/react-query";

import {
  signUpUser,
  logInUser,
  updateUser,
  updateProfilePicture,
} from "../api/users";
import { setUserInfo } from "../../store/userSlice";

export const useSignUpUser = (onSuccessfulSignUp) => {
  return useMutation({
    mutationFn: (data) => {
      return signUpUser(data);
    },
    onMutate: () => {
      console.log("Mutate Sign Up user");
    },
    onError: () => {
      console.log("Error Sign Up user");
    },
    onSuccess: (data) => {
      console.log("Success Sign Up user");
      if (data) {
        onSuccessfulSignUp(data);
      }
    },
  });
};

export const useLogInUser = (onSuccessfulLogIn) => {
  return useMutation({
    mutationFn: (data) => {
      return logInUser(data);
    },
    onMutate: () => {
      console.log("Mutate Log In user");
    },
    onError: () => {
      console.log("Error Log In user");
    },
    onSuccess: (data) => {
      console.log("Success Log In user");
      if (data) {
        onSuccessfulLogIn(data);
      }
    },
  });
};

export const useUpdateUser = (dispatch, getUserQuery) => {
  return useMutation({
    mutationFn: ({ data, token }) => {
      return updateUser({ data, token });
    },
    onMutate: () => {
      console.log("Mutate Log In user");
    },
    onError: () => {
      console.log("Error Log In user");
    },
    onSuccess: (data) => {
      console.log("Success Log In user");
      if (data) {
        dispatch(setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
        getUserQuery.refetch();
      }
    },
  });
};

export const useUpdateProfilePicture = (dispatch) => {
  return useMutation({
    mutationFn: ({ formData, token }) => {
      return updateProfilePicture({ formData, token });
    },
    onMutate: () => {
      console.log("Mutate Profile Picture");
    },
    onError: () => {
      console.log("Error Profile Picture");
    },
    onSuccess: (data) => {
      console.log("Success Profile Picture");
      if (data) {
        dispatch(setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
      }
    },
  });
};

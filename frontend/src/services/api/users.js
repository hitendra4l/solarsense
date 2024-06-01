import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const signUpUser = async ({ name, email, password }) => {
  try {
    const { data } = await axiosInstance.post("/api/users/signup", {
      name,
      email,
      password,
    });
    toast.success("You are successfully registered!");
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const logInUser = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", {
      email,
      password,
    });
    console.log("data received", data);
    toast.success("You are successfully logged in!");
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const updateUser = async ({ data: dataToUpdate, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.put(
      "/api/users/updateProfile",
      dataToUpdate,
      config
    );
    console.log("data received", data);
    toast.success("Profile is successfully updated!");
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const updateProfilePicture = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData, token);
    const { data } = await axiosInstance.put(
      "/api/users/updateProfilePicture",
      formData,
      config
    );
    console.log("data received", data);
    toast.success("Avatar is successfully updated!");
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get("/api/users/getProfile", config);

    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

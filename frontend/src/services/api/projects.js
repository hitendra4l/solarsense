import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const createNewProject = async ({
  latitude,
  longitude,
  name,
  token,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.post(
      "/api/projects",
      {
        name,
        latitude,
        longitude,
      },
      config
    );
    toast.success("Project created successfully!");
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const getProject = async ({ projectId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get(
      `/api/projects/${projectId}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const updateProject = async ({ projectId, projectData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.put(
      `/api/projects/${projectId}`,
      projectData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const getAllProjects = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/projects`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

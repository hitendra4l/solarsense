import { useMutation } from "@tanstack/react-query";

import { createNewProject, updateProject } from "../api/projects";

export const useCreateNewProject = () => {
  return useMutation({
    mutationFn: (data) => {
      return createNewProject(data);
    },
    onMutate: () => {
      console.log("Mutate create new project");
    },
    onError: () => {
      console.log("Error create new project");
    },
    onSuccess: () => {
      console.log("Success create new project");
    },
  });
};

export const useUpdateProject = (projectDataQuery) => {
  return useMutation({
    mutationFn: (data) => {
      return updateProject(data);
    },
    onMutate: () => {
      console.log("Mutate create new project");
    },
    onError: () => {
      console.log("Error create new project");
    },
    onSuccess: () => {
      console.log("Success create new project");
      projectDataQuery.refetch();
      
    },
  });
};

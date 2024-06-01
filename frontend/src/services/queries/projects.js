import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getProject } from "../api/projects";

export const useProjectData = ({ projectId, token }) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["getProject", { projectId }],
    queryFn: () => getProject({ projectId, token }),
  });
};

export const useAllProjectsData = ({ token }) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["getAllProjects"],
    queryFn: () => getAllProjects({ token }),
  });
};

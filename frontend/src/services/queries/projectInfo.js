import { useQuery } from "@tanstack/react-query";
import { elevation, geoapify } from "../api/projectInfo";

export const useElevation = ({ latitude, longitude }) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["elevation", { latitude, longitude }],
    queryFn: () => elevation({ latitude, longitude }),
  });
};

export const useGeoapify = ({ latitude, longitude }) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["geoapify", { latitude, longitude }],
    queryFn: () => geoapify({ latitude, longitude }),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/users";

export const useProfileData = ({ token }) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getUserProfile({ token }),
  });
};

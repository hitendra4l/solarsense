import { useQuery } from "@tanstack/react-query";
import { nasaData } from "../api/meteoData";

export const useNasaData = ({ latitude, longitude }) => {
  return useQuery({
    queryKey: ["nasaData", { latitude, longitude }],
    queryFn: () => nasaData({ latitude, longitude }),
  });
};

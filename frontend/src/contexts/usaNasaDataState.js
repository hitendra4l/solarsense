import { createContext, useContext } from "react";

export const nasaDataContext = createContext(null);

export const useNasaDataState = () => {
  return useContext(nasaDataContext);
};

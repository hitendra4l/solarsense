import { createContext, useContext } from "react";

export const energyContext = createContext(null);

export const useEnergyState = () => {
  return useContext(energyContext);
};

import { createContext, useContext } from "react";

export const financeContext = createContext(null);

export const useFinanceState = () => {
  return useContext(financeContext);
};

import { createContext, useContext } from "react";

export const projectContext = createContext(null);

export const useProjectState = () => {
  return useContext(projectContext);
};

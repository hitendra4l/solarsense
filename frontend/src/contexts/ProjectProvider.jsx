import { useState } from "react";
import { projectContext } from "./useProjectState";

const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <projectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </projectContext.Provider>
  );
};

export default ProjectProvider;

import { useState } from "react";
// import { projectContext } from "./useProjectState";
import { nasaDataContext } from "./usaNasaDataState";

const NasaDataProvider = ({ children }) => {
  const [nasaDataState, setNasaDataState] = useState(null);

  return (
    <nasaDataContext.Provider value={{ nasaDataState, setNasaDataState }}>
      {children}
    </nasaDataContext.Provider>
  );
};

export default NasaDataProvider;

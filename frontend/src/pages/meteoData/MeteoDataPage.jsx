import MeteoDataTable from "../../components/MeteoDataTable";
import MeteoDataGraphs from "../../components/MeteoDataGraphs";
import { useProjectState } from "../../contexts/useProjectState";
import { useNasaData } from "../../services/queries/meteoData";
import { formatNasaDataForMeteo } from "../../utils/formatNasaData";
import { useProjectData } from "../../services/queries/projects";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MeteoParameterDefinition from "../../components/MeteoParameterDefinition";

const MeteoDataPage = () => {
  const { selectedProject, setSelectedProject } = useProjectState();
  const { userInfo: user } = useSelector((state) => state.user);
  const { projectId } = useParams();

  const { data: projectData } = useProjectData({
    projectId,
    token: user?.token,
  });

  useEffect(() => {
    if (!selectedProject) {
      setSelectedProject(projectData);
    }
  }, [projectData, setSelectedProject, selectedProject]);

  const { data: nasaQueryData } = useNasaData({
    latitude: selectedProject?.latitude,
    longitude: selectedProject?.longitude,
  });

  const formattedData = formatNasaDataForMeteo(nasaQueryData);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-dark-hard mb-4">
        {selectedProject?.name}
      </h3>
      <div className="pb-10">
        <MeteoDataTable data={formattedData} />
        <MeteoDataGraphs data={nasaQueryData?.properties?.parameter} />
        <MeteoParameterDefinition />
      </div>
    </div>
  );
};
export default MeteoDataPage;

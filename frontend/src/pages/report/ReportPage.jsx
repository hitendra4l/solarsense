import { useSelector } from "react-redux";
import { useProjectState } from "../../contexts/useProjectState";
import { useParams } from "react-router-dom";
import { useProjectData } from "../../services/queries/projects";
import { useEffect } from "react";
import { useNasaData } from "../../services/queries/meteoData";
import { formatNasaDataForMeteo } from "../../utils/formatNasaData";
import ReportPdf from "../../components/ReportPdf";

const ReportPage = () => {
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
    <div className="flex flex-col items-center w-full">
      <div className="self-start text-xl font-bold print:hidden">
        {selectedProject?.name}
      </div>
      <div className="flex flex-col gap-2 items-center text-center w-3/4 mt-10 mb-5 print:hidden">
        <div className="text-light-hard">
          This report is based on meteorological database developed and operated
          by different data providers. The data parameters presented in this
          report are computed by{" "}
          <span className="font-bold text-dark-hard">SolarSense</span>. The data
          used as inputs to the models come from different sources.
        </div>
        <div className="font-semibold text-lg">
          Generate a report from the current configuration.
        </div>
      </div>
      <button
        onClick={() => window.print()}
        className="bg-light-soft w-fit px-10 text-white text-2xl font-bold py-3 rounded hover:bg-light-hard transition-colors duration-200 mt-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-light-soft print:hidden"
      >
        {nasaQueryData ? "Download report" : "Generating report..."}
      </button>
      <ReportPdf
        projectData={selectedProject}
        tableData={formattedData}
        graphsData={nasaQueryData?.properties?.parameter}
      />
    </div>
  );
};
export default ReportPage;

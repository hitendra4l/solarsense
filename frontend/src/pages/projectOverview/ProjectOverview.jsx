import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useProjectData } from "../../services/queries/projects";
import { useElevation, useGeoapify } from "../../services/queries/projectInfo";
import toast from "react-hot-toast";
import { useUpdateProject } from "../../services/mutations/projects";
import { useProjectState } from "../../contexts/useProjectState";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const ProjectOverview = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { projectId } = useParams();
  const [editName, setEditName] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { setSelectedProject } = useProjectState();

  const projectDataQuery = useProjectData({
    projectId,
    token: user?.token,
  });

  const geoapifyQuery = useGeoapify({
    latitude: projectDataQuery.data?.latitude,
    longitude: projectDataQuery.data?.longitude,
  });

  const elevationQuery = useElevation({
    latitude: projectDataQuery.data?.latitude,
    longitude: projectDataQuery.data?.longitude,
  });

  const updateProjectMutation = useUpdateProject(projectDataQuery);

  const mapRef = useRef();

  useEffect(() => {
    if (projectDataQuery.isFetched) {
      mapRef.current?.flyTo({
        center: [
          projectDataQuery.data?.longitude,
          projectDataQuery.data?.latitude,
        ],
      });
      setSelectedProject({
        latitude: projectDataQuery.data?.latitude,
        longitude: projectDataQuery.data?.longitude,
        name: projectDataQuery.data?.name,
        _id: projectDataQuery.data?._id,
      });
    }
  }, [setSelectedProject, projectDataQuery.data, projectDataQuery.isFetched]);

  const handleUpdateName = () => {
    if (!projectName) {
      toast.error("Project name can't be empty");
      setEditName(false);
      return;
    }
    if (projectName) {
      updateProjectMutation.mutate({
        projectId,
        token: user?.token,
        projectData: { name: projectName },
      });
      console.log(projectName);
    }
    setEditName(false);
  };
  return (
    <div className="flex w-full gap-6 flex-wrap">
      <div className="border-2 rounded-md border-dark-hard flex-grow flex-1 p-3">
        <h3 className="text-xl font-bold text-dark-hard mb-8">Project Info</h3>
        <div className="w-full flex flex-col gap-2 text-dark-soft">
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Project Name</p>
            {editName ? (
              <input
                className="bg-transparent border-2 border-dark-hard px-2 outline-none rounded"
                type="text"
                name="name"
                onChange={(e) => setProjectName(e.target.value)}
                defaultValue={projectDataQuery.data?.name}
              />
            ) : (
              <p className="">
                {projectDataQuery.isFetching
                  ? "Loading..."
                  : projectDataQuery.data?.name}
              </p>
            )}
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Latitude</p>
            <p className="text-nowrap">
              {projectDataQuery.isFetching
                ? "Loading..."
                : `${Number(projectDataQuery.data?.latitude).toFixed(2)}°`}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Longitude</p>
            <p className="text-nowrap">
              {projectDataQuery.isFetching
                ? "Loading..."
                : `${Number(projectDataQuery.data?.longitude).toFixed(2)}°`}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Address</p>
            <p className="">
              {geoapifyQuery.isFetching
                ? "Loading..."
                : geoapifyQuery.data?.features[0]?.properties?.formatted}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Created At</p>
            <p className="text-nowrap">
              {projectDataQuery.isFetching
                ? "Loading..."
                : new Date(projectDataQuery.data?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Last Changed</p>
            <p className="text-nowrap">
              {projectDataQuery.isFetching
                ? "Loading..."
                : new Date(projectDataQuery.data?.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Time Zone</p>
            <p className="text-nowrap">
              {geoapifyQuery.isFetching
                ? "Loading..."
                : `UTC${geoapifyQuery.data?.features[0]?.properties?.timezone?.offset_STD}, ${geoapifyQuery.data?.features[0]?.properties?.timezone?.name} [${geoapifyQuery.data?.features[0]?.properties?.timezone?.abbreviation_STD}]`}
            </p>
          </div>
          <div className="flex items-center text-lg">
            <p className="w-[200px] font-semibold">Elevation</p>
            <p className="text-nowrap">
              {elevationQuery.isFetching
                ? "Loading..."
                : `${elevationQuery.data?.elevation[0]}m`}
            </p>
          </div>
        </div>

        <div className="text-xl text-light-hard font-bold mt-8 flex gap-8">
          {editName ? (
            <button
              onClick={handleUpdateName}
              className="disabled:opacity-50"
              disabled={!projectName}
            >
              Update
            </button>
          ) : (
            <button onClick={() => setEditName(true)} className="">
              Edit Name
            </button>
          )}

          {editName && (
            <button onClick={() => setEditName(false)} className="">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="border-2 rounded-md border-dark-hard flex-grow flex-1 p-3">
        <h3 className="text-xl font-bold text-dark-hard mb-8">Map</h3>
        <div className="w-full h-[300px]">
          {projectDataQuery.isFetched && (
            <Map
              ref={mapRef}
              mapboxAccessToken={TOKEN}
              initialViewState={{
                latitude: projectDataQuery.data?.latitude,
                longitude: projectDataQuery.data?.longitude,
                zoom: 18,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/hitendrakumarverma/cltmki79t014b01qn7zjn2j3z"
            >
              <Marker
                latitude={projectDataQuery.data?.latitude}
                longitude={projectDataQuery.data?.longitude}
              />
            </Map>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectOverview;

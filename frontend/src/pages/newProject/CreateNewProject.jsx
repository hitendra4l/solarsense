import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { useForm } from "react-hook-form";
import { MdLocationPin } from "react-icons/md";

import CreateNewProjectLayout from "../../components/CreateNewProjectLayout";
import GeoCoder from "./GeoCoder";
import { useElevation, useGeoapify } from "../../services/queries/projectInfo";
import { useNasaData } from "../../services/queries/meteoData";
import { useCreateNewProject } from "../../services/mutations/projects";
import { useProjectState } from "../../contexts/useProjectState";
import { formatNasaData } from "../../utils/formatNasaData";
import { useNasaDataState } from "../../contexts/usaNasaDataState";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const CreateNewProject = () => {
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state) => state.user);
  const { setSelectedProject } = useProjectState();
  const { setNasaDataState } = useNasaDataState();
  const [latitude, setLatitude] = useState(26);
  const [longitude, setLongitude] = useState(75);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!latitude && !longitude) {
      fetch("https://ipapi.co/json")
        .then((response) => response.json())
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setLatitude(data.longitude);
          setLongitude(data.latitude);
        });
    }
  }, [latitude, longitude]);

  const elevationQuery = useElevation({ latitude, longitude });

  const geoapifyQuery = useGeoapify({ latitude, longitude });

  const nasaDataQuery = useNasaData({ latitude, longitude });

  const createNewProjectMutation = useCreateNewProject();

  console.log("before formatting", nasaDataQuery?.data);
  const nasaData = formatNasaData(nasaDataQuery?.data);
  console.log("after formatting", nasaData);

  const mapRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (coordinates) => {
    console.log(coordinates);
    mapRef.current.flyTo({
      center: [Number(coordinates.longitude), Number(coordinates.latitude)],
    });
    setLatitude(Number(coordinates.latitude));
    setLongitude(Number(coordinates.longitude));
  };

  const handleCreateProject = async () => {
    const response = await createNewProjectMutation.mutateAsync({
      latitude,
      longitude,
      name: geoapifyQuery.data?.features[0]?.properties?.formatted,
      token: user?.token,
    });

    if (response) {
      setSelectedProject(response);
      setNasaDataState(nasaDataQuery?.data);
      navigate(`/project/${response?._id}/project-overview`);
    }
  };

  return (
    <CreateNewProjectLayout>
      <div className="container mx-auto">
        <div className="px-6 flex gap-5 mt-8 mb-8">
          <div className="flex flex-col flex-grow gap-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center justify-between gap-7 px-3"
            >
              <div className="flex-grow">
                <input
                  className="border-2 rounded px-2 py-1 border-dark-hard w-full"
                  type="text"
                  {...register("latitude", {
                    pattern: {
                      value:
                        /^(-?\d{1,2}(?:\.\d+)?|-(?:90(?:\.0+)?|[1-8]?\d(?:\.\d+)?))$/,
                      message: "Latitude should be between -90 to 90",
                    },
                    required: {
                      value: true,
                      message: "Latitude is required",
                    },
                  })}
                  id="latitude"
                  placeholder="Enter latitude..."
                />
                {errors.latitude && (
                  <span className="text-xs text-red-700">
                    {errors.latitude.message}
                  </span>
                )}
              </div>

              <div className="flex-grow">
                <input
                  className="border-2 rounded px-2 py-1 border-dark-hard w-full"
                  type="text"
                  {...register("longitude", {
                    pattern: {
                      value:
                        /^(-?(?:180(?:(?:\.0+)?|\.0*[1-9]\d*)?|\d{1,2}(?:\.\d+)?|\d{1,2}\.\d*|1[0-7]\d(?:\.\d+)?))$/,
                      message: "Longitude should be between -180 and 180",
                    },
                    required: {
                      value: true,
                      message: "Longitude is required",
                    },
                  })}
                  id="longitude"
                  placeholder="Enter longitude..."
                />
                {errors.longitude && (
                  <span className="text-xs text-red-700">
                    {errors.longitude.message}
                  </span>
                )}
              </div>

              <button
                className="bg-light-soft hover:bg-light-hard transition-colors duration-200 text-white font-bold px-5 py-1 rounded-md text-lg"
                type="submit"
              >
                Locate
              </button>
            </form>
            <div className="h-[700px] relative">
              <Map
                ref={mapRef}
                mapboxAccessToken={TOKEN}
                onClick={(e) => {
                  setLatitude(e.lngLat.lat);
                  setLongitude(e.lngLat.lng);
                }}
                initialViewState={{
                  latitude: latitude,
                  longitude: longitude,
                  zoom: 9,
                }}
                style={{ width: "100%" }}
                mapStyle="mapbox://styles/hitendrakumarverma/cltmki79t014b01qn7zjn2j3z"
              >
                {showPopup && (
                  <Popup
                    latitude={latitude}
                    longitude={longitude}
                  >{`lat:${latitude}, lng:${longitude}`}</Popup>
                )}
                <Marker
                  latitude={latitude}
                  longitude={longitude}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowPopup(!showPopup);
                  }}
                  onDragEnd={(e) => {
                    setLatitude(e.lngLat.lat);
                    setLongitude(e.lngLat.lng);
                  }}
                />
                <NavigationControl position="bottom-right" />
                <FullscreenControl position="bottom-right" />
                <ScaleControl />
                <GeolocateControl
                  position="top-left"
                  trackUserLocation
                  onGeolocate={(e) => {
                    setLatitude(e.coords.latitude);
                    setLongitude(e.coords.longitude);
                  }}
                />
                <GeoCoder
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </Map>
            </div>
          </div>
          <div className="bg-[#E4E5EA] rounded-lg w-96 flex flex-col items-center px-4 py-4 gap-2 ">
            <h3 className="text-dark-hard text-2xl font-extrabold">
              Project Info
            </h3>
            <div className="flex items-center">
              <MdLocationPin className="w-5 h-5 text-dark-soft" />
              <p className="text-dark-soft text-sm">
                {geoapifyQuery.isFetching
                  ? "Loading..."
                  : `${geoapifyQuery.data.features[0].properties.county}, ${geoapifyQuery.data.features[0].properties.country}`}
              </p>
            </div>
            <div className="w-full mt-6 text-dark-hard flex flex-col gap-3">
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Latitude</p>
                <p className="flex-grow">{latitude.toFixed(2)}&deg;</p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Longitude</p>
                <p className="flex-grow">{longitude.toFixed(2)}&deg;</p>
              </div>

              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Elevation</p>
                <p className="flex-grow">
                  {elevationQuery.isFetching
                    ? "Loading..."
                    : `${elevationQuery.data?.elevation[0]}m`}
                </p>
              </div>

              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Address</p>
                <p className="flex-grow text-base">
                  {geoapifyQuery.isFetching
                    ? "Loading..."
                    : `${geoapifyQuery.data.features[0].properties.formatted}`}
                </p>
              </div>

              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Time Zone</p>
                <p className="flex-grow text-base">
                  {geoapifyQuery.isFetching
                    ? "Loading..."
                    : `UTC${geoapifyQuery.data?.features[0]?.properties?.timezone?.offset_STD}, ${geoapifyQuery.data?.features[0]?.properties?.timezone?.name} [${geoapifyQuery.data?.features[0]?.properties?.timezone?.abbreviation_STD}]`}
                </p>
              </div>

              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">GHI</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.ghi}kW-hr/m^2/day`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">DNI</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.dni}kW-hr/m^2/day`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">D2G</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching ? "Loading..." : `${nasaData.d2g}`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">DIF</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.dif}kW-hr/m^2/day`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">ALB</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching ? "Loading..." : `${nasaData.alb}`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">TEMP</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.temp}°C`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Wind Speed</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.windSpeed}m/s`}
                </p>
              </div>
              <div className="flex items-center text-lg">
                <p className="w-[150px] font-semibold">Precipitation</p>
                <p className="flex-grow">
                  {nasaDataQuery.isFetching
                    ? "Loading..."
                    : `${nasaData.precipitation}mm`}
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateProject}
              disabled={
                nasaDataQuery.isFetching ||
                geoapifyQuery.isFetching ||
                elevationQuery.isFetching
              }
              className="bg-light-soft w-full text-white text-2xl font-bold py-3 rounded hover:bg-light-hard transition-colors duration-200 mt-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-light-soft"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </CreateNewProjectLayout>
  );
};

export default CreateNewProject;

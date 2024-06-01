import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const GeoCoder = ({ setLatitude, setLongitude }) => {
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);

  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLatitude(coords[1]);
    setLongitude(coords[0]);
  });
  return null;
};
export default GeoCoder;

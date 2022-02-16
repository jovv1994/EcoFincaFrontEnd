import React from "react";
import { Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  return (
    <Map styledcenter={{ lat: "51.52437", len: "13.41053" }} zoom={13}></Map>
  );
};

export default Map;

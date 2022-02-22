import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker  } from "react-google-maps";

const MapView = (props) => {
  let latitude = parseFloat(props.delivery.latitude);
  let longitude = parseFloat(props.delivery.longitude);

  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
     {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} />}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MapView));

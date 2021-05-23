import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({
  setLocation,
  draggable,
  initialLocation,
  ...props
}) => {
  return (
    <Map
      google={props.google}
      center={initialLocation}
      zoom={15}
      initialCenter={initialLocation}
      draggable={draggable}
    >
      <Marker
        draggable={draggable}
        onDragend={(t, map, coord) => {
          if (draggable) {
            setLocation({
              longitude: coord.latLng.lng(),
              latitude: coord.latLng.lat(),
            });
          }
        }}
        name={"Localização atual"}
        lat={initialLocation.lat}
        lng={initialLocation.lng}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);

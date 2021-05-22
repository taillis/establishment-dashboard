import React, { useState, memo } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({ setLocation, ...props }) => {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  console.log({ currentLocation });

  const handleLocation = ({ coords }) => {
    setLocationLoaded(true);
    const lat = coords.latitude;
    const lng = coords.longitude;
    setCurrentLocation({
      lat,
      lng,
    });
  };

  const getCurrentLocation = () => {
    console.log("GETTING LOCATION");
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(handleLocation);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(handleLocation);
          } else {
            navigator.geolocation.getCurrentPosition(() => {
              handleLocation({
                coords: {
                  latitude: 0,
                  longitude: 0,
                },
              });
            });
          }
        });
    } else {
      alert("Sorry Not available!");
    }
  };

  if (!locationLoaded) getCurrentLocation();

  return (
    <Map
      google={props.google}
      center={currentLocation}
      zoom={20}
      initialCenter={currentLocation}
    >
      <Marker
        draggable={true}
        onDragend={(t, map, coord) => {
          setLocation({
            longitude: coord.latLng.lng(),
            latitude: coord.latLng.lat(),
          });
        }}
        name={"Localização atual"}
        lat={currentLocation.lat}
        lng={currentLocation.lng}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "",
})(memo(MapContainer));

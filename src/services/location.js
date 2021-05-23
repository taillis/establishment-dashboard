export const getCurrentLocation = async (callback) => {
  if (navigator.geolocation) {
    const { state } = await navigator.permissions.query({
      name: "geolocation",
    });

    if (["granted", "prompt"].indexOf(state) >= 0) {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      callback({
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default getCurrentLocation;

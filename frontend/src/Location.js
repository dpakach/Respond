export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

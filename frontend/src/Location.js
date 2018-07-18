export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      callback,
      error => console.log("Error occured", error),
      { timeout: 10000 }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

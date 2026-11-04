export default function getCoordinateLabels(coordinates: string) {
  const [latitude, longitude] = coordinates.split(", ");

  return {
    latitudeLabel: `Latitude ${latitude}`,
    longitudeLabel: `Longitude ${longitude}`,
    shortLatitudeLabel: `Lat ${latitude}`,
    shortLongitudeLabel: `Long ${longitude}`,
  };
}

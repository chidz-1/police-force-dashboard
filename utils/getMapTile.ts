import { clamp } from "lodash";

import { MAP_TILE_URL } from "@/constants";

const MARKER_INSET_PERCENT = 12;

function getMarkerOffset(tileFraction: number) {
  return `${clamp(tileFraction * 100, MARKER_INSET_PERCENT, 100 - MARKER_INSET_PERCENT)}%`;
}

export default function getMapTile(
  latitude: number,
  longitude: number,
  zoom: number
) {
  const tilesPerAxis = 2 ** zoom;
  const latitudeInRadians = (latitude * Math.PI) / 180;

  const tileX = ((longitude + 180) / 360) * tilesPerAxis;
  const tileY =
    ((1 - Math.asinh(Math.tan(latitudeInRadians)) / Math.PI) / 2) *
    tilesPerAxis;

  const x = Math.floor(tileX);
  const y = Math.floor(tileY);

  return {
    url: MAP_TILE_URL.replace("{z}", String(zoom))
      .replace("{x}", String(x))
      .replace("{y}", String(y)),
    markerLeft: getMarkerOffset(tileX - x),
    markerTop: getMarkerOffset(tileY - y),
  };
}

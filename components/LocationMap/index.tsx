"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

import {
  CHART_EMPHASIS_COLOR,
  MAP_ATTRIBUTION,
  MAP_DIALOG_ZOOM,
  MAP_TILE_URL,
} from "@/constants";
import { LocationMapProps } from "./types";

export default function LocationMap({ latitude, longitude }: LocationMapProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={MAP_DIALOG_ZOOM}
      className="z-0 h-80 w-full rounded-md dark:[&_.leaflet-tile]:brightness-90! dark:[&_.leaflet-tile]:hue-rotate-180! dark:[&_.leaflet-tile]:invert!"
    >
      <TileLayer url={MAP_TILE_URL} attribution={MAP_ATTRIBUTION} />
      <CircleMarker
        center={[latitude, longitude]}
        radius={9}
        pathOptions={{
          color: CHART_EMPHASIS_COLOR,
          fillColor: CHART_EMPHASIS_COLOR,
          fillOpacity: 0.5,
        }}
      />
    </MapContainer>
  );
}

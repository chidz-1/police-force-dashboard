"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { MAP_THUMBNAIL_ZOOM } from "@/constants";
import getCoordinateLabels from "@/utils/getCoordinateLabels";
import getMapTile from "@/utils/getMapTile";
import { MapThumbnailProps } from "./types";

const THUMBNAIL_SIZE = 36;

const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-80 w-full rounded-md" />,
});

export default function MapThumbnail({
  label,
  coordinates,
}: MapThumbnailProps) {
  const [latitude, longitude] = coordinates.split(", ").map(Number);
  const { latitudeLabel, longitudeLabel } = getCoordinateLabels(coordinates);
  const { url, markerLeft, markerTop } = getMapTile(
    latitude,
    longitude,
    MAP_THUMBNAIL_ZOOM
  );

  return (
    <Dialog>
      <DialogTrigger
        aria-label={`Open map for ${label}`}
        className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-sm bg-muted ring-1 ring-border transition-shadow outline-none hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src={url}
          alt=""
          width={THUMBNAIL_SIZE}
          height={THUMBNAIL_SIZE}
          loading="lazy"
          unoptimized
          className="dark:brightness-90 dark:hue-rotate-180 dark:invert"
        />
        <span
          className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-1 ring-background"
          style={{ left: markerLeft, top: markerTop }}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            {latitudeLabel}, {longitudeLabel}
          </DialogDescription>
        </DialogHeader>
        <LocationMap latitude={latitude} longitude={longitude} />
      </DialogContent>
    </Dialog>
  );
}

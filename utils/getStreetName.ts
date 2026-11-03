const ON_OR_NEAR_PREFIX = "On or near ";

export default function getStreetName(streetName: string): string {
  return streetName.startsWith(ON_OR_NEAR_PREFIX)
    ? streetName.slice(ON_OR_NEAR_PREFIX.length)
    : streetName;
}

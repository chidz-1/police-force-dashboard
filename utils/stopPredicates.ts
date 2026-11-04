import { StopAndSearch } from "@/types/stop-and-search";

export function isArrest({ outcome }: StopAndSearch) {
  return outcome === "Arrest";
}

export function isNoFurtherAction({ outcome }: StopAndSearch) {
  return outcome === "A no further action disposal";
}

export function isDrugSearch({ object_of_search }: StopAndSearch) {
  return object_of_search === "Controlled drugs";
}

export function isLinkedToObject({
  outcome_linked_to_object_of_search,
}: StopAndSearch) {
  return outcome_linked_to_object_of_search === true;
}

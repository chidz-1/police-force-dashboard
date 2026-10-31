export function getForceId() {
  return process.env.NEXT_PUBLIC_SELECTED_POLICE_FORCE ?? "leicestershire";
}

export function getForceFriendlyLabel() {
  const forceId = getForceId();
  return forceId
    .split("-")
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");
}

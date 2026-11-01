import { useContext } from "react";

import { StopDataContext } from "../Components/StopDataProvider";

export default function useStopData() {
  const context = useContext(StopDataContext);

  if (!context) {
    throw new Error(
      "[useStopData] - this hook must be used within StopDataProvider"
    );
  }

  return context;
}

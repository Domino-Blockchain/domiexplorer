import { SolanaPingProvider } from "providers/stats/DomiPingProvider";
import React from "react";
import { DomiClusterStatsProvider } from "./domiClusterStats";

type Props = { children: React.ReactNode };
export function StatsProvider({ children }: Props) {
  return (
    <DomiClusterStatsProvider>
      <SolanaPingProvider>{children}</SolanaPingProvider>
    </DomiClusterStatsProvider>
  );
}

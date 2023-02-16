import React from "react";
import { lamportsToDomiString } from "utils";

export function DomiBalance({
  lamports,
  maximumFractionDigits = 9,
}: {
  lamports: number | bigint;
  maximumFractionDigits?: number;
}) {
  return (
    <span>
      ◎
      <span className="font-monospace">
        {lamportsToDomiString(lamports, maximumFractionDigits)}
      </span>
    </span>
  );
}

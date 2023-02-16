import React from "react";
import { BigNumber } from "bignumber.js";
import { DomiBalance } from "components/common/SolBalance";

export function BalanceDelta({
  delta,
  isDomi = false,
}: {
  delta: BigNumber;
  isDomi?: boolean;
}) {
  let domi;

  if (isDomi) {
    domi = <DomiBalance lamports={Math.abs(delta.toNumber())} />;
  }

  if (delta.gt(0)) {
    return (
      <span className="badge bg-success-soft">
        +{isDomi ? domi : delta.toString()}
      </span>
    );
  } else if (delta.lt(0)) {
    return (
      <span className="badge bg-warning-soft">
        {isDomi ? <>-{domi}</> : delta.toString()}
      </span>
    );
  }

  return <span className="badge bg-secondary-soft">0</span>;
}

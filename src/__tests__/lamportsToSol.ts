import { expect } from "chai";
import { lamportsToDomi, LAMPORTS_PER_DOMI } from "utils";

describe("lamportsToDomi", () => {
  it("0 lamports", () => {
    expect(lamportsToDomi(0)).to.eq(0.0);
    expect(lamportsToDomi(BigInt(0))).to.eq(0.0);
  });

  it("1 lamport", () => {
    expect(lamportsToDomi(1)).to.eq(0.000000001);
    expect(lamportsToDomi(BigInt(1))).to.eq(0.000000001);
    expect(lamportsToDomi(-1)).to.eq(-0.000000001);
    expect(lamportsToDomi(BigInt(-1))).to.eq(-0.000000001);
  });

  it("1 DOMI", () => {
    expect(lamportsToDomi(LAMPORTS_PER_DOMI)).to.eq(1.0);
    expect(lamportsToDomi(BigInt(LAMPORTS_PER_DOMI))).to.eq(1.0);
    expect(lamportsToDomi(-LAMPORTS_PER_DOMI)).to.eq(-1.0);
    expect(lamportsToDomi(BigInt(-LAMPORTS_PER_DOMI))).to.eq(-1.0);
  });

  it("u64::MAX lamports", () => {
    expect(lamportsToDomi(2n ** 64n)).to.eq(18446744073.709551615);
    expect(lamportsToDomi(-(2n ** 64n))).to.eq(-18446744073.709551615);
  });
});

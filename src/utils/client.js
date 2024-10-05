/** @format */

import { createPublicClient, http } from "viem";
import { auroraTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: auroraTestnet,
  transport: http(),
});

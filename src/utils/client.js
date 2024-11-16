/** @format */

import { createPublicClient, http, createWalletClient, custom } from "viem";
import { auroraTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: auroraTestnet,
  transport: http(),
});

export const client = createWalletClient({
  chain: auroraTestnet,
  transport: custom(window.ethereum),
});

export const [address] = await client.getAddresses();

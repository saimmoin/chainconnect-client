/** @format */

export const THIRD_WEB_CREDENTIALS = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  secretKey: import.meta.env.VITE_SECRET_KEY,
};

export function truncateAddress(address, startChars = 6, endChars = 4) {
  if (typeof address !== "string" || address.length < startChars + endChars) {
    throw new Error("Invalid address or parameters");
  }

  const start = address.substring(0, startChars);
  const end = address.substring(address.length - endChars);
  return `${start}...${end}`;
}

console.log("⚡ ~ import.meta.env.VITE_TATUM_API_KEY:", import.meta.env);

// export const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/62444/chainconnect/version/latest";
export const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/86804/chainconnect/version/latest";

// Example usage:
const ethAddress = "0x1234567890abcdef1234567890abcdef12345678";
const truncatedAddress = truncateAddress(ethAddress);
// console.log(truncatedAddress); // Output: 0x1234...5678

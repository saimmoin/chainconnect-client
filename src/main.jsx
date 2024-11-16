import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.jsx";
import { config } from "./wagmi.js";

import { ChainId, ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { Provider } from "react-redux";
import store from "./store/store";
import { THIRD_WEB_CREDENTIALS } from './utils/common.js'


import "./index.css";
import { auroraTestnet } from 'viem/chains';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      // supportedWallets={[metamaskWallet()]}
      // supportedChains={[ChainId.Mumbai]}
      activeChain={ChainId.auroraTestnet}
      // autoConnect={true}
      // autoSwitch={true}
      {...THIRD_WEB_CREDENTIALS}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

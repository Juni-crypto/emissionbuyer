import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "Testnetdefi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={{
        chainId: 1131,
        rpc: ["https://eth.testnet.ocean.jellyfishsdk.com"],
        nativeCurrency: {
          decimals: 18,
          name: "DFI",
          symbol: "DFI",
        },
        shortName: "defi", // Display value shown in the wallet UI
        slug: "defi", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "DefiTestNet", // Name of the network
        name: "DefiTestNet", // Name of the network
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

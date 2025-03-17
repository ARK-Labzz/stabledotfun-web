import { http } from "viem";
import { mainnet } from "viem/chains";
import { createConfig } from "wagmi";

export const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
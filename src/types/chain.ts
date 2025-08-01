export interface ChainData {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL?: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: {
    registry: string;
  };
  explorers?: Array<{
    name: string;
    url: string;
    standard: string;
  }>;
  title?: string;
  description?: string;
  status?: string;
  parent?: {
    type: string;
    chain: string;
    bridges?: Array<{
      url: string;
    }>;
  };
}

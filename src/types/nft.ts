export type GetNftInfoPayload = {
  id: string;
  tokenAddress: string;
  tokenId: string;
  network: string;
};

export type NftState = {
  imageUrl: string;
  name: string;
  tokenAddress: string;
  tokenId: string;
  network: string;
};

export enum NetworkType {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  GOERLI = 'goerli',
}

export const NetworkTypeToName = {
  [NetworkType.ETHEREUM]: 'Ethereum',
  [NetworkType.POLYGON]: 'Polygon',
  [NetworkType.GOERLI]: 'Goerli',
};

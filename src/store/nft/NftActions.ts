import actionCreatorFactory from 'typescript-fsa';

import { GetNftInfoPayload, NftState } from '@/types/nft';

const factory = actionCreatorFactory('nft');

export type NftStore = {
  nftInformation: Record<string, NftState | null> | null;
  nftInformationError: Record<string, boolean> | null;
};

export const NftAction = {
  getNftInformation: factory<GetNftInfoPayload>('INIT_GET_NFT_INFORMATION'),
  setNftInformation: factory<{ id: string; nftInfo: NftState | null }>(
    'SET_NFT_INFORMATION',
  ),
  setNftInformationError: factory<{ id: string; error: boolean }>(
    'SET_NFT_INFORMATION_ERROR',
  ),
  resetState: factory('RESET_STATE'),
};

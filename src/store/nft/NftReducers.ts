import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { NftAction, NftStore } from './NftActions';

export const nftStoreInitialState: NftStore = Object.freeze({
  nftInformation: null,
  nftInformationError: null,
});

export const NftReducers = reducerWithInitialState<NftStore>(
  nftStoreInitialState,
)
  .case(NftAction.setNftInformation, (state, { id, nftInfo }): NftStore => {
    return {
      ...state,
      nftInformation: {
        ...state.nftInformation,
        [id]: nftInfo,
      },
    };
  })
  .case(NftAction.setNftInformationError, (state, { id, error }): NftStore => {
    return {
      ...state,
      nftInformationError: {
        ...state.nftInformationError,
        [id]: error,
      },
    };
  })
  .case(NftAction.resetState, () => {
    return {
      ...nftStoreInitialState,
    };
  });

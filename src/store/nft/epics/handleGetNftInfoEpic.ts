/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { NftAction } from '@/store/nft/NftActions';

export const handleGetNftInfo: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { projectService, dispatch }) =>
  action$.pipe(
    ofAction(NftAction.getNftInformation),
    switchMap(({ payload: { id, tokenAddress, tokenId, network } }) =>
      from(
        projectService.getNftInformation({ tokenAddress, tokenId, network }),
      ).pipe(
        tap((data: any) => {
          if (data?.isError) {
            dispatch(
              NftAction.setNftInformation({
                id,
                nftInfo: null,
              }),
            );

            dispatch(
              NftAction.setNftInformationError({
                id,
                error: true,
              }),
            );
          } else if (data?.nft) {
            dispatch(
              NftAction.setNftInformation({
                id,
                nftInfo: {
                  name: data.contract.name,
                  tokenAddress,
                  tokenId,
                  network,
                  imageUrl: data.nft.cached_file_url,
                },
              }),
            );

            dispatch(
              NftAction.setNftInformationError({
                id,
                error: false,
              }),
            );
          }
        }),
      ),
    ),
    ignoreElements(),
  );

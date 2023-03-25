import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectRegisterModal = createSelector(
  (state: RootState) => state.modal.modals['register'],
  (modalData) => modalData,
);

export const selectLoginModal = createSelector(
  (state: RootState) => state.modal.modals['login'],
  (modalData) => modalData,
);

export const selectPublicationResultModal = createSelector(
  (state: RootState) => state.modal.modals['publicationResult'],
  (modalData) => modalData,
);

export const selectCollectResultModal = createSelector(
  (state: RootState) => state.modal.modals['collectResult'],
  (modalData) => modalData,
);

export const selectSignatureModal = createSelector(
  (state: RootState) => state.modal.modals['signature'],
  (modalData) => modalData,
);

export const selectNftModal = createSelector(
  (state: RootState) => state.modal.modals['nft'],
  (modalData) => modalData,
);

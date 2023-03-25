import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  ModalActions,
  ModalPayload,
  ModalStore,
  ModalType,
} from './ModalActions';

export const modalStoreInitialState: ModalStore = Object.freeze({
  modals: {
    register: {
      isOpen: false,
    },
    collectResult: {
      isOpen: false,
    },
    nft: {
      isOpen: false,
    },
    publicationResult: {
      isOpen: false,
    },
    signature: {
      isOpen: false,
    },
    login: {
      isOpen: false,
    },
  },
});

export const ModalReducers = reducerWithInitialState<ModalStore>(
  modalStoreInitialState,
)
  .case(ModalActions.openModal, (state, payload: ModalPayload): ModalStore => {
    const cloneState = { ...state };

    cloneState.modals[payload.key] = {
      isOpen: true,
      payload: payload.payload,
      confirmCallback: payload.confirmCallback,
    };

    return cloneState;
  })
  .case(ModalActions.closeModal, (state, type: ModalType): ModalStore => {
    const cloneState = { ...state };

    cloneState.modals[type] = {
      isOpen: false,
    };

    return cloneState;
  })
  .case(ModalActions.resetState, () => {
    return {
      ...modalStoreInitialState,
    };
  });

import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('modal');

export type ModalType =
  | 'register'
  | 'login'
  | 'signature'
  | 'nft'
  | 'collectResult'
  | 'publicationResult';

export type ModalData<T = any> = {
  isOpen: boolean;
  payload?: T;
  confirmCallback?(): void;
};

export type ModalKeyValue<T = any> = Record<ModalType, ModalData<T>>;

export type ModalPayload<T = any> = {
  key: ModalType;
  payload?: T;
  confirmCallback?(): void;
};

export interface ModalStore {
  modals: ModalKeyValue;
}

export const ModalActions = {
  openModal: factory<ModalPayload>('OPEN_MODAL'),
  closeModal: factory<ModalType>('CLOSE_MODAL'),
  resetState: factory('RESET_STATE'),
};

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AddNftModal } from '@/components/Modals/AddNft/AddNftModal';
import { CollectResultModal } from '@/components/Modals/CollectResult/CollectResultModal';
import { LoginModal } from '@/components/Modals/Login/LoginModal';
import { PublicationResultModal } from '@/components/Modals/PublicationResult/PublicationResultModal';
import { SignatureModal } from '@/components/Modals/Signature/SignatureModal';
import {
  selectCollectResultModal,
  selectLoginModal,
  selectNftModal,
  selectPublicationResultModal,
  selectRegisterModal,
  selectSignatureModal,
} from '@/store/Modal/ModalSelectors';

import { RegisterModal } from './Register/RegisterModal';

const modals = [
  {
    key: 'register',
    renderer: <RegisterModal />,
  },
  {
    key: 'login',
    renderer: <LoginModal />,
  },
  {
    key: 'nft',
    renderer: <AddNftModal />,
  },
  {
    key: 'signature',
    renderer: <SignatureModal />,
  },
  {
    key: 'publicationResult',
    renderer: <PublicationResultModal />,
  },
  {
    key: 'collectResult',
    renderer: <CollectResultModal />,
  },
];

export const Modals = () => {
  const nftModal = useSelector(selectNftModal);
  const registerModal = useSelector(selectRegisterModal);
  const loginModal = useSelector(selectLoginModal);
  const signatureModal = useSelector(selectSignatureModal);
  const publicationResultModal = useSelector(selectPublicationResultModal);
  const collectResultModal = useSelector(selectCollectResultModal);

  const modalOpen = useCallback(
    (key) => {
      switch (key) {
        case 'register':
          return registerModal.isOpen;
        case 'login':
          return loginModal.isOpen;
        case 'nft':
          return nftModal.isOpen;
        case 'signature':
          return signatureModal.isOpen;
        case 'publicationResult':
          return publicationResultModal.isOpen;
        case 'collectResult':
          return collectResultModal.isOpen;
      }

      return false;
    },
    [
      registerModal,
      loginModal,
      nftModal,
      signatureModal,
      publicationResultModal,
      collectResultModal,
    ],
  );

  return (
    <div>
      {modals.map((modal, i) => {
        if (modalOpen(modal.key)) {
          return (
            <div key={modal.renderer.toString() + i}>{modal.renderer}</div>
          );
        }

        return null;
      })}
    </div>
  );
};

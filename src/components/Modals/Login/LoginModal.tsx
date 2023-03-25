import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@/components/Modal/Modal';
import { ModalActions, ModalData } from '@/store/Modal/ModalActions';
import { selectLoginModal } from '@/store/Modal/ModalSelectors';
import { LoaderAction } from '@/store/loader/LoaderActions';

export const LoginModal: FC = () => {
  /** Store */
  const dispatch = useDispatch();
  const modalData: ModalData<{ src: string }> = useSelector(selectLoginModal);

  if (!modalData || !modalData?.payload) {
    return null;
  }

  const body = (
    <div className="flex flex-col items-center">
      <p className="mt-6 text-center text-slate-500 text-md leading-relaxed">
        Scan QR code with your Xumm mobile application
      </p>
      <img
        className="ml-1 mt-6"
        style={{ height: 350, width: 350 }}
        src={modalData.payload.src}
        alt=""
      />
    </div>
  );

  /** Methods */
  const onClose = () => {
    dispatch(ModalActions.closeModal('login'));
    dispatch(LoaderAction.setLoaded('auth'));
  };

  return (
    <Modal
      size="s"
      onClose={onClose}
      closable
      title="Connect to Publichain"
      isOpen={modalData.isOpen}
      footer={null}
    >
      {body}
    </Modal>
  );
};

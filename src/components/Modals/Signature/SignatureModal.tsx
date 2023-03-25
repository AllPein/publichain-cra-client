import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '@/components/Loader/Loader';
import { Modal } from '@/components/Modal/Modal';
import { ModalActions, ModalData } from '@/store/Modal/ModalActions';
import { selectSignatureModal } from '@/store/Modal/ModalSelectors';
import { LoaderAction } from '@/store/loader/LoaderActions';

export const SignatureModal: FC = () => {
  /** Store */
  const dispatch = useDispatch();
  const modalData: ModalData<boolean> = useSelector(selectSignatureModal);

  const body = (
    <div className="flex flex-col items-center">
      <p className="mt-6  text-slate-500 text-md leading-relaxed">
        Please, sign the transaction via your Xumm applictaion.
      </p>
      <Loader className="mt-12" />
    </div>
  );

  /** Methods */
  const onClose = () => {
    dispatch(ModalActions.closeModal('publicationResult'));
    dispatch(LoaderAction.setLoaded('publish'));
  };

  return (
    <Modal
      size="m"
      onClose={onClose}
      title="Awaiting signature"
      isOpen={modalData.isOpen}
      footer={null}
    >
      {body}
    </Modal>
  );
};

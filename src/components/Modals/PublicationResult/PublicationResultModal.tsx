import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/Button/Button';
import { Modal } from '@/components/Modal/Modal';
import { ModalActions, ModalData } from '@/store/Modal/ModalActions';
import { selectPublicationResultModal } from '@/store/Modal/ModalSelectors';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { goTo } from '@/utils/routerActions';

export const PublicationResultModal: FC = () => {
  /** Store */
  const dispatch = useDispatch();
  const modalData: ModalData<boolean> = useSelector(
    selectPublicationResultModal,
  );

  const isSuccess = useMemo(() => modalData.payload === true, [modalData]);

  /** Methods */
  const onClose = () => {
    dispatch(ModalActions.closeModal('publicationResult'));
    dispatch(LoaderAction.setLoaded('publish'));
  };

  const handleCloseModal = () => {
    if (isSuccess) {
      onClose();
      goTo('/explore');
    } else {
      onClose();
    }
  };

  const body = (
    <>
      <p className="mt-6 text-center text-slate-500 text-md leading-relaxed">
        {isSuccess
          ? 'You have successfully published your article!'
          : 'There has been an error on the server. Please, try again later.'}
      </p>
    </>
  );

  const footer = (
    <Button className="mt-6 text-center" onClick={handleCloseModal}>
      {isSuccess ? 'Browse articles' : 'Close'}
    </Button>
  );

  return (
    <Modal
      onClose={onClose}
      closable={!isSuccess}
      size="s"
      title="Publication result"
      isOpen={modalData.isOpen}
      footer={footer}
    >
      {body}
    </Modal>
  );
};

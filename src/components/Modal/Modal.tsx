import React, { Fragment, useCallback, useMemo } from 'react';

import { Dialog, Transition } from '@headlessui/react';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose?: (value: boolean) => void;
  footer?: React.ReactNode;
  size?: 's' | 'm' | 'l';
  closable?: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  size = 'l',
  isOpen,
  title = 'Modal title',
  onClose,
  footer,
  closable = false,
  children,
}) => {
  window.addEventListener('click', (e) => {
    if ((e.target as any).id === 'modal-overlay' && closable) {
      onClose?.(true);
    }
  });

  const handleClose = useCallback(() => {
    if (onClose && closable) {
      onClose(true);
    }
  }, [onClose, closable]);

  const modalWidthClass = useMemo(() => {
    switch (size) {
      case 's':
        return 'w-md';
      case 'm':
        return 'w-lg';
      default:
        return 'w-1/2';
    }
  }, [size]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${modalWidthClass} break-all transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">{children}</div>

                <div className="mt-4 text-right">{footer}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { Modal };

import React, { FC } from 'react';
import './styles.scss';

interface ModalProps {
  hideModal: boolean;
  toggleModal: () => void;
}

const Modal: FC<ModalProps> = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div className='modalOverlay' onClick={() => toggleModal()} />,
      <div className='modalWrap'>
        <div className='modal'>{children}</div>
      </div>
    </>
  );
};

export default Modal;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ handleModal, children }) {
  useEffect(() => {
    const handleOpenedModal = e => {
      if (e.code === 'Escape') {
        handleModal();
      }
    };
    window.addEventListener('keydown', handleOpenedModal);
    return () => {
      window.removeEventListener('keydown', handleOpenedModal);
    };
  }, [handleModal]);

  return createPortal(
    <div className={css.overlay} onClick={handleModal}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

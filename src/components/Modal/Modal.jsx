import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  handleOpenedModal = e => {
    if (e.code === 'Escape') {
      this.props.handleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleOpenedModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOpenedModal);
  }

  render() {
    const { handleModal, children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={handleModal}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

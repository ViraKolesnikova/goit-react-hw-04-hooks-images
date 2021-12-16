import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, image}) {  
  useEffect(() => {
    window.addEventListener('keydown', onKeyDownClose);

    return () => {
      window.removeEventListener('keydown', onKeyDownClose);
    }
  })
  
  const onKeyDownClose = e => {
    e.code === 'Escape' && onClose();    
  };

  const onOverlayClose = e => {
    e.target === e.currentTarget && onClose();    
  };

  return createPortal(
      <div className={styles.Overlay} onClick={onOverlayClose}>
        <div className={styles.Modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };


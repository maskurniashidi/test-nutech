import React from 'react';
import styles from './styles/Modal.module.css';

function Modal({ children }) {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>{children}</div>
        </div>
    );
}

export default Modal;

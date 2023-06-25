import React from 'react';
import styles from './styles/Alert.module.css';

const Alert = ({ type, message, onClose }) => {
    return (
        <div className={`${styles.alert} ${styles[type]}`}>
            <span className={styles.message}>{message}</span>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Alert;

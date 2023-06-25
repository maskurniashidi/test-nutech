import React, { useState, useEffect } from 'react';
import styles from './styles/Message.module.css';

const Message = ({ text, duration, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    return (
        <div
            className={`${styles.message} ${styles[type]} ${isVisible ? styles.visible : styles.hidden}`}
        >
            <span className={styles.text}>{text}</span>
        </div>
    );
};

export default Message;
